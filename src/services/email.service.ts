/**
 * Email Service for sending str8up Map analysis results
 */

import { 
  generateHTMLEmail, 
  generatePlainTextEmail, 
  generateEmailSubject 
} from '../templates/email/analysis-results';
import type { AnalysisResults } from '../types/str8up-map.types';

interface SendAnalysisEmailOptions {
  recipientName?: string;
  recipientEmail: string;
  results: AnalysisResults;
  ctaUrl?: string;
}

interface EmailPayload {
  to: string;
  from?: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Send analysis results via email
 * 
 * @param options Email configuration and analysis results
 * @returns Promise with success status
 */
export async function sendAnalysisResultsEmail(
  options: SendAnalysisEmailOptions
): Promise<{ success: boolean; message: string }> {
  try {
    const { recipientEmail, results } = options;
    
    // Generate email content
    const htmlContent = generateHTMLEmail(options);
    const textContent = generatePlainTextEmail(options);
    const subject = generateEmailSubject(results.meta.computed_overall_score);
    
    // Prepare email payload
    const emailPayload: EmailPayload = {
      to: recipientEmail,
      from: 'str8up@zahlentech.com', // Update with your actual sender email
      subject,
      html: htmlContent,
      text: textContent,
    };
    
    // Send via your email service provider
    // Option 1: Using your backend API
    const response = await sendViaBackendAPI(emailPayload);
    
    // Option 2: Using a third-party service (SendGrid, Mailgun, etc.)
    // const response = await sendViaThirdParty(emailPayload);
    
    return response;
  } catch (error) {
    console.error('Failed to send analysis email:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again later.',
    };
  }
}

/**
 * Send email via your backend API endpoint
 */
async function sendViaBackendAPI(payload: EmailPayload): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error('Email API request failed');
    }
    
    const data = await response.json();
    return {
      success: true,
      message: data.message || 'Email sent successfully',
    };
  } catch (error) {
    console.error('Backend API email send failed:', error);
    throw error;
  }
}

/**
 * Alternative: Send via SendGrid (example)
 * Uncomment and configure if using SendGrid
 */
/*
async function sendViaSendGrid(payload: EmailPayload): Promise<{ success: boolean; message: string }> {
  const SENDGRID_API_KEY = 'YOUR_SENDGRID_API_KEY'; // Use env variable in production
  
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: payload.to }],
            subject: payload.subject,
          },
        ],
        from: { email: payload.from || 'str8up@zahlentech.com' },
        content: [
          {
            type: 'text/plain',
            value: payload.text,
          },
          {
            type: 'text/html',
            value: payload.html,
          },
        ],
      }),
    });
    
    if (!response.ok) {
      throw new Error('SendGrid API request failed');
    }
    
    return {
      success: true,
      message: 'Email sent successfully via SendGrid',
    };
  } catch (error) {
    console.error('SendGrid email send failed:', error);
    throw error;
  }
}
*/

/**
 * Alternative: Send via Mailgun (example)
 * Uncomment and configure if using Mailgun
 */
/*
async function sendViaMailgun(payload: EmailPayload): Promise<{ success: boolean; message: string }> {
  const MAILGUN_API_KEY = 'YOUR_MAILGUN_API_KEY'; // Use env variable in production
  const MAILGUN_DOMAIN = 'YOUR_MAILGUN_DOMAIN';
  
  try {
    const formData = new FormData();
    formData.append('from', payload.from || 'str8up@zahlentech.com');
    formData.append('to', payload.to);
    formData.append('subject', payload.subject);
    formData.append('text', payload.text);
    formData.append('html', payload.html);
    
    const response = await fetch(
      `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
        },
        body: formData,
      }
    );
    
    if (!response.ok) {
      throw new Error('Mailgun API request failed');
    }
    
    return {
      success: true,
      message: 'Email sent successfully via Mailgun',
    };
  } catch (error) {
    console.error('Mailgun email send failed:', error);
    throw error;
  }
}
*/

/**
 * Preview email content (for development/testing)
 * Opens a new window with the HTML email content
 */
export function previewEmail(options: SendAnalysisEmailOptions): void {
  const htmlContent = generateHTMLEmail(options);
  const newWindow = window.open('', '_blank');
  
  if (newWindow) {
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  }
}

/**
 * Download email as HTML file (for testing)
 */
export function downloadEmailHTML(options: SendAnalysisEmailOptions, filename = 'analysis-results.html'): void {
  const htmlContent = generateHTMLEmail(options);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default {
  sendAnalysisResultsEmail,
  previewEmail,
  downloadEmailHTML,
};
