// ==UserScript==
// @name         WordPress Site Detector
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  Detects if a site is built using WordPress and displays theme and plugins info in a table. Accumulates plugin data over time.
// @author       Syed Hussaini
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @downloadURL  https://github.com/syhussaini/TamperMonkey_scripts/raw/main/wordpress-site-detector/WordPress-Site-Detector.js
// @updateURL    https://github.com/syhussaini/TamperMonkey_scripts/raw/main/wordpress-site-detector/WordPress-Site-Detector.js
// ==/UserScript==


(function() {
    'use strict';

    // CSS for the floating information box
    GM_addStyle(`
        #wp-info-box {
            position: fixed;
            top: 250px; /* Pushed toward the center */
            right: -250px;
            width: 250px;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            z-index: 1000000; /* Increased z-index */
            transition: right 0.3s ease;
        }
        #wp-info-box.collapsed {
            right: 0;
        }
        #wp-info-box .handle {
            position: absolute;
            top: 50%;
            left: -40px;
            width: 40px;
            height: 40px;
            background-color: #0073aa;
            cursor: pointer;
            transform: translateY(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #wp-info-box .handle img {
            width: 30px;
            height: 30px;
        }
        #wp-info-box .content {
            padding: 10px;
            max-height: 400px;
            overflow-y: auto;
        }
        #wp-info-box .content p {
            margin: 5px 0;
        }
        #wp-info-box table {
            width: 100%;
            border-collapse: collapse;
        }
        #wp-info-box table, #wp-info-box th, #wp-info-box td {
            border: 1px solid #ccc;
        }
        #wp-info-box th, #wp-info-box td {
            padding: 5px;
            text-align: left;
        }
        #wp-info-box .copy-button {
            background-color: #0073aa !important;
            color: #fff !important;
            border: none !important;
            padding: 5px 10px;
            cursor: pointer;
            display: block;
            margin: 10px 0 0;
            width: 100%;
        }
    `);

    // Create the floating information box
    const infoBox = document.createElement('div');
    infoBox.id = 'wp-info-box';
    infoBox.innerHTML = `
        <div class="handle"><img src="https://cdn0.iconfinder.com/data/icons/material-circle-apps/512/icon-wordpress-material-design-1024.png" alt="WordPress"></div>
        <div class="content">
            <p>Detecting WordPress...</p>
        </div>
    `;
    document.body.appendChild(infoBox);

    const handle = infoBox.querySelector('.handle');
    handle.addEventListener('click', () => {
        infoBox.classList.toggle('collapsed');
    });

    const content = infoBox.querySelector('.content');

    // Function to detect if the site is using WordPress
    function detectWordPress() {
        const generatorMeta = document.querySelector('meta[name="generator"]');
        if (generatorMeta && generatorMeta.content.toLowerCase().includes('wordpress')) {
            return true;
        }
        const links = document.querySelectorAll('link[href*="wp-content"], script[src*="wp-content"]');
        if (links.length > 0) {
            return true;
        }
        return false;
    }

    // Function to fetch theme and plugin information
    function fetchWordPressInfo() {
        let themeName = 'Could not detect theme';
        const themeLink = document.querySelector('link[href*="wp-content/themes/"]');
        if (themeLink) {
            const themePath = themeLink.getAttribute('href');
            themeName = themePath.match(/wp-content\/themes\/([^\/]+)/)[1];
        }

        let plugins = JSON.parse(localStorage.getItem('detectedPlugins')) || [];
        const pluginScripts = Array.from(document.querySelectorAll('script[src*="wp-content/plugins/"]'));
        if (pluginScripts.length > 0) {
            const newPlugins = pluginScripts.map(script => script.getAttribute('src').match(/wp-content\/plugins\/([^\/]+)/)[1]);
            plugins = Array.from(new Set([...plugins, ...newPlugins])); // Remove duplicates
            localStorage.setItem('detectedPlugins', JSON.stringify(plugins));
        }

        // Create a table with the theme and plugin information
        const table = document.createElement('table');
        table.innerHTML = `
            <tr><th>Type</th><th>Name</th></tr>
            <tr><td>Theme</td><td>${themeName}</td></tr>
            ${plugins.map(plugin => `<tr><td>Plugin</td><td>${plugin}</td></tr>`).join('')}
        `;
        content.innerHTML = '';
        content.appendChild(table);

        // Add a copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerText = 'Copy';
        copyButton.addEventListener('click', () => {
            const htmlContent = table.outerHTML;
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const clipboardItem = new ClipboardItem({ 'text/html': blob });

            navigator.clipboard.write([clipboardItem]).then(() => {
                alert('Copied to clipboard');
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        });
        content.appendChild(copyButton);
    }

    // Check if the site is a WordPress site
    if (detectWordPress()) {
        fetchWordPressInfo();
    } else {
        content.innerHTML = '<p>This is not a WordPress site.</p>';
    }
})();
