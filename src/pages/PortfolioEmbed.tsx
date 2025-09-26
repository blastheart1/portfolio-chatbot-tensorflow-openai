import React, { useEffect } from 'react';
import { PortfolioChatbot } from '../components/PortfolioChatbot';

const PortfolioEmbed: React.FC = () => {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const apiKey = urlParams.get('apiKey') || '';
  const threshold = parseFloat(urlParams.get('threshold') || '0.75');
  const position = (urlParams.get('position') || 'bottom-right') as 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  const theme = (urlParams.get('theme') || 'auto') as 'light' | 'dark' | 'auto';
  const size = (urlParams.get('size') || 'medium') as 'small' | 'medium' | 'large';
  const autoOpen = urlParams.get('autoOpen') === 'true';

  // Ensure proper viewport and styling
  useEffect(() => {
    // Set viewport meta tag
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    // Add base styles
    const baseStyles = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        background: transparent;
        overflow: hidden;
      }
      
      #root {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = baseStyles;
    document.head.appendChild(style);
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw', 
      height: '100vh', 
      background: 'transparent',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 9999
    }}>
      <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
        <PortfolioChatbot
          openaiApiKey={apiKey}
          confidenceThreshold={threshold}
          position={position}
          theme={theme}
          size={size}
          showButton={false}
          autoOpen={autoOpen}
        />
      </div>
    </div>
  );
};

export default PortfolioEmbed;
