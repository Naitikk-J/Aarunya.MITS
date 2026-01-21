# AARUNYA Registration System - Data Flow & Architecture

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────────┐
│                     USER REGISTRATION FLOW                          │
└─────────────────────────────────────────────────────────────────────┘

1. USER OPENS REGISTER PAGE
   ├─ Frontend: http://localhost:5173/register
   └─ Displays: Empty registration form

2. USER FILLS FORM
   ├─ Name: John Doe
   ├─ Email: john@example.com
   ├─ Mobile: +91 9999999999
   ├─ College: MIT Manipal
   ├─ Category: Student
   ├─ City: Manipal
   ├─ Password: SecurePass123
   ├─ Confirm: SecurePass123
   └─ Accept Terms: ✓

3. USER CLICKS REGISTER
   │
   ├─► Frontend validates form
   │   └─ Check password match
   │   └─ Check terms accepted
   │
   └─► POST /api/auth/register
       {
         "name": "John Doe",
         "email": "john@example.com",
         "password": "SecurePass123",
         "mobileNumber": "+91 9999999999",
         "collegeName": "MIT Manipal",
         "category": "student",
         "city": "Manipal"
       }

4. BACKEND PROCESSING
   │
   ├─► Validate all fields
   │
   ├─► Check if user exists
   │   └─ If exists: Return error "User already registered"
   │
   ├─► Hash password (bcryptjs)
   │   └─ Password: "SecurePass123"
   │   └─ Hashed: "$2a$10$...encrypted...$"
   │
   ├─► Generate AARUNYA ID
   │   └─ Format: AAR-[4 random]-[5 random]
   │   └─ Example: AAR-XYZ91234-KLMNO
   │
   ├─► Store User in Database
   │   {
   │     "id": "user_1705892400000",
   │     "name": "John Doe",
   │     "email": "john@example.com",
   │     "password": "$2a$10$...encrypted...$",
   │     "aarunyaId": "AAR-XYZ91234-KLMNO",
   │     "mobileNumber": "+91 9999999999",
   │     "collegeName": "MIT Manipal",
   │     "category": "student",
   │     "city": "Manipal",
   │     "createdAt": "2026-01-22T10:30:00Z"
   │   }
   │
   ├─► Generate JWT Token
   │   └─ Payload: {userId, email, aarunyaId}
   │   └─ Expiration: 7 days
   │   └─ Token: eyJhbGciOiJIUzI1NiIs...
   │
   ├─► Send Registration Email
   │   ├─ Recipient: john@example.com
   │   ├─ Subject: "Welcome to AARUNYA - Registration Successful!"
   │   ├─ Template: HTML email
   │   │   ├─ Header: AARUNYA Festival branding
   │   │   ├─ Greeting: "Hey John Doe"
   │   │   ├─ Body: Welcome message
   │   │   ├─ Highlight: 
   │   │   │   ┌─────────────────────────┐
   │   │   │   │ Your Unique AARUNYA ID  │
   │   │   │   │ AAR-XYZ91234-KLMNO      │
   │   │   │   └─────────────────────────┘
   │   │   ├─ Features: List of festival features
   │   │   ├─ Call-to-action: Login button
   │   │   ├─ Pro tips: How to use AARUNYA ID
   │   │   └─ Footer: Support info
   │   └─ Sent via: Gmail SMTP (Nodemailer)
   │
   └─► Response to Frontend
       {
         "message": "Registration successful. Check your email.",
         "token": "eyJhbGciOiJIUzI1NiIs...",
         "user": {
           "id": "user_1705892400000",
           "name": "John Doe",
           "email": "john@example.com",
           "aarunyaId": "AAR-XYZ91234-KLMNO"
         }
       }

5. FRONTEND DISPLAYS SUCCESS
   │
   ├─ Success Screen:
   │  ├─ ✅ REGISTRATION SUCCESSFUL!
   │  ├─ Box: AARUNYA ID = AAR-XYZ91234-KLMNO
   │  ├─ ✓ Confirmation email sent to john@example.com
   │  ├─ ✓ AARUNYA ID included in email
   │  ├─ ✓ Can now login with email or AARUNYA ID
   │  └─ Button: [PROCEED TO LOGIN]
   │
   └─ Email Received
      ├─ From: noreply@aarunya.in
      ├─ Subject: Welcome to AARUNYA
      └─ Contains: AARUNYA ID + welcome message


┌─────────────────────────────────────────────────────────────────────┐
│                       USER LOGIN FLOW                               │
└─────────────────────────────────────────────────────────────────────┘

OPTION 1: LOGIN WITH EMAIL
─────────────────────────

1. User opens: http://localhost:5173/login
2. Enters:
   - Input: john@example.com
   - Password: SecurePass123
3. Clicks: LOGIN

4. Frontend sends:
   POST /api/auth/login
   {
     "identifier": "john@example.com",
     "password": "SecurePass123"
   }

