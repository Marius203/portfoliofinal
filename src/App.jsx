import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Globe,
  ChevronDown
} from 'lucide-react';

/* --- MOCK DATA --- */
const DATA = {
  name: "Alex Dev",
  role: "Computer Science Student & Full Stack Developer",
  bio: "I'm a senior CS student passionate about building scalable web applications and exploring distributed systems. When I'm not coding, I'm contributing to open source or optimizing algorithms.",
  skills: [
    "React", "TypeScript", "Node.js", "Python", "Go", "Docker", "AWS", "PostgreSQL", "Tailwind CSS", "GraphQL"
  ],
  experience: [
    {
      company: "TechFlow Inc.",
      role: "Software Engineering Intern",
      period: "May 2024 - Aug 2024",
      description: "Optimized database queries reducing load times by 40%. Implemented a new user authentication flow using OAuth 2.0."
    },
    {
      company: "University Research Lab",
      role: "Research Assistant",
      period: "Jan 2024 - Apr 2024",
      description: "Assisted in analyzing large datasets using Python and Pandas. Developed a visualization dashboard for research findings."
    }
  ],
  projects: [
    {
      title: "AlgoVisualizer",
      description: "An interactive visualization tool for sorting and pathfinding algorithms.",
      tags: ["React", "D3.js", "Algorithms"],
      link: "#",
      github: "#"
    },
    {
      title: "Distributed Chat",
      description: "Real-time messaging system built with Go and WebSocket, supporting 10k+ concurrent connections.",
      tags: ["Go", "WebSocket", "Redis"],
      link: "#",
      github: "#"
    },
    {
      title: "EcoTracker",
      description: "Mobile-first web app to track personal carbon footprint using gamification elements.",
      tags: ["React Native", "Firebase", "Node"],
      link: "#",
      github: "#"
    }
  ]
};

/* --- VISUAL EFFECTS --- */

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$#@&%';
    const fontSize = 8;
    const columns = width / fontSize;
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Matrix text color
      // Using a slightly more visible white/green for the effect
      ctx.fillStyle = '#0F0';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Increased opacity for visibility

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Randomly reset drop to top
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-black pointer-events-none"
    />
  );
};

/* --- UI COMPONENTS --- */

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  // Updated variants for dark mode
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2";
  const variants = {
    primary: "bg-zinc-100 text-black hover:bg-zinc-200 shadow", // Inverted
    outline: "border border-zinc-800 bg-black/50 text-zinc-100 hover:bg-zinc-900 hover:text-white",
    ghost: "hover:bg-zinc-800 hover:text-white text-zinc-300",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl border border-zinc-800 bg-black/60 backdrop-blur-sm text-zinc-100 shadow-sm transition-all hover:border-zinc-600 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/50 px-2.5 py-0.5 text-xs font-semibold transition-colors text-zinc-300">
    {children}
  </span>
);

/* --- SECTIONS --- */

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-zinc-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-white">
          <Code2 className="w-6 h-6" />
          <span>{DATA.name}</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
          <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">About</button>
          <button onClick={() => scrollTo('experience')} className="hover:text-white transition-colors">Experience</button>
          <button onClick={() => scrollTo('projects')} className="hover:text-white transition-colors">Projects</button>
          <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">Contact</button>
        </div>
        <div className="md:hidden">
          <Code2 className="w-5 h-5 opacity-50 text-white" />
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-20 max-w-5xl mx-auto relative z-10">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="inline-block px-3 py-1 rounded-full border border-zinc-700 bg-zinc-900/80 backdrop-blur-sm text-zinc-300 text-sm font-medium mb-4">
          Available for Hire
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          Banu Marius-Valentin<br className="hidden md:block" />
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
          {DATA.bio}
        </p>
        <div className="flex gap-4 pt-4">
          <Button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
            View Work
          </Button>
          <Button variant="outline" onClick={() => window.open('https://github.com', '_blank')}>
            <Github className="mr-2 w-4 h-4" /> GitHub
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto relative z-10">
      <h2 className="text-3xl font-bold tracking-tight mb-12 flex items-center gap-2 text-white">
        <Terminal className="w-6 h-6" /> About Me
      </h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6 text-zinc-400 leading-relaxed">
          <p>
            I am currently pursuing a degree in Computer Science with a focus on Software Engineering and Artificial Intelligence.
            My journey began when I wrote my first "Hello World" in Python, and since then, I've been hooked on solving complex problems.
          </p>
          <p>
            I believe in writing clean, maintainable code and designing user-centric interfaces.
            I'm always eager to learn new technologies and methodologies to improve my craft.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-zinc-200">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-12 flex items-center gap-2 text-white">
          <Cpu className="w-6 h-6" /> Work Experience
        </h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-700 before:to-transparent">
          {DATA.experience.map((job, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

              {/* Timeline Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>

              {/* Card */}
              <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 transition-all hover:-translate-y-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-white">{job.role}</h3>
                    <div className="text-zinc-400 font-medium">{job.company}</div>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">{job.period}</span>
                </div>
                <p className="text-zinc-400 text-sm mt-2">{job.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto relative z-10">
      <h2 className="text-3xl font-bold tracking-tight mb-12 flex items-center gap-2 text-white">
        <Globe className="w-6 h-6" /> Personal Projects
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DATA.projects.map((project, index) => (
          <Card key={index} className="flex flex-col h-full overflow-hidden group hover:border-zinc-500 transition-colors">
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-white group-hover:text-black transition-colors duration-300 border border-zinc-800">
                  <Code2 className="w-5 h-5" />
                </div>
                <div className="flex gap-2">
                  <a href={project.github} className="text-zinc-500 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={project.link} className="text-zinc-500 hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 text-white group-hover:text-zinc-300 transition-colors">{project.title}</h3>
              <p className="text-zinc-400 text-sm mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="relative z-10 border-t border-zinc-900 bg-black text-zinc-400 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">Let's work together</h2>
          <p className="text-zinc-500">Open to opportunities and interesting projects.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => window.location.href = `mailto:hello@example.com`}>
            <Mail className="mr-2 w-4 h-4" /> Email Me
          </Button>
          <Button variant="outline" className="border-zinc-800">
            <Linkedin className="mr-2 w-4 h-4" /> LinkedIn
          </Button>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-zinc-900 text-center text-sm text-zinc-600">
        <p>&copy; {new Date().getFullYear()} {DATA.name}. Built with React & Tailwind.</p>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    // Changed bg-black to bg-transparent to allow the fixed canvas to show through
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-zinc-800 selection:text-white">
      <MatrixBackground />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Footer />
    </div>
  );
}