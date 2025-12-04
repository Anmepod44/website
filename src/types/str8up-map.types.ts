/**
 * Type definitions for str8up Map product
 * Defines all request and response objects for the str8up Map user journey
 */

// ============================================================================
// ONBOARDING STAGE - Input Collection
// ============================================================================

export interface OnboardingFormData {
  businessSize: 'small' | 'medium' | 'large' | '';
  cloudProvider: 'aws' | 'azure' | 'gcp' | 'hybrid' | '';
  complexity: number; // 0-100 scale
  budget: 'under100k' | '100k-500k' | '500k-1m' | '1m-5m' | 'over5m' | '';
  riskTolerance: 'low' | 'medium' | 'high' | '';
  compliance: 'none' | 'hipaa' | 'pci' | 'sox' | 'gdpr' | 'multiple' | '';
}

export interface OnboardingRequest {
  businessSize: string;
  cloudProvider: string;
  complexity: number;
  budget: string;
  riskTolerance: string;
  compliance: string;
  timestamp?: string;
  sessionId?: string;
}

export interface OnboardingResponse {
  success: boolean;
  sessionId: string;
  message: string;
  processingEstimate?: number; // in seconds
}

// ============================================================================
// PROCESSING STAGE - Analysis
// ============================================================================

export interface ProcessingRequest {
  sessionId: string;
}

export interface ProcessingResponse {
  status: 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  currentStep?: string;
  estimatedTimeRemaining?: number; // in seconds
}

// ============================================================================
// RESULTS STAGE - Analysis Results
// ============================================================================

export interface CalculatorData {
  estimated_base_spend: number;
  waste_factor: number;
  estimated_waste: number;
  projected_annual_savings: number;
  estimated_transformation_cost: number;
  roi_percent: number;
}

export interface TimelinePhase {
  phase: string;
  duration_months: number;
  details: string;
}

export interface RiskAssessment {
  technical: string;
  business: string;
  likelihood: 'low' | 'medium' | 'high';
}

export interface TechnicalRecommendation {
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface ModernizationStrategy {
  approach: string;
  summary: string;
}

export interface ComplianceAlignment {
  standard?: string;
  status?: string;
  details?: string;
}

export interface LLMAnalysisData {
  timeline: TimelinePhase[];
  risk_assessment: RiskAssessment;
  technical_recommendations: TechnicalRecommendation[];
  modernization_strategy: ModernizationStrategy;
  compliance_alignment: ComplianceAlignment[];
  next_steps: string[];
}

export interface AnalysisResults {
  sessionId: string;
  data: {
    calculator: CalculatorData;
    llm: LLMAnalysisData;
  };
  meta: {
    computed_overall_score: number;
    generated_at: string;
  };
}

export interface AnalysisResponse {
  success: boolean;
  data: AnalysisResults;
  message?: string;
}

// ============================================================================
// CTA STAGE - Lead Capture
// ============================================================================

export interface CTAFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  sessionId?: string;
}

export interface CTARequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  sessionId: string;
  analysisResults?: Partial<AnalysisResults>;
}

export interface CTAResponse {
  success: boolean;
  message: string;
  leadId?: string;
  confirmationEmail?: boolean;
  nextSteps?: string[];
}

// ============================================================================
// ERROR RESPONSES
// ============================================================================

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type ApiResponse<T> = T | ApiError;

export function isApiError(response: unknown): response is ApiError {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    response.success === false &&
    'error' in response
  );
}

// ============================================================================
// MOCK DATA GENERATORS (for development)
// ============================================================================

