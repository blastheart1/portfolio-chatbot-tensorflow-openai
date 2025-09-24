import React from 'react';
import { motion } from 'framer-motion';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  source?: 'faq' | 'ai';
  confidence?: number;
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.isUser;
  const source = message.source;
  const confidence = message.confidence;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-chat-bubble-user text-white rounded-br-md'
            : 'bg-chat-bubble-bot text-gray-800 border border-chat-border rounded-bl-md'
        }`}
      >
        <div className="text-sm leading-relaxed">
          {message.content}
        </div>
        
        {/* Source indicator for bot messages */}
        {!isUser && source && (
          <div className="mt-2 text-xs opacity-70">
            {source === 'faq' ? (
              <span className="inline-flex items-center">
                📚 FAQ
                {confidence && (
                  <span className="ml-1">
                    ({Math.round(confidence * 100)}% confidence)
                  </span>
                )}
              </span>
            ) : (
              <span className="inline-flex items-center">
                🤖 AI Response
              </span>
            )}
          </div>
        )}
        
        {/* Timestamp */}
        <div className={`text-xs mt-1 ${
          isUser ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </motion.div>
  );
};
