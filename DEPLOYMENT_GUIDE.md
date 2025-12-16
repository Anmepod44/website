# Str8Map Deployment Guide

## 🚀 Running the Production Build

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Your backend API running at `https://www.zahlentech.com/api/v1`

---

## Development Mode

### Start Development Server
```bash
npm run dev
```
- **URL**: http://localhost:5173
- **Features**: Hot reload, real-time API integration
- **API**: Requires backend API to be running

---

## Production Build

### 1. Build for Production
```bash
npm run build
```
**What this does**:
- Creates optimized bundle in `/build` directory
- Minifies JavaScript and CSS
- Optimizes images and assets
- Generates production-ready files

### 2. Preview Production Build Locally
```bash
npm run preview
```
- **URL**: http://localhost:4173
- **Purpose**: Test production build before deployment

### 3. Serve on Custom Port
```bash
npm run serve
```
- **URL**: http://localhost:3000
- **Purpose**: Preview on port 3000

---

## Deployment Options

### Option 1: Static Hosting (Recommended)
Deploy the `/build` directory to any static hosting service:

#### Netlify
```bash
# Build and deploy
npm run build
# Upload /build directory to Netlify
```

#### Vercel
```bash
# Build and deploy
npm run build
# Upload /build directory to Vercel
```

#### AWS S3 + CloudFront
```bash
# Build
npm run build

# Upload to S3
aws s3 sync build/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Option 2: Server Deployment
Deploy to a server with Node.js:

```bash
# On your server
git clone your-repo
cd your-repo
npm install
npm run build

# Serve with a static server
npx serve -s build -l 3000
```

---

## Environment Configuration

### Production Environment
Create `.env` file:
```bash
VITE_API_BASE_URL=https://www.zahlentech.com/api/v1
```

### Development Environment
Create `.env.local` file:
```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## API Integration Checklist

Before deploying, ensure your backend API is ready:

### ✅ Required Endpoints
- [ ] `POST /str8map/onboarding/start/` - Start analysis
- [ ] `GET /str8map/processing/{sessionId}/` - Check status  
- [ ] `GET /str8map/analysis/{sessionId}/` - Get results
- [ ] `POST /str8map/leads/capture/` - Capture leads

### ✅ CORS Configuration
Ensure your backend allows requests from your frontend domain:
```python
# Example Django CORS settings
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-domain.com",
    "http://localhost:5173",  # For development
]
```

### ✅ API Response Format
Verify your API returns the expected response format as documented in the API integration guide.

---

## Testing the Deployment

### 1. Functional Testing
- [ ] Complete the assessment form
- [ ] Verify real-time progress updates
- [ ] Check analysis results display
- [ ] Test lead capture form
- [ ] Verify error handling

### 2. Network Testing
Open browser DevTools → Network tab:
- [ ] API calls go to correct endpoints
- [ ] No CORS errors
- [ ] Proper error responses
- [ ] Session management works

### 3. Performance Testing
- [ ] Page loads quickly
- [ ] Images are optimized
- [ ] JavaScript bundle is minified
- [ ] CSS is optimized

---

## Troubleshooting

### Common Issues

#### 1. API Endpoint Errors
**Problem**: `404 Not Found` or CORS errors
**Solution**: 
- Check API base URL in `.env`
- Verify backend CORS settings
- Ensure API endpoints are deployed

#### 2. Build Failures
**Problem**: Build command fails
**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 3. Environment Variables Not Working
**Problem**: API calls go to wrong URL
**Solution**:
- Ensure `.env` file is in project root
- Restart development server after changing `.env`
- Check environment variable name starts with `VITE_`

#### 4. API Connection Issues
**Problem**: Application shows errors or doesn't work
**Solution**:
- Verify API endpoints are accessible
- Check network tab for failed API calls
- Ensure backend is running and reachable
- Verify CORS settings on backend

---

## Monitoring & Analytics

### Add Monitoring (Optional)
```typescript
// Add to your API service
console.log('API Request:', endpoint, payload);
console.log('API Response:', response);

// Add error tracking
if (error) {
  // Send to your error tracking service
  console.error('API Error:', error);
}
```

### Performance Monitoring
- Monitor API response times
- Track user completion rates
- Monitor error rates by endpoint

---

## Security Considerations

### Environment Variables
- Never commit `.env` files with sensitive data
- Use different API keys for dev/prod if applicable
- Ensure HTTPS in production

### API Security
- Implement rate limiting on backend
- Validate all input data
- Use HTTPS for all API calls
- Consider API authentication if needed

---

## Quick Start Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Test production build locally
npm run preview

# Deploy (example with Netlify CLI)
npm run build && netlify deploy --prod --dir=build
```

Your Str8Map application is now ready for production deployment! 🎉