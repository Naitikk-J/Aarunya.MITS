import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AboutUs = () => {
    const teamMembers = [
        {
            name: 'Alex Chen',
            role: 'Lead Developer',
            department: 'Computer Science',
            year: 'Senior',
            bio: 'Passionate about creating immersive digital experiences and pushing the boundaries of web technology.',
            skills: ['React', 'Three.js', 'TypeScript', 'UI/UX'],
            avatar: '🧑‍💻'
        },
        {
            name: 'Maya Rodriguez',
            role: '3D Graphics Specialist',
            department: 'Digital Arts',
            year: 'Junior',
            bio: 'Combining artistic vision with technical expertise to create stunning 3D environments and animations.',
            skills: ['Blender', 'WebGL', 'Shaders', 'Animation'],
            avatar: '👩‍🎨'
        },
        {
            name: 'Jordan Kim',
            role: 'UX Designer',
            department: 'Human-Computer Interaction',
            year: 'Senior',
            bio: 'Focused on creating intuitive and accessible interfaces that enhance user experience and engagement.',
            skills: ['Figma', 'User Research', 'Prototyping', 'Accessibility'],
            avatar: '🧑‍🎨'
        },
        {
            name: 'Sam Taylor',
            role: 'Backend Developer',
            department: 'Software Engineering',
            year: 'Junior',
            bio: 'Building robust and scalable systems to support our interactive campus exploration platform.',
            skills: ['Node.js', 'Database', 'APIs', 'Cloud Services'],
            avatar: '👨‍💻'
        }
    ];

    const technologies = [
        { name: 'React 18', category: 'Frontend', description: 'Modern UI framework' },
        { name: 'Three.js', category: '3D Graphics', description: 'WebGL-based 3D library' },
        { name: 'TypeScript', category: 'Language', description: 'Type-safe JavaScript' },
        { name: 'Tailwind CSS', category: 'Styling', description: 'Utility-first CSS framework' },
        { name: 'Vite', category: 'Build Tool', description: 'Fast development server' },
        { name: 'React Router', category: 'Navigation', description: 'Client-side routing' }
    ];

    const achievements = [
        {
            title: 'Best Innovation Award',
            year: '2024',
            description: 'Recognized for creating an immersive campus exploration experience'
        },
        {
            title: 'Student Project Excellence',
            year: '2023',
            description: 'Outstanding technical implementation and user experience design'
        },
        {
            title: 'Campus Impact Recognition',
            year: '2023',
            description: 'Significant contribution to campus community engagement'
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <MainNavigation />

            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-transparent py-16">
                <div className="absolute inset-0 scanlines opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-5xl font-orbitron font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        ABOUT US
                    </h1>
                    <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
                        Meet the team behind Euphoria Campus Explorer and discover our mission to create immersive digital experiences
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                {/* Mission Statement */}
                <div className="mb-16">
                    <Card className="border-secondary/30 bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="font-orbitron text-2xl text-primary text-center">
                                Our Mission
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-lg text-muted-foreground font-rajdhani max-w-4xl mx-auto leading-relaxed">
                                We believe in pushing the boundaries of digital interaction by creating immersive,
                                accessible, and engaging experiences that bring campus life to life. Our goal is to
                                bridge the gap between physical and digital spaces, making exploration intuitive and fun.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Team Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-orbitron font-bold text-center mb-12 text-primary">
                        MEET THE TEAM
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <Card key={index} className="group relative overflow-hidden border-secondary/30 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                                <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 scanlines opacity-20" />
                                    <div className="text-6xl">{member.avatar}</div>
                                </div>

                                <CardHeader>
                                    <CardTitle className="font-orbitron text-lg text-primary">
                                        {member.name}
                                    </CardTitle>
                                    <CardDescription className="font-rajdhani">
                                        {member.role}
                                    </CardDescription>
                                    <div className="text-sm text-muted-foreground font-mono">
                                        {member.department} • {member.year}
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-muted-foreground font-rajdhani text-sm mb-4">
                                        {member.bio}
                                    </p>

                                    <div className="flex flex-wrap gap-1">
                                        {member.skills.map((skill, skillIndex) => (
                                            <Badge key={skillIndex} variant="outline" className="font-mono text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Technologies Used */}
                <div className="mb-16">
                    <h2 className="text-3xl font-orbitron font-bold text-center mb-12 text-primary">
                        TECHNOLOGIES WE USE
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {technologies.map((tech, index) => (
                            <Card key={index} className="border-secondary/30 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="font-orbitron text-lg text-primary">
                                        {tech.name}
                                    </CardTitle>
                                    <Badge variant="outline" className="font-mono text-xs">
                                        {tech.category}
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground font-rajdhani text-sm">
                                        {tech.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Achievements */}
                <div className="mb-16">
                    <h2 className="text-3xl font-orbitron font-bold text-center mb-12 text-primary">
                        ACHIEVEMENTS
                    </h2>
                    <div className="space-y-6">
                        {achievements.map((achievement, index) => (
                            <Card key={index} className="border-secondary/30 bg-card/80 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="font-orbitron text-lg text-primary">
                                            {achievement.title}
                                        </CardTitle>
                                        <Badge variant="outline" className="font-mono text-sm">
                                            {achievement.year}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground font-rajdhani">
                                        {achievement.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Contact & Collaboration */}
                <div className="mb-16">
                    <Card className="border-secondary/30 bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="font-orbitron text-2xl text-primary text-center">
                                Let's Collaborate
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <p className="text-muted-foreground font-rajdhani mb-6 max-w-3xl mx-auto">
                                    Interested in joining our team or have an idea for collaboration?
                                    We're always looking for passionate individuals who want to create amazing digital experiences.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Button className="font-orbitron text-sm tracking-wider">
                                        JOIN THE TEAM
                                    </Button>
                                    <Button variant="outline" className="font-orbitron text-sm tracking-wider">
                                        COLLABORATE
                                    </Button>
                                    <Button variant="outline" className="font-orbitron text-sm tracking-wider">
                                        GIVE FEEDBACK
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Footer decoration */}
            <div className="fixed bottom-6 left-6 w-20 h-0.5 bg-gradient-to-r from-primary to-transparent" />
            <div className="fixed bottom-6 left-6 w-0.5 h-20 bg-gradient-to-t from-primary to-transparent" />
            <div className="fixed bottom-6 right-6 w-20 h-0.5 bg-gradient-to-l from-secondary to-transparent" />
            <div className="fixed bottom-6 right-6 w-0.5 h-20 bg-gradient-to-t from-secondary to-transparent" />
        </div>
    );
};

export default AboutUs;