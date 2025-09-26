(function() {
  'use strict';

  // Configuration with better defaults
  const defaultConfig = {
    apiKey: '',
    confidenceThreshold: 0.75,
    position: 'bottom-right',
    theme: 'auto',
    size: 'medium',
    showButton: true,
    autoOpen: false,
    customStyles: {
      buttonColor: '#3b82f6',
      buttonSize: '64px',
      chatWidth: '400px',
      chatHeight: '600px',
      borderRadius: '12px',
      fontFamily: 'inherit'
    }
  };

  // CSS isolation to prevent conflicts
  const isolatedCSS = `
    .portfolio-chatbot * {
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    }
    
    .portfolio-chatbot {
      all: initial;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    }
    
    .portfolio-chatbot button {
      all: unset;
      cursor: pointer;
    }
    
    .portfolio-chatbot input {
      all: unset;
      font-family: inherit;
    }
    
    .portfolio-chatbot * {
      box-sizing: border-box;
    }
  `;

  // Inject isolated CSS
  function injectCSS() {
    if (document.getElementById('portfolio-chatbot-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'portfolio-chatbot-styles';
    style.textContent = isolatedCSS;
    document.head.appendChild(style);
  }

  // Load the chatbot widget
  function loadPortfolioChatbot(config = {}) {
    const finalConfig = { ...defaultConfig, ...config };
    
    // Inject CSS first
    injectCSS();
    
    // Remove existing chatbot if any
    const existing = document.getElementById('portfolio-chatbot-container');
    if (existing) {
      existing.remove();
    }
    
    // Create container with isolated styles
    const container = document.createElement('div');
    container.id = 'portfolio-chatbot-container';
    container.className = 'portfolio-chatbot';
    container.style.cssText = `
      position: fixed;
      ${finalConfig.position === 'bottom-left' ? 'left: 16px;' : 
        finalConfig.position === 'top-right' ? 'top: 16px; right: 16px;' :
        finalConfig.position === 'top-left' ? 'top: 16px; left: 16px;' :
        'right: 16px;'}
      ${finalConfig.position.includes('bottom') ? 'bottom: 16px;' : ''}
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    `;

    // Create iframe for the chatbot
    const iframe = document.createElement('iframe');
    iframe.src = `https://luis-chatbot.vercel.app/portfolio-embed?apiKey=${encodeURIComponent(finalConfig.apiKey)}&threshold=${finalConfig.confidenceThreshold}&position=${finalConfig.position}&theme=${finalConfig.theme}&size=${finalConfig.size}&autoOpen=${finalConfig.autoOpen}`;
    iframe.style.cssText = `
      width: ${finalConfig.customStyles.chatWidth};
      height: ${finalConfig.customStyles.chatHeight};
      border: none;
      border-radius: ${finalConfig.customStyles.borderRadius};
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      background: white;
      display: ${finalConfig.showButton ? 'none' : 'block'};
    `;

    // Create floating button if needed
    let button = null;
    if (finalConfig.showButton) {
      button = document.createElement('button');
      button.innerHTML = '💬';
      button.style.cssText = `
        width: ${finalConfig.customStyles.buttonSize};
        height: ${finalConfig.customStyles.buttonSize};
        background: ${finalConfig.customStyles.buttonColor};
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: ${finalConfig.customStyles.fontFamily};
      `;

      // Add hover effects
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
      });

      button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      });

      // Toggle chat on click
      button.addEventListener('click', function() {
        if (iframe.style.display === 'none') {
          iframe.style.display = 'block';
          this.style.display = 'none';
        } else {
          iframe.style.display = 'none';
          this.style.display = 'flex';
        }
      });

      container.appendChild(button);
    }

    container.appendChild(iframe);
    document.body.appendChild(container);

    // Auto-open if configured
    if (finalConfig.autoOpen) {
      iframe.style.display = 'block';
      if (button) button.style.display = 'none';
    }

    // Close chat when clicking outside
    iframe.addEventListener('load', function() {
      const iframeDoc = this.contentDocument || this.contentWindow.document;
      if (iframeDoc) {
        iframeDoc.addEventListener('click', function(e) {
          if (e.target.classList.contains('close-chat')) {
            iframe.style.display = 'none';
            if (button) button.style.display = 'flex';
          }
        });
      }
    });

    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape' && iframe.style.display === 'block') {
        iframe.style.display = 'none';
        if (button) button.style.display = 'flex';
      }
    };
    document.addEventListener('keydown', handleEscape);

    // Add entrance animation
    container.style.opacity = '0';
    container.style.transform = 'scale(0.8)';
    setTimeout(() => {
      container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      container.style.opacity = '1';
      container.style.transform = 'scale(1)';
    }, 100);

    console.log('🤖 Portfolio Chatbot loaded successfully!');
  }

  // Auto-load if script has data attributes
  if (document.currentScript) {
    const script = document.currentScript;
    const config = {
      apiKey: script.getAttribute('data-api-key') || '',
      position: script.getAttribute('data-position') || 'bottom-right',
      theme: script.getAttribute('data-theme') || 'auto',
      size: script.getAttribute('data-size') || 'medium',
      showButton: script.getAttribute('data-show-button') !== 'false',
      autoOpen: script.getAttribute('data-auto-open') === 'true',
      customStyles: {
        buttonColor: script.getAttribute('data-button-color') || '#3b82f6',
        buttonSize: script.getAttribute('data-button-size') || '64px',
        chatWidth: script.getAttribute('data-chat-width') || '400px',
        chatHeight: script.getAttribute('data-chat-height') || '600px',
        borderRadius: script.getAttribute('data-border-radius') || '12px',
        fontFamily: script.getAttribute('data-font-family') || 'inherit'
      }
    };
    
    loadPortfolioChatbot(config);
  }

  // Expose global function for manual loading
  window.PortfolioChatbot = {
    load: loadPortfolioChatbot,
    remove: function() {
      const existing = document.getElementById('portfolio-chatbot-container');
      if (existing) existing.remove();
    }
  };

})();
