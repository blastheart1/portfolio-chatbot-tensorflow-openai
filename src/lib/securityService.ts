export interface SecurityValidation {
  isValid: boolean;
  reason?: string;
  sanitizedInput?: string;
}

export class SecurityService {
  private static readonly MAX_INPUT_LENGTH = 500;
  private static readonly MAX_RESPONSE_LENGTH = 2000;
  private static readonly MIN_INPUT_LENGTH = 3;
  
  // Common malicious patterns
  private static readonly MALICIOUS_PATTERNS = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /<object[^>]*>.*?<\/object>/gi,
    /<embed[^>]*>.*?<\/embed>/gi,
    /<link[^>]*>.*?<\/link>/gi,
    /<meta[^>]*>.*?<\/meta>/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi,
    /vbscript:/gi,
    /data:text\/html/gi,
    /data:application\/javascript/gi,
  ];

  // Spam/abuse patterns
  private static readonly SPAM_PATTERNS = [
    /(.)\1{10,}/g, // Repeated characters
    /(.)\1{5,}/g,  // Moderate repetition
    /[^\w\s.,!?]{20,}/g, // Too many special characters
  ];

  // Inappropriate content patterns (basic)
  private static readonly INAPPROPRIATE_PATTERNS = [
    /\b(fuck|shit|damn|bitch|asshole)\b/gi,
    /\b(kill|murder|suicide|bomb|terrorist)\b/gi,
  ];

  /**
   * Validate user input for security
   */
  static validateUserInput(input: string): SecurityValidation {
    // Length validation
    if (input.length < this.MIN_INPUT_LENGTH) {
      return { isValid: false, reason: 'Input too short' };
    }
    
    if (input.length > this.MAX_INPUT_LENGTH) {
      return { isValid: false, reason: 'Input too long' };
    }

    // Check for malicious patterns
    for (const pattern of this.MALICIOUS_PATTERNS) {
      if (pattern.test(input)) {
        return { isValid: false, reason: 'Potentially malicious content detected' };
      }
    }

    // Check for spam patterns
    for (const pattern of this.SPAM_PATTERNS) {
      if (pattern.test(input)) {
        return { isValid: false, reason: 'Spam-like content detected' };
      }
    }

    // Check for inappropriate content
    for (const pattern of this.INAPPROPRIATE_PATTERNS) {
      if (pattern.test(input)) {
        return { isValid: false, reason: 'Inappropriate content detected' };
      }
    }

    // Sanitize input
    const sanitized = this.sanitizeInput(input);
    
    return { 
      isValid: true, 
      sanitizedInput: sanitized 
    };
  }

  /**
   * Validate AI response for security
   */
  static validateAIResponse(response: string): SecurityValidation {
    // Length validation
    if (response.length > this.MAX_RESPONSE_LENGTH) {
      return { isValid: false, reason: 'Response too long' };
    }

    // Check for malicious patterns
    for (const pattern of this.MALICIOUS_PATTERNS) {
      if (pattern.test(response)) {
        return { isValid: false, reason: 'AI response contains potentially malicious content' };
      }
    }

    // Check for inappropriate content
    for (const pattern of this.INAPPROPRIATE_PATTERNS) {
      if (pattern.test(response)) {
        return { isValid: false, reason: 'AI response contains inappropriate content' };
      }
    }

    return { isValid: true };
  }

  /**
   * Sanitize input by removing dangerous characters
   */
  private static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim();
  }

  /**
   * Check if input is potentially harmful
   */
  static isPotentiallyHarmful(input: string): boolean {
    const validation = this.validateUserInput(input);
    return !validation.isValid;
  }

  /**
   * Rate limiting check (simple implementation)
   */
  static checkRateLimit(userId: string = 'default'): boolean {
    const key = `rate_limit_${userId}`;
    const now = Date.now();
    const lastRequest = localStorage.getItem(key);
    
    if (lastRequest) {
      const timeDiff = now - parseInt(lastRequest);
      if (timeDiff < 1000) { // 1 second between requests
        return false;
      }
    }
    
    localStorage.setItem(key, now.toString());
    return true;
  }

  /**
   * Check for duplicate learning attempts
   */
  static isDuplicateLearning(input: string): boolean {
    const key = `learning_${btoa(input).substring(0, 20)}`;
    const exists = localStorage.getItem(key);
    
    if (exists) {
      return true;
    }
    
    // Store for 24 hours
    localStorage.setItem(key, Date.now().toString());
    return false;
  }
}
