# CORS Troubleshooting Guide

## Understanding the Error

```
Access to fetch at 'https://www.zahlentech.com/api/v1/str8map/onboarding/start/' 
from origin 'http://localhost:4173' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

This error occurs because:
1. Your frontend (`http://localhost:4173`) is trying to make requests to your backend (`https://www.zahlentech.com`)
2. These are different origins (different protocol, domain, or port)
3. The backend doesn't have CORS headers allowing the frontend origin

## Solutions

### 1. Backend CORS Configuration (Recommended)

Configure your backend API to allow requests from your frontend domains.

#### Django + django-cors-headers
```bash
pip install django-cors-headers
```

```python
# settings.py
INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    # ...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ...
]

# Production CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",   # Vite dev server
    "http://localhost:4173",   # Vite preview
    "http://localhost:5173",   # Alternative Vite port
    "https://your-production-domain.com",
]

# Development only (NOT for production)
# CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]
```

#### Express.js + cors
```bash
npm install cors
```

```javascript
const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:4173',
    'http://localhost:5173',
    'https://your-production-domain.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
```

#### FastAPI
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:4173", 
        "http://localhost:5173",
        "https://your-production-domain.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### Flask + flask-cors
```bash
pip install flask-cors
```

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:3000",
    "http://localhost:4173",
    "http://localhost:5173", 
    "https://your-production-domain.com"
])
```

### 2. Frontend Proxy (Development Only)

The Vite configuration has been updated to proxy API requests in development:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'https://www.zahlentech.com',
      changeOrigin: true,
      secure: true
    }
  }
}
```

This means in development:
- Frontend makes requests to `/api/v1/str8map/...`
- Vite proxies them to `https://www.zahlentech.com/api/v1/str8map/...`
- No CORS issues because the request appears to come from the same origin

### 3. Browser Extensions (Development Only)

**⚠️ NOT RECOMMENDED - Use only for testing**

Install a CORS browser extension like "CORS Unblock" but remember:
- Only works in your browser
- Not a solution for production
- Security risk if left enabled

## Testing CORS Configuration

### 1. Test with curl
```bash
# Test preflight request
curl -X OPTIONS \
  -H "Origin: http://localhost:4173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v \
  https://www.zahlentech.com/api/v1/str8map/onboarding/start/

# Should return CORS headers like:
# Access-Control-Allow-Origin: http://localhost:4173
# Access-Control-Allow-Methods: POST, GET, OPTIONS
# Access-Control-Allow-Headers: Content-Type
```

### 2. Test with Browser DevTools
1. Open Network tab
2. Make a request from your frontend
3. Look for:
   - **Preflight request** (OPTIONS method)
   - **CORS headers** in response
   - **Error messages** in console

### 3. Check Response Headers
Your backend should return these headers:
```
Access-Control-Allow-Origin: http://localhost:4173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

## Environment-Specific Solutions

### Development
```bash
# Use Vite proxy (already configured)
npm run dev

# API requests go to /api/v1/... and get proxied
```

### Production
```bash
# Backend MUST have CORS configured
# Frontend makes direct requests to https://www.zahlentech.com/api/v1/...
npm run build
npm run preview
```

## Common Issues & Solutions

### Issue 1: Preflight Request Failing
**Problem**: OPTIONS request returns 404 or 405
**Solution**: Ensure your backend handles OPTIONS requests for all endpoints

```python
# Django - add to urls.py or use django-cors-headers
# Express.js - cors middleware handles this automatically
# FastAPI - CORS middleware handles this automatically
```

### Issue 2: Credentials Not Allowed
**Problem**: `Access-Control-Allow-Credentials` header missing
**Solution**: Add credentials support to CORS config

```javascript
// Express.js
app.use(cors({ credentials: true }));

// Django
CORS_ALLOW_CREDENTIALS = True
```

### Issue 3: Headers Not Allowed
**Problem**: Custom headers blocked
**Solution**: Add headers to allowed list

```python
# Django
CORS_ALLOW_HEADERS = [
    'content-type',
    'authorization',
    'x-requested-with',
    # Add your custom headers here
]
```

### Issue 4: Methods Not Allowed
**Problem**: POST/PUT/DELETE requests blocked
**Solution**: Add methods to allowed list

```javascript
// Express.js
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
```

## Quick Fix Checklist

### Backend (Required for Production)
- [ ] Install CORS package for your framework
- [ ] Add frontend domains to allowed origins
- [ ] Allow required HTTP methods (GET, POST, PUT, DELETE, OPTIONS)
- [ ] Allow required headers (Content-Type, Authorization)
- [ ] Enable credentials if needed
- [ ] Test with curl or Postman

### Frontend (Development)
- [ ] Vite proxy is configured (✅ already done)
- [ ] Environment variables are set correctly
- [ ] Test with `npm run dev`

### Verification
- [ ] No CORS errors in browser console
- [ ] API requests succeed
- [ ] Network tab shows proper CORS headers
- [ ] Both preflight and actual requests work

## Production Deployment

When deploying to production:

1. **Backend**: Must have CORS configured with your production domain
2. **Frontend**: Will make direct API calls (no proxy)
3. **Domain**: Add your production domain to CORS allowed origins

```python
# Example production CORS config
CORS_ALLOWED_ORIGINS = [
    "https://your-production-domain.com",
    "https://www.your-production-domain.com",
]
```

Remember: The Vite proxy only works in development. Production requires proper CORS configuration on your backend.