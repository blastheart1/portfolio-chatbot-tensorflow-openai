import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { } from 'lucide-react';
import { ChatWindow } from './ChatWindow';
import { TensorFlowService } from '../lib/tensorflowModel';
import { OpenAIService } from '../lib/openaiService';

interface EmbeddableChatbotProps {
  openaiApiKey?: string;
  confidenceThreshold?: number;
  position?: 'bottom-right' | 'bottom-left';
  theme?: 'light' | 'dark';
  customIcon?: string;
  onStatusChange?: (status: {
    isModelReady: boolean;
    isLoading: boolean;
    error: string | null;
    learningCount: number;
    isConfigured: boolean;
  }) => void;
}

export const EmbeddableChatbot: React.FC<EmbeddableChatbotProps> = ({ 
  openaiApiKey = '', 
  confidenceThreshold = 0.75,
  position = 'bottom-right',
  theme = 'light',
  customIcon,
  onStatusChange
}) => {
  // Auto-open chat if we're in an iframe (embed context)
  const [isOpen, setIsOpen] = useState(window.parent !== window);
  
  // Listen for close messages from parent window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'close-chat') {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
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

  const positionClasses = position === 'bottom-left' 
    ? 'fixed bottom-6 left-6' 
    : 'fixed bottom-6 right-6';

  const iconSrc = customIcon || '/LuisBot.png';

  // Check if we're in an iframe (embed context)
  const isInIframe = window.parent !== window;

  return (
    <div className="luis-chatbot-widget" style={{ zIndex: 9999 }}>
      {/* Floating Chat Button - Only show if not in iframe */}
      {!isInIframe && (
        <motion.img
          src={iconSrc}
          alt="Luis AI Chatbot"
          onClick={toggleChat}
          className={`${positionClasses} w-16 h-16 cursor-pointer z-40 object-cover`}
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
          width="64"
          height="64"
        />
      )}

      {/* Loading indicator - Only show if not in iframe */}
      {!isInIframe && isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${positionClasses.replace('bottom-6', 'bottom-20')} bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-30`}
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Training AI model...</span>
          </div>
        </motion.div>
      )}

      {/* Error indicator - Only show if not in iframe */}
      {!isInIframe && error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${positionClasses.replace('bottom-6', 'bottom-20')} bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-3 z-30 max-w-xs`}
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
    </div>
  );
};
