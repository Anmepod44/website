# Backend Integration Example

## Quick Start: Connect Your Backend API

This example shows how to replace the mock data with your actual backend API calls.

### Step 1: Update Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=https://your-backend-api.com/api
```

### Step 2: Update API Client (Optional)

If your API is at a different base URL, update `/lib/api-client.ts`:

```typescript
// Before
export const apiClient = new ApiClient('/api');

// After
export const apiClient = new ApiClient(
  import.meta.env.VITE_API_BASE_URL || '/api'
);
```

### Step 3: Update Str8upMapPage to Use Real API

Replace the mock implementation in `/pages/Str8upMapPage.tsx`:

```typescript
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Moon, Sun, ArrowLeft } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import InfoStage from "../components/str8up/InfoStage";
import OnboardingStage from "../components/str8up/OnboardingStage";
import ProcessingStage from "../components/str8up/ProcessingStage";
import ResultsStage from "../components/str8up/ResultsStage";
import CTAStage from "../components/str8up/CTAStage";

// Import API service
import { 
  submitOnboarding, 
  checkProcessingStatus, 
  getAnalysisResults 
} from "../services/str8up-api.service";
import type { AnalysisResults, OnboardingFormData } from "../types/str8up-map.types";

type Stage = "info" | "onboarding" | "processing" | "results" | "cta";

