# AARUNYA Registration System - Backend Setup Guide

## Overview
This guide explains how to set up and run the AARUNYA Festival Registration Backend Server with nodemailer email notifications, AARUNYA ID generation, and multi-method authentication.

## Features Implemented

### 1. **Registration with Multiple Fields**
   - Full Name
   - Email
   - Mobile Number
   - College Name
   - Category (Student, Working Professional, Other)
   - City
   - Password
   - Terms & Conditions Acceptance

### 2. **Unique AARUNYA ID Generation**
   - Format: `AAR-XXXXX-XXXXX`
   - Automatically generated during registration
   - Used for login alongside email

### 3. **Email Notifications via Nodemailer**
   - Professional HTML email template
   - Includes AARUNYA ID
   - Acknowledgement of registration
   - Welcome message with next steps
   - Features and benefits listing

### 4. **Multi-Method Authentication**
   - **Email + Password** login
   - **AARUNYA ID + Password** login
   - **Google OAuth** integration (framework ready)

### 5. **Password Security**
   - Passwords hashed using bcryptjs
   - JWT tokens for session management
   - 7-day token expiration

## Project Structure

```
server/
├── config/
│   └── mailer.ts          # Nodemailer configuration
├── routes/
│   └── auth.ts            # Authentication endpoints
├── utils/
│   ├── idGenerator.ts     # AARUNYA ID generation & validation
│   └── emailTemplate.ts   # Email HTML template
├── index.ts               # Main server file
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript configuration
```

## Installation & Setup

### Step 1: Install Dependencies

```bash
cd server
npm install
```

### Step 2: Configure Environment Variables

1. Create `.env` file in the project root:

```bash
cp .env.example .env
```

2. Edit `.env` with your configuration:

```env
# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# JWT
JWT_SECRET=your-super-secret-key-change-this

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@aarunya.in
```

### Step 3: Setup Gmail for Nodemailer

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password
   - Use this in `EMAIL_PASSWORD` field

3. **Alternative** (Less Secure):
   - Go to [myaccount.google.com/lesssecureapps](https://myaccount.google.com/lesssecureapps)
   - Enable "Less secure app access"

### Step 4: Run the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm run build
npm start
```

Server will start on: `http://localhost:3001`

## API Endpoints

### 1. Register User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "mobileNumber": "+91 XXXXX XXXXX",
  "collegeName": "MIT Manipal",
  "category": "student",
  "city": "Manipal"
}
```

**Success Response (201):**
```json
{
  "message": "Registration successful. Check your email for confirmation.",
  "token": "eyJhbGc...",
  "user": {
    "id": "user_1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "aarunyaId": "AAR-ABC1234-DEFGH"
  }
}
```

**Error Response:**
```json
{
  "message": "User with this email already exists"
}
```

### 2. Login with Email or AARUNYA ID
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "identifier": "john@example.com or AAR-ABC1234-DEFGH",
  "password": "SecurePassword123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "user_1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "aarunyaId": "AAR-ABC1234-DEFGH"
  }
}
```

### 3. Google OAuth Login
**Endpoint:** `POST /api/auth/google`

**Request Body:**
```json
{
  "googleId": "google_user_id_123",
  "email": "john@gmail.com",
  "name": "John Doe"
}
```

## Email Template Features

The registration email includes:
- Professional header with "AARUNYA" branding
- Personalized greeting with user's name
- **Unique AARUNYA ID** prominently displayed
- Features & benefits the user gets
- Login button linking to frontend
- Pro tips section
- Footer with support information
- Both HTML and plain text versions for compatibility

### Email Styling
- Cyberpunk-themed design with cyan (#00d9ff) and pink (#ff006e) colors
- Professional fonts (Orbitron for headers, Rajdhani for body)
- Responsive design for mobile and desktop
- Box shadows and gradient backgrounds

## Frontend Integration

### Using the API in React

#### Registration:
```typescript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
const data = await response.json();
if (response.ok) {
  localStorage.setItem('token', data.token);
  // Redirect to login
}
```

#### Login:
```typescript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    identifier: emailOrAarunyaId,
    password: password
  })
});
const data = await response.json();
if (response.ok) {
  localStorage.setItem('token', data.token);
  // Redirect to home
}
```

## AARUNYA ID Format

Format: `AAR-XXXXX-XXXXX`

- **AAR**: Prefix (Always)
- **XXXXX**: First segment (4 letters/numbers + last 4 digits of timestamp)
- **XXXXX**: Second segment (5 random letters/numbers)

**Example:** `AAR-ABC14521-DEFGH`

### Validation
Use the provided validation functions:
```typescript
import { isValidAarunyaId, isEmailOrAarunyaId } from './utils/idGenerator';

const type = isEmailOrAarunyaId('AAR-ABC12345-DEFGH'); // 'aarunya_id'
const type = isEmailOrAarunyaId('user@email.com');    // 'email'
```

## Database Migration

Currently, the server uses **in-memory storage** for development. To migrate to a database:

### For MongoDB:
1. Install: `npm install mongoose`
2. Create models in `server/models/`
3. Update routes to use database queries

### For PostgreSQL:
1. Install: `npm install pg typeorm`
2. Setup ORM configuration
3. Create database migrations

## Security Considerations

1. **Never commit `.env`** - Add to `.gitignore`
2. **Use strong JWT_SECRET** - At least 32 characters
3. **Validate all inputs** on backend
4. **Use HTTPS** in production
5. **Rate limiting** - Consider adding express-rate-limit
6. **CORS** - Configure based on frontend domain
7. **Password requirements** - Add complexity validation

## Troubleshooting

### Email not sending?
1. Check Gmail credentials
2. Verify App Password is correct
3. Check spam/trash folders
4. Enable "Less secure app access" or use App Password

### CORS errors?
1. Verify CORS middleware is configured
2. Check frontend URL matches FRONTEND_URL env var
3. Add frontend domain to allowed origins

### Port already in use?
```bash
# Change PORT in .env or
# Kill process: lsof -i :3001
```

## Testing with cURL

```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123",
    "mobileNumber": "+91 9999999999",
    "collegeName": "Test College",
    "category": "student",
    "city": "Test City"
  }'

# Login with email
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "test@example.com",
    "password": "TestPass123"
  }'

# Login with AARUNYA ID
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "AAR-ABC12345-DEFGH",
    "password": "TestPass123"
  }'
```

## Production Deployment

1. **Set NODE_ENV=production**
2. **Use environment variables** from hosting provider
3. **Setup database** (MongoDB/PostgreSQL)
4. **Enable HTTPS**
5. **Add rate limiting**
6. **Setup logging** (Winston/Pino)
7. **Monitor performance** (APM tools)
8. **Backup email credentials**

## Support & Help

For issues:
1. Check error logs in terminal
2. Verify `.env` configuration
3. Check email provider settings
4. Review API endpoint specifications

## Next Steps

1. Implement database storage
2. Add email verification
3. Add password reset functionality
4. Implement Google OAuth properly
5. Add user profile update endpoint
6. Add admin dashboard for user management
7. Setup automated email reminders
8. Add event registration endpoints

---

**Created:** January 2026
**Framework:** Express.js + TypeScript
**Email:** Nodemailer
**Authentication:** JWT + Bcryptjs
