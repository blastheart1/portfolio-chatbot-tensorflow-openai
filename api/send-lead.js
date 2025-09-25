const { Resend } = require('resend');

export default async function handler(req, res) {
  console.log('📧 Lead submission API called');
  console.log('🔍 Environment check:');
  console.log('  - REACT_APP_RESEND_API_KEY:', process.env.REACT_APP_RESEND_API_KEY ? 'SET' : 'NOT SET');
  console.log('  - REACT_APP_TO_EMAIL:', process.env.REACT_APP_TO_EMAIL || 'NOT SET');
  console.log('  - FROM_EMAIL (using verified Resend domain): onboarding@resend.dev');

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if Resend API key is configured
    if (!process.env.REACT_APP_RESEND_API_KEY) {
      console.error('❌ REACT_APP_RESEND_API_KEY not configured');
      return res.status(503).json({ 
        error: 'Email service not configured. Please add REACT_APP_RESEND_API_KEY to environment variables.' 
      });
    }

    const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);

    const { leadData } = req.body;

    // Validate required fields
    if (!leadData || !leadData.name || !leadData.email || !leadData.description) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and description are required' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadData.email)) {
      return res.status(400).json({ 
        error: 'Invalid email address' 
      });
    }

    // Determine lead priority
    const getLeadPriority = (leadData) => {
      if (leadData.budget === 'enterprise' && leadData.timeline === 'asap') {
        return 'HIGH';
      }
      if (leadData.budget === 'professional' && (leadData.timeline === 'asap' || leadData.timeline === '1-3months')) {
        return 'MEDIUM';
      }
      return 'STANDARD';
    };

    const priority = getLeadPriority(leadData);

    // Generate HTML for lead notification
    const generateLeadNotificationHtml = (leadData, priority) => {
      const priorityColors = {
        'HIGH': '#dc3545',
        'MEDIUM': '#ffc107', 
        'STANDARD': '#28a745'
      };
      const priorityBgColors = {
        'HIGH': '#fff5f5',
        'MEDIUM': '#fffbf0',
        'STANDARD': '#f8fff8'
      };

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New ${priority} Lead - ${leadData.projectType} Project</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🎯 New ${priority} Lead!
              </h1>
              <p style="margin: 8px 0 0 0; color: #e2e8f0; font-size: 16px;">
                ${leadData.projectType.charAt(0).toUpperCase() + leadData.projectType.slice(1)} Project Inquiry
              </p>
            </div>

            <!-- Priority Badge -->
            <div style="padding: 20px 24px; text-align: center; background-color: ${priorityBgColors[priority]}; border-bottom: 1px solid #e2e8f0;">
              <span style="display: inline-block; padding: 8px 16px; background-color: ${priorityColors[priority]}; color: #ffffff; border-radius: 20px; font-weight: 600; font-size: 14px; text-transform: uppercase;">
                ${priority} Priority
              </span>
            </div>

            <!-- Lead Details Card -->
            <div style="padding: 24px; border-bottom: 1px solid #e2e8f0;">
              <h2 style="margin: 0 0 20px 0; color: #1a202c; font-size: 20px; font-weight: 600;">
                📋 Lead Information
              </h2>
              
              <div style="display: grid; gap: 16px;">
                <div style="display: flex; align-items: center; padding: 12px; background-color: #f7fafc; border-radius: 8px; border-left: 4px solid #667eea;">
                  <span style="font-weight: 600; color: #4a5568; min-width: 80px;">👤 Name:</span>
                  <span style="color: #2d3748; font-weight: 500;">${leadData.name}</span>
                </div>
                
                <div style="display: flex; align-items: center; padding: 12px; background-color: #f7fafc; border-radius: 8px; border-left: 4px solid #48bb78;">
                  <span style="font-weight: 600; color: #4a5568; min-width: 80px;">📧 Email:</span>
                  <a href="mailto:${leadData.email}" style="color: #667eea; text-decoration: none; font-weight: 500;">${leadData.email}</a>
                </div>
                
                ${leadData.phone ? `
                <div style="display: flex; align-items: center; padding: 12px; background-color: #f7fafc; border-radius: 8px; border-left: 4px solid #ed8936;">
                  <span style="font-weight: 600; color: #4a5568; min-width: 80px;">📱 Phone:</span>
                  <a href="tel:${leadData.phone}" style="color: #667eea; text-decoration: none; font-weight: 500;">${leadData.phone}</a>
                </div>
                ` : ''}
                
                ${leadData.company ? `
                <div style="display: flex; align-items: center; padding: 12px; background-color: #f7fafc; border-radius: 8px; border-left: 4px solid #9f7aea;">
                  <span style="font-weight: 600; color: #4a5568; min-width: 80px;">🏢 Company:</span>
                  <span style="color: #2d3748; font-weight: 500;">${leadData.company}</span>
                </div>
                ` : ''}
              </div>
            </div>

            <!-- Project Details Card -->
            <div style="padding: 24px; border-bottom: 1px solid #e2e8f0;">
              <h2 style="margin: 0 0 20px 0; color: #1a202c; font-size: 20px; font-weight: 600;">
                🚀 Project Details
              </h2>
              
              <div style="display: grid; gap: 12px;">
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; background-color: #f7fafc; border-radius: 8px;">
                  <span style="font-weight: 600; color: #4a5568;">Project Type:</span>
                  <span style="color: #2d3748; font-weight: 500; text-transform: capitalize;">${leadData.projectType.replace('fullstack', 'Full-Stack')}</span>
                </div>
                
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; background-color: #f7fafc; border-radius: 8px;">
                  <span style="font-weight: 600; color: #4a5568;">Budget:</span>
                  <span style="color: #2d3748; font-weight: 500; text-transform: capitalize;">${leadData.budget}</span>
                </div>
                
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; background-color: #f7fafc; border-radius: 8px;">
                  <span style="font-weight: 600; color: #4a5568;">Timeline:</span>
                  <span style="color: #2d3748; font-weight: 500; text-transform: capitalize;">${leadData.timeline.replace('asap', 'ASAP').replace('1-3months', '1-3 Months').replace('3-6months', '3-6 Months')}</span>
                </div>
              </div>
            </div>

            <!-- Description Card -->
            <div style="padding: 24px;">
              <h2 style="margin: 0 0 16px 0; color: #1a202c; font-size: 20px; font-weight: 600;">
                💬 Project Description
              </h2>
              <div style="padding: 16px; background-color: #f7fafc; border-radius: 8px; border-left: 4px solid #667eea;">
                <p style="margin: 0; color: #4a5568; line-height: 1.6; white-space: pre-wrap;">${leadData.description}</p>
              </div>
            </div>

            <!-- Action Button -->
            <div style="padding: 0 24px 24px 24px; text-align: center;">
              <a href="mailto:${leadData.email}?subject=Re: ${leadData.projectType.charAt(0).toUpperCase() + leadData.projectType.slice(1)} Project Inquiry&body=Hi ${leadData.name},%0D%0A%0D%0AThank you for your interest in my ${leadData.projectType} services. I'd love to discuss your project in more detail.%0D%0A%0D%0ABest regards,%0D%0ALuis" 
                 style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                📧 Reply to Lead
              </a>
            </div>

            <!-- Footer -->
            <div style="padding: 20px 24px; background-color: #f7fafc; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #718096; font-size: 14px;">
                🤖 Sent automatically by your portfolio chatbot
              </p>
              <p style="margin: 8px 0 0 0; color: #a0aec0; font-size: 12px;">
                Lead generated on ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    };

    // Generate HTML for welcome email
    const generateWelcomeEmailHtml = (leadData) => {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for your inquiry - Luis Santos</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                👋 Hello ${leadData.name}!
              </h1>
              <p style="margin: 8px 0 0 0; color: #e2e8f0; font-size: 16px;">
                Thank you for reaching out
              </p>
            </div>

            <!-- Main Content -->
            <div style="padding: 32px 24px;">
              <div style="background-color: #f7fafc; padding: 24px; border-radius: 12px; border-left: 4px solid #667eea; margin-bottom: 24px;">
                <h2 style="margin: 0 0 16px 0; color: #1a202c; font-size: 20px; font-weight: 600;">
                  ✅ Your ${leadData.projectType.charAt(0).toUpperCase() + leadData.projectType.slice(1)} Project Inquiry
                </h2>
                <p style="margin: 0; color: #4a5568; line-height: 1.6;">
                  Thank you for your inquiry. I've received your message and will carefully review your project needs. My goal is to ensure you get the right solution, and I'll be in touch shortly with more details on how we can move forward.
                </p>
              </div>

              <div style="margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px 0; color: #1a202c; font-size: 18px; font-weight: 600;">
                  ⏰ What's Next?
                </h3>
                <div style="background-color: #fffbf0; padding: 16px; border-radius: 8px; border-left: 4px solid #ffc107;">
                  <p style="margin: 0; color: #744210; font-weight: 500;">
                    I'll review your project details and get back to you within 
                    <strong>24-48 hours</strong> to discuss your needs in more detail.
                  </p>
                </div>
              </div>

              <div style="margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px 0; color: #1a202c; font-size: 18px; font-weight: 600;">
                  🔗 Explore My Work
                </h3>
                <div style="text-align: center;">
                  <a href="https://my-portfolio-jusu.vercel.app/" 
                     style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">
                    🚀 View My Portfolio
                  </a>
                </div>
              </div>

              <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                  <strong>Best regards,</strong><br/>
                  <span style="color: #667eea; font-weight: 600; font-size: 18px;">Luis Santos</span><br/>
                  <span style="color: #718096; font-size: 14px;">Senior IBM ODM Specialist & Full-Stack Developer</span>
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="padding: 20px 24px; background-color: #f7fafc; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #718096; font-size: 14px;">
                📧 This email was sent automatically from my portfolio chatbot
              </p>
              <p style="margin: 8px 0 0 0; color: #a0aec0; font-size: 12px;">
                Reply directly to this email to reach me
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    };

    // Use verified Resend domain for from email
    const fromEmail = 'onboarding@resend.dev'; // Always use verified Resend domain
    const toEmail = process.env.REACT_APP_TO_EMAIL || 'antonioluis.santos1@gmail.com';

    console.log('📧 Sending emails:');
    console.log('  - From:', fromEmail);
    console.log('  - To Luis:', toEmail);
    console.log('  - To Lead:', leadData.email);

    // Send lead notification email to Luis
    console.log('📤 Sending lead notification email...');
      const leadNotificationResult = await resend.emails.send({
        from: `Luis.dev <${fromEmail}>`,
        to: [toEmail],
        subject: `📋 ${priority} Priority Lead: ${leadData.name} wants ${leadData.projectType.charAt(0).toUpperCase() + leadData.projectType.slice(1)} services`,
        html: generateLeadNotificationHtml(leadData, priority),
      });

    console.log('📤 Lead notification result:', leadNotificationResult);

    // Send welcome email to the lead
    console.log('📤 Sending welcome email...');
      const welcomeEmailResult = await resend.emails.send({
        from: `Luis.dev <${fromEmail}>`,
        to: [leadData.email],
        subject: `👋 Thanks for your inquiry, ${leadData.name}! - Luis Santos`,
        html: generateWelcomeEmailHtml(leadData),
      });

    console.log('📤 Welcome email result:', welcomeEmailResult);

    if (leadNotificationResult.error) {
      console.error('❌ Lead notification error:', leadNotificationResult.error);
      throw new Error(`Lead notification failed: ${leadNotificationResult.error.message}`);
    }

    if (welcomeEmailResult.error) {
      console.error('❌ Welcome email error:', welcomeEmailResult.error);
      throw new Error(`Welcome email failed: ${welcomeEmailResult.error.message}`);
    }

    console.log('✅ Lead notification email sent:', leadNotificationResult.data?.id);
    console.log('✅ Welcome email sent:', welcomeEmailResult.data?.id);

    return res.status(200).json({ 
      success: true, 
      message: 'Lead submitted successfully',
      leadNotificationId: leadNotificationResult.data?.id,
      welcomeEmailId: welcomeEmailResult.data?.id
    });

  } catch (error) {
    console.error('❌ Lead submission error:', error);
    console.error('❌ Error stack:', error.stack);
    return res.status(500).json({ 
      error: 'Failed to submit lead',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
