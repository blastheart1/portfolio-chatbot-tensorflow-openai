# Luis AI Chatbot - NPM Package

A powerful, self-improving AI chatbot component built with React, TypeScript, TensorFlow.js, and OpenAI integration. Perfect for portfolio websites, customer support, and lead generation.

## Features

- 🤖 **TensorFlow.js Integration**: Local AI model for fast, offline responses
- 🧠 **OpenAI Fallback**: Advanced language model for complex queries
- 📈 **Self-Learning**: Automatically improves from conversations
- 🎯 **Lead Detection**: Smart lead generation and email notifications
- 🛡️ **Content Safety**: Built-in profanity and inappropriate content filtering
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ⚡ **Performance Optimized**: Real-time confidence scoring and performance monitoring
- 🎨 **Customizable**: Themes, positions, and custom icons

## Installation

```bash
npm install luis-ai-chatbot
# or
yarn add luis-ai-chatbot
```

## Quick Start

### Basic Usage

```tsx
import React from 'react';
import { EmbeddableChatbot } from 'luis-ai-chatbot';

function App() {
  return (
    <div>
      <h1>My Website</h1>
      <EmbeddableChatbot 
        openaiApiKey="your-openai-api-key"
        confidenceThreshold={0.75}
        position="bottom-right"
        theme="light"
      />
    </div>
  );
}
```

### Advanced Usage with Status Monitoring

```tsx
import React, { useState } from 'react';
import { EmbeddableChatbot, ChatbotStatus } from 'luis-ai-chatbot';

function App() {
  const [chatbotStatus, setChatbotStatus] = useState<ChatbotStatus>({
    isModelReady: false,
    isLoading: true,
    learningCount: 0,
    isConfigured: false
  });

  return (
    <div>
      <h1>My Website</h1>
      
      {/* Status indicator */}
      {chatbotStatus.isLoading && (
        <div>Training AI model...</div>
      )}
      
      {chatbotStatus.isModelReady && (
        <div>AI Ready! ({chatbotStatus.learningCount} learned)</div>
      )}
      
      <EmbeddableChatbot 
        openaiApiKey="your-openai-api-key"
        confidenceThreshold={0.75}
        position="bottom-right"
        theme="light"
        onStatusChange={setChatbotStatus}
      />
    </div>
  );
}
```

## API Reference

### EmbeddableChatbot Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `openaiApiKey` | `string` | `''` | Your OpenAI API key |
| `confidenceThreshold` | `number` | `0.75` | AI confidence threshold (0-1) |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Chat button position |
| `theme` | `'light' \| 'dark'` | `'light'` | Chat theme |
| `customIcon` | `string` | `undefined` | Custom chat button icon URL |
| `onStatusChange` | `(status: ChatbotStatus) => void` | `undefined` | Status change callback |

### ChatbotStatus Interface

```typescript
interface ChatbotStatus {
  isModelReady: boolean;    // Whether the AI model is ready
  isLoading: boolean;       // Whether the model is still loading
  learningCount: number;    // Number of examples learned
  isConfigured: boolean;    // Whether OpenAI is configured
}
```

## Components

### EmbeddableChatbot
The main chatbot component with floating button and chat window.

### Chatbot
Basic chatbot component without floating button (for custom implementations).

### Individual Components
- `ChatWindow` - The chat interface
- `LeadForm` - Lead generation form
- `MessageBubble` - Individual message component
- `PerformanceMonitor` - Performance statistics
- `QuickSuggestions` - Suggested questions

## Services

### TensorFlowService
Local AI model for intent recognition and response generation.

### OpenAIService
OpenAI API integration for advanced language processing.

### LeadDetectionService
Smart lead detection and qualification.

### SecurityService
Content filtering and safety checks.

## Data Files

The chatbot comes with pre-trained data:

- `faq.json` - Frequently asked questions
- `intents.json` - Intent recognition patterns
- `user_examples.json` - Training examples

## Customization

### Custom Icon
```tsx
<EmbeddableChatbot 
  customIcon="https://your-domain.com/custom-icon.png"
  // ... other props
/>
```

### Custom Position
```tsx
<EmbeddableChatbot 
  position="bottom-left"
  // ... other props
/>
```

### Custom Theme
```tsx
<EmbeddableChatbot 
  theme="dark"
  // ... other props
/>
```

## Environment Variables

Create a `.env` file in your project root:

```env
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```

## Lead Generation Setup

The chatbot includes automatic lead detection. To enable email notifications:

1. Set up your OpenAI API key
2. Configure your email service (Resend, SendGrid, etc.)
3. The chatbot will automatically detect potential leads and send notifications

## Performance Monitoring

The chatbot includes built-in performance monitoring:

```tsx
import { PerformanceMonitor } from 'luis-ai-chatbot';

// Performance stats are automatically collected
// Use PerformanceMonitor component to display them
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## TypeScript Support

Full TypeScript support with comprehensive type definitions.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

## Support

For support, email support@your-domain.com or create an issue on GitHub.

## Changelog

### v1.0.0
- Initial release
- TensorFlow.js integration
- OpenAI fallback
- Lead detection
- Performance monitoring
- Mobile responsive design
