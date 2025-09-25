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
              This chatbot showcases Luis's AI expertise with a smart two-tier system: a local AI brain that runs 
              in your browser for fast responses, and OpenAI's advanced language model for complex questions. 
              It intelligently filters content, generates qualified leads, and learns from conversations while 
              maintaining professional boundaries.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  🤖 TensorFlow.js (Local AI Brain)
                </h3>
                <div className="text-blue-700 space-y-3">
                  <div>
                    <strong>🧠 Smart Neural Network:</strong> 4-layer brain (256→128→64→answers)
                    <div className="text-sm text-blue-600 mt-1">Like having a mini-AI that runs instantly in your browser</div>
                  </div>
                  <div>
                    <strong>📚 Custom Knowledge Base:</strong> 1000+ Luis-specific terms and phrases
                    <div className="text-sm text-blue-600 mt-1">Trained specifically on Luis's expertise and services</div>
                  </div>
                  <div>
                    <strong>🎯 Relevance Scoring:</strong> Smart filtering (40% relevance threshold)
                    <div className="text-sm text-blue-600 mt-1">Only responds to topics actually related to Luis's work</div>
                  </div>
                  <div>
                    <strong>⚡ Confidence System:</strong> Dynamic accuracy checking (60% confidence threshold)
                    <div className="text-sm text-blue-600 mt-1">Only gives answers when it's really sure it's right</div>
                  </div>
                  <div>
                    <strong>💾 Memory System:</strong> IndexedDB storage with auto-learning
                    <div className="text-sm text-blue-600 mt-1">Remembers new conversations and gets smarter over time</div>
                  </div>
                  <div>
                    <strong>🛡️ Content Safety:</strong> Profanity & inappropriate content detection
                    <div className="text-sm text-blue-600 mt-1">Keeps conversations professional and respectful</div>
                  </div>
                  <div>
                    <strong>🎯 Lead Detection:</strong> AI-powered opportunity recognition
                    <div className="text-sm text-blue-600 mt-1">Automatically spots when someone might want to work with Luis</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  🧠 OpenAI Integration (Advanced Fallback)
                </h3>
                <div className="text-purple-700 space-y-3">
                  <div>
                    <strong>🚀 GPT-3.5-turbo:</strong> 150 token responses with Luis context
                    <div className="text-sm text-purple-600 mt-1">Only for complex questions when the local AI needs help</div>
                  </div>
                  <div>
                    <strong>📝 Smart Prompting:</strong> Structured context with examples
                    <div className="text-sm text-purple-600 mt-1">Gives OpenAI the right information to answer like Luis would</div>
                  </div>
                  <div>
                    <strong>✨ Rich Formatting:</strong> Bold text, bullets, hyperlinks
                    <div className="text-sm text-purple-600 mt-1">Makes responses look professional and easy to read</div>
                  </div>
                  <div>
                    <strong>🔒 Pre-filtering:</strong> Content safety before API calls
                    <div className="text-sm text-purple-600 mt-1">Blocks inappropriate content before wasting API credits</div>
                  </div>
                  <div>
                    <strong>🎯 Smart Fallback:</strong> Only for relevant Luis questions
                    <div className="text-sm text-purple-600 mt-1">Won't answer random questions - stays focused on Luis's expertise</div>
                  </div>
                  <div>
                    <strong>💰 Cost Optimization:</strong> Zero tokens for filtered content
                    <div className="text-sm text-purple-600 mt-1">Saves money by not sending inappropriate requests to OpenAI</div>
                  </div>
                  <div>
                    <strong>🛠️ Error Handling:</strong> Graceful fallback to FAQ responses
                    <div className="text-sm text-purple-600 mt-1">Always provides a helpful answer, even when things go wrong</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🔧 How It All Works Together
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">🧠 AI/ML Pipeline</h4>
                  <div className="text-gray-600 space-y-2">
                    <div>
                      <strong>Intent Classification:</strong> Understands what you're asking
                      <div className="text-xs text-gray-500 mt-1">Like a smart translator that knows Luis's business</div>
                    </div>
                    <div>
                      <strong>Relevance Scoring:</strong> Checks if it's related to Luis's work
                      <div className="text-xs text-gray-500 mt-1">Won't waste time on random topics</div>
                    </div>
                    <div>
                      <strong>Confidence Checking:</strong> Only answers when it's sure
                      <div className="text-xs text-gray-500 mt-1">Prefers to ask for help rather than guess wrong</div>
                    </div>
                    <div>
                      <strong>Auto-Learning:</strong> Gets smarter from conversations
                      <div className="text-xs text-gray-500 mt-1">Each chat makes it better for the next person</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">🎯 Lead Generation</h4>
                  <div className="text-gray-600 space-y-2">
                    <div>
                      <strong>Smart Detection:</strong> Spots potential clients automatically
                      <div className="text-xs text-gray-500 mt-1">Knows when someone's interested in Luis's services</div>
                    </div>
                    <div>
                      <strong>Natural Flow:</strong> Asks politely before collecting info
                      <div className="text-xs text-gray-500 mt-1">No pushy forms - just helpful conversation</div>
                    </div>
                    <div>
                      <strong>Email Automation:</strong> Sends notifications instantly
                      <div className="text-xs text-gray-500 mt-1">Luis gets notified immediately when someone's interested</div>
                    </div>
                    <div>
                      <strong>Priority Scoring:</strong> Ranks leads by importance
                      <div className="text-xs text-gray-500 mt-1">High-budget, urgent projects get flagged first</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">✨ User Experience</h4>
                  <div className="text-gray-600 space-y-2">
                    <div>
                      <strong>Quick Start:</strong> Clickable suggestion buttons
                      <div className="text-xs text-gray-500 mt-1">No need to think of questions - just click and go</div>
                    </div>
                    <div>
                      <strong>Safety First:</strong> Content filtering & safety
                      <div className="text-xs text-gray-500 mt-1">Keeps conversations professional and respectful</div>
                    </div>
                    <div>
                      <strong>Mobile Ready:</strong> Works on any device
                      <div className="text-xs text-gray-500 mt-1">Looks great on phones, tablets, and computers</div>
                    </div>
                    <div>
                      <strong>Live Feedback:</strong> Real-time typing indicators
                      <div className="text-xs text-gray-500 mt-1">Shows the AI is thinking and working</div>
                    </div>
                  </div>
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
