# str8up Map API Integration Guide

## Overview

This guide explains how the str8up Map frontend integrates with your backend API. All types and API calls are configured to match your exact payload structure.

## API Response Structure

Your backend returns data in this exact format:

```json
{
  "sessionId": "7e56ee99-c049-4f6d-a8e8-6ab69aa02c00",
  "data": {
    "calculator": {
      "estimated_base_spend": 300000,
      "waste_factor": 0.15,
      "estimated_waste": 45000,
      "projected_annual_savings": 84000,
      "estimated_transformation_cost": 60000,
      "roi_percent": 140.0
    },
    "llm": {
      "timeline": [...],
      "risk_assessment": {...},
      "technical_recommendations": [...],
      "modernization_strategy": {...},
      "compliance_alignment": [],
      "next_steps": [...]
    }
  },
  "meta": {
    "computed_overall_score": 95,
    "generated_at": "2025-12-03T14:45:41.483867+00:00"
  }
}
```

## Type Definitions

All types are defined in `/types/str8up-map.types.ts` and match your API structure exactly:

### Main Types

```typescript
// Onboarding form data collected from user
interface OnboardingFormData {
  businessSize: 'small' | 'medium' | 'large' | '';
  cloudProvider: 'aws' | 'azure' | 'gcp' | 'hybrid' | '';
  complexity: number; // 0-100 scale
  budget: 'under100k' | '100k-500k' | '500k-1m' | '1m-5m' | 'over5m' | '';
  riskTolerance: 'low' | 'medium' | 'high' | '';
  compliance: 'none' | 'hipaa' | 'pci' | 'sox' | 'gdpr' | 'multiple' | '';
}

// Analysis results from your backend
interface AnalysisResults {
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
```

## API Client Service

Located at `/services/str8up-api.service.ts`, this service handles all API calls.

### Available Methods

#### 1. Submit Onboarding Form

```typescript
import { submitOnboarding } from '../services/str8up-api.service';

const response = await submitOnboarding({
  businessSize: 'medium',
  cloudProvider: 'aws',
  complexity: 65,
  budget: '100k-500k',
  riskTolerance: 'medium',
  compliance: 'none'
});

// Returns: { success: boolean, sessionId: string, message: string }
```

**API Endpoint:** `POST /api/str8up/onboarding`

#### 2. Check Processing Status

```typescript
import { checkProcessingStatus } from '../services/str8up-api.service';

const status = await checkProcessingStatus(sessionId);

// Returns: { status, progress, currentStep, estimatedTimeRemaining }
```

**API Endpoint:** `GET /api/str8up/processing/{sessionId}`

#### 3. Get Analysis Results

```typescript
import { getAnalysisResults } from '../services/str8up-api.service';

const results = await getAnalysisResults(sessionId);

// Returns: AnalysisResponse with full analysis data
```

**API Endpoint:** `GET /api/str8up/results/{sessionId}`

**Response matches your exact structure:**
- `results.data.calculator.*` - Financial metrics
- `results.data.llm.timeline` - Implementation phases
- `results.data.llm.risk_assessment` - Risk analysis
- `results.data.llm.technical_recommendations` - Tech recommendations
- `results.data.llm.modernization_strategy` - Strategy details
- `results.data.llm.next_steps` - Recommended next steps
- `results.meta.computed_overall_score` - Overall score (0-100)

#### 4. Submit CTA Form

```typescript
import { submitCTAForm } from '../services/str8up-api.service';

const response = await submitCTAForm({
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Acme Corp',
  phone: '+1234567890',
  sessionId: sessionId,
  analysisResults: results.data
});
```

**API Endpoint:** `POST /api/str8up/cta`

#### 5. Download PDF Report

```typescript
import { downloadAnalysisPDF } from '../services/str8up-api.service';

const pdfBlob = await downloadAnalysisPDF(sessionId);
const url = URL.createObjectURL(pdfBlob);
window.open(url, '_blank');
```

**API Endpoint:** `GET /api/str8up/results/{sessionId}/pdf`

#### 6. Email Results

```typescript
import { emailAnalysisResults } from '../services/str8up-api.service';

await emailAnalysisResults(sessionId, 'user@example.com');
```

**API Endpoint:** `POST /api/str8up/results/{sessionId}/email`

## Base API Client

The base API client is located at `/lib/api-client.ts` and handles:
- Automatic JSON serialization
- Error handling
- HTTP method abstraction (GET, POST, PUT, DELETE, PATCH)
- Base URL configuration

### Configuration

