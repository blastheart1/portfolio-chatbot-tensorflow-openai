export interface OpenAIConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface OpenAIResponse {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class OpenAIService {
  private config: OpenAIConfig;

  // Content filtering for inappropriate content
  private inappropriateWords: string[] = [
    // English profanity
    'fuck', 'shit', 'damn', 'bitch', 'ass', 'hell', 'crap', 'piss',
    // Filipino profanity and slang
    'tite', 'puke', 'puki', 'puta', 'gago', 'tangina', 'ulol', 'bobo',
    'tanga', 'walanghiya', 'lintik', 'hayop', 'pokpok', 'putang',
    // Relationship/personal inappropriate words (standalone)
    'girls', 'boys', 'women', 'men', 'sex', 'sexy', 'hot', 'beautiful', 
    'cute', 'attractive', 'single', 'girlfriend', 'boyfriend', 'wife', 
    'husband', 'marriage', 'dating', 'love', 'kiss', 'hug'
  ];

  private inappropriatePatterns: string[] = [
    'do you like girls', 'are you single', 'do you have a girlfriend',
    'are you married', 'do you have a wife', 'are you dating',
    'do you like women', 'are you straight', 'do you like boys',
    'what do you think about girls', 'do you find me attractive',
    'are you gay', 'whats your type', 'do you want to date'
  ];

  constructor(config: OpenAIConfig) {
    this.config = {
      model: 'gpt-3.5-turbo',
      maxTokens: 150,
      temperature: 0.7,
      ...config,
    };
  }

  /**
   * Check for inappropriate content
   */
  private isInappropriateContent(text: string): { isInappropriate: boolean, type: 'profanity' | 'personal' | 'none' } {
    const lowerText = text.toLowerCase().trim();
    
    // Check for profanity (exact word matches to avoid false positives)
    const profanityWords = ['fuck', 'shit', 'damn', 'bitch', 'ass', 'hell', 'crap', 'piss',
                           'tite', 'puke', 'puki', 'puta', 'gago', 'tangina', 'ulol', 'bobo',
                           'tanga', 'walanghiya', 'lintik', 'hayop', 'pokpok', 'putang'];
    
    const hasProfanity = profanityWords.some(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      return regex.test(lowerText);
    });
    
    if (hasProfanity) {
      return { isInappropriate: true, type: 'profanity' };
    }
    
    // Check for personal/inappropriate questions
    const personalWords = ['girls', 'boys', 'women', 'men', 'sex', 'sexy', 'hot', 'beautiful', 
                           'cute', 'attractive', 'single', 'girlfriend', 'boyfriend', 'wife', 
                           'husband', 'marriage', 'dating', 'love', 'kiss', 'hug'];
    
    const hasPersonalWord = personalWords.some(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      return regex.test(lowerText);
    });
    
    const hasPersonalQuestion = this.inappropriatePatterns.some(pattern => lowerText.includes(pattern));
    
    if (hasPersonalWord || hasPersonalQuestion) {
      return { isInappropriate: true, type: 'personal' };
    }
    
    return { isInappropriate: false, type: 'none' };
  }

  /**
   * Generate response using OpenAI API
   */
  async generateResponse(userMessage: string, context?: string): Promise<OpenAIResponse> {
    // Check for inappropriate content first
    const contentCheck = this.isInappropriateContent(userMessage);
    if (contentCheck.isInappropriate) {
      console.log(`🚫 OpenAI inappropriate content detected (${contentCheck.type}): "${userMessage}"`);
      let response: string;
      
      if (contentCheck.type === 'profanity') {
        response = "Sorry, I'd be happy to discuss more valuable topics and let's not waste time. How about we talk about my **website development services**, **AI chatbot solutions**, or my **technical expertise** instead?";
      } else if (contentCheck.type === 'personal') {
        response = "I'm married and prefer to keep our conversation professional. I'd be happy to discuss my **services**, **projects**, or **technical skills** instead. What can I help you with professionally?";
      } else {
        response = "Let's focus on professional topics. I'd be happy to discuss my **development services**, **AI solutions**, or **portfolio projects**. What interests you?";
      }
      
      return {
        content: response,
        usage: {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0
        }
      };
    }

    try {
      const systemPrompt = context || 
        "You are a helpful AI assistant. Provide concise, helpful responses. " +
        "If you don't know something, say so politely.";

      console.log('🔍 OpenAI API Key (first 10 chars):', this.config.apiKey.substring(0, 10));
      console.log('🔍 API Key length:', this.config.apiKey.length);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: userMessage,
            },
          ],
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenAI API Error Response:', errorData);
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        content: data.choices[0].message.content,
        usage: data.usage,
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate AI response. Please try again.');
    }
  }

  /**
   * Generate response with portfolio context
   */
  async generatePortfolioResponse(userMessage: string): Promise<OpenAIResponse> {
    // Check for inappropriate content first
    const contentCheck = this.isInappropriateContent(userMessage);
    if (contentCheck.isInappropriate) {
      console.log(`🚫 OpenAI portfolio inappropriate content detected (${contentCheck.type}): "${userMessage}"`);
      let response: string;
      
      if (contentCheck.type === 'profanity') {
        response = "Sorry, I'd be happy to discuss more valuable topics and let's not waste time. How about we talk about my **website development services**, **AI chatbot solutions**, or my **technical expertise** instead?";
      } else if (contentCheck.type === 'personal') {
        response = "I'm married and prefer to keep our conversation professional. I'd be happy to discuss my **services**, **projects**, or **technical skills** instead. What can I help you with professionally?";
      } else {
        response = "Let's focus on professional topics. I'd be happy to discuss my **development services**, **AI solutions**, or **portfolio projects**. What interests you?";
      }
      
      return {
        content: response,
        usage: {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0
        }
      };
    }

    const context = 
      "You are Luis (Antonio Luis Santos), a software developer and team manager. " +
      "You are a Senior IBM ODM Specialist (BRMS) and QA Team Manager at Bell Digital Billboards. " +
      "You are a Full-Stack Developer and QA Specialist with expertise in building future-ready applications. " +
      "You have expertise in TypeScript, ReactJS, TailwindCSS, QA, and BRMS. " +
      "You build AI chatbots, work on full-stack development, and have hobbies like Formula 1, RC cars, cycling, and coffee. " +
      
      "PROFESSIONAL BACKGROUND: " +
      "• Current: Senior IBM ODM Specialist (BRMS) & QA Team Manager at Bell Canada Inc. (Digital Billboards) since 10/2024 " +
      "• Previous: Senior IBM ODM Developer at Bell Canada Inc. (01/2023 - 10/2024) " +
      "• Earlier: ODM Developer | BRMS Engineer (IBM ODM) at Bell Canada Inc. (11/2020 - 01/2023) " +
      
      "TECHNICAL SKILLS: " +
      "Frontend: React, Next.js, TailwindCSS, TypeScript, JavaScript, HTML5, CSS3, Wix (especially Velo for full Wix coding) " +
      "Backend: Node.js, Express, PostgreSQL, Python, Sanity, Java, C++, PHP, MySQL " +
      "DevOps & Cloud: Docker, AWS, Vercel, Git, GitHub, Postman, Zapier, ngrok, Netlify, Google Cloud " +
      "Specialized: IBM ODM, BRMS, QA Team Management, AI Chatbots, Automation Testing " +
      "Platform Experience: You do not have direct working experience with Shopify but you have transferrable skills that can be utilized for Shopify projects " +
      
      "KEY PROJECTS: " +
      "• Pilates With Bee: Online Pilates clinic platform with headless CMS and automation " +
      "• ResumeAI: AI-powered resume analysis web app with skill matching " +
      "• AI Chat with LM Studio: Full-stack AI chat with local LLM and global access " +
      
      "BUSINESS SERVICES: " +
      "• Website Development: Starter (₱22,000), Professional (₱45,000), Enterprise (₱100,000) " +
      "• AI Chatbot Integration: Smart Support, E-commerce, Advanced AI Chatbots " +
      "• Full-stack development, BRMS solutions, QA process optimization " +
      
      "PERSONAL INTERESTS: " +
      "Road cycling, gravel cycling, Formula 1 (you stan drivers like Lewis Hamilton, Sebastian Vettel, Max Verstappen, Nikki Lauda), sim racing, RC car builds (Tamiya kits), coffee brewing " +
      "YouTube channel: Sunraku-san TV for hobby content " +
      
      "CONTACT: " +
      "Email: antonioluis.santos1@gmail.com " +
      "Location: Manila, Philippines " +
      "Portfolio: https://my-portfolio-jusu.vercel.app/ " +
      
      "RESPONSE STYLE: " +
      "Respond naturally and conversationally as if you're having a direct conversation. " +
      "Start responses with natural language like 'Yes, I...' or 'I have experience in...' or 'That's a great question...' " +
      "Be professional but friendly and engaging. " +
      "If asked about something outside your expertise, politely redirect to your core skills. " +
      
      "FORMATTING: " +
      "Use simple markdown formatting for better readability: " +
      "• Use **bold** for important terms and headings " +
      "• Use bullet points (•) for lists " +
      "• Use line breaks for better structure " +
      "• Keep formatting minimal but effective " +
      
      "EXAMPLES: " +
      "Pricing: **Pricing Plans:** • **Starter** (₱22,000/$599) - Small businesses • **Professional** (₱45,000/$1,199) - Growing businesses • **Enterprise** (₱100,000/$2,999) - Complete solution";

    return this.generateResponse(userMessage, context);
  }

  /**
   * Check if API key is configured
   */
  isConfigured(): boolean {
    return !!this.config.apiKey && this.config.apiKey.length > 0;
  }

  /**
   * Update API key
   */
  updateApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
  }
}
