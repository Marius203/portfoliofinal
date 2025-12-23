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
  name: "Banu Marius",
  role: "Software Engineering Student & Full Stack Developer",
  bio: "Software engineering student skilled in backend Java and frontend React development, with strong problem-solving abilities, performance optimization experience, and a passion for building efficient, scalable applications through clean, reliable code.",
  skills: [
    "React", "TypeScript", "Tailwind CSS", "Java", "Spring Boot", "Python", "C++", "PostgreSQL", "Git", "Pandas", "Spring Security"
  ],
  experience: [
    {
      company: "D&A Education SRL",
      role: "Frontend Developer",
      period: "Jul 2025 - Oct 2025",
      description: "Developed and deployed a production-ready educational platform built entirely from scratch using React and Tailwind CSS. Implemented EmailJS integration, automated CI/CD on Vercel, and optimized SEO (sitemap, meta tags) for maximum visibility.",
      link: "https://www.daeducation.ro" // Example link, added for clickability demonstration
    },
    {
      company: "Tvarita SRL",
      role: "Intern",
      period: "Mar 2025 - Jun 2025",
      description: "Designed and maintained a high-impact internal system using React, TypeScript, and PostgreSQL. Led the successful migration of a legacy PHP codebase to a modern React architecture, improving performance and user experience.",
      link: null // Example link
    }
  ],
  projects: [
    {
      title: "AI Photo Editor",
      description: "Implemented expert-selection feature improving matches by 35% and reducing revisions by 40% by enabling users to choose specialist types tailored to photo context.",
      tags: ["React", "Spring Framework", "MySQL"],
      link: "#", // Main card click usually goes to live demo
      github: "https://github.com/Marius203/AIPhotoEditor2"
    },
    {
      title: "Emag Clone",
      description: "Designed database schema and optimized backend workflow, reducing query latency by 40%. Reduced post-release defects by 41% through automated unit and regression testing.",
      tags: ["C#", ".NET Framework", "SQL"],
      link: "#",
      github: "https://github.com/cristicretu/UBB-SE-2025-Marketplace"
    },
    {
      title: "Toy Language Interpreter",
      description: "Engineered a complex interpreter in Java supporting concurrent execution via ForkStmt and automatic garbage collection. Implemented advanced runtime structures including execution stacks, symbol tables, and shared heaps to simulate real-world language processing environments.",
      tags: ["Java", "Concurrency", "Interpreter Pattern"],
      link: "#",
      github: "https://github.com/marius203/toy-language-interpreter"
    },
    {
      title: "Movie Collection Manager",
      description: "Architected a full-stack application using Vue.js and Node.js with real-time WebSocket updates for automated movie generation. Integrated Chart.js for dynamic data visualization and implemented infinite scrolling for seamless navigation of large datasets.",
      tags: ["Vue.js", "Node.js", "PostgreSQL", "WebSockets"],
      link: "#",
      github: "https://github.com/marius203/movie-icon"
    }
  ],
  socials: {
    email: "banumarius203@icloud.com",
    linkedin: "https://linkedin.com/in/marius-banu",
    github: "https://github.com/marius203"
  }
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

    // Initialize drops with random start positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * (height / fontSize);
    }

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Matrix text color
      ctx.fillStyle = '#0F0';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)'; // Increased opacity for visibility

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

    const interval = setInterval(draw, 33);

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
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2";
  const variants = {
    primary: "bg-zinc-100 text-black hover:bg-zinc-200 shadow",
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

// Updated Card Component to handle click navigation
const Card = ({ children, className = "", href, ...props }) => {
  const handleClick = (e) => {
    // Only navigate if an href is provided AND the click didn't originate 
    // from an inner link/button (to avoid double actions)
    if (href && !e.target.closest('a') && !e.target.closest('button')) {
      window.open(href, '_blank');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-xlQN border border-zinc-800 bg-black/60 backdrop-blur-sm text-zinc-100 shadow-sm transition-all hover:border-zinc-600 ${href ? 'cursor-pointer hover:bg-zinc-900/40' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

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
          <span>Banu Marius - Dev Portfolio</span>
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
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          {DATA.name} <br className="hidden md:block" />
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mt-4">
          {DATA.bio}
        </p>
        <div className="flex gap-4 pt-4">
          <Button onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}>
            View Work
          </Button>
          <Button variant="outline" onClick={() => window.open(DATA.socials.github, '_blank')}>
            <Github className="mr-2 w-4 h-4" /> GitHub
          </Button>
          <Button variant="outline" onClick={() => window.location.href = `mailto:${DATA.socials.email}`}>
            <Mail className="mr-2 w-4 h-4" /> Email
          </Button>
          <Button variant="outline" className="border-zinc-800" onClick={() => window.open(DATA.socials.linkedin, '_blank')}>
            <Linkedin className="mr-2 w-4 h-4" /> LinkedIn
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
            I am a Software Engineering student at Babeş-Bolyai University with a GPA of 9.6.
            My passion lies in building efficient, scalable applications and I have a strong foundation in both backend Java and frontend React development.
          </p>
          <p>
            I strive to write clean, reliable code and solve complex problems through innovative solutions.
            I am always eager to learn new technologies and contribute to meaningful projects.
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

              {/* Card - Now passing href for clickability */}
              <Card
                href={job.link}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 transition-all hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-white">{job.role}</h3>
                    <div className="text-zinc-400 font-medium">{job.company}</div>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">{job.period}</span>
                </div>
                <p className="text-zinc-400 text-sm mt-2">{job.description}</p>
                {/* Visual indicator for link availability */}
                {job.link && (
                  <div className="mt-3 flex items-center text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    <ExternalLink className="w-3 h-3 mr-1" /> Visit Company
                  </div>
                )}
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
      <div className="grid md:grid-cols-2 gap-6">
        {DATA.projects.map((project, index) => (
          // Pass the main project link (or fallback to github) to the Card
          <Card
            key={index}
            href={project.link && project.link !== '#' ? project.link : project.github}
            className="flex flex-col h-full overflow-hidden group hover:border-zinc-500 transition-colors"
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-white group-hover:text-black transition-colors duration-300 border border-zinc-800">
                  <Code2 className="w-5 h-5" />
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-whiteQX transition-colors z-20"
                    title="View Code"
                  >
                    <Github className="w-5 h-5" />
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
          <Button variant="secondary" onClick={() => window.location.href = `mailto:${DATA.socials.email}`}>
            <Mail className="mr-2 w-4 h-4" /> Email Me
          </Button>
          <Button variant="outline" className="border-zinc-800" onClick={() => window.open(DATA.socials.linkedin, '_blank')}>
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