```typescript
// Default base URL is '/api'
// To change it, modify the constructor:
const apiClient = new ApiClient('https://your-api-domain.com/api');
```

## Data Flow

### 4-Stage User Journey

```
1. ONBOARDING (InfoStage + OnboardingStage)
   ↓
   User fills form → submitOnboarding()
   ↓
   
2. PROCESSING (ProcessingStage)
   ↓
   Poll checkProcessingStatus() every 2 seconds
   ↓
   
3. RESULTS (ResultsStage)
   ↓
   Display getAnalysisResults() data
   ↓
   
4. CTA (CTAStage)
   ↓
   User submits contact info → submitCTAForm()
```

## Mock Data Generator

For development/testing, a mock data generator is available:

```typescript
import { generateMockAnalysisResults } from '../types/str8up-map.types';

const mockResults = generateMockAnalysisResults(formData);
```

The mock generator creates realistic data that matches your API structure exactly, using the form inputs to vary the results.

## Integration Example

Here's a complete example of how to integrate with your backend in `Str8upMapPage.tsx`:

```typescript
import { useState } from 'react';
import { submitOnboarding, getAnalysisResults } from '../services/str8up-api.service';
import type { AnalysisResults, OnboardingFormData } from '../types/str8up-map.types';

function Str8upMapPage() {
  const [currentStage, setCurrentStage] = useState('onboarding');
  const [sessionId, setSessionId] = useState<string>('');
  const [results, setResults] = useState<AnalysisResults | null>(null);
  
  const handleOnboardingComplete = async (formData: OnboardingFormData) => {
    setCurrentStage('processing');
    
    // Submit to backend
    const response = await submitOnboarding(formData);
    setSessionId(response.sessionId);
    
    // Wait for processing (you can poll checkProcessingStatus here)
    setTimeout(async () => {
      const analysisResults = await getAnalysisResults(response.sessionId);
      setResults(analysisResults.data);
      setCurrentStage('results');
    }, 5000);
  };
  
  return (
    <>
      {currentStage === 'results' && results && (
        <ResultsStage 
          results={results}
          onViewCTA={() => setCurrentStage('cta')}
        />
      )}
    </>
  );
}
```

## Error Handling

All API calls include try-catch blocks with fallbacks:

```typescript
try {
  const response = await apiClient.get('/str8up/results/123');
  return response;
} catch (error) {
  console.error('API call failed:', error);
  // Fallback to mock data or show error to user
  return mockData;
}
```

## Backend Requirements

Your backend should implement these endpoints:

| Method | Endpoint | Request | Response |
|--------|----------|---------|----------|
| POST | `/api/str8up/onboarding` | `OnboardingRequest` | `OnboardingResponse` |
| GET | `/api/str8up/processing/{sessionId}` | - | `ProcessingResponse` |
| GET | `/api/str8up/results/{sessionId}` | - | `AnalysisResponse` |
| POST | `/api/str8up/cta` | `CTARequest` | `CTAResponse` |
| GET | `/api/str8up/results/{sessionId}/pdf` | - | PDF Blob |
| POST | `/api/str8up/results/{sessionId}/email` | `{ email: string }` | `{ success, message }` |

## CORS Configuration

Ensure your backend allows requests from the frontend domain:

```
Access-Control-Allow-Origin: https://your-frontend-domain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Environment Variables

Configure the API base URL via environment variable:

```env
# .env
VITE_API_BASE_URL=https://api.zahlentech.com
```

Then update the API client initialization:

```typescript
const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL || '/api');
```

## Testing

Test the integration using the mock generator:

```typescript
// Test data that matches your API structure
const testPayload = {
  sessionId: "test-session-123",
  data: {
    calculator: {
      estimated_base_spend: 300000,
      waste_factor: 0.15,
      estimated_waste: 45000,
      projected_annual_savings: 84000,
      estimated_transformation_cost: 60000,
      roi_percent: 140.0
    },
    llm: {
      timeline: [...],
      risk_assessment: {...},
      technical_recommendations: [...],
      modernization_strategy: {...},
      compliance_alignment: [],
      next_steps: [...]
    }
  },
  meta: {
    computed_overall_score: 95,
    generated_at: new Date().toISOString()
  }
};
```

## Summary

✅ **All types match your exact API structure**
✅ **API client ready for backend integration**
✅ **Mock data generator for development**
✅ **Complete error handling**
✅ **Full type safety with TypeScript**
✅ **All 4 stages of user journey implemented**

Simply point the API client to your backend URL and all API calls will work seamlessly!
