export interface LeadTrigger {
  shouldShowForm: boolean;
  triggerContext: string;
  confidence: number;
  category: 'pricing' | 'services' | 'availability' | 'interest' | 'none';
}

export class LeadDetectionService {
  // Keywords that indicate lead generation opportunities
  private leadKeywords = {
    pricing: [
      'price', 'cost', 'rate', 'fee', 'budget', 'expensive', 'cheap', 'afford',
      'how much', 'what does it cost', 'pricing', 'quote', 'estimate'
    ],
    services: [
      'build', 'create', 'develop', 'make', 'design', 'website', 'app', 'software',
      'need a', 'looking for', 'want to', 'require', 'project', 'help me',
      'services', 'what services', 'offer', 'what do you offer', 'what can you do',
      'service', 'work', 'consulting', 'development', 'chatbot', 'ai solution',
      'ecommerce', 'e-commerce', 'online store', 'web development', 'full stack',
      'frontend', 'backend', 'react', 'node', 'javascript', 'typescript',
      'brms', 'business rules', 'qa', 'quality assurance', 'team management',
      'ibm odm', 'odm specialist', 'automation', 'workflow', 'integration'
    ],
    availability: [
      'available', 'busy', 'schedule', 'timeline', 'when can', 'how long',
      'start', 'begin', 'free', 'time', 'urgent', 'asap'
    ],
    interest: [
      'interested', 'considering', 'thinking about', 'planning', 'might need',
      'could use', 'looking into', 'exploring', 'evaluating'
    ]
  };

  // Phrases that indicate strong buying intent
  private buyingIntentPhrases = [
    'i need', 'i want', 'i\'m looking for', 'can you help me',
    'i\'m interested in', 'tell me more about', 'how do you',
    'what would it take', 'i\'m ready to', 'let\'s discuss',
    'what services', 'what do you offer', 'what can you do',
    'do you offer', 'can you build', 'can you create', 'can you develop',
    'i need a website', 'i need an app', 'i need a chatbot',
    'build me a', 'create a', 'develop a', 'make a',
    'looking to hire', 'looking to work with', 'want to hire',
    'need help with', 'need assistance with', 'need support with'
  ];

  // Negative indicators (don't show form)
  private negativeIndicators = [
    'just asking', 'just curious', 'not interested', 'maybe later',
    'don\'t need', 'not looking for', 'just browsing', 'just wondering',
    'no thanks', 'not now', 'maybe someday'
  ];

  /**
   * Analyze user input to determine if lead form should be shown
   */
  detectLeadOpportunity(userInput: string, conversationHistory: string[] = []): LeadTrigger {
    const lowerInput = userInput.toLowerCase().trim();
    
    // Check for negative indicators first
    const hasNegativeIndicator = this.negativeIndicators.some(phrase => 
      lowerInput.includes(phrase)
    );
    
    if (hasNegativeIndicator) {
      return {
        shouldShowForm: false,
        triggerContext: '',
        confidence: 0,
        category: 'none'
      };
    }

    let maxConfidence = 0;
    let bestCategory: LeadTrigger['category'] = 'none';
    let triggerContext = '';

    // Check each category
    for (const [category, keywords] of Object.entries(this.leadKeywords)) {
      const confidence = this.calculateCategoryConfidence(lowerInput, keywords);
      
      if (confidence > maxConfidence) {
        maxConfidence = confidence;
        bestCategory = category as LeadTrigger['category'];
      }
    }

    // Check for buying intent phrases
    const buyingIntentConfidence = this.calculateBuyingIntentConfidence(lowerInput);
    if (buyingIntentConfidence > maxConfidence) {
      maxConfidence = buyingIntentConfidence;
      bestCategory = 'interest';
    }

    // Generate contextual trigger message
    triggerContext = this.generateTriggerContext(lowerInput, bestCategory);

    // Determine if form should be shown (confidence threshold)
    const shouldShowForm = maxConfidence >= 0.6 && bestCategory !== 'none';

    return {
      shouldShowForm,
      triggerContext,
      confidence: maxConfidence,
      category: bestCategory
    };
  }

