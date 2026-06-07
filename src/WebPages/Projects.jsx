import { ExternalLink, Layers, MessageSquare, Terminal } from 'lucide-react';
import flyerScreenshot from '../assets/flyer_screenshot.png';

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
      github: null,
      live: '#',
      color: 'linear-gradient(135deg, #1a0f12 0%, #0a0507 100%)',
      glowRGB: '251, 113, 133', // rose-400
      metrics: {
        engine: 'StableDiffusion-XL',
        latency: '140ms',
        score: '98.5% FID'
      },
      graphic: (
        <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center p-4">
          <div className="w-[180px] h-[120px] bg-neutral-900/80 border border-white/10 rounded-xl relative flex overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:border-rose-500/30 group-hover:scale-105">
            <div className="w-7 border-r border-white/5 bg-black/40 flex flex-col items-center gap-1.5 py-2 shrink-0">
              <div className="p-1 rounded text-rose-400 bg-rose-500/10">
                <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2.5" fill="none"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /></svg>
              </div>
              <span className="text-[8px] font-bold font-mono text-neutral-500">T</span>
              <div className="p-1 rounded text-neutral-500">
                <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2.5" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
              </div>
            </div>
            <div className="flex-1 relative bg-neutral-950 p-1.5 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[8px_8px] pointer-events-none"></div>
              <div className="w-full h-full rounded-lg relative overflow-hidden border border-white/5">
                <img src={flyerScreenshot} alt="Flyer Preview" className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 to-transparent p-1 flex justify-between items-center">
                  <span className="text-[3.5px] font-mono text-neutral-400">canvas_layer_main</span>
                  <span className="text-[3.5px] font-mono text-rose-400 font-bold">SD-XL Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'AI Chatbot',
      description: 'A responsive, context-aware chatbot powered by Large Language Models. Features semantic query routing, prompt caching, persistent chat history, and fluid conversational feedback loops.',
      tags: ['Python', 'LLMs', 'NLP', 'MongoDB'],
      github: '#',
      live: '#',
      color: 'linear-gradient(135deg, #0f0a1c 0%, #05030a 100%)',
      glowRGB: '168, 85, 247', // purple-400
      metrics: {
        engine: 'Mistral-7B',
        latency: '24ms',
        score: '0.96 BLEU'
      },
      graphic: (
        <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center p-4">
          <div className="w-[180px] h-[120px] bg-neutral-900/80 border border-white/10 rounded-xl flex flex-col overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:border-purple-500/30 group-hover:scale-105">
            <div className="h-6 border-b border-white/5 bg-black/40 px-2 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                <span className="text-[5px] font-mono text-neutral-300 font-bold uppercase tracking-wider">Mistral-7B Chatbot</span>
              </div>
              <span className="text-[4px] font-mono text-purple-400 bg-purple-500/10 px-1 py-0.2 rounded border border-purple-500/20">ACTIVE</span>
            </div>
            <div className="flex-1 p-2 flex flex-col justify-end gap-1.5 bg-neutral-950/20">
              <div className="flex gap-1 items-start max-w-[85%] self-start">
                <div className="w-3.5 h-3.5 rounded bg-neutral-800 border border-white/10 text-white flex items-center justify-center text-[0.35rem] font-bold select-none shrink-0 leading-none">U</div>
                <div className="rounded px-1.5 py-0.5 text-[0.38rem] leading-snug font-mono bg-purple-950/30 border border-purple-500/15 text-purple-300">Optimize causal attention matrix</div>
              </div>
              <div className="flex gap-1 items-start max-w-[85%] self-end flex-row-reverse">
                <div className="w-3.5 h-3.5 rounded bg-white text-black flex items-center justify-center text-[0.35rem] font-bold select-none shrink-0 leading-none">M</div>
                <div className="rounded px-1.5 py-0.5 text-[0.38rem] leading-snug font-mono bg-white/5 border border-white/10 text-neutral-200">Applied FlashAttention. Latency: 24ms. BLEU: 0.96.</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Personal Portfolio Website',
      description: 'A premium, responsive portfolio web application featuring bento grid layout, interactive micro-animations, glassmorphic styling, custom terminal simulation, and an integrated AI assistant.',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Lucide Icons'],
      github: '#',
      live: '#',
      color: 'linear-gradient(135deg, #071711 0%, #030806 100%)',
      glowRGB: '52, 211, 153', // emerald-400
      metrics: {
        engine: 'Vite / React19',
        latency: '1.2s LCP',
        score: '100% SEO'
      },
      graphic: (
        <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center p-4">
          <div className="w-[180px] h-[120px] bg-neutral-900/80 border border-white/10 rounded-xl p-1.5 flex flex-col gap-1.5 overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:border-emerald-500/30 group-hover:scale-105">
            <div className="flex justify-between items-center px-0.5 shrink-0">
              <div className="flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-red-500/70"></span>
                <span className="w-1 h-1 rounded-full bg-yellow-500/70"></span>
                <span className="w-1 h-1 rounded-full bg-green-500/70"></span>
              </div>
              <span className="text-[3.5px] font-mono text-neutral-500 font-bold uppercase tracking-wider">Portfolio.py</span>
            </div>
            <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-1 overflow-hidden">
              <div className="col-span-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-1 flex items-center gap-1.5">
                <div className="w-4.5 h-4.5 rounded-full bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-center relative select-none shrink-0">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 absolute top-0 right-0 animate-ping"></span>
                  <span className="text-[4px] text-emerald-300 font-bold leading-none">PL</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[4px] font-heading font-black text-white leading-none truncate">Piyush Landge</span>
                  <span className="text-[3px] font-mono text-neutral-500 mt-0.5 leading-none">Deep Learning Dev</span>
                </div>
              </div>
              <div className="row-span-2 bg-white/[0.02] border border-white/5 rounded-lg p-1 flex flex-col justify-between">
                <span className="text-[3px] font-mono font-bold text-neutral-400 uppercase tracking-wider">STATS</span>
                <div className="flex items-end justify-around h-5 px-0.5 mb-0.5">
                  <div className="w-0.5 bg-emerald-500/30 rounded-t h-4"></div>
                  <div className="w-0.5 bg-emerald-400 rounded-t h-6"></div>
                  <div className="w-0.5 bg-emerald-500/30 rounded-t h-5"></div>
                </div>
                <div className="text-[3px] font-mono text-emerald-400 font-bold leading-none text-center">LCP: 1.2s</div>
              </div>
              <div className="col-span-2 bg-black/40 border border-white/5 rounded-lg p-1 flex flex-col justify-between font-mono text-[3px] leading-snug text-neutral-300 overflow-hidden">
                <div className="flex justify-between border-b border-white/5 pb-0.5 mb-0.5 leading-none">
                  <span className="text-[2.5px] text-neutral-500">attn.py</span>
                  <span className="text-[2.5px] text-rose-400">PyTorch</span>
                </div>
                <code className="text-[3px] overflow-hidden whitespace-nowrap text-left text-neutral-400 block truncate">
                  <span className="text-purple-400">out</span> = sdpa(q, k, v)
                </code>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="projects" className="pt-24 pb-12 md:pt-32 md:pb-16 relative scroll-reveal scroll-reveal-init bg-bg-primary overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] rounded-full bg-cyan-500/10 blur-[130px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading font-black text-text-primary text-center mb-4 tracking-tight">
          My <span className="bg-linear-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-center max-w-[600px] mx-auto text-text-secondary text-base md:text-lg mb-16 font-sans">
          Explore some of my recent engineering projects, web applications, and AI integrations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <div 
              key={index} 
              className="project-card glass-card flex flex-col h-full rounded-[24px] group transition-all duration-300 relative overflow-hidden"
              onMouseMove={handleMouseMove}
              style={{
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Relative Mouse Spotlight Glow */}
              <div 
                className="absolute inset-0 rounded-[24px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                  background: `radial-gradient(350px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(${project.glowRGB}, 0.05), transparent 80%)`
                }}
              />

              {/* Project Card Image Banner / Styled Graphic */}
              <div 
                className="h-[200px] w-full relative flex items-center justify-center transition-all duration-500 overflow-hidden shrink-0" 
                style={{ background: project.color }}
              >
                {/* Tech wireframe grid pattern */}
                <div className="absolute w-full h-full bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[14px_14px] opacity-75 z-10"></div>
                
                {/* Visual Graphic Representation */}
                {project.graphic}

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 z-20 flex gap-1.5 font-mono text-[0.6rem] font-bold">
                  <span className="bg-black/80 border border-white/5 px-2 py-0.5 rounded text-neutral-300 flex items-center gap-1.5">
                    {index === 0 && <Layers size={10} className="text-rose-400" />}
                    {index === 1 && <MessageSquare size={10} className="text-purple-400" />}
                    {index === 2 && <Terminal size={10} className="text-emerald-400" />}
                    {project.metrics.engine}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 sm:p-7 flex flex-col grow text-left bg-neutral-950/20 relative z-10">
                <h3 className="text-[1.25rem] font-black mb-3 text-white font-heading group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="font-sans text-[0.92rem] text-text-secondary leading-relaxed mb-4 grow">
                  {project.description}
                </p>
                
                {/* Technical Metrics Block */}
                <div className="flex gap-4 border-t border-white/5 pt-3 mb-6 font-mono text-[0.68rem] text-text-muted">
                  <div>Engine: <span className="text-white font-bold">{project.metrics.engine}</span></div>
                  <div>Latency: <span className="text-white font-bold">{project.metrics.latency}</span></div>
                  <div>Score: <span className="text-white font-bold">{project.metrics.score}</span></div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[0.62rem] font-mono font-bold bg-neutral-900 border border-white/5 px-2 py-0.5 rounded-lg text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 border-t border-white/5 pt-5 mt-auto font-mono text-[0.68rem]">
                  {project.github && (
                    <a href={project.github} className="flex items-center gap-1.5 font-bold text-text-secondary hover:text-white transition-all duration-200" aria-label="GitHub Repository">
                      <Github size={15} /> code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} className="flex items-center gap-1.5 font-bold text-white hover:text-neutral-300 transition-all duration-200" aria-label="Live Demo">
                      <ExternalLink size={15} /> run demo
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
