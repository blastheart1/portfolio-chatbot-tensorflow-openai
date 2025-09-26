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

// Default export for easy importing
import { EmbeddableChatbot as EC } from './components/EmbeddableChatbot';
import { Chatbot as C } from './components/Chatbot';
import { ChatWindow as CW } from './components/ChatWindow';
import { LeadForm as LF } from './components/LeadForm';
import { MarkdownText as MT } from './components/MarkdownText';
import { MessageBubble as MB } from './components/MessageBubble';
import { PerformanceMonitor as PM } from './components/PerformanceMonitor';
import { PerformanceToggle as PT } from './components/PerformanceToggle';
import { PortfolioChatbot as PC } from './components/PortfolioChatbot';
import { QuickSuggestions as QS } from './components/QuickSuggestions';
import { TensorFlowService as TFS } from './lib/tensorflowModel';
import { OpenAIService as OAS } from './lib/openaiService';
import { LeadDetectionService as LDS } from './lib/leadDetectionService';
import { ResendService as RS } from './lib/resendService';
import { SecurityService as SS } from './lib/securityService';

export default {
  EmbeddableChatbot: EC,
  Chatbot: C,
  ChatWindow: CW,
  LeadForm: LF,
  MarkdownText: MT,
  MessageBubble: MB,
  PerformanceMonitor: PM,
  PerformanceToggle: PT,
  PortfolioChatbot: PC,
  QuickSuggestions: QS,
  TensorFlowService: TFS,
  OpenAIService: OAS,
  LeadDetectionService: LDS,
  ResendService: RS,
  SecurityService: SS
};
