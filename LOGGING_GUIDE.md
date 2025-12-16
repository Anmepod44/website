# Str8Map Logging Guide

## Overview
Comprehensive logging has been implemented to track all user interactions and API requests in the Str8Map application. This provides valuable insights into user behavior, API performance, and potential issues.

## Logging Architecture

### Logger Utility (`src/lib/logger.ts`)
- **Structured Logging**: All logs include timestamp, level, context, and metadata
- **Environment Aware**: Different behavior for development vs production
- **PII Protection**: Automatically redacts sensitive information
- **Extensible**: Easy to add new log types and integrate with external services

### Log Levels
- **DEBUG**: Detailed information for debugging (development only)
- **INFO**: General information about application flow
- **WARN**: Warning conditions that don't stop execution
- **ERROR**: Error conditions that may affect functionality

## What Gets Logged

### 1. User Actions
```typescript
// Examples of logged user actions:
- "Start Assessment Button Clicked"
- "Submit Assessment Form" 
- "View Analysis Results"
- "Submit Contact Information"
- "View CTA Button Clicked"
```

### 2. Stage Transitions
```typescript
// User journey tracking:
- "info → onboarding"
- "onboarding → processing" 
- "processing → results"
- "results → cta"
```

### 3. API Requests
```typescript
// All API calls with timing and response data:
- POST /str8map/onboarding/start/
- GET /str8map/processing/{sessionId}/
- GET /str8map/analysis/{sessionId}/
- POST /str8map/leads/capture/
```

### 4. System Events
```typescript
// Application lifecycle events:
- "Str8Map page loaded"
- "Analysis session started"
- "Analysis processing failed"
- "Str8Map page unloaded"
```

## Log Structure

### Standard Log Entry
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "INFO",
  "message": "User Action: Submit Assessment Form",
  "userAgent": "Mozilla/5.0...",
  "url": "https://yoursite.com/str8map",
  "sessionId": "session_1705312200000_abc123",
  "data": {
    "type": "USER_ACTION",
    "formData": {
      "businessSize": "medium",
      "cloudProvider": "aws",
      "complexity": 75,
      "budget": "$10k-50k",
      "riskTolerance": "medium",
      "hasCompliance": true
    }
  }
}
```

### API Request Log Entry
```json
{
  "timestamp": "2024-01-15T10:30:05.000Z",
  "level": "INFO", 
  "message": "Onboarding submission successful",
  "sessionId": "session_1705312200000_abc123",
  "data": {
    "api": {
      "method": "POST",
      "endpoint": "/str8map/onboarding/start/",
      "response": {
        "sessionId": "session_1705312200000_abc123"
      },
      "duration": 245,
      "statusCode": 200
    },
    "type": "API_REQUEST"
  }
}
```

## Privacy & Security

### PII Protection
Sensitive information is automatically redacted:
```typescript
// Original data
{
  name: "John Doe",
  email: "john@company.com", 
  phone: "+1-555-123-4567"
}

// Logged data
{
  name: "[REDACTED]",
  email: "[REDACTED]",
  phone: "[REDACTED]"
}
```

### What's NOT Logged
- Actual names, emails, phone numbers
- Compliance details (only presence/absence)
- Full form payloads (only metadata)
- Sensitive API responses

## Configuration

### Environment Variables
```bash
# Log level configuration
VITE_LOG_LEVEL=info        # Production
VITE_LOG_LEVEL=debug       # Development
```

### Log Levels by Environment
- **Development**: All logs to browser console with detailed formatting
- **Production**: Structured logs ready for external service integration

## Viewing Logs

### Development Mode
1. Open browser DevTools (F12)
2. Go to Console tab
3. Logs appear as expandable groups:
   ```
   [INFO] User Action: Submit Assessment Form
   ├── Details: { sessionId, formData, timestamp, ... }
   ```

### Production Mode
Logs are structured for integration with logging services like:
- **Datadog**: Uncomment and configure the fetch call in logger.ts
- **LogRocket**: Add LogRocket integration
- **Sentry**: Add Sentry integration
- **Custom Backend**: Send to your own logging endpoint

## Integration with External Services

### Example: Send to Backend
```typescript
// In logger.ts, uncomment and configure:
if (!this.isDevelopment) {
  fetch('/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(logEntry)
  }).catch(console.error);
}
```

### Example: Datadog Integration
```typescript
// Add to logger.ts
import { datadogLogs } from '@datadog/browser-logs';

// In sendLog method:
if (!this.isDevelopment) {
  datadogLogs.logger.info(logEntry.message, logEntry);
}
```

## Analytics Insights

### User Journey Analysis
Track conversion funnel:
1. **Page Load** → Info Stage
2. **Start Assessment** → Onboarding Stage  
3. **Form Submission** → Processing Stage
4. **View Results** → Results Stage
5. **Contact Submission** → Lead Conversion

### Performance Monitoring
- API response times
- Processing duration
- Error rates by endpoint
- User drop-off points

### Business Metrics
- Conversion rates by stage
- Most common form selections
- Time spent in each stage
- Error patterns and recovery

## Sample Log Queries

### Find All Sessions for a User
```javascript
// Filter logs by sessionId
logs.filter(log => log.sessionId === 'session_1705312200000_abc123')
```

### Track API Performance
```javascript
// Find slow API calls
logs.filter(log => 
  log.data?.type === 'API_REQUEST' && 
  log.data?.api?.duration > 1000
)
```

### Monitor Conversion Funnel
```javascript
// Count users by stage
const stageTransitions = logs.filter(log => 
  log.data?.type === 'STAGE_TRANSITION'
)
```

## Troubleshooting

### Common Issues

#### 1. Logs Not Appearing
- Check `VITE_LOG_LEVEL` environment variable
- Ensure browser console is open (development)
- Verify logger import in components

#### 2. Too Many Logs
- Increase log level to `warn` or `error`
- Filter by log type in console
- Implement log sampling for high-frequency events

#### 3. Missing Context
- Ensure sessionId is passed to all log calls
- Add more context data to log entries
- Check component state when logging

## Best Practices

### 1. Log Meaningful Events
- User interactions that indicate intent
- API calls and their outcomes
- Error conditions and recovery attempts
- Performance bottlenecks

### 2. Protect User Privacy
- Never log actual PII
- Use presence indicators (hasEmail vs actual email)
- Redact sensitive form fields
- Follow GDPR/privacy regulations

### 3. Structure for Analysis
- Use consistent message formats
- Include relevant context (sessionId, stage, etc.)
- Add metadata for filtering and grouping
- Use appropriate log levels

### 4. Monitor Performance
- Don't log in tight loops
- Use sampling for high-frequency events
- Batch logs for external services
- Consider log volume in production

This logging system provides comprehensive visibility into user behavior and system performance while maintaining privacy and security standards.