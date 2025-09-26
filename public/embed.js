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

  // Load the chatbot widget as a direct floating button
  function loadChatbotWidget(config = {}) {
    const finalConfig = { ...defaultConfig, ...config };
    
    // Create the floating button directly (no container)
    const button = document.createElement('img');
    button.id = 'luis-chatbot-floating-button';
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

    // Add click handler to open chat in iframe
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

    // Add to page directly
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
  }

  // Open chat window in iframe overlay
  function openChatWindow(config) {
    // Remove existing chat if open
    const existingChat = document.getElementById('luis-chatbot-window');
    if (existingChat) {
      document.body.removeChild(existingChat);
      return;
    }

    // Detect mobile
    const isMobile = window.innerWidth <= 768;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'luis-chatbot-window';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: ${isMobile ? 'transparent' : 'rgba(0, 0, 0, 0.5)'};
      z-index: 10000;
      display: flex;
      align-items: ${isMobile ? 'stretch' : 'center'};
      justify-content: ${isMobile ? 'stretch' : 'center'};
    `;
    
    // Create chat iframe
    const chatIframe = document.createElement('iframe');
    chatIframe.src = `https://luis-chatbot.vercel.app/embed?apiKey=${encodeURIComponent(config.apiKey)}&threshold=${config.confidenceThreshold}&position=${config.position}&theme=${config.theme}`;
    chatIframe.style.cssText = `
      ${isMobile 
        ? 'width: 100vw; height: 100vh; border-radius: 0;' 
        : 'width: 400px; height: 600px; border-radius: 12px;'
      }
      border: none;
      box-shadow: ${isMobile ? 'none' : '0 20px 40px rgba(0, 0, 0, 0.3)'};
      background: white;
      position: relative;
    `;

    // Listen for close messages from the iframe
    const handleIframeMessage = (event) => {
      console.log('📨 Received message from iframe:', event.data);
      if (event.data === 'close-chat') {
        console.log('🚪 Closing chat widget...');
        if (overlay && overlay.parentNode) {
          try {
            document.body.removeChild(overlay);
            console.log('✅ Widget closed successfully');
          } catch (error) {
            console.error('❌ Error closing widget:', error);
            // Force remove if normal removal fails
            overlay.style.display = 'none';
            overlay.remove();
          }
        }
        window.removeEventListener('message', handleIframeMessage);
      }
    };
    
    window.addEventListener('message', handleIframeMessage);
    overlay.appendChild(chatIframe);
    document.body.appendChild(overlay);

    // Close on overlay click (improved for mobile)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        if (overlay && overlay.parentNode) {
          document.body.removeChild(overlay);
        }
      }
    });
    
    // Add touch events for mobile overlay close
    if (isMobile) {
      overlay.addEventListener('touchstart', (e) => {
        if (e.target === overlay) {
          e.preventDefault();
        }
      });
      
      overlay.addEventListener('touchend', (e) => {
        if (e.target === overlay) {
          e.preventDefault();
          if (overlay && overlay.parentNode) {
            document.body.removeChild(overlay);
          }
        }
      });
    }

    // Close on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (overlay && overlay.parentNode) {
          document.body.removeChild(overlay);
        }
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
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