  /**
   * Calculate confidence score for a specific category
   */
  private calculateCategoryConfidence(input: string, keywords: string[]): number {
    let matches = 0;
    let totalWords = input.split(' ').length;

    // Check for exact keyword matches
    keywords.forEach(keyword => {
      if (input.includes(keyword)) {
        matches++;
      }
    });

    // Bonus for multiple matches
    const multipleMatchBonus = matches > 1 ? 0.2 : 0;

    // Calculate base confidence
    const baseConfidence = Math.min(matches / Math.max(totalWords * 0.3, 1), 1);

    return Math.min(baseConfidence + multipleMatchBonus, 1);
  }

  /**
   * Calculate buying intent confidence
   */
  private calculateBuyingIntentConfidence(input: string): number {
    let confidence = 0;

    this.buyingIntentPhrases.forEach(phrase => {
      if (input.includes(phrase)) {
        confidence += 0.3;
      }
    });

    // Check for action words
    const actionWords = ['build', 'create', 'develop', 'make', 'start', 'begin'];
    actionWords.forEach(word => {
      if (input.includes(word)) {
        confidence += 0.2;
      }
    });

    return Math.min(confidence, 1);
  }

  /**
   * Generate contextual trigger message
   */
  private generateTriggerContext(input: string, category: LeadTrigger['category']): string {
    const contexts = {
      pricing: [
        "Great question about pricing!",
        "I'd be happy to discuss pricing with you!",
        "Let me help you understand the pricing options!",
        "I can provide you with detailed pricing information!"
      ],
      services: [
        "That sounds like an interesting project!",
        "I'd love to help you with that!",
        "That's definitely something I can help you build!",
        "I'm excited about your project idea!",
        "Great! I offer a range of services that could help you!",
        "I'd be happy to discuss my services with you!",
        "That's exactly the kind of project I specialize in!",
        "I can definitely help you with that type of work!"
      ],
      availability: [
        "I'd love to discuss your timeline!",
        "Let me help you plan your project!",
        "I'm excited about the possibility of working together!",
        "I can definitely help you with that!"
      ],
      interest: [
        "It sounds like you're interested in working together!",
        "I'd love to discuss your project needs!",
        "Let me help you with that!",
        "I'm excited about your project idea!"
      ],
      none: ""
    };

    const categoryContexts = contexts[category];
    if (categoryContexts && categoryContexts.length > 0) {
      return categoryContexts[Math.floor(Math.random() * categoryContexts.length)];
    }

    return "I'd love to discuss your project needs!";
  }

  /**
   * Check if the conversation context suggests lead opportunity
   */
  analyzeConversationContext(conversationHistory: string[]): LeadTrigger {
    if (conversationHistory.length === 0) {
      return {
        shouldShowForm: false,
        triggerContext: '',
        confidence: 0,
        category: 'none'
      };
    }

    // Analyze recent conversation for lead indicators
    const recentMessages = conversationHistory.slice(-3); // Last 3 messages
    let totalConfidence = 0;
    let categoryCounts = {
      pricing: 0,
      services: 0,
      availability: 0,
      interest: 0
    };

    recentMessages.forEach(message => {
      const trigger = this.detectLeadOpportunity(message);
      totalConfidence += trigger.confidence;
      
      if (trigger.category !== 'none') {
        categoryCounts[trigger.category]++;
      }
    });

    const avgConfidence = totalConfidence / recentMessages.length;
    const maxCategory = Object.entries(categoryCounts).reduce((a, b) => 
      categoryCounts[a[0] as keyof typeof categoryCounts] > categoryCounts[b[0] as keyof typeof categoryCounts] ? a : b
    )[0] as LeadTrigger['category'];

    return {
      shouldShowForm: avgConfidence >= 0.5 && maxCategory !== 'none',
      triggerContext: this.generateTriggerContext('', maxCategory),
      confidence: avgConfidence,
      category: maxCategory
    };
  }

  /**
   * Get suggested follow-up questions based on lead category
   */
  getFollowUpQuestions(category: LeadTrigger['category']): string[] {
    const questions = {
      pricing: [
        "What's your budget range?",
        "What type of project are you planning?",
        "When do you need this completed?"
      ],
      services: [
        "What specific features do you need?",
        "Do you have a timeline in mind?",
        "What's your budget for this project?"
      ],
      availability: [
        "What type of project are you working on?",
        "What's your preferred timeline?",
        "What's your budget range?"
      ],
      interest: [
        "What kind of project are you considering?",
        "When would you like to get started?",
        "What's your budget range?"
      ],
      none: []
    };

    return questions[category] || [];
  }
}
