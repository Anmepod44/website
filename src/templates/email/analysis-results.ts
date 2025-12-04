/**
 * Email Template for str8up Map Analysis Results
 * Generates both HTML and plain text versions
 */

import type { AnalysisResults } from '../../types/str8up-map.types';

interface EmailTemplateOptions {
  recipientName?: string;
  recipientEmail: string;
  results: AnalysisResults;
  ctaUrl?: string;
}

/**
 * Generate HTML email template
 */
export function generateHTMLEmail(options: EmailTemplateOptions): string {
  const { recipientName, results, ctaUrl } = options;
  const { calculator, llm } = results.data;
  const score = results.meta.computed_overall_score;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const wastePercent = Math.round(calculator.waste_factor * 100);
  const paybackMonths = Math.round(
    (calculator.estimated_transformation_cost / calculator.projected_annual_savings) * 12
  );

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your str8up Map Analysis Results</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; color: #1C2833;">
  
  <!-- Main Container -->
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        
        <!-- Content Wrapper -->
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8B4513 0%, #654321 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 2px;">ZAHLENTECH</h1>
              <p style="margin: 8px 0 0 0; color: #FFA500; font-size: 14px; letter-spacing: 1px;">STR8UP MAP ANALYSIS</p>
            </td>
          </tr>
          
          <!-- Greeting -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #1C2833;">
                ${recipientName ? `Dear ${recipientName},` : 'Hello,'}
              </p>
              <p style="margin: 16px 0 0 0; font-size: 16px; line-height: 1.6; color: #1C2833;">
                Thank you for completing the str8up Map modernization assessment. We've analyzed your infrastructure and generated a comprehensive margin-first modernization strategy tailored to your organization.
              </p>
            </td>
          </tr>
          
          <!-- Overall Score -->
          <tr>
            <td style="padding: 20px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #009B77 0%, #007A5E 100%); border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Modernization Readiness Score</p>
                    <h2 style="margin: 8px 0 0 0; color: #ffffff; font-size: 48px; font-weight: bold;">${score}%</h2>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Financial Summary -->
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #1C2833; font-size: 20px; border-bottom: 2px solid #009B77; padding-bottom: 8px;">Financial Impact Summary</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                    <strong style="color: #1C2833; font-size: 14px;">Estimated Annual Spend:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                    <span style="color: #1C2833; font-size: 14px;">${formatCurrency(calculator.estimated_base_spend)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                    <strong style="color: #1C2833; font-size: 14px;">Identified Waste (${wastePercent}%):</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                    <span style="color: #FF7800; font-size: 14px;">${formatCurrency(calculator.estimated_waste)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                    <strong style="color: #009B77; font-size: 14px;">Projected Annual Savings:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                    <span style="color: #009B77; font-size: 16px; font-weight: bold;">${formatCurrency(calculator.projected_annual_savings)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                    <strong style="color: #1C2833; font-size: 14px;">Transformation Investment:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                    <span style="color: #1C2833; font-size: 14px;">${formatCurrency(calculator.estimated_transformation_cost)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                    <strong style="color: #1C2833; font-size: 14px;">Return on Investment:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                    <span style="color: #009B77; font-size: 16px; font-weight: bold;">${calculator.roi_percent}%</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #1C2833; font-size: 14px;">Payback Period:</strong>
                  </td>
                  <td style="padding: 12px 0; text-align: right;">
                    <span style="color: #1C2833; font-size: 14px;">${paybackMonths} months</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Implementation Timeline -->
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #1C2833; font-size: 20px; border-bottom: 2px solid #009B77; padding-bottom: 8px;">Implementation Timeline</h2>
              
              ${llm.timeline.map((phase, index) => `
                <div style="margin-bottom: 16px; padding-left: 16px; border-left: 3px solid ${index === 0 ? '#009B77' : '#e0e0e0'};">
                  <p style="margin: 0 0 4px 0;">
                    <strong style="color: #1C2833; font-size: 15px;">Phase ${index + 1}: ${phase.phase}</strong>
                    <span style="color: #666; font-size: 13px; margin-left: 8px;">(${phase.duration_months} ${phase.duration_months === 1 ? 'month' : 'months'})</span>
                  </p>
                  <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.5;">${phase.details}</p>
                </div>
              `).join('')}
              
              <p style="margin: 16px 0 0 0; padding: 12px; background-color: #f0f9f7; border-radius: 4px; color: #1C2833; font-size: 14px;">
                <strong>Total Duration:</strong> ${llm.timeline.reduce((sum, p) => sum + p.duration_months, 0)} months
              </p>
            </td>
          </tr>
          
          <!-- Risk Assessment -->
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #1C2833; font-size: 20px; border-bottom: 2px solid #009B77; padding-bottom: 8px;">Risk Assessment</h2>
              
              <div style="margin-bottom: 12px;">
                <p style="margin: 0 0 4px 0;"><strong style="color: #1C2833; font-size: 14px;">Technical Risk:</strong></p>
                <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.6;">${llm.risk_assessment.technical}</p>
              </div>
              
              <div style="margin-bottom: 12px;">
                <p style="margin: 0 0 4px 0;"><strong style="color: #1C2833; font-size: 14px;">Business Risk:</strong></p>
                <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.6;">${llm.risk_assessment.business}</p>
              </div>
              
              <p style="margin: 12px 0 0 0; padding: 8px 12px; background-color: ${
                llm.risk_assessment.likelihood === 'low' ? '#d4edda' :
                llm.risk_assessment.likelihood === 'medium' ? '#fff3cd' : '#f8d7da'
              }; border-radius: 4px; color: #1C2833; font-size: 14px;">
                <strong>Overall Risk Likelihood:</strong> ${llm.risk_assessment.likelihood.toUpperCase()}
              </p>
            </td>
          </tr>
          
          <!-- Technical Recommendations -->
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #1C2833; font-size: 20px; border-bottom: 2px solid #009B77; padding-bottom: 8px;">Technical Recommendations</h2>
              
              ${llm.technical_recommendations.map((rec, index) => `
                <div style="margin-bottom: 16px; padding: 12px; background-color: #f9f9f9; border-radius: 4px; border-left: 3px solid ${
                  rec.priority === 'critical' ? '#dc3545' :
                  rec.priority === 'high' ? '#FF7800' :
                  rec.priority === 'medium' ? '#ffc107' : '#6c757d'
                };">
                  <p style="margin: 0 0 4px 0;">
                    <span style="display: inline-block; padding: 2px 8px; background-color: ${
                      rec.priority === 'critical' ? '#dc3545' :
                      rec.priority === 'high' ? '#FF7800' :
                      rec.priority === 'medium' ? '#ffc107' : '#6c757d'
                    }; color: #ffffff; font-size: 11px; text-transform: uppercase; border-radius: 3px; margin-right: 8px;">${rec.priority}</span>
                    <strong style="color: #1C2833; font-size: 15px;">${rec.title}</strong>
                  </p>
                  <p style="margin: 8px 0 0 0; color: #555; font-size: 14px; line-height: 1.5;">${rec.description}</p>
                </div>
              `).join('')}
            </td>
          </tr>
          
          <!-- Modernization Strategy -->
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #1C2833; font-size: 20px; border-bottom: 2px solid #009B77; padding-bottom: 8px;">Modernization Strategy</h2>
              
              <div style="margin-bottom: 12px;">
                <p style="margin: 0 0 4px 0;"><strong style="color: #1C2833; font-size: 14px;">Recommended Approach:</strong></p>
                <p style="margin: 0; color: #009B77; font-size: 15px; font-weight: 600;">${llm.modernization_strategy.approach}</p>
              </div>
              
              <div>
                <p style="margin: 0 0 4px 0;"><strong style="color: #1C2833; font-size: 14px;">Strategy Summary:</strong></p>
                <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.6;">${llm.modernization_strategy.summary}</p>
              </div>
            </td>
          </tr>
          
          ${llm.compliance_alignment && llm.compliance_alignment.length > 0 ? `
          <!-- Compliance Alignment -->
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #1C2833; font-size: 20px; border-bottom: 2px solid #009B77; padding-bottom: 8px;">Compliance Alignment</h2>
              
              ${llm.compliance_alignment.map((comp) => `
                <div style="margin-bottom: 12px; padding: 12px; background-color: #f0f9f7; border-radius: 4px;">
                  <p style="margin: 0 0 4px 0;"><strong style="color: #1C2833; font-size: 14px;">${comp.standard}</strong></p>
                  ${comp.status ? `<p style="margin: 0 0 4px 0; color: #666; font-size: 13px;">Status: ${comp.status}</p>` : ''}
                  ${comp.details ? `<p style="margin: 0; color: #555; font-size: 14px; line-height: 1.5;">${comp.details}</p>` : ''}
                </div>
              `).join('')}
            </td>
          </tr>
          ` : ''}
          
          <!-- Next Steps -->
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #1C2833; font-size: 20px; border-bottom: 2px solid #009B77; padding-bottom: 8px;">Recommended Next Steps</h2>
              
              <ol style="margin: 0; padding-left: 20px; color: #555; font-size: 14px; line-height: 1.8;">
                ${llm.next_steps.map(step => `<li style="margin-bottom: 8px;">${step}</li>`).join('')}
              </ol>
            </td>
          </tr>
          
          <!-- CTA Button -->
          ${ctaUrl ? `
          <tr>
            <td style="padding: 20px 30px; text-align: center;">
              <a href="${ctaUrl}" style="display: inline-block; padding: 14px 32px; background-color: #FF7800; color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 16px; font-weight: 600; transition: background-color 0.3s;">
                Schedule Your Consultation
              </a>
            </td>
          </tr>
          ` : ''}
          
          <!-- Footer Message -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f9f9f9;">
              <p style="margin: 0 0 12px 0; color: #1C2833; font-size: 14px; line-height: 1.6;">
                This analysis was generated on ${formatDate(results.meta.generated_at)} and is valid for 30 days. Market conditions and technology recommendations may change over time.
              </p>
              <p style="margin: 0; color: #1C2833; font-size: 14px; line-height: 1.6;">
                Our team of experts is ready to discuss your modernization strategy in detail. We'll work with you to refine this plan and ensure successful implementation.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #1C2833; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 20px; font-weight: bold; letter-spacing: 2px;">ZAHLENTECH</p>
              <p style="margin: 0 0 16px 0; color: #FFA500; font-size: 12px; letter-spacing: 1px;">TECHNOLOGY SOLUTIONS PROVIDER</p>
              <p style="margin: 0; color: #cccccc; font-size: 13px; line-height: 1.6;">
                Cloud Computing | AI Solutions | Digital Transformation
              </p>
              <p style="margin: 12px 0 0 0; color: #999999; font-size: 12px;">
                © ${new Date().getFullYear()} Zahlentech. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email template (fallback)
 */
