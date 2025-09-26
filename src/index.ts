// Import styles
import './styles.css';

// Main exports for the npm package
export { EmbeddableChatbot } from './components/EmbeddableChatbot';
export { Chatbot } from './components/Chatbot';
export { ChatWindow } from './components/ChatWindow';
export { LeadForm } from './components/LeadForm';
export { MarkdownText } from './components/MarkdownText';
export { MessageBubble } from './components/MessageBubble';
export { PerformanceMonitor } from './components/PerformanceMonitor';
export { PerformanceToggle } from './components/PerformanceToggle';
export { PortfolioChatbot } from './components/PortfolioChatbot';
export { QuickSuggestions } from './components/QuickSuggestions';

// Service exports
export { TensorFlowService } from './lib/tensorflowModel';
export { OpenAIService } from './lib/openaiService';
export { LeadDetectionService } from './lib/leadDetectionService';
export { ResendService } from './lib/resendService';
export { SecurityService } from './lib/securityService';

// Type exports
export interface ChatbotProps {
  openaiApiKey?: string;
  confidenceThreshold?: number;
  onStatusChange?: (status: {
    isModelReady: boolean;
    isLoading: boolean;
    learningCount: number;
    isConfigured: boolean;
  }) => void;
}

export interface EmbeddableChatbotProps {
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

export interface ChatbotStatus {
  isModelReady: boolean;
  isLoading: boolean;
  learningCount: number;
  isConfigured: boolean;
}
