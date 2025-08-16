export const resendConfig = {
  apiKey: process.env.RESEND_API_KEY,
  fromEmail: process.env.FROM_EMAIL || 'noreply@ampvendingmachines.com',
  toEmail: process.env.TO_EMAIL || 'ampdesignandconsulting@gmail.com',
};

export async function sendEmail(config: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  if (!resendConfig.apiKey) {
    console.log('📧 Development mode - email would be sent:', config.subject);
    return { success: true, id: `dev-${Date.now()}` };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.from || resendConfig.fromEmail,
        to: [config.to],
        subject: config.subject,
        html: config.html,
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Email send failed');
    }

    return { success: true, id: result.id };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}