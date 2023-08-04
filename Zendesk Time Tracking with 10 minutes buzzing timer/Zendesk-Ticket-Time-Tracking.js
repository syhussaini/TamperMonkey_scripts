// ==UserScript==
// @name         Zendesk Ticket Time Tracking - With 10 minutes timer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Track the time spent working on Zendesk tickets (10 Minutes timer sounds).
// @author       Syed Hussaini and ChatGPT
// @match        https://a8c.zendesk.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  // Function to add Font Awesome CSS
  const addFontAwesome = () => {
    const fontAwesomeCss = document.createElement('link');
    fontAwesomeCss.rel = 'stylesheet';
    fontAwesomeCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(fontAwesomeCss);
  };

  // Function to update and save the time spent on the ticket
  const updateTime = () => {
    const ticketId = getTicketId();
    const floatingBox = document.querySelector('#zendesk_timer_box');

    if (ticketId) {
      let startTime = parseInt(localStorage.getItem(`zendesk_ticket_${ticketId}`)) || getCurrentTimestamp();
      let currentTime = getCurrentTimestamp();

      let totalTime = Math.floor((currentTime - startTime) + getSavedTotalTime(ticketId));
      displayTime(floatingBox, totalTime);

      localStorage.setItem(`zendesk_ticket_${ticketId}`, currentTime);
      localStorage.setItem(`zendesk_ticket_total_${ticketId}`, totalTime);

      // Check if it's been 10 minutes to play the buzzing sound
      if (totalTime % 600 === 0 && totalTime > 0) {
        playBuzzSound();
      }
    } else if (floatingBox) {
      // If there is no active ticket but the floating box exists, hide it
      floatingBox.style.display = 'none';
    }
  };

  // Function to get the current timestamp
  const getCurrentTimestamp = () => {
    return Math.floor(new Date().getTime() / 1000);
  };

  // Function to get the saved total time for a ticket
  const getSavedTotalTime = (ticketId) => {
    return parseInt(localStorage.getItem(`zendesk_ticket_total_${ticketId}`)) || 0;
  };

  // Function to display the time spent on the ticket
  const displayTime = (floatingBox, totalTime) => {
    if (!floatingBox) {
      const box = document.createElement('div');
      box.id = 'zendesk_timer_box';
      box.style.position = 'fixed';
      box.style.zIndex = '9999';
      box.style.top = '58px'; // Pushed below by 30px
      box.style.right = '100px'; // Pushed towards the right by 100px
      box.style.backgroundColor = 'rgba(0, 128, 0, 0.8)';
      box.style.color = 'white';
      box.style.padding = '8px';
      box.style.borderRadius = '5px';
      box.style.cursor = 'move';
      box.draggable = true;
      box.ondragstart = (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
      };
      document.body.appendChild(box);
    }

    let hours = Math.floor(totalTime / 3600);
    let minutes = Math.floor((totalTime % 3600) / 60);
    let seconds = totalTime % 60;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Update the content of the floating box
    floatingBox.textContent = `Time Spent: ${formattedTime}`;
    floatingBox.style.display = 'block';
  };

  // Function to get the ticket ID from the URL
  const getTicketId = () => {
    const match = window.location.href.match(/tickets\/(\d+)/);
    return match ? match[1] : null;
  };

  // Function to reset the timer when the tab is closed
  const resetTimerOnTabClose = () => {
    window.addEventListener('beforeunload', () => {
      const ticketId = getTicketId();
      if (ticketId) {
        localStorage.removeItem(`zendesk_ticket_${ticketId}`);
        localStorage.removeItem(`zendesk_ticket_total_${ticketId}`);
      }
    });
  };

  // Function to play the buzzing sound
  const playBuzzSound = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();

    // Stop the oscillator after 500ms to create a buzzing effect
    setTimeout(() => {
      oscillator.stop();
    }, 500);
  };

  // Call updateTime every second to keep tracking time
  setInterval(updateTime, 1000);

  // Reset the timer when the tab is closed
  resetTimerOnTabClose();

  // Add Font Awesome CSS
  addFontAwesome();
})();
