const { Resend } = require('resend');

export default async function handler(req, res) {
  const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if Resend API key is configured
    if (!process.env.REACT_APP_RESEND_API_KEY) {
      return res.status(503).json({ 
        error: 'Email service not configured. Please add REACT_APP_RESEND_API_KEY to environment variables.' 
      });
    }

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
    };

    // Generate HTML for welcome email
    const generateWelcomeEmailHtml = (leadData) => {
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
    };

    const fromEmail = process.env.REACT_APP_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.REACT_APP_TO_EMAIL || 'antonioluis.santos1@gmail.com';

    // Send lead notification email to Luis
    const leadNotificationResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `🎯 New Lead: ${leadData.name} - ${leadData.projectType} Project (Priority: ${priority})`,
      html: generateLeadNotificationHtml(leadData, priority),
    });

    // Send welcome email to the lead
    const welcomeEmailResult = await resend.emails.send({
      from: fromEmail,
      to: [leadData.email],
      subject: `Thanks for your inquiry, ${leadData.name}!`,
      html: generateWelcomeEmailHtml(leadData),
    });

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
    return res.status(500).json({ 
      error: 'Failed to submit lead',
      details: error.message
    });
  }
}
