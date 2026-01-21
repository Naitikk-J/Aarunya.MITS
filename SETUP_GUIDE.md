# AARUNYA Festival - Complete Registration System Setup

## Quick Start Guide

This system includes a **React Frontend** + **Express Backend** with registration, authentication, email notifications, and unique AARUNYA ID generation.

## What's Included

### Frontend (React + TypeScript)
- ✅ Modern registration form with all required fields
- ✅ Success screen displaying unique AARUNYA ID
- ✅ Terms & conditions acceptance checkbox
- ✅ Login page supporting email/AARUNYA ID/Google
- ✅ Cyberpunk-themed UI

### Backend (Node.js + Express)
- ✅ User registration API with data validation
- ✅ Auto-generated unique AARUNYA IDs (Format: `AAR-XXXXX-XXXXX`)
- ✅ Email notifications via Nodemailer with HTML template
- ✅ Multi-method authentication (email, AARUNYA ID, Google)
- ✅ Password encryption with bcryptjs
- ✅ JWT-based sessions (7-day expiration)

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│          React Frontend (Vite + TypeScript)          │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  Register    │  │    Login     │  │   Pages    │ │
│  │   Component  │  │  Component   │  │            │ │
│  └──────────────┘  └──────────────┘  └────────────┘ │
└────────────────────────┬───────────────────────────┘
                         │ HTTP/REST API
                         ▼
