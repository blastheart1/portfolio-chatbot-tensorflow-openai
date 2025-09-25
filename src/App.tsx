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
              This chatbot showcases Luis's AI expertise with TensorFlow.js as the primary intelligence, 
              specifically trained on his professional content. It uses relevance scoring to stay focused 
              on Luis's background, skills, and projects, with OpenAI only as a last resort for highly 
              relevant questions.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  🤖 TensorFlow.js (Primary Intelligence)
                </h3>
                <ul className="text-blue-700 space-y-2">
                  <li>• Luis-focused intent classification</li>
                  <li>• Relevance scoring system</li>
                  <li>• Enhanced neural network architecture</li>
                  <li>• Self-improving from conversations</li>
                  <li>• Smart fallback responses</li>
                  <li>• Local browser-based AI</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  🧠 OpenAI Integration (Last Resort Only)
                </h3>
                <ul className="text-purple-700 space-y-2">
                  <li>• Only for highly relevant Luis questions</li>
                  <li>• When TensorFlow confidence is low</li>
                  <li>• Luis-focused context only</li>
                  <li>• Not a general GPT wrapper</li>
                </ul>
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
                  <li>• Smooth animations</li>
                  <li>• Typing indicators</li>
                  <li>• Source attribution</li>
                  <li>• Confidence scoring</li>
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
