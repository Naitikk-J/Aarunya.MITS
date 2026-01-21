import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { generateAarunyaId, isEmailOrAarunyaId, isValidEmail } from '../utils/idGenerator';
import { generateRegistrationEmail } from '../utils/emailTemplate';
import transporter from '../config/mailer';

const router = express.Router();

// Mock database - in production, use a real database
interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    aarunyaId: string;
    mobileNumber: string;
    collegeName: string;
    category: string;
    city: string;
    createdAt: Date;
}

let users: User[] = [];

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { name, email, password, mobileNumber, collegeName, category, city } = req.body;

        // Validation
        if (!name || !email || !password || !mobileNumber || !collegeName || !category || !city) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if user already exists
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate AARUNYA ID
        const aarunyaId = generateAarunyaId();

        // Create user
        const newUser: User = {
            id: `user_${Date.now()}`,
            name,
            email,
            password: hashedPassword,
            aarunyaId,
            mobileNumber,
            collegeName,
            category,
            city,
            createdAt: new Date(),
        };

        users.push(newUser);

        // Send email
        try {
            const { htmlContent, textContent } = generateRegistrationEmail(name, aarunyaId);

            await transporter.sendMail({
                from: process.env.EMAIL_FROM || 'noreply@aarunya.in',
                to: email,
                subject: 'Welcome to AARUNYA - Registration Successful!',
                text: textContent,
                html: htmlContent,
            });
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            // Don't fail the registration if email fails, just log it
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email, aarunyaId: newUser.aarunyaId },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Registration successful. Check your email for confirmation.',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                aarunyaId: newUser.aarunyaId,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({ message: 'Email/AARUNYA ID and password are required' });
        }

        // Determine if identifier is email or AARUNYA ID
        const identifierType = isEmailOrAarunyaId(identifier);

        if (!identifierType) {
            return res.status(400).json({ message: 'Invalid email or AARUNYA ID format' });
        }

        // Find user
        let user: User | undefined;
        if (identifierType === 'email') {
            user = users.find((u) => u.email === identifier);
        } else {
            user = users.find((u) => u.aarunyaId === identifier);
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, aarunyaId: user.aarunyaId },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                aarunyaId: user.aarunyaId,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/auth/google - For Google OAuth integration
router.post('/google', async (req: Request, res: Response) => {
    try {
        const { googleId, email, name } = req.body;

        if (!googleId || !email) {
            return res.status(400).json({ message: 'Google ID and email are required' });
        }

        // Check if user exists
        let user = users.find((u) => u.email === email);

        if (!user) {
            // Create new user for Google registration
            const aarunyaId = generateAarunyaId();
            user = {
                id: `user_${Date.now()}`,
                name: name || email.split('@')[0],
                email,
                password: '', // No password for Google OAuth
                aarunyaId,
                mobileNumber: '',
                collegeName: '',
                category: 'student',
                city: '',
                createdAt: new Date(),
            };

            users.push(user);

            // Send welcome email
            try {
                const { htmlContent, textContent } = generateRegistrationEmail(user.name, aarunyaId);

                await transporter.sendMail({
                    from: process.env.EMAIL_FROM || 'noreply@aarunya.in',
                    to: email,
                    subject: 'Welcome to AARUNYA - Google Registration Successful!',
                    text: textContent,
                    html: htmlContent,
                });
            } catch (emailError) {
                console.error('Email sending error:', emailError);
            }
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, aarunyaId: user.aarunyaId },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Google authentication successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                aarunyaId: user.aarunyaId,
            },
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
