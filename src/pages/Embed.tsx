import React from 'react';
import { EmbeddableChatbot } from '../components/EmbeddableChatbot';

const Embed: React.FC = () => {
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