export function generatePlainTextEmail(options: EmailTemplateOptions): string {
  const { recipientName, results, ctaUrl } = options;
  const { calculator, llm } = results.data;
  const score = results.meta.computed_overall_score;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const wastePercent = Math.round(calculator.waste_factor * 100);
  const paybackMonths = Math.round(
    (calculator.estimated_transformation_cost / calculator.projected_annual_savings) * 12
  );

  return `
═══════════════════════════════════════════════════════════════════
ZAHLENTECH - STR8UP MAP ANALYSIS RESULTS
═══════════════════════════════════════════════════════════════════

${recipientName ? `Dear ${recipientName},` : 'Hello,'}

Thank you for completing the str8up Map modernization assessment. We've 
analyzed your infrastructure and generated a comprehensive margin-first 
modernization strategy tailored to your organization.

───────────────────────────────────────────────────────────────────
MODERNIZATION READINESS SCORE: ${score}%
───────────────────────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════════
FINANCIAL IMPACT SUMMARY
═══════════════════════════════════════════════════════════════════

Estimated Annual Spend:        ${formatCurrency(calculator.estimated_base_spend)}
Identified Waste (${wastePercent}%):         ${formatCurrency(calculator.estimated_waste)}
Projected Annual Savings:      ${formatCurrency(calculator.projected_annual_savings)}
Transformation Investment:     ${formatCurrency(calculator.estimated_transformation_cost)}
Return on Investment:          ${calculator.roi_percent}%
Payback Period:                ${paybackMonths} months

═══════════════════════════════════════════════════════════════════
IMPLEMENTATION TIMELINE
═══════════════════════════════════════════════════════════════════

${llm.timeline.map((phase, index) => `
Phase ${index + 1}: ${phase.phase} (${phase.duration_months} ${phase.duration_months === 1 ? 'month' : 'months'})
${phase.details}
`).join('\n')}

Total Duration: ${llm.timeline.reduce((sum, p) => sum + p.duration_months, 0)} months

═══════════════════════════════════════════════════════════════════
RISK ASSESSMENT
═══════════════════════════════════════════════════════════════════

Technical Risk:
${llm.risk_assessment.technical}

Business Risk:
${llm.risk_assessment.business}

Overall Risk Likelihood: ${llm.risk_assessment.likelihood.toUpperCase()}

═══════════════════════════════════════════════════════════════════
TECHNICAL RECOMMENDATIONS
═══════════════════════════════════════════════════════════════════

${llm.technical_recommendations.map((rec, index) => `
${index + 1}. [${rec.priority.toUpperCase()}] ${rec.title}
   ${rec.description}
`).join('\n')}

═══════════════════════════════════════════════════════════════════
MODERNIZATION STRATEGY
═══════════════════════════════════════════════════════════════════

Recommended Approach:
${llm.modernization_strategy.approach}

Strategy Summary:
${llm.modernization_strategy.summary}

${llm.compliance_alignment && llm.compliance_alignment.length > 0 ? `
═══════════════════════════════════════════════════════════════════
COMPLIANCE ALIGNMENT
═══════════════════════════════════════════════════════════════════

${llm.compliance_alignment.map((comp) => `
Standard: ${comp.standard}
${comp.status ? `Status: ${comp.status}` : ''}
${comp.details || ''}
`).join('\n')}
` : ''}

═══════════════════════════════════════════════════════════════════
RECOMMENDED NEXT STEPS
═══════════════════════════════════════════════════════════════════

${llm.next_steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

${ctaUrl ? `
───────────────────────────────────────────────────────────────────
SCHEDULE YOUR CONSULTATION
───────────────────────────────────────────────────────────────────

${ctaUrl}
` : ''}

───────────────────────────────────────────────────────────────────

This analysis was generated on ${formatDate(results.meta.generated_at)} and 
is valid for 30 days. Market conditions and technology recommendations may 
change over time.

Our team of experts is ready to discuss your modernization strategy in 
detail. We'll work with you to refine this plan and ensure successful 
implementation.

───────────────────────────────────────────────────────────────────
ZAHLENTECH
Technology Solutions Provider
Cloud Computing | AI Solutions | Digital Transformation

© ${new Date().getFullYear()} Zahlentech. All rights reserved.
───────────────────────────────────────────────────────────────────
  `.trim();
}

/**
 * Generate email subject line
 */
export function generateEmailSubject(score: number): string {
  if (score >= 90) {
    return '🎯 Your str8up Map Results: Excellent Modernization Readiness';
  } else if (score >= 75) {
    return '✨ Your str8up Map Results: Strong Modernization Potential';
  } else if (score >= 60) {
    return '📊 Your str8up Map Results: Modernization Strategy Ready';
  } else {
    return '🚀 Your str8up Map Results: Transformation Opportunity Identified';
  }
}

export default {
  generateHTMLEmail,
  generatePlainTextEmail,
  generateEmailSubject,
};
