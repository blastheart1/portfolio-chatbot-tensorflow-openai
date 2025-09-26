# AI Chatbot - Luis Santos Portfolio

A sophisticated, self-improving AI-powered chatbot that demonstrates advanced technical expertise by combining TensorFlow.js for local intent recognition with OpenAI for intelligent conversational AI. This chatbot serves as an interactive portfolio showcasing Luis' professional background, skills, and projects.

## 🌟 Features

### Core Functionality
- 🤖 **Hybrid AI Architecture**: TensorFlow.js for local intent classification + OpenAI GPT-3.5-turbo for complex queries
- 🧠 **Self-Improving**: Learns from user interactions and improves responses over time
- 🎯 **Portfolio-Focused**: Specialized knowledge about Luis' professional background and projects
- 🔒 **Security-First**: Input validation, rate limiting, and content filtering
- ⚡ **Performance Optimized**: Client-side processing with intelligent caching

### User Experience
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations using Framer Motion
- 📱 **Mobile-First**: Optimized for all device sizes and touch interactions
- 💬 **Conversational**: Natural language processing with context awareness
- 🔄 **Real-time**: Instant responses with typing indicators and smooth transitions
- 🎭 **Personality**: Engages users with Luis' professional persona and interests

### Technical Features
- 🔧 **Highly Customizable**: Easy to adapt for different use cases (ecommerce, enterprise, etc.)
- 📊 **Analytics Ready**: Built-in learning tracking and confidence scoring
- 🛡️ **Production Ready**: Comprehensive error handling and fallback mechanisms
- 🌐 **Environment Agnostic**: Works with or without OpenAI API key

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + TailwindCSS
- **AI/ML**: TensorFlow.js for local intent classification
- **External AI**: OpenAI GPT-3.5-turbo for advanced conversational AI
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Icons**: Lucide React for consistent, modern iconography
- **Build Tools**: Create React App with TypeScript support
- **Styling**: TailwindCSS with custom design system

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- OpenAI API key (optional but recommended)

### 1. Clone and Install

```bash
git clone <repository-url>
cd AI-Chatbot
npm install
```

### 2. Environment Setup

Copy the example environment file and configure:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# OpenAI API Configuration
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

# Optional: Customize confidence threshold (0.0 - 1.0)
REACT_APP_CONFIDENCE_THRESHOLD=0.7
```

**Get your OpenAI API key**: Visit [OpenAI Platform](https://platform.openai.com/api-keys)

### 3. Start Development

```bash
npm start
```

The chatbot will be available at `http://localhost:3000`

## 🏗️ Architecture Overview

### 1. Intent Classification Pipeline
- **Input Processing**: User queries are preprocessed and validated
- **TensorFlow.js Model**: Local neural network trained on FAQ dataset
- **Confidence Scoring**: Responses only served if confidence > threshold
- **Fallback Mechanism**: Low confidence queries trigger OpenAI API

### 2. AI Response Generation
- **Context-Aware**: Maintains conversation context and user history
- **Personality-Driven**: Responses reflect Luis' professional background
- **Learning Integration**: New interactions improve future responses
- **Safety First**: All responses validated for security and appropriateness

### 3. User Experience Flow
- **Instant Recognition**: Fast local intent classification
- **Progressive Enhancement**: OpenAI enhances complex queries
- **Visual Feedback**: Typing indicators, confidence scores, source attribution
- **Mobile Optimization**: Touch-friendly interface with responsive design

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Chatbot.tsx      # Main chatbot orchestrator
│   ├── ChatWindow.tsx   # Chat interface container
│   └── MessageBubble.tsx # Individual message display
├── data/               # Knowledge base
│   ├── faq.json        # FAQ dataset for training
│   ├── intents.json    # Intent definitions
│   └── user_examples.json # Learning examples
├── lib/                # Core services
│   ├── tensorflowModel.ts  # TensorFlow.js integration
│   ├── openaiService.ts    # OpenAI API service
│   └── securityService.ts  # Security and validation
├── types/              # TypeScript definitions
│   └── json.d.ts       # JSON module declarations
├── App.tsx             # Main application component
└── index.tsx          # Application entry point
```

## 🔧 Customization Guide

### Adding New Knowledge

**FAQ Data** (`src/data/faq.json`):
```json
{
  "tag": "new.topic",
  "patterns": [
    "How do I...",
    "What is...",
    "Can you explain..."
  ],
  "responses": [
    "Here's the information you need...",
    "Let me help you with that..."
  ]
}
```

**Intent Definitions** (`src/data/intents.json`):
```json
{
  "tag": "new.intent",
  "patterns": ["pattern1", "pattern2"],
  "responses": ["response1", "response2"]
}
```

### Configuration Options

**Confidence Threshold**:
```typescript
// Higher values = more strict FAQ matching
const tensorflowService = new TensorFlowService(0.8);
```

**OpenAI Settings**:
```typescript
const openaiService = new OpenAIService({
  apiKey: 'your-key',
  model: 'gpt-3.5-turbo',
  maxTokens: 150,
  temperature: 0.7
});
```

### Styling Customization

The chatbot uses a custom TailwindCSS design system:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'chat-bg': '#f8fafc',
        'chat-bubble-user': '#3b82f6',
        'chat-bubble-bot': '#ffffff'
      }
    }
  }
}
```

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment Variables for Production

Set these in your deployment platform:

