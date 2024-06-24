// ==UserScript==
// @name         URC/BRC Audit Logs Table Dynamic Search
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a search bar to search and filter URC/BRC Audit Log tables
// @author       Syed Hussaini (syhussaini)
// @match        */tools/reportcard/blog/*
// @match        */tools/reportcard/user/*
// @updateURL	 https://github.com/syhussaini/TamperMonkey_scripts/raw/main/Add%20Extended%20Table%20Search%20Script/BRC-URC%20Audit%20Log%20Table%20Search%20Script-1.0.user.js
// @downloadURL	 https://github.com/syhussaini/TamperMonkey_scripts/raw/main/Add%20Extended%20Table%20Search%20Script/BRC-URC%20Audit%20Log%20Table%20Search%20Script-1.0.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=a8c.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create the search bar
    function addSearchBar(table) {
        // Create the search input
        let searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'tmTableSearch';
        searchInput.placeholder = 'Search...';
        searchInput.style.width = '100%';
        searchInput.style.fontSize = '16px';
        searchInput.style.padding = '12px 20px';
        searchInput.style.border = '1px solid #ddd';
        searchInput.style.marginBottom = '12px';

        // Insert the search input before the table
        let searchContainer = document.createElement('div');
        searchContainer.appendChild(searchInput);
        table.parentNode.insertBefore(searchContainer, table);

        // Function to simulate clicking on the expand link
        function simulateExpandLink() {
            let expandLink = document.createElement('a');
            expandLink.href = window.location.href + '&more=1';
            expandLink.style.display = 'none'; // Hide the link
            document.body.appendChild(expandLink);
            expandLink.click();
            document.body.removeChild(expandLink);
        }

        // Function to filter table rows
        function filterRows(filter) {
            let rows = table.querySelectorAll('tr:not(.header)');
            rows.forEach(row => {
                let display = false;
                let cells = row.getElementsByTagName('td');
                for (let cell of cells) {
                    let txtValue = cell.textContent || cell.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        display = true;
                        break;
                    }
                }
                row.style.display = display ? '' : 'none';
            });
        }

        // Event listener for search input
        searchInput.addEventListener('input', function() {
            let filter = searchInput.value.toUpperCase();
            filterRows(filter);
        });

        // Check if table needs to be expanded
        let urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.has('more') || urlParams.get('more') !== '1') {
            // Table is not expanded, simulate click on expand link
            simulateExpandLink();
        }

        // Trigger initial filtering
        filterRows(searchInput.value.toUpperCase());
    }

    // Function to initialize the script
    function initialize() {
        console.log("TamperMonkey script activated");

        // Find all tables with the class "reporttable"
        let tables = document.querySelectorAll('.reportcard-box .reporttable');
        tables.forEach(table => {
            addSearchBar(table);
        });
    }

    // Wait for the DOM to be fully loaded
    function waitForElement(selector, callback) {
        const interval = setInterval(() => {
            if (document.querySelector(selector)) {
                clearInterval(interval);
                callback();
            }
        }, 100);
    }

    window.addEventListener('load', function() {
        waitForElement('.reportcard-box .reporttable', initialize);
    });

})();
