import { Resend } from 'resend';

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
  private resend: Resend;
  private config: ResendConfig;

  constructor(config: ResendConfig) {
    this.config = config;
    
    // Check if API key is configured
    if (!this.config.apiKey || this.config.apiKey.trim() === '') {
      throw new Error('Resend API key is not configured. Please add REACT_APP_RESEND_API_KEY to your environment variables.');
    }
    
    this.resend = new Resend(this.config.apiKey);
  }

  /**
   * Generate HTML for the lead notification email
   */
  private generateLeadNotificationHtml(leadData: LeadData, priority: string): string {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0056b3;">🎯 New Lead: ${leadData.name} - ${leadData.projectType} Project</h2>
        <p>You have received a new lead from your portfolio chatbot!</p>
        <p><strong>Priority:</strong> <span style="color: ${priority === 'HIGH' ? '#dc3545' : priority === 'MEDIUM' ? '#ffc107' : '#28a745'}; font-weight: bold;">${priority}</span></p>
        <h3 style="color: #0056b3;">Lead Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${leadData.name}</li>
          <li><strong>Email:</strong> <a href="mailto:${leadData.email}">${leadData.email}</a></li>
          ${leadData.phone ? `<li><strong>Phone:</strong> ${leadData.phone}</li>` : ''}
          ${leadData.company ? `<li><strong>Company:</strong> ${leadData.company}</li>` : ''}
          <li><strong>Project Type:</strong> ${leadData.projectType}</li>
          <li><strong>Budget:</strong> ${leadData.budget}</li>
          <li><strong>Timeline:</strong> ${leadData.timeline}</li>
        </ul>
        <h3 style="color: #0056b3;">Project Description:</h3>
        <p>${leadData.description}</p>
        <p>Please reach out to the lead as soon as possible!</p>
        <p>Best regards,<br/>Your Portfolio Chatbot</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.8em; color: #777;">This email was sent automatically by your lead generation system.</p>
      </div>
    `;
  }

  /**
   * Generate HTML for the welcome email to the lead
   */
  private generateWelcomeEmailHtml(leadData: LeadData): string {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0056b3;">Hello ${leadData.name},</h2>
        <p>Thank you for reaching out to Luis through his portfolio chatbot! He has received your inquiry regarding a <strong>${leadData.projectType}</strong> project.</p>
        <p>Luis is a Senior IBM ODM Specialist (BRMS) and QA Team Manager, as well as a Full-Stack Developer who leverages AI, machine learning, and generative technologies to elevate business processes. He's excited to learn more about your project!</p>
        <p>He will review your details and get back to you within <strong>24-48 hours</strong> to discuss your needs further.</p>
        <p>In the meantime, feel free to explore his portfolio: <a href="https://my-portfolio-jusu.vercel.app/" style="color: #0056b3; text-decoration: none;">my-portfolio-jusu.vercel.app</a></p>
        <p>Best regards,<br/>Luis Santos</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.8em; color: #777;">This email was sent automatically. Please do not reply to this address.</p>
      </div>
    `;
  }

  /**
   * Determine lead priority based on budget and timeline
   */
  private getLeadPriority(leadData: LeadData): 'HIGH' | 'MEDIUM' | 'STANDARD' {
    if (leadData.budget === 'enterprise' && leadData.timeline === 'asap') {
      return 'HIGH';
    }
    if (leadData.budget === 'professional' && (leadData.timeline === 'asap' || leadData.timeline === '1-3months')) {
      return 'MEDIUM';
    }
    return 'STANDARD';
  }

  /**
   * Send lead notification email to Luis
   */
  async sendLeadNotification(leadData: LeadData): Promise<void> {
    try {
      const priority = this.getLeadPriority(leadData);
      const htmlContent = this.generateLeadNotificationHtml(leadData, priority);

      const { data, error } = await this.resend.emails.send({
        from: this.config.fromEmail,
        to: [this.config.toEmail],
        subject: `🎯 New Lead: ${leadData.name} - ${leadData.projectType} Project (Priority: ${priority})`,
        html: htmlContent,
      });

      if (error) {
        console.error('Resend API Error (Lead Notification):', error);
        throw new Error(`Failed to send lead notification: ${error.message}`);
      }

      console.log('✅ Lead notification email sent successfully:', data);
    } catch (error) {
      console.error('Error sending lead notification email:', error);
      throw error;
    }
  }

  /**
   * Send welcome email to the lead
   */
  async sendWelcomeEmail(leadData: LeadData): Promise<void> {
    try {
      const htmlContent = this.generateWelcomeEmailHtml(leadData);

      const { data, error } = await this.resend.emails.send({
        from: this.config.fromEmail,
        to: [leadData.email],
        subject: `Thanks for your inquiry, ${leadData.name}!`,
        html: htmlContent,
      });

      if (error) {
        console.error('Resend API Error (Welcome Email):', error);
        throw new Error(`Failed to send welcome email: ${error.message}`);
      }

      console.log('✅ Welcome email sent successfully to lead:', data);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }
}