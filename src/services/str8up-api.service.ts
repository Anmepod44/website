/**
 * str8up Map API Service
 * Handles all API calls for the str8up Map product
 */

import { apiClient } from '../lib/api-client';
import { logger } from '../lib/logger';
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

const STR8UP_BASE = '/str8map';

/**
 * Submit onboarding form data and initiate analysis
 */
export async function submitOnboarding(
  formData: OnboardingFormData
): Promise<OnboardingResponse> {
  const startTime = Date.now();
  const endpoint = `${STR8UP_BASE}/onboarding/start/`;
  
  // Map form data to API format
  const payload = {
    business_size: formData.businessSize,
    cloud_provider: formData.cloudProvider,
    complexity_score: formData.complexity,
    budget_range: formData.budget,
    risk_tolerance: formData.riskTolerance,
    compliance_type: formData.compliance || undefined,
  };

  // Log the request initiation
  logger.apiRequest('Starting onboarding submission', {
    method: 'POST',
    endpoint,
    payload: { ...payload, compliance_type: payload.compliance_type ? '[REDACTED]' : undefined }
  });

  logger.userAction('Submit Assessment Form', {}, {
    formData: {
      businessSize: formData.businessSize,
      cloudProvider: formData.cloudProvider,
      complexity: formData.complexity,
      budget: formData.budget,
      riskTolerance: formData.riskTolerance,
      hasCompliance: !!formData.compliance
    }
  });

  try {
    const response = await apiClient.post<{ sessionId: string }>(
      endpoint,
      payload
    );
    
    const duration = Date.now() - startTime;
    
    // Log successful response
    logger.apiRequest('Onboarding submission successful', {
      method: 'POST',
      endpoint,
      response: { sessionId: response.sessionId },
      duration,
      statusCode: 200
    }, { sessionId: response.sessionId });
    
    return {
      success: true,
      sessionId: response.sessionId,
      message: 'Analysis started successfully',
      processingEstimate: 5,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    
    // Log error
    logger.error('Onboarding submission failed', {}, {
      method: 'POST',
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration
    });
    
    // Re-throw error - no mock fallback
    throw error;
  }
}

/**
 * Check processing status
 */
export async function checkProcessingStatus(
  sessionId: string
): Promise<ProcessingResponse> {
  const startTime = Date.now();
  const endpoint = `${STR8UP_BASE}/processing/${sessionId}/`;

  try {
    const response = await apiClient.get<{
      sessionId: string;
      status: string;
      progress: number;
    }>(endpoint);
    
    const duration = Date.now() - startTime;
    
    // Log status check (only log significant status changes to avoid spam)
    if (response.status === 'COMPLETED' || response.status === 'FAILED' || response.progress % 25 === 0) {
      logger.apiRequest('Processing status check', {
        method: 'GET',
        endpoint,
        response: {
          status: response.status,
          progress: response.progress
        },
        duration,
        statusCode: 200
      }, { sessionId });
    }
    
    // Map API response to internal format
    const statusMap: Record<string, ProcessingResponse['status']> = {
      'PENDING': 'processing',
      'PROCESSING': 'processing',
      'COMPLETED': 'completed',
      'FAILED': 'failed',
    };
    
    const mappedStatus = statusMap[response.status] || 'processing';
    
    // Log completion or failure
    if (response.status === 'COMPLETED') {
      logger.userAction('Analysis Completed', { sessionId }, {
        finalProgress: response.progress,
        processingTime: duration
      });
    } else if (response.status === 'FAILED') {
      logger.error('Analysis Failed', { sessionId }, {
        finalProgress: response.progress,
        processingTime: duration
      });
    }
    
    return {
      status: mappedStatus,
      progress: response.progress,
      currentStep: response.status === 'PROCESSING' ? 'Analyzing infrastructure metrics' : undefined,
      estimatedTimeRemaining: response.progress < 100 ? Math.ceil((100 - response.progress) / 20) : 0,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.error('Processing status check failed', { sessionId }, {
      method: 'GET',
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration
    });
    
    // Re-throw error - no mock fallback
    throw error;
  }
}

/**
 * Get analysis results
 */
export async function getAnalysisResults(
  sessionId: string,
  formData?: OnboardingFormData
): Promise<AnalysisResponse> {
  const startTime = Date.now();
  const endpoint = `${STR8UP_BASE}/analysis/${sessionId}/`;

  logger.apiRequest('Fetching analysis results', {
    method: 'GET',
    endpoint
  }, { sessionId });

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
    }>(endpoint);
    
    const duration = Date.now() - startTime;
    
    // Debug log the raw API response structure
    logger.debug('Raw API response structure', { sessionId }, {
      responseKeys: Object.keys(response || {}),
      dataKeys: Object.keys(response.data || {}),
      recommendationsType: typeof response.data.recommendations,
      recommendationsValue: response.data.recommendations,
      riskAssessmentType: typeof response.data.risk_assessment,
      roadmapType: typeof response.data.implementation_roadmap
    });
    
    // Log successful results fetch with safe property access
    logger.apiRequest('Analysis results fetched successfully', {
      method: 'GET',
      endpoint,
      response: {
        overall_score: response.data.overall_score,
        recommendations_count: response.data.recommendations?.length || 0,
        security_score: response.data.risk_assessment?.security_score,
        compliance_score: response.data.risk_assessment?.compliance_score,
        cost_efficiency: response.data.risk_assessment?.cost_efficiency,
        raw_response_keys: Object.keys(response.data || {})
      },
      duration,
      statusCode: 200
    }, { sessionId });

    logger.userAction('View Analysis Results', { sessionId }, {
      overallScore: response.data.overall_score,
      recommendationsCount: response.data.recommendations?.length || 0,
      riskScores: response.data.risk_assessment || {},
      hasRecommendations: !!response.data.recommendations,
      hasRiskAssessment: !!response.data.risk_assessment,
      hasRoadmap: !!response.data.implementation_roadmap
    });
    
    // Transform API response to internal format
    const analysisData = transformApiResponseToAnalysisResults(response, formData);
    
    return {
      success: true,
      data: analysisData,
      message: 'Analysis completed successfully',
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.error('Failed to fetch analysis results', { sessionId }, {
      method: 'GET',
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration
    });
    
    // Re-throw error - no mock fallback
    throw error;
  }
}

/**
 * Submit CTA form and capture lead
 */
export async function submitCTAForm(
  formData: CTARequest
): Promise<CTAResponse> {
  const startTime = Date.now();
  const endpoint = `${STR8UP_BASE}/leads/capture/`;
  
  const payload = {
    sessionId: formData.sessionId,
    name: formData.name,
    email: formData.email,
    company: formData.company,
    phone: formData.phone,
  };

  // Log lead capture attempt (with PII redaction)
  logger.apiRequest('Capturing lead information', {
    method: 'POST',
    endpoint,
    payload: {
      sessionId: formData.sessionId,
      name: '[REDACTED]',
      email: '[REDACTED]',
      company: formData.company || '[NOT PROVIDED]',
      phone: formData.phone ? '[REDACTED]' : '[NOT PROVIDED]'
    }
  }, { sessionId: formData.sessionId });

  logger.userAction('Submit Contact Information', { sessionId: formData.sessionId }, {
    hasName: !!formData.name,
    hasEmail: !!formData.email,
    hasCompany: !!formData.company,
    hasPhone: !!formData.phone
  });

  try {
    const response = await apiClient.post<{
      success: boolean;
      leadId: number;
    }>(endpoint, payload);
    
    const duration = Date.now() - startTime;
    
    // Log successful lead capture
    logger.apiRequest('Lead captured successfully', {
      method: 'POST',
      endpoint,
      response: {
        success: response.success,
        leadId: response.leadId
      },
      duration,
      statusCode: 200
    }, { sessionId: formData.sessionId });

    logger.userAction('Lead Conversion Completed', { sessionId: formData.sessionId }, {
      leadId: response.leadId,
      conversionTime: duration
    });
    
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
    const duration = Date.now() - startTime;
    
    logger.error('Lead capture failed', { sessionId: formData.sessionId }, {
      method: 'POST',
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration
    });
    
    // Re-throw error - no mock fallback
    throw error;
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
 * Generate calculator data based on form inputs
 */
function generateCalculatorData(formData: OnboardingFormData) {
  const complexityFactor = formData.complexity / 100;
  const budgetMultiplier: Record<string, number> = {
    'under100k': 50000,
    '100k-500k': 150000,
    '500k-1m': 300000,
    '1m-5m': 500000,
    'over5m': 800000,
  };

  const baseSpend = budgetMultiplier[formData.budget] || 300000;
  const wasteFactor = 0.15 + (complexityFactor * 0.15); // 15-30% waste
  const estimatedWaste = Math.round(baseSpend * wasteFactor);
  const projectedSavings = Math.round(estimatedWaste * 0.7); // 70% of waste can be saved
  const transformationCost = Math.round(projectedSavings * 0.7); // ~70% of annual savings
  const roiPercent = Math.round((projectedSavings / transformationCost) * 100);

  return {
    estimated_base_spend: baseSpend,
    waste_factor: Number(wasteFactor.toFixed(2)),
    estimated_waste: estimatedWaste,
    projected_annual_savings: projectedSavings,
    estimated_transformation_cost: transformationCost,
    roi_percent: roiPercent,
  };
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
  const calculatorData = formData ? generateCalculatorData(formData) : {
    estimated_base_spend: 300000,
    waste_factor: 0.20,
    estimated_waste: 60000,
    projected_annual_savings: 42000,
    estimated_transformation_cost: 29400,
    roi_percent: 143,
  };

  // Transform recommendations to technical recommendations (with safety check)
  const technicalRecommendations = (apiResponse.data.recommendations || []).map(rec => ({
    title: rec.category || 'General Recommendation',
    description: `${rec.description || 'No description available'}${rec.impact ? '. ' + rec.impact : ''}`,
    priority: (rec.priority as 'critical' | 'high' | 'medium' | 'low') || 'medium',
  }));

  // Create timeline from implementation roadmap (with safety checks)
  const roadmap = apiResponse.data.implementation_roadmap || {};
  const timeline = [
    {
      phase: 'Phase 1 - Foundation',
      duration_months: 2,
      details: (roadmap.phase_1 || []).join(', ') || 'Foundation phase activities',
    },
    {
      phase: 'Phase 2 - Implementation',
      duration_months: 3,
      details: (roadmap.phase_2 || []).join(', ') || 'Implementation phase activities',
    },
    {
      phase: 'Phase 3 - Optimization',
      duration_months: 2,
      details: (roadmap.phase_3 || []).join(', ') || 'Optimization phase activities',
    },
  ];

  return {
    sessionId: apiResponse.sessionId,
    data: {
      calculator: calculatorData,
      llm: {
        timeline,
        risk_assessment: {
          technical: `Security score: ${apiResponse.data.risk_assessment?.security_score || 'N/A'}/100. Technical risk is moderate based on current infrastructure assessment.`,
          business: `Cost efficiency score: ${apiResponse.data.risk_assessment?.cost_efficiency || 'N/A'}/100. Business risk is low with high potential for cost savings.`,
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
            status: `Compliance score: ${apiResponse.data.risk_assessment?.compliance_score || 'N/A'}/100`,
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
      computed_overall_score: apiResponse.data.overall_score || 75,
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