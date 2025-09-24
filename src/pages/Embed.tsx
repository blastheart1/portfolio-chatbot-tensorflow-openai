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
      width: '100vw', 
      height: '100vh', 
      background: 'transparent',
      overflow: 'hidden'
    }}>
      <EmbeddableChatbot
        openaiApiKey={apiKey}
        confidenceThreshold={threshold}
        position={position}
        theme={theme}
      />
    </div>
  );
};

export default Embed;