┌─────────────────────────────────────────────────────┐
│       Express Backend (Node.js + TypeScript)         │
│  ┌──────────────────────────────────────────────┐  │
│  │  Authentication Routes (/api/auth/*)         │  │
│  │  - POST /register      (Create user)          │  │
│  │  - POST /login         (Email/AARUNYA ID)    │  │
│  │  - POST /google        (Google OAuth)        │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │  Services                                     │  │
│  │  - Password Hashing (bcryptjs)               │  │
│  │  - AARUNYA ID Generation                     │  │
│  │  - JWT Token Management                      │  │
│  │  - Email Notifications (Nodemailer)          │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │  In-Memory Database (Development)             │  │
│  │  → Migrate to MongoDB/PostgreSQL for Prod     │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
           ┌─────────────────────────────┐
           │   Nodemailer SMTP Server    │
           │   (Gmail/Custom SMTP)       │
           └─────────────────────────────┘
```

## Installation Steps

### 1. Clone/Open Project
```bash
cd /Users/naitik/Desktop/Aarunya-5/euphoria-campus-explorer
```

### 2. Setup Frontend Dependencies
```bash
npm install
```

### 3. Setup Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 4. Configure Environment Variables

#### Create `.env` file in root directory:
```bash
# Copy the example file
cp .env.example .env
```

#### Edit `.env` with your Gmail credentials:
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

JWT_SECRET=your-super-secret-key-at-least-32-characters-long

# Gmail Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@aarunya.in
```

### 5. Get Gmail App Password

1. Go to [Google Account](https://myaccount.google.com/)
2. Click **Security** in left menu
3. Enable **2-Step Verification** (if not already)
4. Go to **App passwords**
5. Select **Mail** → **Windows Computer** (or your device type)
6. Google generates a 16-character password
7. Copy this and paste into `EMAIL_PASSWORD` in `.env`

## Running the System

### Option 1: Run Frontend Only (without backend)
```bash
npm run dev
# Open http://localhost:5173
```

### Option 2: Run Backend Only
```bash
cd server
npm run dev
# Server runs on http://localhost:3001
```

### Option 3: Run Both Frontend & Backend Together (Recommended)
```bash
npm run dev:all
# Frontend: http://localhost:5173
# Backend: http://localhost:3001
```

Or in separate terminals:

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
```

## Testing the Registration Flow

### 1. Open Frontend
```
http://localhost:5173/register
```

### 2. Fill Registration Form
- Full Name: John Doe
- Email: your-email@gmail.com
- Mobile: +91 9999999999
- College: MIT Manipal
- Category: Student
- City: Manipal
- Password: TestPass123@
- Accept Terms: ✓

### 3. Click REGISTER
- ✅ You'll see success screen with AARUNYA ID
- 📧 Check your email for confirmation (might be in spam)

### 4. Try Login
```
http://localhost:5173/login
```

**Login using Email:**
- Input: your-email@gmail.com
- Password: TestPass123@

**OR Login using AARUNYA ID:**
- Input: AAR-ABC12345-DEFGH
- Password: TestPass123@

## API Endpoints Reference

### Register New User
```bash
POST http://localhost:3001/api/auth/register

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123@",
  "mobileNumber": "+91 9999999999",
  "collegeName": "MIT Manipal",
  "category": "student",
  "city": "Manipal"
}
```

**Response:**
```json
{
  "message": "Registration successful. Check your email for confirmation.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_1705892400000",
    "name": "John Doe",
    "email": "john@example.com",
    "aarunyaId": "AAR-XYZ91234-ABCDE"
  }
}
```

### Login with Email
```bash
POST http://localhost:3001/api/auth/login

{
  "identifier": "john@example.com",
  "password": "SecurePass123@"
}
```

### Login with AARUNYA ID
```bash
POST http://localhost:3001/api/auth/login

{
  "identifier": "AAR-XYZ91234-ABCDE",
  "password": "SecurePass123@"
}
```

### Google OAuth Login
```bash
POST http://localhost:3001/api/auth/google

{
  "googleId": "google_user_id_123...",
  "email": "user@gmail.com",
  "name": "John Doe"
}
```

## Email Template Features

Registration confirmation email includes:
- 🎨 Cyberpunk design with cyan/pink theme
- 👤 Personalized greeting
- 🆔 **Unique AARUNYA ID** (highlighted)
- ✨ Festival features & benefits
- 🔗 Login button linking to frontend
- 💡 Pro tips for using AARUNYA ID
- 📧 Plain text + HTML versions

## AARUNYA ID Format

```
AAR-[4 Random Chars/Numbers]-[5 Random Chars/Numbers]
```

**Examples:**
- `AAR-ABC12345-DEFGH`
- `AAR-XYZ91234-KLMNO`
- `AAR-123ABCD-PQRST`

## File Structure

```
euphoria-campus-explorer/
├── src/
│   ├── pages/
│   │   ├── Register.tsx       ← Updated with new fields
│   │   ├── Login.tsx          ← Updated with email/AARUNYA ID
│   │   └── ...
│   └── components/
│       └── ui/
│
├── server/                    ← NEW Backend
│   ├── config/
│   │   └── mailer.ts         ← Nodemailer setup
│   ├── routes/
│   │   └── auth.ts           ← Auth endpoints
│   ├── utils/
│   │   ├── idGenerator.ts    ← AARUNYA ID generation
│   │   └── emailTemplate.ts  ← Email HTML
│   ├── index.ts              ← Main server
│   ├── package.json
│   └── tsconfig.json
│
├── .env.example               ← Config template
├── .env                       ← Your config (don't commit!)
├── BACKEND_SETUP.md          ← Detailed backend guide
└── ...
```

## Troubleshooting

### 1. Email not sending?
**Solution:**
- Verify Gmail credentials in `.env`
- Check Gmail App Password is correct (16 chars)
- Look for error in server console
- Check email spam/trash folder
- Try resetting App Password

### 2. CORS Error when calling API?
**Error:** `Access to XMLHttpRequest blocked by CORS`
**Solution:**
- Ensure backend is running on port 3001
- Check CORS middleware in `server/index.ts`
- Verify `FRONTEND_URL` in `.env`

### 3. Port Already in Use?
**Error:** `listen EADDRINUSE :::3001`
**Solution:**
```bash
# Find process using port 3001
lsof -i :3001

# Kill process
kill -9 <PID>

# Or change PORT in .env
PORT=3002
```

### 4. Password Hashing Error?
**Error:** `Error: Invalid salt`
**Solution:**
```bash
cd server
npm install bcryptjs@2.4.3
```

### 5. TypeScript Errors in Server?
**Solution:**
```bash
cd server
npm install --save-dev typescript @types/node
npx tsc --init
```

## Advanced Configuration

### Use Custom SMTP Server (not Gmail)
Edit `.env`:
```env
EMAIL_HOST=smtp.company.com
EMAIL_PORT=587
EMAIL_USER=noreply@company.com
EMAIL_PASSWORD=your-password
```

### Change JWT Expiration
Edit `server/routes/auth.ts`:
```typescript
expiresIn: '7d'  // Change this value
// Options: '1h', '24h', '7d', '30d'
```

### Add Password Requirements
Edit `server/routes/auth.ts`:
```typescript
// Add validation:
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
if (!passwordRegex.test(password)) {
  return res.status(400).json({ message: 'Password must have: uppercase, lowercase, number, symbol' });
}
```

## Production Deployment

### Before Going Live:

1. **Security**
   - Change `JWT_SECRET` to something very long
   - Use HTTPS only
   - Add rate limiting
   - Enable request validation

2. **Database**
   - Migrate from in-memory to MongoDB/PostgreSQL
   - Setup database backups
   - Add indexes for queries

3. **Email**
   - Use professional email service (SendGrid, Mailgun)
   - Setup DKIM, SPF records
   - Monitor email deliverability

4. **Monitoring**
   - Setup error logging (Sentry)
   - Monitor server performance
   - Setup alerts

5. **Deployment**
   - Deploy on Vercel/Railway (Frontend)
   - Deploy on Heroku/Railway/AWS (Backend)
   - Use environment variables from provider
   - Setup CI/CD pipeline

## Documentation

- **Frontend Pages:** [Register.tsx](src/pages/Register.tsx), [Login.tsx](src/pages/Login.tsx)
- **Backend Setup:** [BACKEND_SETUP.md](BACKEND_SETUP.md)
- **Email Template:** [server/utils/emailTemplate.ts](server/utils/emailTemplate.ts)
- **Authentication:** [server/routes/auth.ts](server/routes/auth.ts)

## Support & Debugging

### Enable Detailed Logging
Add to `server/index.ts`:
```typescript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### Test Email Configuration
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@gmail.com",
    "password": "Test123@",
    "mobileNumber": "+91 9999999999",
    "collegeName": "Test",
    "category": "student",
    "city": "Test"
  }'
```

## Key Features Summary

| Feature | Status | Details |
|---------|--------|---------|
| Registration Form | ✅ Complete | 8 fields + terms checkbox |
| AARUNYA ID | ✅ Generated | Format: `AAR-XXXXX-XXXXX` |
| Email Notifications | ✅ Configured | Nodemailer + HTML template |
| Email/Password Login | ✅ Working | bcryptjs + JWT |
| AARUNYA ID Login | ✅ Working | Alternative identifier |
| Google OAuth | 🔄 Framework Ready | OAuth2 integration ready |
| Password Hashing | ✅ Secured | Bcryptjs with salting |
| Token Management | ✅ Implemented | 7-day expiration |
| Input Validation | ✅ Basic | Should expand for production |
| CORS Support | ✅ Enabled | Configured for localhost:5173 |

## Next Steps

1. ✅ Setup and test locally
2. ✅ Register test user and verify email
3. ✅ Test login with email and AARUNYA ID
4. 📋 Implement Google OAuth properly
5. 📋 Add password reset functionality
6. 📋 Setup database (MongoDB/PostgreSQL)
7. 📋 Add email verification link
8. 📋 Create admin dashboard
9. 📋 Deploy to production

## Questions?

Check:
1. Backend console for error messages
2. Network tab in browser DevTools
3. `.env` file for correct configuration
4. [BACKEND_SETUP.md](BACKEND_SETUP.md) for detailed guides

---

**Setup Date:** January 2026
**Version:** 1.0.0
**Last Updated:** January 22, 2026
