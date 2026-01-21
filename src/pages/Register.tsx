import { useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [collegeName, setCollegeName] = useState('');
    const [category, setCategory] = useState('student');
    const [city, setCity] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [aarunyaId, setAarunyaId] = useState('');

    const handleEmailRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!termsAccepted) {
            alert('Please accept the terms and conditions');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    mobileNumber,
                    collegeName,
                    category,
                    city,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                setAarunyaId(data.aarunyaId);
                setRegistrationSuccess(true);
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setName('');
                setMobileNumber('');
                setCollegeName('');
                setCategory('student');
                setCity('');
                setTermsAccepted(false);
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log('Google registration initiated');
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background">
            <MainNavigation />

            <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-transparent py-16">
                <div className="absolute inset-0 scanlines opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-5xl font-orbitron font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        REGISTER
                    </h1>
                    <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
                        Join the festival. Access the grid.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-2xl mx-auto">
                    <Card className="border-secondary/30 bg-card/80 backdrop-blur-sm">
                        <CardHeader className="text-center">
                            <CardTitle className="font-orbitron text-2xl text-primary">CREATE ACCOUNT</CardTitle>
                            <CardDescription className="font-rajdhani">
                                Register to unlock festival features
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {registrationSuccess && (
                                <div className="space-y-4 text-center py-6">
                                    <div className="inline-block p-3 bg-primary/10 border-2 border-primary rounded-full">
                                        <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-orbitron text-primary">REGISTRATION SUCCESS!</h2>
                                    <p className="text-muted-foreground font-rajdhani">Your AARUNYA ID has been generated</p>
                                    <div className="p-4 bg-primary/10 border-2 border-primary rounded-lg">
                                        <p className="text-xs text-muted-foreground mb-2 font-mono uppercase">Your AARUNYA ID</p>
                                        <p className="text-2xl font-orbitron text-primary tracking-widest">{aarunyaId}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground font-rajdhani">Check your email for confirmation and login details</p>
                                    <Button
                                        onClick={() => {
                                            setRegistrationSuccess(false);
                                            window.location.href = '/login';
                                        }}
                                        className="w-full font-orbitron tracking-wider mt-4"
                                    >
                                        GO TO LOGIN
                                    </Button>
                                </div>
                            )}
                            {!registrationSuccess && (
                                <>
                                    <form onSubmit={handleEmailRegister} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-3 py-2 bg-background/50 border border-secondary/30 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-rajdhani"
                                                placeholder="Enter your name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-3 py-2 bg-background/50 border border-secondary/30 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-rajdhani"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-3 py-2 bg-background/50 border border-secondary/30 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-rajdhani"
                                                placeholder="••••••••••"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full px-3 py-2 bg-background/50 border border-secondary/30 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-rajdhani"
                                                placeholder="••••••••••"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                                                Mobile Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
                                                className="w-full px-3 py-2 bg-background/50 border border-secondary/30 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-rajdhani"
                                                placeholder="+91-XXXXXXXXXX"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                                                College Name
                                            </label>
                                            <input
                                                type="text"
                                                value={collegeName}
                                                onChange={(e) => setCollegeName(e.target.value)}
                                                className="w-full px-3 py-2 bg-background/50 border border-secondary/30 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-rajdhani"
                                                placeholder="Your college/university"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                                                Category
                                            </label>
                                            <select
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="w-full px-3 py-2 bg-background/50 border border-secondary/30 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-rajdhani"
                                                required
                                            >
                                                <option value="student">Student</option>
                                                <option value="working-professional">Working Professional</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                className="w-full px-3 py-2 bg-background/50 border border-secondary/30 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-rajdhani"
                                                placeholder="Your city"
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 bg-primary/5 border border-primary/20 rounded-md">
                                            <Checkbox
                                                id="terms"
                                                checked={termsAccepted}
                                                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                                            />
                                            <label htmlFor="terms" className="text-sm text-muted-foreground font-rajdhani cursor-pointer">
                                                I accept the{' '}
                                                <a href="#" className="text-primary hover:text-primary-glow transition-colors underline">
                                                    terms and conditions
                                                </a>
                                            </label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full font-orbitron tracking-wider"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'REGISTERING...' : 'REGISTER'}
                                        </Button>
                                    </form>

                                    {/* Divider */}
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-secondary/30"></span>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-card px-2 text-muted-foreground font-mono">OR</span>
                                        </div>
                                    </div>

                                    {/* Google Registration */}
                                    <Button
                                        variant="outline"
                                        onClick={handleGoogleRegister}
                                        className="w-full font-orbitron tracking-wider border-secondary/30 hover:bg-secondary/10"
                                        disabled={isLoading}
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25-.37a8.01 8.01 0 00-7.44 5.25 9.04 9.04 0 006.38 2.62l-2.2-2.2a6.04 6.04 0 00-4.5-1.94 6.06 6.06 0 00-4.5 1.94l2.2 2.2a8.99 8.99 0 016.38-2.62A8.02 8.02 0 0022.56 12.25zM12 23a8.99 8.99 0 01-6.38-2.62l2.2-2.2a6.04 6.04 0 004.5-1.94 6.06 6.06 0 004.5 1.94l-2.2 2.2A8.99 8.99 0 0112 23zm0-16a8.99 8.99 0 00-6.38 2.62l2.2 2.2a6.04 6.04 0 014.5 1.94 6.06 6.06 0 00-4.5-1.94l-2.2-2.2A8.99 8.99 0 0112 7zm4.5 1.94a6.04 6.04 0 01-4.5 1.94l2.2 2.2a8.99 8.99 0 006.38-2.62 8.02 8.02 0 00-2.25-.37 8.01 8.01 0 00-7.44-5.25 9.04 9.04 0 00-6.38-2.62l2.2-2.2z"
                                                />
                                            </svg>
                                            {isLoading ? 'CONNECTING...' : 'REGISTER WITH GOOGLE'}
                                        </span>
                                    </Button>

                                    {/* Login Link */}
                                    <div className="text-center pt-4 border-t border-secondary/30">
                                        <p className="text-sm text-muted-foreground font-rajdhani">
                                            Already have an account?{' '}
                                            <a href="/login" className="text-primary hover:text-primary-glow transition-colors font-mono">
                                                LOGIN
                                            </a>
                                        </p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Feature Badges */}
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">FESTIVAL ACCESS</Badge>
                        <Badge variant="outline" className="font-mono text-xs">EVENT REGISTRATION</Badge>
                        <Badge variant="outline" className="font-mono text-xs">MERCH DROPS</Badge>
                        <Badge variant="outline" className="font-mono text-xs">COMPETITION ENTRY</Badge>
                    </div>
                </div>
            </div>

            {/* Corner decorations */}
            <div className="fixed bottom-6 left-6 w-20 h-0.5 bg-gradient-to-r from-primary to-transparent" />
            <div className="fixed bottom-6 left-6 w-0.5 h-20 bg-gradient-to-t from-primary to-transparent" />
            <div className="fixed bottom-6 right-6 w-20 h-0.5 bg-gradient-to-l from-secondary to-transparent" />
            <div className="fixed bottom-6 right-6 w-0.5 h-20 bg-gradient-to-t from-secondary to-transparent" />
        </div>
    );
};

export default Register;
