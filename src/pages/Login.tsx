import { useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Login = () => {
    const [loginInput, setLoginInput] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!loginInput || !password) {
            alert('Please enter credentials');
            return;
        }

        setIsLoading(true);

        try {
            // Send login data to backend - accepts email, AARUNYA ID, or Google login
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: loginInput, // Can be email or AARUNYA ID
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                // Store token and redirect
                localStorage.setItem('token', data.token);
                window.location.href = '/';
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        setIsLoading(true);
        // Simulate Google OAuth
        setTimeout(() => {
            console.log('Google login initiated');
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
                        LOGIN
                    </h1>
                    <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
                        Access the grid. Enter the festival.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-md mx-auto">
                    <Card className="border-secondary/30 bg-card/80 backdrop-blur-sm">
                        <CardHeader className="text-center">
                            <CardTitle className="font-orbitron text-2xl text-primary">ENTER FESTIVAL</CardTitle>
                            <CardDescription className="font-rajdhani">
                                Login to unlock exclusive features
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Email Login Form */}
                            <form onSubmit={handleEmailLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                                        Email or AARUNYA ID *
                                    </label>
                                    <input
                                        type="text"
                                        value={loginInput}
                                        onChange={(e) => setLoginInput(e.target.value)}
                                        className="w-full px-3 py-2 bg-background/50 border border-secondary/30 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-rajdhani"
                                        placeholder="your@email.com or AAR-XXXXX-XXXXX"
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

                                <div className="text-right">
                                    <a href="#" className="text-xs text-primary hover:text-primary-glow transition-colors font-mono uppercase tracking-wider">
                                        Forgot password?
                                    </a>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full font-orbitron tracking-wider"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'LOGGING IN...' : 'LOGIN'}
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

                            {/* Google Login */}
                            <Button
                                variant="outline"
                                onClick={handleGoogleLogin}
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
                                    {isLoading ? 'CONNECTING...' : 'LOGIN WITH GOOGLE'}
                                </span>
                            </Button>

                            {/* Register Link */}
                            <div className="text-center pt-4 border-t border-secondary/30">
                                <p className="text-sm text-muted-foreground font-rajdhani">
                                    Don't have an account?{' '}
                                    <a href="/register" className="text-primary hover:text-primary-glow transition-colors font-mono">
                                        REGISTER
                                    </a>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feature Badges */}
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">INSTANT ACCESS</Badge>
                        <Badge variant="outline" className="font-mono text-xs">SECURE LOGIN</Badge>
                        <Badge variant="outline" className="font-mono text-xs">MULTIPLE OPTIONS</Badge>
                        <Badge variant="outline" className="font-mono text-xs">SEAMLESS EXPERIENCE</Badge>
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

export default Login;
