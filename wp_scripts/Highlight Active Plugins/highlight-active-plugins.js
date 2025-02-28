// ==UserScript==
// @name         Highlight Active Plugins
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Highlight active plugin rows in WordPress admin plugins page
// @author       Syed Hussaini
// @match        *://*/wp-admin/plugins*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/syhussaini/TamperMonkey_scripts/refs/heads/main/wp_scripts/Highlight%20Active%20Plugins/highlight-active-plugins.js
// @downloadURL  https://raw.githubusercontent.com/syhussaini/TamperMonkey_scripts/refs/heads/main/wp_scripts/Highlight%20Active%20Plugins/highlight-active-plugins.js
// @supportURL   https://github.com/syhussaini/TamperMonkey_scripts/issues
// ==/UserScript==

(function() {
    'use strict';

    function applyHighlighting() {
        const style = document.createElement('style');
        style.textContent = `
            .wp-list-table.plugins tr.active td,
            .wp-list-table.plugins tr.active th {
                background-color: #68de7c70 !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Run on page load
    window.addEventListener('load', applyHighlighting);

    // Run again if DOM changes (e.g., AJAX updates)
    const observer = new MutationObserver(() => {
        applyHighlighting();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
