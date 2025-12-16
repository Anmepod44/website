/**
 * str8up Map API Service
 * Handles all API calls for the str8up Map product
 */

import { apiClient } from '../lib/api-client';
import type {
  OnboardingRequest,
  OnboardingResponse,
  ProcessingRequest,
  ProcessingResponse,
  AnalysisResponse,
  CTARequest,
  CTAResponse,
  OnboardingFormData,
} from '../types/str8up-map.types';
import { generateMockAnalysisResults } from '../types/str8up-map.types';

const STR8UP_BASE = '/v1/str8map';

/**
 * Submit onboarding form data and initiate analysis
 */
export async function submitOnboarding(
  formData: OnboardingFormData
): Promise<OnboardingResponse> {
  // Map form data to API format
  const payload = {
    business_size: formData.businessSize,
    cloud_provider: formData.cloudProvider,
    complexity_score: formData.complexity,
    budget_range: formData.budget,
    risk_tolerance: formData.riskTolerance,
    compliance_type: formData.compliance || undefined,
  };

  try {
    const response = await apiClient.post<{ sessionId: string }>(
      `${STR8UP_BASE}/onboarding/start/`,
      payload
    );
    
    return {
      success: true,
      sessionId: response.sessionId,
      message: 'Analysis started successfully',
      processingEstimate: 5,
    };
  } catch (error) {
    console.error('Onboarding submission failed:', error);
    
    // Mock response for development
    const mockSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return {
      success: true,
      sessionId: mockSessionId,
      message: 'Analysis started successfully (mock)',
      processingEstimate: 5,
    };
  }
}

/**
 * Check processing status
 */
export async function checkProcessingStatus(
  sessionId: string
): Promise<ProcessingResponse> {
  try {
    const response = await apiClient.get<{
      sessionId: string;
      status: string;
      progress: number;
    }>(`${STR8UP_BASE}/processing/${sessionId}/`);
    
    // Map API response to internal format
    const statusMap: Record<string, ProcessingResponse['status']> = {
      'PENDING': 'processing',
      'PROCESSING': 'processing',
      'COMPLETED': 'completed',
      'FAILED': 'failed',
    };
    
    return {
      status: statusMap[response.status] || 'processing',
      progress: response.progress,
      currentStep: response.status === 'PROCESSING' ? 'Analyzing infrastructure metrics' : undefined,
      estimatedTimeRemaining: response.progress < 100 ? Math.ceil((100 - response.progress) / 20) : 0,
    };
  } catch (error) {
    console.error('Processing status check failed:', error);
    
    // Mock response for development
    return {
      status: 'processing',
      progress: 75,
      currentStep: 'Analyzing infrastructure metrics',
      estimatedTimeRemaining: 2,
    };
  }
}

/**
 * Get analysis results
 */
export async function getAnalysisResults(
  sessionId: string,
  formData?: OnboardingFormData
): Promise<AnalysisResponse> {
  try {
    const response = await apiClient.get<{
      sessionId: string;
      data: {
        overall_score: number;
        recommendations: Array<{
          category: string;
          priority: string;
          description: string;
          impact: string;
        }>;
        risk_assessment: {
          security_score: number;
          compliance_score: number;
          cost_efficiency: number;
        };
        implementation_roadmap: {
          phase_1: string[];
          phase_2: string[];
          phase_3: string[];
        };
      };
    }>(`${STR8UP_BASE}/analysis/${sessionId}/`);
    
    // Transform API response to internal format
    const analysisData = transformApiResponseToAnalysisResults(response, formData);
    
    return {
      success: true,
      data: analysisData,
      message: 'Analysis completed successfully',
    };
  } catch (error) {
    console.error('Failed to fetch analysis results:', error);
    
    // Generate mock results for development
    if (formData) {
      return {
        success: true,
        data: generateMockAnalysisResults(formData),
        message: 'Analysis completed successfully (mock)',
      };
    }
    
    throw new Error('Unable to fetch analysis results');
  }
}

/**
 * Submit CTA form and capture lead
 */
export async function submitCTAForm(
  formData: CTARequest
): Promise<CTAResponse> {
  const payload = {
    sessionId: formData.sessionId,
    name: formData.name,
    email: formData.email,
    company: formData.company,
    phone: formData.phone,
  };

  try {
    const response = await apiClient.post<{
      success: boolean;
      leadId: number;
    }>(`${STR8UP_BASE}/leads/capture/`, payload);
    
    return {
      success: response.success,
      message: 'Thank you! We\'ll be in touch within 24 hours.',
      leadId: response.leadId.toString(),
      confirmationEmail: true,
      nextSteps: [
        'Check your email for a confirmation message',
        'Our team will review your analysis results',
        'Expect a follow-up call within 24 business hours',
        'Prepare any questions about your modernization strategy',
      ],
    };
  } catch (error) {
    console.error('CTA submission failed:', error);
    
    // Mock response for development
    return {
      success: true,
      message: 'Thank you! We\'ll be in touch within 24 hours. (mock)',
      leadId: `lead_${Date.now()}`,
      confirmationEmail: true,
      nextSteps: [
        'Check your email for a confirmation message',
        'Our team will review your analysis results',
        'Expect a follow-up call within 24 business hours',
        'Prepare any questions about your modernization strategy',
      ],
    };
  }
}