```env
REACT_APP_OPENAI_API_KEY=your_production_api_key
REACT_APP_CONFIDENCE_THRESHOLD=0.7
```

### Deployment Platforms

- **Vercel**: Automatic deployments with environment variable support
- **Netlify**: Easy deployment with build hooks
- **AWS S3 + CloudFront**: Static hosting with CDN
- **GitHub Pages**: Free hosting for public repositories

## 📊 Performance & Analytics

### Built-in Metrics
- **Model Performance**: Confidence scores and accuracy tracking
- **Learning Progress**: Number of examples learned from users
- **Response Times**: Local vs OpenAI response latency
- **User Engagement**: Conversation patterns and popular queries

### Optimization Features
- **Model Caching**: TensorFlow.js model stored in localStorage
- **Smart Retraining**: Automatic model updates when FAQ data changes
- **Progressive Loading**: Model loads asynchronously without blocking UI
- **Memory Management**: Efficient cleanup and garbage collection

## 🔒 Security Features

### Input Validation
- **XSS Protection**: Script injection prevention
- **Length Limits**: Input and response size restrictions
- **Content Filtering**: Inappropriate content detection
- **Rate Limiting**: Request throttling to prevent abuse

### API Security
- **Environment Variables**: API keys never exposed in client code
- **Secure Headers**: Proper CORS and security headers
- **Error Handling**: No sensitive information in error messages
- **Input Sanitization**: All user inputs cleaned before processing

## 🎯 Use Cases & Adaptations

### Current Implementation
- **Portfolio Showcase**: Interactive demonstration of Luis' skills
- **Professional Q&A**: Detailed information about background and projects
- **Skill Demonstration**: Technical expertise in AI/ML integration

### Potential Adaptations

**E-commerce Chatbot**:
- Product recommendations and comparisons
- Order tracking and customer support
- Inventory queries and availability

**Enterprise Knowledge Base**:
- Employee onboarding and training
- Internal process documentation
- HR and IT support automation

**Educational Platform**:
- Course information and enrollment
- Student support and tutoring
- Academic resource recommendations

**Healthcare Assistant**:
- Appointment scheduling and reminders
- Basic health information (with disclaimers)
- Insurance and billing inquiries

## 🔮 Future Improvements & Roadmap

### Phase 1: Enhanced AI Capabilities
- [ ] **Multi-Modal Support**: Image and document processing
- [ ] **Voice Integration**: Speech-to-text and text-to-speech
- [ ] **Advanced Context**: Long-term memory and user profiles
- [ ] **Multi-Language**: Internationalization and localization

### Phase 2: Advanced Features
- [ ] **Analytics Dashboard**: User interaction insights and metrics
- [ ] **A/B Testing**: Response optimization and effectiveness testing
- [ ] **Integration APIs**: Connect with external services (CRM, databases)
- [ ] **Custom Training**: User-specific model fine-tuning

### Phase 3: Enterprise Features
- [ ] **Admin Panel**: Content management and monitoring
- [ ] **Team Collaboration**: Multi-user training and management
- [ ] **Advanced Security**: Enterprise-grade authentication and authorization
- [ ] **Scalability**: Microservices architecture and load balancing

### Phase 4: AI Evolution
- [ ] **GPT-4 Integration**: Latest OpenAI models for better responses
- [ ] **Custom Models**: Fine-tuned models for specific domains
- [ ] **Federated Learning**: Privacy-preserving collaborative learning
- [ ] **Edge Computing**: Local model deployment for offline capabilities

## 🐛 Troubleshooting

### Common Issues

**Model Not Loading**:
```bash
# Clear browser cache and localStorage
localStorage.clear();
# Check console for TensorFlow.js errors
# Verify network connectivity
```

**OpenAI API Errors**:
```bash
# Verify API key validity
# Check API quota and billing
# Test with curl:
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
     https://api.openai.com/v1/models
```

**Build Failures**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
# Check Node.js version compatibility
node --version  # Should be 16+
```

### Debug Mode

Enable detailed logging:

```typescript
// In src/components/Chatbot.tsx
const DEBUG = process.env.NODE_ENV === 'development';
if (DEBUG) {
  console.log('🔍 Debug info:', { modelReady, apiKey: apiKey.substring(0, 10) });
}
```

## 📚 Documentation & Resources

### Technical Documentation
- [TensorFlow.js Guide](https://www.tensorflow.org/js/guide)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [React TypeScript Best Practices](https://react-typescript-cheatsheet.netlify.app/)

### Learning Resources
- [Machine Learning Fundamentals](https://www.coursera.org/learn/machine-learning)
- [Natural Language Processing](https://web.stanford.edu/class/cs224n/)
- [React Advanced Patterns](https://kentcdodds.com/blog/advanced-react-patterns)

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm start

# Run tests
npm test

# Build for production
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Developer

**Luis Santos** - Senior IBM ODM Specialist & QA Team Manager

- **Current Role**: Bell Canada Inc. (Digital Billboards)
- **Expertise**: Full-Stack Development, AI/ML, BRMS, QA Management
- **Location**: Manila, Philippines
- **Contact**: antonioluis.santos1@gmail.com
- **Portfolio**: https://my-portfolio-jusu.vercel.app/

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- TensorFlow.js team for client-side ML capabilities
- React and TypeScript communities for excellent tooling
- Framer Motion for smooth animations
- TailwindCSS for utility-first styling

---

**Built with ❤️ by Luis Santos** | **Powered by AI** 🤖
