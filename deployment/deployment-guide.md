# Campus Pulse Production Deployment Guide

## 1. Environment Setup

Configure `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://nikhil:Nikhil%402006@cluster0.p3wjozu.mongodb.net/campus_pulse?retryWrites=true&w=majority
JWT_SECRET=campus_pulse_jwt_secret_key_2026_super_secure
NODE_ENV=production
```

## 2. Production Build Execution

From the root directory:
```bash
# Install dependencies
npm run install:all

# Build frontend production bundle
cd frontend && npm run build && cd ..

# Start backend REST API server (Serves static frontend dist)
cd backend && npm start
```

---

## 3. Production Verification

- **Production App**: `http://localhost:5000`
- **REST API Health**: `http://localhost:5000/api/health`
