# Str8Map Request Flow & Walkthrough

## Overview
The Str8Map solution follows a 5-stage user journey with real-time API integration for cloud infrastructure assessment and lead capture.

## Complete Request Flow

### 1. **Info Stage** → **Onboarding Stage**
**User Action**: Clicks "Start Assessment"
- **Frontend**: Transitions from InfoStage to OnboardingStage
- **No API calls**: Pure UI transition

---

### 2. **Onboarding Stage** → **Processing Stage**
**User Action**: Completes assessment form and submits

#### Request Flow:
```
Frontend Form Data → API Request → Backend Processing → Frontend Polling
```

#### Step 2.1: Form Submission
**API Call**: `POST /str8map/onboarding/start/`

**Request Payload**:
```json
{
  "business_size": "medium",
  "cloud_provider": "aws", 
  "complexity_score": 75,
  "budget_range": "$10k-50k",
  "risk_tolerance": "medium",
  "compliance_type": "SOC2"
}
```

**Response**:
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Frontend Action**:
- Stores `sessionId` in state
- Transitions to ProcessingStage
- Starts polling for status

---

### 3. **Processing Stage** → **Results Stage**
**Automated Process**: Real-time status polling

#### Step 3.1: Status Polling (Every 2 seconds)
**API Call**: `GET /str8map/processing/{sessionId}/`

**Response Examples**:
```json
// Still Processing
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "PROCESSING",
  "progress": 50
}

// Completed
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000", 
  "status": "COMPLETED",
  "progress": 100
}
```

**Frontend Behavior**:
- Updates progress bar in real-time
- Continues polling until `status === "COMPLETED"`
- On completion, fetches analysis results

#### Step 3.2: Fetch Analysis Results
**API Call**: `GET /str8map/analysis/{sessionId}/`

**Response**:
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "data": {
    "overall_score": 85,
    "recommendations": [
      {
        "category": "Security",
        "priority": "high",
        "description": "Implement multi-factor authentication",
        "impact": "Reduces security risk by 40%"
      }
    ],
    "risk_assessment": {
      "security_score": 78,
      "compliance_score": 92,
      "cost_efficiency": 71
    },
    "implementation_roadmap": {
      "phase_1": ["Enable CloudTrail", "Setup IAM policies"],
      "phase_2": ["Implement monitoring", "Optimize storage"],
      "phase_3": ["Advanced security controls", "Automation"]
    }
  }
}
```

**Frontend Action**:
- Transforms API response to internal format
- Transitions to ResultsStage
- Displays analysis results

---

### 4. **Results Stage** → **CTA Stage**
**User Action**: Clicks "Get Implementation Plan"

**Frontend Action**:
- Transitions to CTAStage
- Passes `sessionId` for lead capture

---

### 5. **CTA Stage** → **Completion**
**User Action**: Submits contact information

#### Step 5.1: Lead Capture
**API Call**: `POST /str8map/leads/capture/`

**Request Payload**:
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john.doe@company.com",
  "company": "Tech Corp Inc",
  "phone": "+1-555-123-4567"
}
```

**Response**:
```json
{
  "success": true,
  "leadId": 123
}
```

**Frontend Action**:
- Shows success message
- Displays next steps
- Provides contact options

---

## Technical Implementation Details

### Frontend State Management
```typescript
// Main Page State
const [currentStage, setCurrentStage] = useState<Stage>("info");
const [sessionId, setSessionId] = useState<string>("");
const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
const [processingProgress, setProcessingProgress] = useState(0);
```

### API Service Architecture
```typescript
// Service Layer
src/services/str8up-api.service.ts
├── submitOnboarding()     → POST /str8map/onboarding/start/
├── checkProcessingStatus() → GET /str8map/processing/{sessionId}/
├── getAnalysisResults()   → GET /str8map/analysis/{sessionId}/
└── submitCTAForm()        → POST /str8map/leads/capture/
```

### Error Handling
- **Network Errors**: Clear error messages and retry options
- **API Timeouts**: Stop polling and show error state
- **Invalid Sessions**: Clear error messages and restart options
- **Production Mode**: All API calls must succeed - no fallbacks

---

## Complete User Journey Timeline

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│             │    │              │    │             │    │             │    │             │
│ Info Stage  │───▶│ Onboarding   │───▶│ Processing  │───▶│ Results     │───▶│ CTA Stage   │
│             │    │ Stage        │    │ Stage       │    │ Stage       │    │             │
│             │    │              │    │             │    │             │    │             │
└─────────────┘    └──────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                     │                   │                   │                   │
      │                     │                   │                   │                   │
   No API              POST /start/        GET /processing/    GET /analysis/     POST /leads/
                           │                   │                   │                   │
                           ▼                   ▼                   ▼                   ▼
                    Returns sessionId    Polls every 2s      Fetches results    Captures lead
```

---

## API Endpoint Summary

| Stage | Method | Endpoint | Purpose |
|-------|--------|----------|---------|
| Onboarding | `POST` | `/str8map/onboarding/start/` | Start analysis, get sessionId |
| Processing | `GET` | `/str8map/processing/{sessionId}/` | Poll status & progress |
| Results | `GET` | `/str8map/analysis/{sessionId}/` | Fetch completed analysis |
| CTA | `POST` | `/str8map/leads/capture/` | Capture lead information |

---

## Data Transformation Flow

### 1. Form Data → API Format
```typescript
// Frontend Form
{
  businessSize: "medium",
  cloudProvider: "aws",
  complexity: 75,
  budget: "$10k-50k",
  riskTolerance: "medium",
  compliance: "SOC2"
}

// API Payload
{
  business_size: "medium",
  cloud_provider: "aws", 
  complexity_score: 75,
  budget_range: "$10k-50k",
  risk_tolerance: "medium",
  compliance_type: "SOC2"
}
```

### 2. API Response → Internal Format
```typescript
// API Response
{
  overall_score: 85,
  recommendations: [...],
  risk_assessment: {...},
  implementation_roadmap: {...}
}

// Internal Format
{
  sessionId: "...",
  data: {
    calculator: { /* cost calculations */ },
    llm: {
      timeline: [...],
      risk_assessment: {...},
      technical_recommendations: [...],
      modernization_strategy: {...}
    }
  },
  meta: {
    computed_overall_score: 85,
    generated_at: "2024-01-15T10:30:00Z"
  }
}
```

---

## Running the Solution

### Development Mode
```bash
npm run dev
# Runs on http://localhost:5173
# Requires backend API to be running
```

### Production Build
```bash
npm run build
# Creates optimized build in /build directory
# Uses real API endpoints
```

### Production Deployment
```bash
npm run preview
# Preview production build locally
# Or deploy /build directory to your hosting platform
```

---

This flow ensures a seamless user experience with real-time feedback, proper error handling, and complete data capture for your sales pipeline. All API endpoints must be functional for the application to work.