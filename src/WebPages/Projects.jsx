import { ExternalLink, Layers, MessageSquare, Terminal, Cpu, Code2, Sparkles } from 'lucide-react';
import flyerScreenshot from '../assets/flyer_screenshot.png';
import projPortfolio from '../assets/proj_portfolio.png';



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
      github: 'https://github.com/piyushlandge04/piyushai',
      live: 'https://piyushai.vercel.app/',
      icon: <Layers size={13} className="text-neutral-600" />,
      metrics: {
        engine: 'Generative Model',
        latency: '140ms',
        score: '98.5% FID'
      },
      image: flyerScreenshot
    },
    {
      title: 'Personal Portfolio Website',
      description: 'A premium, responsive portfolio web application featuring bento grid layout, interactive micro-animations, glassmorphic styling, custom terminal simulation, and an integrated AI assistant.',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Lucide Icons'],
      categories: ['frontend'],
      github: 'https://github.com/piyushlandge04/Portfolio.piyushlandge-',
      live: '/',
      icon: <Terminal size={13} className="text-neutral-600" />,
      metrics: {
        engine: 'Vite / React19',
        latency: '1.2s LCP',
        score: '100% SEO'
      },
      image: projPortfolio
    },
    {
      title: 'AI Conversational Agent',
      description: 'A context-aware intelligent chatbot powered by Large Language Models. Features semantic query routing, prompt caching, persistent chat history, and fluid conversational feedback loops.',
      tags: ['Python', 'LLMs', 'NLP', 'FastAPI'],
      categories: ['ai-ml'],
      github: '#',
      live: '#',
      icon: <MessageSquare size={13} className="text-neutral-600" />,
      metrics: {
        engine: 'Mistral-7B',
        latency: '24ms',
        score: '0.96 BLEU'
      },
      image: null,
      upcoming: true
    },
    {
      title: 'AI Prediction Model',
      description: 'An advanced predictive model utilizing machine learning algorithms to forecast complex patterns, system behaviors, or market trends with high precision.',
      tags: ['Python', 'Scikit-Learn', 'Pandas', 'Machine Learning'],
      categories: ['ai-ml'],
      github: '#',
      live: '#',
      icon: <Cpu size={13} className="text-neutral-600" />,
      metrics: {
        engine: 'XGBoost',
        latency: '15ms',
        score: '96.2% Acc'
      },
      image: null,
      upcoming: true
    }
  ];

  return (
    <section id="projects" className="pt-24 pb-10 md:pt-32 md:pb-32 relative scroll-reveal bg-bg-primary overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] rounded-full bg-purple-500/5 blur-[140px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-cyan-500/5 blur-[140px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-black text-center mb-4 tracking-tight">
            My Projects
          </h2>
          <p className="text-center max-w-150 mx-auto text-text-secondary text-base md:text-lg font-sans leading-relaxed opacity-90">
            Explore some of my recent engineering projects, custom visual models, and interactive AI integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-120">
          {projectsList.map((project, index) => {
            if (project.upcoming) {
              return (
                <div 
                  key={project.title} 
                  className="project-card flex flex-col items-center justify-center h-full min-h-70 sm:min-h-120 rounded-[28px] border-2 border-dashed border-neutral-200/60 bg-neutral-50/10 p-8 text-center select-none animate-[fadeIn_0.4s_ease-out_forwards]"
                  style={{
                    animationDelay: `${index * 80}ms`
                  }}
                >
                  <div className="p-3.5 rounded-full bg-white border border-neutral-200/40 shadow-2xs text-neutral-400 mb-4">
                    {project.icon}
                  </div>
                  <h3 className="font-heading font-black text-base text-neutral-800 mb-1.5 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="font-sans text-[0.68rem] text-neutral-400 font-bold uppercase tracking-wider mb-6">
                    Upcoming Project
                  </p>
                  <span className="bg-black/95 border border-neutral-800 text-white font-mono text-[0.62rem] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Sparkles size={11} className="text-purple-400 animate-pulse" /> Coming Soon
                  </span>
                </div>
              );
            }

            return (
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
                    background: `radial-gradient(350px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(0, 0, 0, 0.02), transparent 85%)`
                  }}
                />

                {/* Project Card Image Banner */}
                <div className="h-50 w-full relative overflow-hidden shrink-0 bg-neutral-50 border-b border-text-primary/5">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={`${project.title} screenshot`} 
                      className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center select-none font-mono text-[0.62rem] font-bold text-neutral-400 gap-1.5">
                      <Code2 size={18} className="text-neutral-300" />
                      <span>DEVELOPMENT STAGE</span>
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="p-5 sm:p-7.5 flex flex-col grow text-left relative z-10">
                  <h3 className="text-xl font-heading font-black mb-3.5 text-text-primary tracking-tight flex items-center gap-2">
                    <span className="p-1 rounded-md bg-neutral-50 border border-neutral-200/50 inline-flex items-center shrink-0">
                      {project.icon}
                    </span>
                    <span>{project.title}</span>
                  </h3>
                  <p className="font-sans text-[0.88rem] text-text-secondary leading-relaxed mb-6 grow opacity-90">
                    {project.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex border-t border-text-primary/5 pt-5 mt-auto font-mono text-[0.68rem] select-none items-center w-full">
                    {project.live && project.live !== '#' ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full font-black uppercase tracking-wider text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
                        aria-label="Open Live Demo"
                      >
                        <ExternalLink size={12} /> Open Project
                      </a>
                    ) : (
                      <span className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full font-black uppercase tracking-wider text-text-muted bg-text-primary/5 border border-text-primary/5 cursor-not-allowed opacity-40">
                        <ExternalLink size={12} /> Open Project
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
