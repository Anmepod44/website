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
  generateMockAnalysisResults,
} from '../types/str8up-map.types';

const STR8UP_BASE = '/str8up';

/**
 * Submit onboarding form data and initiate analysis
 */
export async function submitOnboarding(
  formData: OnboardingFormData
): Promise<OnboardingResponse> {
  const payload: OnboardingRequest = {
    ...formData,
    timestamp: new Date().toISOString(),
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };

  try {
    const response = await apiClient.post<OnboardingResponse>(
      `${STR8UP_BASE}/onboarding`,
      payload
    );
    return response;
  } catch (error) {
    console.error('Onboarding submission failed:', error);
    
    // Mock response for development
    return {
      success: true,
      sessionId: payload.sessionId!,
      message: 'Analysis started successfully',
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
    const response = await apiClient.get<ProcessingResponse>(
      `${STR8UP_BASE}/processing/${sessionId}`
    );
    return response;
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
    const response = await apiClient.get<AnalysisResponse>(
      `${STR8UP_BASE}/results/${sessionId}`
    );
    return response;
  } catch (error) {
    console.error('Failed to fetch analysis results:', error);
    
    // Generate mock results for development
    if (formData) {
      return {
        success: true,
        data: generateMockAnalysisResults(formData),
        message: 'Analysis completed successfully',
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
  try {
    const response = await apiClient.post<CTAResponse>(
      `${STR8UP_BASE}/cta`,
      formData
    );
    return response;
  } catch (error) {
    console.error('CTA submission failed:', error);
    
    // Mock response for development
    return {
      success: true,
      message: 'Thank you! We\'ll be in touch within 24 hours.',
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

export default {
  submitOnboarding,
  checkProcessingStatus,
  getAnalysisResults,
  submitCTAForm,
  downloadAnalysisPDF,
  emailAnalysisResults,
};