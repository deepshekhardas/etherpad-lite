// @ts-nocheck
// @license magnet:?xt=urn:btih:8e4f440f4c65981c5bf93c76d35135ba5064d8b7&dn=apache-2.0.txt Apache-2.0

/* Copyright 2021 Richard Hansen <rhansen@rhansen.org> */

'use strict';

// Set up an error handler to display errors that happen during page load. This handler will be
// overridden with a nicer handler by setupGlobalExceptionHandler() in pad_utils.js.

(() => {
  const originalHandler = window.onerror;
  window.onerror = (...args) => {
    const [msg, url, line, col, err] = args;

    // Purge the existing HTML and styles for a consistent view.
    document.body.textContent = '';
    for (const el of document.querySelectorAll('head style, head link[rel="stylesheet"]')) {
      el.remove();
    }

    const box = document.body;
    box.textContent = '';
    const summary = document.createElement('p');
    box.appendChild(summary);
    summary.appendChild(document.createTextNode('An error occurred while loading the page:'));
    const msgBlock = document.createElement('blockquote');
    box.appendChild(msgBlock);
    msgBlock.style.fontWeight = 'bold';
    msgBlock.appendChild(document.createTextNode(msg));
    const loc = document.createElement('p');
    box.appendChild(loc);
    loc.appendChild(document.createTextNode(`in ${url}`));
    loc.appendChild(document.createElement('br'));
    loc.appendChild(document.createTextNode(`at line ${line}:${col}`));
    // NOTE: We do not display the stack trace to the user for security reasons (leakage).
    // The full error object is still available in the browser's developer console.
    console.error('Etherpad Load Error:', err);

    if (typeof originalHandler === 'function') originalHandler(...args);
  };
})();

// @license-end
