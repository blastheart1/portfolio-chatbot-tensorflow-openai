(function() {
  'use strict';

  // Configuration
  const defaultConfig = {
    apiKey: '',
    confidenceThreshold: 0.75,
    position: 'bottom-right',
    theme: 'light',
    iconUrl: 'https://luis-chatbot.vercel.app/LuisBot.ico'
  };

  // Load the chatbot widget
  function loadChatbotWidget(config = {}) {
    const finalConfig = { ...defaultConfig, ...config };
    
    // Create container div
    const container = document.createElement('div');
    container.id = 'luis-chatbot-container';
    container.style.cssText = `
      position: fixed;
      ${finalConfig.position === 'bottom-left' ? 'left: 24px;' : 'right: 24px;'}
      bottom: 24px;
      z-index: 9999;
      width: 64px;
      height: 64px;
    `;

    // Create iframe for the chatbot
    const iframe = document.createElement('iframe');
    iframe.src = `https://luis-chatbot.vercel.app/embed?apiKey=${encodeURIComponent(finalConfig.apiKey)}&threshold=${finalConfig.confidenceThreshold}&position=${finalConfig.position}&theme=${finalConfig.theme}`;
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      transition: transform 0.2s ease;
    `;
    iframe.title = 'Luis AI Chatbot';

    // Add hover effects
    iframe.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });

    iframe.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });

    container.appendChild(iframe);
    document.body.appendChild(container);

    // Add CSS for subtle animations
    const style = document.createElement('style');
    style.textContent = `
      #luis-chatbot-container {
        transition: transform 0.2s ease;
      }
      
      #luis-chatbot-container:hover {
        transform: scale(1.05);
      }
    `;
    document.head.appendChild(style);

    console.log('🤖 Luis Chatbot widget loaded successfully!');
  }

  // Auto-load if script has data attributes
  if (document.currentScript) {
    const script = document.currentScript;
    const apiKey = script.getAttribute('data-api-key') || '';
    const position = script.getAttribute('data-position') || 'bottom-right';
    const theme = script.getAttribute('data-theme') || 'light';
    
    loadChatbotWidget({
      apiKey: apiKey,
      position: position,
      theme: theme
    });
  }

  // Expose global function for manual loading
  window.LuisChatbot = {
    load: loadChatbotWidget
  };

})();
