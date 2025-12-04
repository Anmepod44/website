# Quick Reference - Email Template System

## 🚀 One-Minute Setup

```typescript
// 1. Import
import { sendAnalysisResultsEmail } from './services/email.service';

// 2. Send
await sendAnalysisResultsEmail({
  recipientEmail: 'user@example.com',
  results: analysisResults
});
```

Done! ✅

## 📋 Common Tasks

### Preview Email
```typescript
import { previewEmail } from './services/email.service';
previewEmail({ recipientEmail: 'test@example.com', results });
```

### Add Email Button to Page
```typescript
import EmailResultsButton from './components/EmailResultsButton';
<EmailResultsButton results={results} />
```

### Test with Mock Data
```typescript
import { generateMockAnalysisResults } from './types/str8up-map.types';
const mock = generateMockAnalysisResults({ /* form data */ });
```

### Download Email HTML
```typescript
import { downloadEmailHTML } from './services/email.service';
downloadEmailHTML({ recipientEmail: 'test@example.com', results });
```

## 🔧 Backend Endpoint

```typescript
POST /api/str8up/results/{sessionId}/email

Body: {
  "email": "user@example.com",
  "recipientName": "John Doe"  // optional
}

Response: {
  "success": true,
  "message": "Email sent successfully"
}
```

## 📧 Email Providers

### SendGrid
```typescript
SENDGRID_API_KEY=your_key
```

### Mailgun
```typescript
MAILGUN_API_KEY=your_key
MAILGUN_DOMAIN=mg.yourdomain.com
```

### Custom Backend
```typescript
VITE_API_BASE_URL=https://api.yourdomain.com
```

## 📝 Email Contains

- ✅ Overall Score (95%)
- ✅ Financial Summary ($84K savings, 140% ROI)
- ✅ Timeline (7 months, 5 phases)
- ✅ Risk Assessment (Low/Medium/High)
- ✅ 3 Technical Recommendations
- ✅ Modernization Strategy
- ✅ Next Steps (3 items)
- ✅ CTA Button (optional)

## 🎨 Customize

### Colors
```typescript
// In /templates/email/analysis-results.ts
PRIMARY = '#009B77'  // Green
ACCENT = '#FF7800'   // Orange
DARK = '#1C2833'     // Brown
```

### Company Name
```typescript
// Search and replace in template
ZAHLENTECH → YOUR COMPANY
```

### CTA Text
```typescript
"Schedule Your Consultation" → "Book Now"
```

## 📂 File Structure

```
/templates/email/
  └── analysis-results.ts      ← Email templates

/services/
  ├── email.service.ts         ← Send/preview functions
  └── str8up-api.service.ts    ← API integration

/components/
  └── EmailResultsButton.tsx   ← UI component

/types/
  └── str8up-map.types.ts      ← Data types

Documentation:
  ├── EMAIL_TEMPLATE_GUIDE.md
  ├── EXAMPLE_EMAIL_INTEGRATION.md
  ├── EMAIL_SYSTEM_SUMMARY.md
  └── QUICK_REFERENCE.md       ← You are here
```

## ⚡ Functions

| Function | Purpose |
|----------|---------|
| `generateHTMLEmail()` | Create HTML email |
| `generatePlainTextEmail()` | Create text version |
| `generateEmailSubject()` | Dynamic subject line |
| `sendAnalysisResultsEmail()` | Send email |
| `previewEmail()` | Open in browser |
| `downloadEmailHTML()` | Save as file |

## 🧪 Testing

```bash
# 1. Preview
npm run dev
# Click "Preview Email" button

# 2. Download
# Click download icon (👁️) button

# 3. Send Test
# Enter your email, click "Send Email"
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Email not sent | Check API key, logs |
| Broken layout | Test in previewEmail() |
| Missing data | Verify AnalysisResults type |
| Not received | Check spam, verify address |

## 📞 Support

1. Check documentation: `EMAIL_TEMPLATE_GUIDE.md`
2. View examples: `EXAMPLE_EMAIL_INTEGRATION.md`
3. Full details: `EMAIL_SYSTEM_SUMMARY.md`

## ✨ Features

- 🎨 Professional design
- 📱 Mobile responsive
- 📧 Multi-provider support
- 🧪 Testing utilities
- 📝 Plain text fallback
- 🎯 Type-safe
- 🚀 Production-ready

---

**Your email system is ready!** Just configure your email provider and start sending. 🎉