export function generateMockAnalysisResults(
  input: OnboardingFormData
): AnalysisResults {
  const complexityFactor = input.complexity / 100;
  const budgetMultiplier = {
    'under100k': 50000,
    '100k-500k': 150000,
    '500k-1m': 300000,
    '1m-5m': 500000,
    'over5m': 800000,
    '': 300000,
  };

  const baseSpend = budgetMultiplier[input.budget] || 300000;
  const wasteFactor = 0.15 + (complexityFactor * 0.15); // 15-30% waste
  const estimatedWaste = Math.round(baseSpend * wasteFactor);
  const projectedSavings = Math.round(estimatedWaste * 0.7); // 70% of waste can be saved
  const transformationCost = Math.round(projectedSavings * 0.7); // ~70% of annual savings
  const roiPercent = Math.round((projectedSavings / transformationCost) * 100);

  return {
    sessionId: `session_${Date.now()}`,
    data: {
      calculator: {
        estimated_base_spend: baseSpend,
        waste_factor: Number(wasteFactor.toFixed(2)),
        estimated_waste: estimatedWaste,
        projected_annual_savings: projectedSavings,
        estimated_transformation_cost: transformationCost,
        roi_percent: roiPercent,
      },
      llm: {
        timeline: [
          {
            phase: 'Assessment',
            duration_months: 1,
            details: `Conduct a detailed assessment of the current ${input.cloudProvider.toUpperCase()} infrastructure, including cost analysis, performance metrics, and security posture.`,
          },
          {
            phase: 'Planning',
            duration_months: 1,
            details: 'Develop a detailed modernization plan focusing on cost optimization, performance improvement, and scalability.',
          },
          {
            phase: 'Implementation',
            duration_months: Math.ceil(2 + complexityFactor * 3), // 2-5 months based on complexity
            details: 'Execute the modernization plan, including migrating to more cost-effective services, implementing automation, and enhancing security measures.',
          },
          {
            phase: 'Optimization',
            duration_months: 1,
            details: 'Fine-tune the infrastructure for optimal performance and cost efficiency. Implement monitoring and alerting systems.',
          },
          {
            phase: 'Review',
            duration_months: 1,
            details: 'Conduct a post-implementation review to ensure all objectives are met and identify areas for further improvement.',
          },
        ],
        risk_assessment: {
          technical: `The technical risk is ${input.riskTolerance || 'moderate'} due to ${input.cloudProvider.toUpperCase()} infrastructure dependencies and migration complexity. ${input.riskTolerance === 'low' ? 'However, using proven cloud services significantly reduces these risks.' : 'A phased migration approach will help mitigate these risks.'}`,
          business: `The business risk is ${input.riskTolerance === 'high' ? 'moderate' : 'low'} as the modernization is aimed at cost reduction and performance improvement, aligning with business goals.`,
          likelihood: (input.riskTolerance || 'medium') as 'low' | 'medium' | 'high',
        },
        technical_recommendations: [
          {
            title: 'Cost Optimization',
            description: `Leverage ${input.cloudProvider.toUpperCase()} cost management tools to identify underutilized resources and implement Reserved Instances or Savings Plans where applicable.`,
            priority: 'high',
          },
          {
            title: 'Performance Enhancement',
            description: `Utilize auto-scaling and load balancing to ensure applications can handle varying loads efficiently.`,
            priority: 'medium',
          },
          {
            title: 'Security Improvement',
            description: `Implement Identity and Access Management (IAM) best practices and enable advanced threat protection.`,
            priority: 'high',
          },
        ],
        modernization_strategy: {
          approach: `Adopt a phased approach focusing on cost optimization, performance enhancement, and security improvement using ${input.cloudProvider.toUpperCase()} native tools and services.`,
          summary: `The strategy aims to modernize the ${input.cloudProvider.toUpperCase()} infrastructure by optimizing costs, improving performance, and enhancing security, while maintaining a ${input.riskTolerance || 'low'} risk profile.`,
        },
        compliance_alignment: input.compliance && input.compliance !== 'none' ? [
          {
            standard: input.compliance.toUpperCase(),
            status: 'Requires Assessment',
            details: `Compliance with ${input.compliance.toUpperCase()} standards will be evaluated during the assessment phase.`,
          },
        ] : [],
        next_steps: [
          `Initiate the assessment phase by gathering current ${input.cloudProvider.toUpperCase()} usage data and performance metrics.`,
          `Engage with ${input.cloudProvider.toUpperCase()} experts to validate the modernization plan and ensure alignment with best practices.`,
          'Begin the implementation phase with a focus on quick wins in cost savings and performance improvements.',
        ],
      },
    },
    meta: {
      computed_overall_score: Math.floor(90 - complexityFactor * 15 - (input.riskTolerance === 'high' ? 5 : 0)),
      generated_at: new Date().toISOString(),
    },
  };
}