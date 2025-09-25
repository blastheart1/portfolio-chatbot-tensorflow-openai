import React, { useState } from 'react';
import { Brain, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Chatbot } from './components/Chatbot';
import Embed from './pages/Embed';
import './App.css';

interface ChatbotStatus {
  isModelReady: boolean;
  isLoading: boolean;
  error: string | null;
  learningCount: number;
  isConfigured: boolean;
}

const techStacks = [
  'React',
  'TypeScript',
  'TensorFlow.js',
  'OpenAI API',
  'Tailwind CSS',
  'Framer Motion'
];

function App() {
  const [chatbotStatus, setChatbotStatus] = useState<ChatbotStatus>({
    isModelReady: false,
    isLoading: true,
    error: null,
    learningCount: 0,
    isConfigured: false
  });

  // Check if this is the embed route
  if (window.location.pathname === '/embed') {
    return <Embed />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Demo content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Portfolio Chatbot Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A showcase of TensorFlow.js intent recognition and OpenAI integration
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              About This Demo
            </h2>
            <p className="text-gray-600 mb-6">
              This chatbot showcases Luis's AI expertise with a hybrid architecture combining TensorFlow.js 
              for local intent classification and OpenAI for complex queries. The system uses relevance scoring, 
              content filtering, and lead generation to demonstrate advanced AI implementation skills while 
              maintaining professional boundaries and user experience.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  🤖 TensorFlow.js (Primary Intelligence)
                </h3>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Multi-layer Neural Network:</strong> 256→128→64→numIntents architecture</li>
                  <li>• <strong>Bag-of-Words Tokenization:</strong> Custom vocabulary with 1000+ terms</li>
                  <li>• <strong>Relevance Scoring:</strong> Keyword-based content filtering (threshold: 0.4)</li>
                  <li>• <strong>Confidence Thresholding:</strong> Dynamic confidence scoring (threshold: 0.6)</li>
                  <li>• <strong>Model Persistence:</strong> IndexedDB storage with automatic retraining</li>
                  <li>• <strong>Content Filtering:</strong> Profanity detection (English + Filipino)</li>
                  <li>• <strong>Lead Generation:</strong> AI-powered opportunity detection</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  🧠 OpenAI Integration (Last Resort Only)
                </h3>
                <ul className="text-purple-700 space-y-2">
                  <li>• <strong>GPT-3.5-turbo:</strong> 150 token limit with Luis context</li>
                  <li>• <strong>Prompt Engineering:</strong> Structured context with examples</li>
                  <li>• <strong>Markdown Formatting:</strong> Bold, bullets, hyperlinks in responses</li>
                  <li>• <strong>Content Filtering:</strong> Pre-API inappropriate content detection</li>
                  <li>• <strong>Fallback Logic:</strong> Only for relevant Luis questions</li>
                  <li>• <strong>Cost Optimization:</strong> Zero tokens for filtered content</li>
                  <li>• <strong>Error Handling:</strong> Graceful degradation to FAQ responses</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🔧 Technical Architecture & Features
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">AI/ML Pipeline</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Intent Classification (TensorFlow.js)</li>
                    <li>• Semantic Relevance Scoring</li>
                    <li>• Dynamic Confidence Thresholding</li>
                    <li>• Automated Model Retraining</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Lead Generation</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• AI-Powered Opportunity Detection</li>
                    <li>• Natural Conversation Flow</li>
                    <li>• Resend API Integration</li>
                    <li>• Priority Scoring System</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">User Experience</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Clickable Quick Suggestions</li>
                    <li>• Content Filtering & Safety</li>
                    <li>• Mobile-Responsive Design</li>
                    <li>• Real-time Typing Indicators</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Try the Chatbot
            </h2>
            
            {/* Status indicator */}
            <div className="mb-6">
              {chatbotStatus.isLoading ? (
                <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Training AI model...</span>
                </div>
              ) : chatbotStatus.error ? (
                <div className="text-sm text-yellow-600">
                  ⚠️ {chatbotStatus.error}
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>
                    {chatbotStatus.isModelReady ? 'AI Ready' : 'Basic Mode'}
                    {!chatbotStatus.isConfigured && ' (FAQ only)'}
                  </span>
                  {chatbotStatus.learningCount > 0 && (
                    <div className="flex items-center space-x-1 text-xs">
                      <Brain className="w-3 h-3" />
                      <span>{chatbotStatus.learningCount} learned</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">
              Click the chat button in the bottom-right corner to start a conversation. 
              Ask about Luis's background, skills, services, or hobbies!
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg">
                <strong>Sample Questions:</strong>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• "What do you do?"</li>
                  <li>• "Tell me about your skills"</li>
                  <li>• "Do you build chatbots?"</li>
                  <li>• "What are your hobbies?"</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <strong>FAQ Categories:</strong>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• About & Background</li>
                  <li>• Services & Projects</li>
                  <li>• Skills & Technologies</li>
                  <li>• Hobbies & Interests</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <strong>Technical Features:</strong>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• Lead generation system</li>
                  <li>• Content filtering & safety</li>
                  <li>• Real-time confidence scoring</li>
                  <li>• Automated email notifications</li>
                  <li>• Mobile-responsive design</li>
                  <li>• IndexedDB model persistence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chatbot Component */}
      <Chatbot 
        openaiApiKey={process.env.REACT_APP_OPENAI_API_KEY}
        confidenceThreshold={0.6}
        onStatusChange={setChatbotStatus}
      />
      
      {/* Footer */}
      <footer className="w-full mt-6 py-6 flex flex-col items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
        <p>
          Developed by{" "}
          <a
            href="https://my-portfolio-jusu.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:text-blue-600 transition-colors"
          >
            Luis
          </a>
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {techStacks.map((tech) => (
            <span
              key={tech}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-2">
          <a
            href="https://www.instagram.com/0xlv1s_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-pink-600 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/AntonioLuisASantos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/alasantos01/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-700 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