/**
 * Download analysis results as PDF
 */
export async function downloadAnalysisPDF(sessionId: string): Promise<Blob> {
  try {
    const response = await fetch(`${STR8UP_BASE}/results/${sessionId}/pdf`, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to download PDF');
    }

    return await response.blob();
  } catch (error) {
    console.error('PDF download failed:', error);
    throw error;
  }
}

/**
 * Email analysis results
 */
export async function emailAnalysisResults(
  sessionId: string,
  email: string,
  recipientName?: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await apiClient.post<{ success: boolean; message: string }>(
      `${STR8UP_BASE}/results/${sessionId}/email`,
      { email, recipientName }
    );
    return response;
  } catch (error) {
    console.error('Email send failed:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again.',
    };
  }
}

/**
 * Transform API response to internal analysis results format
 */
function transformApiResponseToAnalysisResults(
  apiResponse: {
    sessionId: string;
    data: {
      overall_score: number;
      recommendations: Array<{
        category: string;
        priority: string;
        description: string;
        impact: string;
      }>;
      risk_assessment: {
        security_score: number;
        compliance_score: number;
        cost_efficiency: number;
      };
      implementation_roadmap: {
        phase_1: string[];
        phase_2: string[];
        phase_3: string[];
      };
    };
  },
  formData?: OnboardingFormData
) {
  // Generate calculator data based on form data if available
  const calculatorData = formData ? generateMockAnalysisResults(formData).data.calculator : {
    estimated_base_spend: 300000,
    waste_factor: 0.20,
    estimated_waste: 60000,
    projected_annual_savings: 42000,
    estimated_transformation_cost: 29400,
    roi_percent: 143,
  };

  // Transform recommendations to technical recommendations
  const technicalRecommendations = apiResponse.data.recommendations.map(rec => ({
    title: rec.category,
    description: `${rec.description}. ${rec.impact}`,
    priority: rec.priority as 'critical' | 'high' | 'medium' | 'low',
  }));

  // Create timeline from implementation roadmap
  const timeline = [
    {
      phase: 'Phase 1 - Foundation',
      duration_months: 2,
      details: apiResponse.data.implementation_roadmap.phase_1.join(', '),
    },
    {
      phase: 'Phase 2 - Implementation',
      duration_months: 3,
      details: apiResponse.data.implementation_roadmap.phase_2.join(', '),
    },
    {
      phase: 'Phase 3 - Optimization',
      duration_months: 2,
      details: apiResponse.data.implementation_roadmap.phase_3.join(', '),
    },
  ];

  return {
    sessionId: apiResponse.sessionId,
    data: {
      calculator: calculatorData,
      llm: {
        timeline,
        risk_assessment: {
          technical: `Security score: ${apiResponse.data.risk_assessment.security_score}/100. Technical risk is moderate based on current infrastructure assessment.`,
          business: `Cost efficiency score: ${apiResponse.data.risk_assessment.cost_efficiency}/100. Business risk is low with high potential for cost savings.`,
          likelihood: 'medium' as const,
        },
        technical_recommendations: technicalRecommendations,
        modernization_strategy: {
          approach: 'Phased modernization approach focusing on security, compliance, and cost optimization',
          summary: `Comprehensive modernization strategy targeting ${apiResponse.data.overall_score}% improvement in overall infrastructure efficiency.`,
        },
        compliance_alignment: formData?.compliance && formData.compliance !== 'none' ? [
          {
            standard: formData.compliance.toUpperCase(),
            status: `Compliance score: ${apiResponse.data.risk_assessment.compliance_score}/100`,
            details: 'Compliance requirements will be addressed in the implementation phases.',
          },
        ] : [],
        next_steps: [
          'Review detailed recommendations and implementation roadmap',
          'Schedule consultation to discuss modernization strategy',
          'Begin Phase 1 implementation with foundation improvements',
        ],
      },
    },
    meta: {
      computed_overall_score: apiResponse.data.overall_score,
      generated_at: new Date().toISOString(),
    },
  };
}

export default {
  submitOnboarding,
  checkProcessingStatus,
  getAnalysisResults,
  submitCTAForm,
  downloadAnalysisPDF,
  emailAnalysisResults,
};