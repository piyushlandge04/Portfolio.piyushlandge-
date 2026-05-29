import React from 'react';
import { ExternalLink, Cpu } from 'lucide-react';

const Github = ({ size = 20, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x-relative', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y-relative', `${y}px`);
  };

  const projectsList = [
    {
      title: 'AI Flyer Designer',
      shortTitle: 'Flyer',
      description: 'An intelligent creative suite that generates customized visual flyers and marketing assets using Generative AI. Employs advanced model prompt engineering, custom layout algorithms, and real-time canvas previewing.',
      tags: ['React', 'Tailwind CSS', 'Canvas API', 'API Integration'],
      github: null,
      live: '#',
      color: 'linear-gradient(135deg, hsl(280, 100%, 50%) 0%, hsl(310, 100%, 40%) 100%)',
      glowColor: 'var(--glow-purple)'
    },
    {
      title: 'AI Chatbot',
      shortTitle: 'Chatbot',
      description: 'A responsive, context-aware chatbot powered by Large Language Models. Features semantic query routing, prompt caching, persistent chat history, and fluid conversational feedback loops.',
      tags: ['Python', 'LLMs', 'NLP', 'MongoDB'],
      github: '#',
      live: '#',
      color: 'linear-gradient(135deg, hsl(195, 100%, 45%) 0%, hsl(220, 100%, 35%) 100%)',
      glowColor: 'var(--glow-cyan)'
    },
    {
      title: 'Personal Portfolio Website',
      shortTitle: 'Portfolio',
      description: 'A premium, responsive portfolio web application featuring bento grid layout, interactive micro-animations, glassmorphic styling, custom terminal simulation, and an integrated AI assistant.',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Lucide Icons'],
      github: '#',
      live: '#',
      color: 'linear-gradient(135deg, hsl(140, 100%, 40%) 0%, hsl(170, 100%, 30%) 100%)',
      glowColor: 'var(--glow-green)'
    },
  ];

  return (
    <section id="projects" className="pt-24 pb-12 md:pt-32 md:pb-16 relative scroll-reveal scroll-reveal-init bg-bg-primary">
      {/* Background Ambience */}
      <div className="ambient-glow glow-green"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text-primary text-center mb-4 tracking-tight">My <span className="bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">Projects</span></h2>
        <p className="text-center max-w-[600px] mx-auto text-text-secondary text-lg mb-16">
          Explore some of my recent engineering projects, web applications, and AI integrations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <div 
              key={index} 
              className="project-card glass-card flex flex-col h-full rounded-[24px] group"
              onMouseMove={handleMouseMove}
              style={{ '--hover-glow': project.glowColor }}
            >
              {/* Project Card Image Banner / Styled Graphic */}
              <div 
                className="h-[200px] w-full relative flex items-center justify-center transition-all duration-500 group-hover:scale-[1.02]" 
                style={{ background: project.color }}
              >
                {/* Tech wireframe grid pattern */}
                <div className="absolute w-full h-full bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[length:14px_14px] opacity-75 z-10"></div>
                
                <div className="z-20 transform scale-100 group-hover:scale-110 transition-transform duration-500 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <Cpu size={24} className="text-white animate-pulse" />
                  </div>
                  <span className="font-heading font-extrabold text-3xl text-white tracking-tighter drop-shadow-md">
                    {project.shortTitle || project.title.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 sm:p-7 flex flex-col flex-grow text-left bg-black/5">
                <h3 className="text-[1.3rem] font-bold mb-3 text-text-primary font-heading group-hover:text-accent-cyan transition-colors">{project.title}</h3>
                <p className="font-sans text-[0.95rem] text-text-secondary leading-relaxed mb-6 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[0.7rem] font-mono font-semibold bg-bg-secondary border border-border-color/30 px-2.5 py-1 rounded-lg text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 border-t border-border-color/30 pt-5 mt-auto font-mono text-xs">
                  {project.github && (
                    <a href={project.github} className="flex items-center gap-2 font-bold text-text-secondary hover:text-text-primary transition-colors duration-200" aria-label="GitHub Repository">
                      <Github size={18} /> CODE_REPO
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} className="flex items-center gap-2 font-bold text-accent-purple hover:text-accent-pink hover:drop-shadow-[0_0_10px_var(--glow-pink)] transition-all duration-200" aria-label="Live Demo">
                      <ExternalLink size={18} /> RUN_DEMO
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
