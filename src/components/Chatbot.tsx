import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Brain } from 'lucide-react';
import { ChatWindow } from './ChatWindow';
import { TensorFlowService } from '../lib/tensorflowModel';
import { OpenAIService } from '../lib/openaiService';

interface ChatbotProps {
  openaiApiKey?: string;
  confidenceThreshold?: number;
  onStatusChange?: (status: {
    isModelReady: boolean;
    isLoading: boolean;
    error: string | null;
    learningCount: number;
    isConfigured: boolean;
  }) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ 
  openaiApiKey = '', 
  confidenceThreshold = 0.75,
  onStatusChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [learningCount, setLearningCount] = useState(0);

  // Initialize services
  const tensorflowService = useMemo(() => new TensorFlowService(confidenceThreshold), [confidenceThreshold]);
  const apiKey = openaiApiKey || process.env.REACT_APP_OPENAI_API_KEY || '';
  const openaiService = useMemo(() => new OpenAIService({ 
    apiKey: apiKey
  }), [apiKey]);

  // Debug API key (remove in production)
  useEffect(() => {
    console.log('🔍 Environment check:');
    console.log('  - openaiApiKey prop:', openaiApiKey ? 'provided' : 'not provided');
    console.log('  - REACT_APP_OPENAI_API_KEY:', process.env.REACT_APP_OPENAI_API_KEY ? 'found' : 'not found');
    console.log('  - Final apiKey length:', apiKey.length);
    console.log('  - Final apiKey starts with:', apiKey.substring(0, 10));
    
    if (apiKey && apiKey.length > 20) {
      console.log('✅ OpenAI API key loaded successfully');
    } else {
      console.log('⚠️ OpenAI API key issue detected');
    }
  }, [apiKey, openaiApiKey]);

  // Notify parent component of status changes
  useEffect(() => {
    if (onStatusChange) {
      onStatusChange({
        isModelReady,
        isLoading,
        error,
        learningCount,
        isConfigured: openaiService.isConfigured()
      });
    }
  }, [isModelReady, isLoading, error, learningCount, openaiService, onStatusChange]);

  // Initialize TensorFlow.js model
  useEffect(() => {
    const initializeModel = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Try to load existing model
        const modelLoaded = await tensorflowService.loadModel();
        
        if (modelLoaded) {
          setIsModelReady(true);
          console.log('✅ Loaded existing TensorFlow.js model');
        } else {
          console.log('🤖 Training new TensorFlow.js model...');
          await tensorflowService.trainModel();
          setIsModelReady(true);
          console.log('✅ TensorFlow.js model trained successfully');
        }

        // Load learning count
        const storedCount = localStorage.getItem('learning-count');
        if (storedCount) {
          setLearningCount(parseInt(storedCount));
        }

      } catch (err) {
        console.error('❌ Error initializing model:', err);
        setError('Failed to initialize AI model. Using simple keyword matching instead.');
        // Set model as ready even if training failed, so we can use simple matching
        setIsModelReady(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeModel();
  }, [tensorflowService]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleLearningExample = async (userInput: string, openAiResponse: string): Promise<{success: boolean, reason?: string}> => {
    try {
      const result = await tensorflowService.addLearningExample(userInput, openAiResponse);
      
      if (result.success) {
        const newCount = learningCount + 1;
        setLearningCount(newCount);
        localStorage.setItem('learning-count', newCount.toString());
        console.log('🧠 Model learned from new example!');
      }
      
      return result;
    } catch (error) {
      console.error('Error adding learning example:', error);
      return { success: false, reason: 'Internal error occurred' };
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-20 h-20 cursor-pointer z-40 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15 
        }}
        role="button"
        tabIndex={0}
        aria-label="Open AI Chatbot"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleChat();
          }
        }}
      >
        <img
          src="/LuisBot.png"
          alt="Luis AI Chatbot"
          className="w-full h-full rounded-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.endsWith('/LuisBot.png')) {
              console.warn('PNG failed, trying ICO');
              target.src = '/LuisBot.ico';
            } else if (target.src.endsWith('/LuisBot.ico')) {
              console.warn('ICO failed, using default favicon');
              target.src = '/favicon.ico';
            } else {
              console.warn('All images failed, using emoji fallback');
              target.style.display = 'none';
              target.parentElement!.innerHTML = '🤖';
            }
          }}
          loading="eager"
          width="80"
          height="80"
        />
      </motion.div>


      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-20 right-6 bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-30"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Training AI model...</span>
          </div>
        </motion.div>
      )}

      {/* Error indicator */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 right-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-3 z-30 max-w-xs"
        >
          <div className="text-sm text-yellow-800">
            ⚠️ {error}
          </div>
        </motion.div>
      )}


      {/* Chat Window */}
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        tensorflowService={tensorflowService}
        openaiService={openaiService}
        onLearningExample={handleLearningExample}
      />
    </>
  );
};