5. Backend:
   ├─ Detects: "identifier is email"
   ├─ Queries: Find user by email
   ├─ Verifies: Compare password with hash
   │   └─ Input password → Hash → Compare with stored hash
   ├─ Success: Generate JWT token
   └─ Return: Token + user info

6. Frontend:
   ├─ Stores token in localStorage
   ├─ Redirects to: home page (/)
   └─ User logged in!


OPTION 2: LOGIN WITH AARUNYA ID
────────────────────────────────

1. User opens: http://localhost:5173/login
2. Enters:
   - Input: AAR-XYZ91234-KLMNO
   - Password: SecurePass123
3. Clicks: LOGIN

4. Frontend sends:
   POST /api/auth/login
   {
     "identifier": "AAR-XYZ91234-KLMNO",
     "password": "SecurePass123"
   }

5. Backend:
   ├─ Detects: "identifier is AARUNYA ID"
   │  └─ Validates format: AAR-[8chars]-[5chars]
   ├─ Queries: Find user by AARUNYA ID
   ├─ Verifies: Compare password with hash
   ├─ Success: Generate JWT token
   └─ Return: Token + user info

6. Frontend:
   ├─ Stores token in localStorage
   ├─ Redirects to: home page (/)
   └─ User logged in!


OPTION 3: LOGIN WITH GOOGLE
────────────────────────────

1. User clicks: [LOGIN WITH GOOGLE]
2. Google OAuth flow triggered
3. User grants permissions
4. Frontend receives: {googleId, email, name}
5. Frontend sends:
   POST /api/auth/google
   {
     "googleId": "google_user_id_123",
     "email": "john@gmail.com",
     "name": "John Doe"
   }

6. Backend:
   ├─ Checks: User exists?
   ├─ If NO:
   │  ├─ Creates new user
   │  ├─ Generates AARUNYA ID
   │  └─ Sends registration email
   ├─ If YES:
   │  └─ Proceeds to login
   ├─ Generates JWT token
   └─ Returns: Token + user info

7. Frontend:
   ├─ Stores token
   ├─ Redirects to home
   └─ User logged in!


┌─────────────────────────────────────────────────────────────────────┐
│                    EMAIL GENERATION FLOW                            │
└─────────────────────────────────────────────────────────────────────┘

1. TRIGGER: User registered successfully
2. DATA PREPARED:
   {
     "name": "John Doe",
     "aarunyaId": "AAR-XYZ91234-KLMNO",
     "email": "john@example.com"
   }

3. EMAIL TEMPLATE GENERATED:
   
   generateRegistrationEmail(name, aarunyaId)
   │
   └─ Returns:
      {
        "htmlContent": "<html>...</html>",
        "textContent": "plain text version..."
      }

4. HTML EMAIL INCLUDES:
   ┌──────────────────────────────────┐
   │         AARUNYA HEADER            │
   │    Cyberpunk Design (Cyan/Pink)  │
   ├──────────────────────────────────┤
   │ Hey John Doe,                     │
   │ Welcome to AARUNYA!               │
   ├──────────────────────────────────┤
   │ ┌─ Your AARUNYA ID ─────────────┐ │
   │ │ AAR-XYZ91234-KLMNO             │ │
   │ │ Save this - you'll need it!    │ │
   │ └────────────────────────────────┘ │
   ├──────────────────────────────────┤
   │ What You Can Do:                  │
   │ ✓ Access festival events          │
   │ ✓ Register for competitions       │
   │ ✓ Explore campus map              │
   │ ✓ Connect with others             │
   ├──────────────────────────────────┤
   │ [LOGIN NOW] Button                │
   ├──────────────────────────────────┤
   │ Pro Tip: Use AARUNYA ID for fast  │
   │ login from any device!            │
   ├──────────────────────────────────┤
   │ © 2026 AARUNYA Festival           │
   │ support@aarunya.in                │
   └──────────────────────────────────┘

5. NODEMAILER SENDS:
   ├─ From: noreply@aarunya.in
   ├─ To: john@example.com
   ├─ Subject: Welcome to AARUNYA
   ├─ Text: Plain text version
   ├─ HTML: Formatted HTML version
   ├─ Via: Gmail SMTP (smtp.gmail.com:587)
   └─ Status: Sent! ✓

6. USER RECEIVES EMAIL:
   └─ Check inbox for confirmation!


┌─────────────────────────────────────────────────────────────────────┐
│              AARUNYA ID GENERATION ALGORITHM                        │
└─────────────────────────────────────────────────────────────────────┘

generateAarunyaId():
├─ Prefix: "AAR"
├─ Segment 1:
│  ├─ First 4 chars: Random alphanumeric [A-Z0-9]
│  ├─ Last 4 chars: Last 4 digits of current timestamp
│  └─ Example: "ABC1234" (ABC + 1234)
├─ Separator: "-"
├─ Segment 2:
│  ├─ 5 random chars: Random alphanumeric [A-Z0-9]
│  └─ Example: "KLMNO"
└─ Result: "AAR-ABC1234-KLMNO"

