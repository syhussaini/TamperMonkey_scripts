// ==UserScript==
// @name         Raise Slack Emoji Toolbar
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Moves the Slack emoji reaction toolbar up by 25px
// @author       Syed
// @match        *://*.slack.com/*
// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/syhussaini/TamperMonkey_scripts/refs/heads/main/Slack/Raise%20Slack%20Emoji%20Toolbar/raise-slack-emoji-toolbar.js
// @downloadURL  https://raw.githubusercontent.com/syhussaini/TamperMonkey_scripts/refs/heads/main/Slack/Raise%20Slack%20Emoji%20Toolbar/raise-slack-emoji-toolbar.js
// ==/UserScript==

(function() {
    'use strict';

    function adjustEmojiToolbar() {
        const toolbars = document.querySelectorAll('.c-message_actions__container');
        toolbars.forEach(toolbar => {
            toolbar.style.transform = 'translateY(-25px)';
        });
    }

    // Observe the DOM for new message actions toolbars
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                adjustEmojiToolbar();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial adjustment in case elements already exist
    adjustEmojiToolbar();
})();
