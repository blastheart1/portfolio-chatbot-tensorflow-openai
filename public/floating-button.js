(function() {
  'use strict';

  // Configuration
  const defaultConfig = {
    apiKey: '',
    confidenceThreshold: 0.75,
    position: 'bottom-right',
    theme: 'light',
    iconUrl: 'https://luis-chatbot.vercel.app/LuisBot.png'
  };

  // Load external dependencies
  function loadDependencies() {
    return new Promise((resolve) => {
      // Load React
      const reactScript = document.createElement('script');
      reactScript.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
      reactScript.onload = () => {
        // Load React DOM
        const reactDOMScript = document.createElement('script');
        reactDOMScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
        reactDOMScript.onload = () => {
          // Load Framer Motion
          const motionScript = document.createElement('script');
          motionScript.src = 'https://unpkg.com/framer-motion@10/dist/framer-motion.js';
          motionScript.onload = resolve;
          document.head.appendChild(motionScript);
        };
        document.head.appendChild(reactDOMScript);
      };
      document.head.appendChild(reactScript);
    });
  }

  // Create the floating button directly
  function createFloatingButton(config = {}) {
    const finalConfig = { ...defaultConfig, ...config };
    
    // Create the button element directly
    const button = document.createElement('img');
    button.src = finalConfig.iconUrl;
    button.alt = 'Luis AI Chatbot';
    button.style.cssText = `
      position: fixed;
      ${finalConfig.position === 'bottom-left' ? 'left: 24px;' : 'right: 24px;'}
      bottom: 24px;
      width: 64px;
      height: 64px;
      cursor: pointer;
      z-index: 9999;
      object-fit: cover;
      transition: transform 0.2s ease;
      border: none;
      background: transparent;
    `;

    // Add hover effects
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });

    // Add click handler to open chat
    button.addEventListener('click', function() {
      openChatWindow(finalConfig);
    });

    // Add keyboard accessibility
    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');
    button.setAttribute('aria-label', 'Open AI Chatbot');

    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openChatWindow(finalConfig);
      }
    });

    // Add to page
    document.body.appendChild(button);

    // Add entrance animation
    button.style.opacity = '0';
    button.style.transform = 'scale(0)';
    setTimeout(() => {
      button.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      button.style.opacity = '1';
      button.style.transform = 'scale(1)';
    }, 100);

    console.log('🤖 Luis Chatbot floating button loaded successfully!');
    return button;
  }

  // Open chat window (simplified version)
  function openChatWindow(config) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.style.cssText = `
      width: 400px;
      height: 600px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    `;

    // Create header
    const header = document.createElement('div');
    header.style.cssText = `
      padding: 16px;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;

    const title = document.createElement('h3');
    title.textContent = 'Luis AI Chatbot';
    title.style.cssText = 'margin: 0; font-size: 18px; font-weight: 600;';

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    closeBtn.addEventListener('click', () => {
      document.body.removeChild(overlay);
    });

    header.appendChild(title);
    header.appendChild(closeBtn);

    // Create chat area
    const chatArea = document.createElement('div');
    chatArea.style.cssText = `
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background: #f9fafb;
    `;

    const welcomeMessage = document.createElement('div');
    welcomeMessage.style.cssText = `
      padding: 12px 16px;
      background: #3b82f6;
      color: white;
      border-radius: 12px;
      margin-bottom: 16px;
      max-width: 80%;
    `;
    welcomeMessage.textContent = 'Hello! I\'m Luis AI Chatbot. How can I help you today?';
    chatArea.appendChild(welcomeMessage);

    // Create input area
    const inputArea = document.createElement('div');
    inputArea.style.cssText = `
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your message...';
    input.style.cssText = `
      flex: 1;
      padding: 12px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      outline: none;
    `;

    const sendBtn = document.createElement('button');
    sendBtn.textContent = 'Send';
    sendBtn.style.cssText = `
      padding: 12px 16px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    `;

    sendBtn.addEventListener('click', () => {
      const message = input.value.trim();
      if (message) {
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.style.cssText = `
          padding: 12px 16px;
          background: #e5e7eb;
          border-radius: 12px;
          margin-bottom: 16px;
          margin-left: 20%;
          max-width: 80%;
        `;
        userMessage.textContent = message;
        chatArea.appendChild(userMessage);

        // Clear input
        input.value = '';

        // Add bot response (simplified)
        const botMessage = document.createElement('div');
        botMessage.style.cssText = `
          padding: 12px 16px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          margin-bottom: 16px;
          max-width: 80%;
        `;
        botMessage.textContent = 'Thanks for your message! This is a simplified version. For full AI functionality, please use the main chatbot.';
        chatArea.appendChild(botMessage);

        // Scroll to bottom
        chatArea.scrollTop = chatArea.scrollHeight;
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendBtn.click();
      }
    });

    inputArea.appendChild(input);
    inputArea.appendChild(sendBtn);

    // Assemble chat window
    chatWindow.appendChild(header);
    chatWindow.appendChild(chatArea);
    chatWindow.appendChild(inputArea);
    overlay.appendChild(chatWindow);

    // Add to page
    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
      }
    });

    // Focus input
    setTimeout(() => input.focus(), 100);
  }

  // Load the floating button
  function loadFloatingButton(config = {}) {
    // Check if already loaded
    if (document.getElementById('luis-chatbot-floating-button')) {
      console.log('Luis Chatbot already loaded');
      return;
    }

    // Create the button directly (no dependencies needed for basic version)
    const button = createFloatingButton(config);
    button.id = 'luis-chatbot-floating-button';
  }

  // Auto-load if script has data attributes
  if (document.currentScript) {
    const script = document.currentScript;
    const apiKey = script.getAttribute('data-api-key') || '';
    const position = script.getAttribute('data-position') || 'bottom-right';
    const theme = script.getAttribute('data-theme') || 'light';
    
    loadFloatingButton({
      apiKey: apiKey,
      position: position,
      theme: theme
    });
  }

  // Expose global function for manual loading
  window.LuisFloatingButton = {
    load: loadFloatingButton
  };

})();