Why This Format:
┌────────────────────────────────────────────────┐
│ ✓ Memorable and easy to type                  │
│ ✓ Includes timestamp for uniqueness           │
│ ✓ Human-readable format                       │
│ ✓ Easy to validate with regex                 │
│ ✓ Professional appearance                     │
│ ✓ Works across platforms                      │
│ ✓ Can be case-insensitive if needed           │
│ ✓ Less likely to collide (timestamp + random) │
└────────────────────────────────────────────────┘

Uniqueness Guarantee:
├─ Timestamp: Changes every millisecond
├─ Random segment: 36^5 possibilities = 60 million
├─ Collision probability: ~0%
└─ Ready for millions of users


┌─────────────────────────────────────────────────────────────────────┐
│                    DATABASE STRUCTURE                               │
└─────────────────────────────────────────────────────────────────────┘

users collection/table:
┌─────────────────────────────────────────────────────┐
│ Field              │ Type      │ Example             │
├─────────────────────────────────────────────────────┤
│ id                 │ String    │ user_1705892400000  │
│ name               │ String    │ John Doe            │
│ email              │ String    │ john@example.com    │
│ password           │ String    │ $2a$10$...hashed... │
│ aarunyaId          │ String    │ AAR-XYZ91234-KLMNO  │
│ mobileNumber       │ String    │ +91 9999999999      │
│ collegeName        │ String    │ MIT Manipal         │
│ category           │ String    │ student             │
│ city               │ String    │ Manipal             │
│ createdAt          │ DateTime  │ 2026-01-22T10:30Z   │
│ updatedAt          │ DateTime  │ 2026-01-22T10:30Z   │
│ emailVerified      │ Boolean   │ false (to add)      │
│ lastLogin          │ DateTime  │ null (to add)       │
└─────────────────────────────────────────────────────┘

Indexes (for performance):
├─ email (UNIQUE)
├─ aarunyaId (UNIQUE)
├─ createdAt (for sorting/filtering)
└─ category (for analytics)


┌─────────────────────────────────────────────────────────────────────┐
│                  SECURITY ARCHITECTURE                              │
└─────────────────────────────────────────────────────────────────────┘

PASSWORD SECURITY:
Plain Password
    ↓
Bcryptjs Hash (10 rounds)
    ↓
"$2a$10$R9h...hashed...$"  ← Stored in DB
    ↓
Login: User enters password
    ↓
Compare: bcrypt.compare(input, stored)
    ↓
Result: True/False

AUTHENTICATION:
Registration/Login Success
    ↓
Generate JWT Token
    ↓
Payload: {userId, email, aarunyaId}
    ↓
Sign: jwt.sign(payload, secret, {expiresIn: '7d'})
    ↓
Return: "eyJhbGciOiJIUzI1NiIs..."
    ↓
Frontend: localStorage.setItem('token', token)
    ↓
Future Requests: Send token in Authorization header
    ↓
Backend: Verify token signature & expiration
    ↓
Proceed if valid, reject if expired/invalid


┌─────────────────────────────────────────────────────────────────────┐
│                   ERROR HANDLING FLOW                               │
└─────────────────────────────────────────────────────────────────────┘

REGISTRATION ERRORS:
├─ Missing fields → 400 Bad Request
├─ Invalid email → 400 Bad Request
├─ Email exists → 409 Conflict
├─ Password too weak → 400 Bad Request
├─ Database error → 500 Server Error
└─ Email send fails → Continue (don't block registration)

LOGIN ERRORS:
├─ Missing credentials → 400 Bad Request
├─ Invalid email/AARUNYA format → 400 Bad Request
├─ User not found → 401 Unauthorized
├─ Wrong password → 401 Unauthorized
└─ Database error → 500 Server Error

ERROR RESPONSES:
{
  "message": "User with this email already exists"
}
OR
{
  "message": "Invalid credentials"
}

Note: Generic error messages for security (don't reveal user existence)


┌─────────────────────────────────────────────────────────────────────┐
│                    API RESPONSE STRUCTURE                           │
└─────────────────────────────────────────────────────────────────────┘

SUCCESS RESPONSES:
├─ Status: 200 or 201
├─ Body:
│  {
│    "message": "Registration successful...",
│    "token": "eyJhbGc...",
│    "user": {
│      "id": "user_1234",
│      "name": "John Doe",
│      "email": "john@example.com",
│      "aarunyaId": "AAR-XYZ91234-KLMNO"
│    }
│  }

ERROR RESPONSES:
├─ Status: 400, 401, 409, or 500
├─ Body:
│  {
│    "message": "Error description"
│  }

---

This document shows the complete flow of data through the system,
from registration to login, including all validations, security
measures, and email notifications.

Created: January 22, 2026
Status: ✅ Complete
