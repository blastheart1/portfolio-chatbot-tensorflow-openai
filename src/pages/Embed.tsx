import React, { useEffect } from 'react';
import { EmbeddableChatbot } from '../components/EmbeddableChatbot';

const Embed: React.FC = () => {
  // Ensure proper viewport for mobile
  useEffect(() => {
    // Set viewport meta tag for mobile optimization
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    
    // Prevent body scroll when chat is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const apiKey = urlParams.get('apiKey') || '';
  const threshold = parseFloat(urlParams.get('threshold') || '0.75');
  const position = (urlParams.get('position') || 'bottom-right') as 'bottom-right' | 'bottom-left';
  const theme = (urlParams.get('theme') || 'light') as 'light' | 'dark';

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw', 
      height: '100vh', 
      background: 'transparent',
      overflow: 'hidden',
      pointerEvents: 'none', // Allow clicks to pass through
      zIndex: 9999
    }}>
      <div style={{ pointerEvents: 'auto' }}>
        <EmbeddableChatbot
          openaiApiKey={apiKey}
          confidenceThreshold={threshold}
          position={position}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default Embed;