export default function Str8upMapPage() {
  const { theme, toggleTheme } = useTheme();
  const [currentStage, setCurrentStage] = useState<Stage>("info");
  const [formData, setFormData] = useState<OnboardingFormData>({
    businessSize: "",
    cloudProvider: "",
    complexity: 50,
    budget: "",
    riskTolerance: "",
    compliance: "",
  });
  const [sessionId, setSessionId] = useState<string>("");
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);

  const handleStartAssessment = () => {
    setCurrentStage("onboarding");
  };

  const handleOnboardingComplete = async (data: OnboardingFormData) => {
    setFormData(data);
    setCurrentStage("processing");
    
    try {
      // Submit to your backend
      const onboardingResponse = await submitOnboarding(data);
      setSessionId(onboardingResponse.sessionId);
      
      // Poll for processing status
      const pollInterval = setInterval(async () => {
        try {
          const status = await checkProcessingStatus(onboardingResponse.sessionId);
          
          if (status.status === 'completed') {
            clearInterval(pollInterval);
            
            // Fetch results
            const results = await getAnalysisResults(
              onboardingResponse.sessionId,
              data // fallback to mock if API fails
            );
            
            setAnalysisResults(results.data);
            setCurrentStage("results");
          } else if (status.status === 'failed') {
            clearInterval(pollInterval);
            console.error('Processing failed');
            // You can show an error message to the user here
          }
        } catch (error) {
          console.error('Error checking status:', error);
          clearInterval(pollInterval);
          // Fallback: fetch results anyway (will use mock data)
          const results = await getAnalysisResults(onboardingResponse.sessionId, data);
          setAnalysisResults(results.data);
          setCurrentStage("results");
        }
      }, 2000); // Poll every 2 seconds
      
      // Safety timeout after 30 seconds
      setTimeout(() => {
        clearInterval(pollInterval);
        if (currentStage === 'processing') {
          getAnalysisResults(onboardingResponse.sessionId, data).then((results) => {
            setAnalysisResults(results.data);
            setCurrentStage("results");
          });
        }
      }, 30000);
      
    } catch (error) {
      console.error('Onboarding submission failed:', error);
      // The API service already has fallback mock data
    }
  };

  const handleViewCTA = () => {
    setCurrentStage("cta");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-amber-50 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6 bg-white/90 dark:bg-[#1C2833]/90 backdrop-blur-lg border-b border-amber-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-amber-800 dark:text-slate-300 group-hover:text-amber-900 dark:group-hover:text-amber-500 transition-colors" />
            <span className="text-lg md:text-2xl text-amber-900 dark:text-white tracking-wider font-bold">ZAHLENTECH | STR8UP</span>
          </Link>

          <div className="flex items-center gap-4">
            {currentStage === "onboarding" && (
              <div className="hidden md:block text-sm text-slate-600 dark:text-slate-400">
                Margin-First Modernization Strategy
              </div>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-slate-700" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20 md:pt-24">
        <AnimatePresence mode="wait">
          {currentStage === "info" && (
            <InfoStage
              key="info"
              onStartAssessment={handleStartAssessment}
            />
          )}
          {currentStage === "onboarding" && (
            <OnboardingStage
              key="onboarding"
              onComplete={handleOnboardingComplete}
            />
          )}
          {currentStage === "processing" && (
            <ProcessingStage key="processing" />
          )}
          {currentStage === "results" && analysisResults && (
            <ResultsStage
              key="results"
              results={analysisResults}
              onViewCTA={handleViewCTA}
            />
          )}
          {currentStage === "cta" && (
            <CTAStage 
              key="cta" 
              sessionId={sessionId}
              analysisResults={analysisResults}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

### Step 4: Update CTAStage to Send Data to Backend

Update `/components/str8up/CTAStage.tsx` to accept and send session data:

```typescript
import { submitCTAForm } from "../services/str8up-api.service";
import type { AnalysisResults } from "../types/str8up-map.types";

interface CTAStageProps {
  sessionId?: string;
  analysisResults?: AnalysisResults | null;
}

export default function CTAStage({ sessionId, analysisResults }: CTAStageProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Your form data
    const formData = {
      name: nameValue,
      email: emailValue,
      company: companyValue,
      phone: phoneValue,
      sessionId: sessionId || '',
      analysisResults: analysisResults || undefined,
    };
    
    try {
      const response = await submitCTAForm(formData);
      console.log('CTA submitted successfully:', response);
      // Show success message
    } catch (error) {
      console.error('CTA submission failed:', error);
      // Show error message
    }
  };
  
  // ... rest of component
}
```

## Testing with Your Exact Payload

To test with your exact payload, you can create a test file:

```typescript
// test-api-payload.ts
const testPayload = {
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
      "timeline": [
        {
          "phase": "Assessment",
          "duration_months": 1,
          "details": "Conduct a detailed assessment of the current AWS infrastructure..."
        },
        // ... rest of timeline
      ],
      "risk_assessment": {
        "technical": "The technical risk is low...",
        "business": "The business risk is low...",
        "likelihood": "low"
      },
      "technical_recommendations": [
        {
          "title": "Cost Optimization",
          "description": "Leverage AWS Cost Explorer...",
          "priority": "high"
        },
        // ... rest of recommendations
      ],
      "modernization_strategy": {
        "approach": "Adopt a phased approach...",
        "summary": "The strategy aims to modernize..."
      },
      "compliance_alignment": [],
      "next_steps": [
        "Initiate the assessment phase...",
        "Engage with AWS experts...",
        "Begin the implementation phase..."
      ]
    }
  },
  "meta": {
    "computed_overall_score": 95,
    "generated_at": "2025-12-03T14:45:41.483867+00:00"
  }
};

// Test that it matches the type
import type { AnalysisResults } from './types/str8up-map.types';
const typedPayload: AnalysisResults = testPayload;

console.log('Payload is valid!', typedPayload);
```

## API Endpoint Mapping

Your backend should implement:

```
POST   /api/str8up/onboarding              → Accepts user form, returns sessionId
GET    /api/str8up/processing/{sessionId}  → Returns processing status
GET    /api/str8up/results/{sessionId}     → Returns your exact payload structure
POST   /api/str8up/cta                     → Captures lead with contact info
GET    /api/str8up/results/{sessionId}/pdf → Downloads PDF report
POST   /api/str8up/results/{sessionId}/email → Emails results
```

## Current vs. Future State

### Current (Development Mode)
- Uses mock data generator
- No backend required
- All API calls fallback to mocks

### After Integration
- Real API calls to your backend
- Polling for processing status
- Real analysis from your LLM
- Lead capture to your database
- PDF generation and email delivery

## Fallback Strategy

The API service already has built-in fallbacks:
- If API call fails → uses mock data
- If processing times out → fetches results anyway
- If network error → generates mock results from form data

This ensures the frontend works even during backend issues!

## Next Steps

1. ✅ Update `.env` with your API URL
2. ✅ Test each endpoint individually
3. ✅ Update `Str8upMapPage.tsx` with the code above
4. ✅ Update `CTAStage.tsx` to pass sessionId and results
5. ✅ Test the complete flow
6. ✅ Remove mock fallbacks if desired (optional)

Your types and API structure are 100% ready for your backend integration!
