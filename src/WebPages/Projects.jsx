import { useState } from 'react';
import { ExternalLink, Layers, MessageSquare, Terminal, Sliders, Cpu, Eye, Code2, LineChart, Sparkles, Wand2 } from 'lucide-react';
import flyerScreenshot from '../assets/flyer_screenshot.png';
import projChatbot from '../assets/proj_chatbot.png';
import projStyleTransfer from '../assets/proj_style_transfer.png';
import projPortfolio from '../assets/proj_portfolio.png';

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
      description: 'An intelligent creative suite that generates customized visual flyers and marketing assets using Generative AI. Employs advanced model prompt engineering, custom layout algorithms, and real-time canvas previewing.',
      tags: ['React', 'Tailwind CSS', 'Canvas API', 'API Integration'],
      categories: ['ai-ml', 'frontend'],
      github: null,
      live: 'https://piyushai.vercel.app/',
      color: 'linear-gradient(135deg, #fff1f2 0%, #fff7ed 100%)',
      glowRGB: '244, 63, 94', // rose-500
      icon: <Layers size={13} className="text-rose-400" />,
      metrics: {
        engine: 'Generative Model',
        latency: '140ms',
        score: '98.5% FID'
      },
      image: flyerScreenshot
    },
    {
      title: 'AI Chatbot',
      description: 'A responsive, context-aware chatbot powered by Large Language Models. Features semantic query routing, prompt caching, persistent chat history, and fluid conversational feedback loops.',
      tags: ['Python', 'LLMs', 'NLP', 'MongoDB'],
      categories: ['ai-ml', 'nlp-cv'],
      github: '#',
      live: '#',
      color: 'linear-gradient(135deg, #f5f3ff 0%, #faf5ff 100%)',
      glowRGB: '139, 92, 246', // purple-500
      icon: <MessageSquare size={13} className="text-purple-400" />,
      metrics: {
        engine: 'Mistral-7B',
        latency: '24ms',
        score: '0.96 BLEU'
      },
      image: projChatbot
    },
    {
      title: 'Neural Style Transfer',
      description: 'Generates hybrid images by merging the content of one image with the artistic style of another. Utilizes deep convolutional feature layers (VGG-19) to compute separate style and content loss matrices.',
      tags: ['TensorFlow', 'Computer Vision', 'Style Loss', 'CNNs'],
      categories: ['ai-ml', 'nlp-cv'],
      github: '#',
      live: '#',
      color: 'linear-gradient(135deg, #ecfeff 0%, #f0fdfa 100%)',
      glowRGB: '6, 182, 212', // cyan-500
      icon: <Eye size={13} className="text-cyan-400" />,
      metrics: {
        engine: 'VGG-19 Model',
        latency: '340ms',
        score: '97.8% Percept'
      },
      image: projStyleTransfer
    },
    {
      title: 'Personal Portfolio Website',
      description: 'A premium, responsive portfolio web application featuring bento grid layout, interactive micro-animations, glassmorphic styling, custom terminal simulation, and an integrated AI assistant.',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Lucide Icons'],
      categories: ['frontend'],
      github: '#',
      live: '#',
      color: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
      glowRGB: '16, 185, 129', // emerald-500
      icon: <Terminal size={13} className="text-emerald-400" />,
      metrics: {
        engine: 'Vite / React19',
        latency: '1.2s LCP',
        score: '100% SEO'
      },
      image: projPortfolio
    }
  ];


  return (
    <section id="projects" className="pt-24 pb-10 md:pt-32 md:pb-32 relative scroll-reveal bg-bg-primary overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] rounded-full bg-purple-500/5 blur-[140px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-cyan-500/5 blur-[140px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-black text-center mb-4 tracking-tight">
            My Projects
          </h2>
          <p className="text-center max-w-[600px] mx-auto text-text-secondary text-base md:text-lg font-sans leading-relaxed opacity-90">
            Explore some of my recent engineering projects, custom visual models, and interactive AI integrations.
          </p>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[480px]">
          {projectsList.map((project, index) => (
            <div 
              key={project.title} 
              className="project-card glass-card flex flex-col h-full rounded-[28px] group transition-all duration-300 relative overflow-hidden border animate-[fadeIn_0.4s_ease-out_forwards]"
              onMouseMove={handleMouseMove}
              style={{
                borderColor: 'rgba(255, 255, 255, 0.05)',
                animationDelay: `${index * 80}ms`
              }}
            >
              {/* Relative Mouse Spotlight Glow */}
              <div 
                className="absolute inset-0 rounded-[28px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                  background: `radial-gradient(350px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(${project.glowRGB}, 0.06), transparent 85%)`
                }}
              />

              {/* Project Card Image Banner / Styled Graphic */}
              <div 
                className="h-[210px] w-full relative flex items-center justify-center transition-all duration-500 overflow-hidden shrink-0" 
                style={{ background: project.color }}
              >
                {/* Tech wireframe grid pattern */}
                <div className="absolute w-full h-full bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[14px_14px] opacity-80 z-10"></div>
                
                {/* Visual Graphic Representation */}
                <div className="absolute inset-0 bg-white/40 flex items-center justify-center p-4">
                  <div className="w-[190px] h-[125px] bg-bg-secondary/80 border border-text-primary/10 rounded-xl relative flex flex-col overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:scale-[1.03]">
                    {/* Browser top bar */}
                    <div className="h-5 border-b border-text-primary/5 bg-bg-card px-2 flex justify-between items-center shrink-0 select-none">
                      <div className="flex gap-0.5">
                        <span className="w-1.2 h-1.2 rounded-full bg-red-400/80"></span>
                        <span className="w-1.2 h-1.2 rounded-full bg-yellow-400/80"></span>
                        <span className="w-1.2 h-1.2 rounded-full bg-green-400/80"></span>
                      </div>
                      <span className="text-[4px] font-mono text-text-muted font-bold truncate max-w-[100px]">
                        {project.title.toLowerCase().replace(/ /g, '_')}.app
                      </span>
                    </div>
                    {/* Screenshot image */}
                    <div className="flex-1 relative overflow-hidden bg-white">
                      <img 
                        src={project.image} 
                        alt={`${project.title} screenshot`} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 z-20 flex gap-1.5 font-mono text-[0.62rem] font-bold select-none">
                  <span className="bg-black/85 border border-text-primary/5 px-2.5 py-1 rounded-full text-white flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                    {project.icon}
                    <span>{project.metrics.engine}</span>
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 sm:p-7.5 flex flex-col grow text-left bg-black/5 relative z-10">
                <h3 className="text-xl font-heading font-black mb-3.5 text-text-primary tracking-tight flex items-center gap-2">
                  {project.title}
                </h3>
                <p className="font-sans text-[0.88rem] text-text-secondary leading-relaxed mb-5 grow opacity-90">
                  {project.description}
                </p>
                
                {/* Technical Metrics Block */}
                <div className="grid grid-cols-3 gap-2.5 border-t border-text-primary/5 pt-4.5 mb-5 font-mono text-[0.65rem] text-text-muted select-none">
                  <div className="bg-text-primary/1 border border-text-primary/5 rounded-lg p-1.5 text-center">
                    <span className="block text-[0.52rem] text-text-muted uppercase font-bold tracking-wider mb-0.5">Engine</span>
                    <span className="text-text-primary font-extrabold truncate block">{project.metrics.engine.split(' ')[0]}</span>
                  </div>
                  <div className="bg-text-primary/1 border border-text-primary/5 rounded-lg p-1.5 text-center">
                    <span className="block text-[0.52rem] text-text-muted uppercase font-bold tracking-wider mb-0.5">Latency</span>
                    <span className="text-text-primary font-extrabold truncate block">{project.metrics.latency}</span>
                  </div>
                  <div className="bg-text-primary/1 border border-text-primary/5 rounded-lg p-1.5 text-center">
                    <span className="block text-[0.52rem] text-text-muted uppercase font-bold tracking-wider mb-0.5">Performance</span>
                    <span className="text-text-primary font-extrabold truncate block">{project.metrics.score}</span>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 select-none">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[0.6rem] font-mono font-bold bg-white/40 border border-[#30363d]/60 px-2 py-0.5 rounded-md text-text-muted hover:text-text-primary hover:border-text-primary/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2.5 border-t border-text-primary/5 pt-5 mt-auto font-mono text-[0.68rem] select-none items-center">
                  {project.github && project.github !== '#' ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full font-black uppercase tracking-wider text-text-primary bg-text-primary/8 border border-text-primary/10 hover:bg-text-primary/12 hover:border-text-primary/20 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
                      aria-label="GitHub Repository"
                    >
                      <Github size={12} /> Repo
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full font-black uppercase tracking-wider text-text-muted bg-text-primary/5 border border-text-primary/5 cursor-not-allowed opacity-40">
                      <Github size={12} /> Repo
                    </span>
                  )}
                  {project.live && project.live !== '#' ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full font-black uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
                      aria-label="Open Live Demo"
                    >
                      <ExternalLink size={12} /> Open
                    </a>
                  ) : (
                    <span className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full font-black uppercase tracking-wider text-text-muted bg-text-primary/5 border border-text-primary/5 cursor-not-allowed opacity-40">
                      <ExternalLink size={12} /> Open
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
