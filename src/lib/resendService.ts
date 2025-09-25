export interface LeadData {
  name: string;
  email: string;
  company?: string;
  projectType: 'website' | 'chatbot' | 'consulting' | 'fullstack' | 'other';
  budget: 'starter' | 'professional' | 'enterprise' | 'custom';
  timeline: 'asap' | '1-3months' | '3-6months' | 'flexible';
  description: string;
  phone?: string;
}

export interface ResendConfig {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
}

export class ResendService {
  private config: ResendConfig;

  constructor(config: ResendConfig) {
    this.config = config;
  }

  /**
   * Send lead notification email to Luis
   */
  async sendLeadNotification(leadData: LeadData): Promise<void> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.config.fromEmail,
          to: [this.config.toEmail],
          subject: `🎯 New Lead: ${leadData.name} - ${leadData.projectType} Project`,
          html: this.generateLeadEmailHTML(leadData),
          text: this.generateLeadEmailText(leadData),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Resend API error: ${errorData.message || 'Unknown error'}`);
      }

      const result = await response.json();
      console.log('✅ Lead notification email sent successfully:', result.id);
    } catch (error) {
      console.error('❌ Failed to send lead notification:', error);
      throw error;
    }
  }

  /**
   * Send welcome email to the lead
   */
  async sendWelcomeEmail(leadData: LeadData): Promise<void> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.config.fromEmail,
          to: [leadData.email],
          subject: `Thank you for your interest, ${leadData.name}!`,
          html: this.generateWelcomeEmailHTML(leadData),
          text: this.generateWelcomeEmailText(leadData),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Resend API error: ${errorData.message || 'Unknown error'}`);
      }

      const result = await response.json();
      console.log('✅ Welcome email sent successfully:', result.id);
    } catch (error) {
      console.error('❌ Failed to send welcome email:', error);
      throw error;
    }
  }

  /**
   * Generate HTML email for lead notification
   */
  private generateLeadEmailHTML(leadData: LeadData): string {
    const budgetLabels = {
      starter: 'Starter (₱22,000 - ₱35,000)',
      professional: 'Professional (₱35,000 - ₱70,000)',
      enterprise: 'Enterprise (₱70,000+)',
      custom: 'Custom Quote Needed'
    };

    const timelineLabels = {
      asap: 'ASAP (Rush Project)',
      '1-3months': '1-3 Months',
      '3-6months': '3-6 Months',
      flexible: 'Flexible Timeline'
    };

    const projectTypeLabels = {
      website: 'Website Development',
      chatbot: 'AI Chatbot Integration',
      consulting: 'Technical Consulting',
      fullstack: 'Full-Stack Development',
      other: 'Other'
    };

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Lead from Portfolio Chatbot</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; }
            .lead-info { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .field { margin: 15px 0; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; }
            .priority { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .cta-button { background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 New Lead from Portfolio Chatbot</h1>
              <p>Someone is interested in your services!</p>
            </div>
            
            <div class="content">
              <div class="lead-info">
                <h2>Lead Information</h2>
                
                <div class="field">
                  <div class="label">👤 Name:</div>
                  <div class="value">${leadData.name}</div>
                </div>
                
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value"><a href="mailto:${leadData.email}">${leadData.email}</a></div>
                </div>
                
                ${leadData.phone ? `
                <div class="field">
                  <div class="label">📱 Phone:</div>
                  <div class="value"><a href="tel:${leadData.phone}">${leadData.phone}</a></div>
                </div>
                ` : ''}
                
                ${leadData.company ? `
                <div class="field">
                  <div class="label">🏢 Company:</div>
                  <div class="value">${leadData.company}</div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="label">🎯 Project Type:</div>
                  <div class="value">${projectTypeLabels[leadData.projectType]}</div>
                </div>
                
                <div class="field">
                  <div class="label">💰 Budget:</div>
                  <div class="value">${budgetLabels[leadData.budget]}</div>
                </div>
                
                <div class="field">
                  <div class="label">⏰ Timeline:</div>
                  <div class="value">${timelineLabels[leadData.timeline]}</div>
                </div>
                
                <div class="field">
                  <div class="label">📝 Project Description:</div>
                  <div class="value">${leadData.description.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              
              <div class="priority">
                <h3>🚀 Priority Level</h3>
                <p>
                  ${this.getPriorityLevel(leadData)} - 
                  ${this.getPriorityReason(leadData)}
                </p>
              </div>
              
              <div style="text-align: center;">
                <a href="mailto:${leadData.email}?subject=Re: Your ${projectTypeLabels[leadData.projectType]} Inquiry&body=Hi ${leadData.name.split(' ')[0]},%0D%0A%0D%0AThank you for reaching out about your project..." class="cta-button">
                  📧 Reply to Lead
                </a>
              </div>
            </div>
            
            <div class="footer">
              <p>This lead was generated from your portfolio chatbot at <strong>${new Date().toLocaleString()}</strong></p>
              <p>Generated by Luis's AI Chatbot System</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  /**
   * Generate text email for lead notification
   */
  private generateLeadEmailText(leadData: LeadData): string {
    return `
🎯 NEW LEAD FROM PORTFOLIO CHATBOT

Name: ${leadData.name}
Email: ${leadData.email}
${leadData.phone ? `Phone: ${leadData.phone}` : ''}
${leadData.company ? `Company: ${leadData.company}` : ''}

Project Type: ${leadData.projectType}
Budget: ${leadData.budget}
Timeline: ${leadData.timeline}

Project Description:
${leadData.description}

Priority Level: ${this.getPriorityLevel(leadData)}
${this.getPriorityReason(leadData)}

Generated at: ${new Date().toLocaleString()}
    `.trim();
  }

  /**
   * Generate HTML welcome email for the lead
   */
  private generateWelcomeEmailHTML(leadData: LeadData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Thank you for your interest!</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .highlight { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .cta-button { background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank you, ${leadData.name}! 🎉</h1>
              <p>I've received your project inquiry and I'm excited to work with you!</p>
            </div>
            
            <div class="content">
              <div class="highlight">
                <h2>What happens next?</h2>
                <ul>
                  <li>📧 <strong>Within 24 hours:</strong> You'll receive a detailed project proposal</li>
                  <li>📞 <strong>Follow-up call:</strong> We'll discuss your requirements in detail</li>
                  <li>📋 <strong>Project scope:</strong> Clear timeline and deliverables</li>
                  <li>🚀 <strong>Let's build:</strong> Start bringing your vision to life!</li>
                </ul>
              </div>
              
              <div class="highlight">
                <h2>About Luis</h2>
                <p>I'm a Senior IBM ODM Specialist and Full-Stack Developer with expertise in:</p>
                <ul>
                  <li>🎨 Modern web development (React, TypeScript, Node.js)</li>
                  <li>🤖 AI chatbot integration and machine learning</li>
                  <li>⚡ Business process automation and optimization</li>
                  <li>🔧 Quality assurance and team management</li>
                </ul>
              </div>
              
              <div style="text-align: center;">
                <a href="https://my-portfolio-jusu.vercel.app/" class="cta-button">
                  🌟 View My Portfolio
                </a>
              </div>
            </div>
            
            <div class="footer">
              <p>Best regards,<br><strong>Luis Santos</strong><br>Senior IBM ODM Specialist & Full-Stack Developer</p>
              <p>📧 <a href="mailto:your-email@example.com">your-email@example.com</a> | 
              💼 <a href="https://www.linkedin.com/in/alasantos01/">LinkedIn</a></p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  /**
   * Generate text welcome email for the lead
   */
  private generateWelcomeEmailText(leadData: LeadData): string {
    return `
Thank you, ${leadData.name}! 🎉

I've received your project inquiry and I'm excited to work with you!

WHAT HAPPENS NEXT?
• Within 24 hours: You'll receive a detailed project proposal
• Follow-up call: We'll discuss your requirements in detail
• Project scope: Clear timeline and deliverables
• Let's build: Start bringing your vision to life!

ABOUT LUIS
I'm a Senior IBM ODM Specialist and Full-Stack Developer with expertise in:
• Modern web development (React, TypeScript, Node.js)
• AI chatbot integration and machine learning
• Business process automation and optimization
• Quality assurance and team management

Best regards,
Luis Santos
Senior IBM ODM Specialist & Full-Stack Developer

View my portfolio: https://my-portfolio-jusu.vercel.app/
    `.trim();
  }

  /**
   * Determine priority level based on lead data
   */
  private getPriorityLevel(leadData: LeadData): string {
    let score = 0;
    
    // Budget scoring
    if (leadData.budget === 'enterprise') score += 3;
    else if (leadData.budget === 'professional') score += 2;
    else if (leadData.budget === 'starter') score += 1;
    
    // Timeline scoring
    if (leadData.timeline === 'asap') score += 3;
    else if (leadData.timeline === '1-3months') score += 2;
    else if (leadData.timeline === '3-6months') score += 1;
    
    // Project type scoring
    if (leadData.projectType === 'fullstack') score += 2;
    else if (leadData.projectType === 'website') score += 2;
    else if (leadData.projectType === 'chatbot') score += 1;
    
    // Company size (if provided)
    if (leadData.company && leadData.company.length > 0) score += 1;
    
    if (score >= 6) return '🔴 HIGH PRIORITY';
    else if (score >= 4) return '🟡 MEDIUM PRIORITY';
    else return '🟢 STANDARD PRIORITY';
  }

  /**
   * Get priority reason
   */
  private getPriorityReason(leadData: LeadData): string {
    const reasons = [];
    
    if (leadData.budget === 'enterprise') reasons.push('Enterprise budget');
    if (leadData.timeline === 'asap') reasons.push('Rush timeline');
    if (leadData.projectType === 'fullstack') reasons.push('Complex project');
    if (leadData.company) reasons.push('Company inquiry');
    
    return reasons.length > 0 ? reasons.join(', ') : 'Standard inquiry';
  }
}
