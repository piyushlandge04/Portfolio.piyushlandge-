import { useState } from 'react';
import { ExternalLink, Layers, MessageSquare, Terminal, Sliders, Cpu, Eye, Code2, LineChart, Sparkles, Wand2 } from 'lucide-react';
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
  const [activeFilter, setActiveFilter] = useState('all');

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x-relative', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y-relative', `${y}px`);
  };

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai-ml', label: 'AI/ML Core' },
    { id: 'nlp-cv', label: 'NLP & Computer Vision' },
    { id: 'frontend', label: 'Frontend Design' }
  ];

  const projectsList = [
    {
      title: 'AI Flyer Designer',
      description: 'An intelligent creative suite that generates customized visual flyers and marketing assets using Generative AI. Employs advanced model prompt engineering, custom layout algorithms, and real-time canvas previewing.',
      tags: ['React', 'Tailwind CSS', 'Canvas API', 'API Integration'],
      categories: ['ai-ml', 'frontend'],
      github: null,
      live: '#',
      color: 'linear-gradient(135deg, #1e0a0f 0%, #080204 100%)',
      glowRGB: '244, 63, 94', // rose-500
      icon: <Layers size={13} className="text-rose-400" />,
      metrics: {
        engine: 'StableDiffusion-XL',
        latency: '140ms',
        score: '98.5% FID'
      },
      graphic: (
        <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center p-4">
          <div className="w-[190px] h-[125px] bg-neutral-900/80 border border-white/10 rounded-xl relative flex overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:border-rose-500/30 group-hover:scale-[1.03]">
            <div className="w-8 border-r border-white/5 bg-black/40 flex flex-col items-center gap-2 py-2 shrink-0">
              <div className="p-1 rounded text-rose-400 bg-rose-500/10">
                <Wand2 size={10} />
              </div>
              <span className="text-[7px] font-bold font-mono text-neutral-500 select-none">LAYERS</span>
              <div className="flex flex-col gap-1 w-full px-1">
                <div className="h-1 bg-rose-500/20 rounded-sm w-full"></div>
                <div className="h-1 bg-white/10 rounded-sm w-4/5"></div>
                <div className="h-1 bg-white/10 rounded-sm w-3/5"></div>
              </div>
            </div>
            <div className="flex-1 relative bg-neutral-950 p-1.5 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[8px_8px] pointer-events-none"></div>
              <div className="w-full h-full rounded-lg relative overflow-hidden border border-white/5">
                <img src={flyerScreenshot} alt="Flyer Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-1 flex justify-between items-center">
                  <span className="text-[4px] font-mono text-neutral-400">canvas_layer_0</span>
                  <span className="text-[4px] font-mono text-rose-400 font-bold">SD-XL Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Causal Self-Attention Compiler',
      description: 'An optimized sequence compile engine utilizing native PyTorch scaled_dot_product_attention matrices. Truncates attention computation operations by generating static causal masks for key-value projections.',
      tags: ['PyTorch', 'CUDA', 'Transformer Architecture', 'Deep Learning'],
      categories: ['ai-ml', 'nlp-cv'],
      github: '#',
      live: '#',
      color: 'linear-gradient(135deg, #1c1105 0%, #0a0602 100%)',
      glowRGB: '245, 158, 11', // amber-500
      icon: <Cpu size={13} className="text-amber-400" />,
      metrics: {
        engine: 'PyTorch 2.3',
        latency: '2.28ms',
        score: '99.2% CUDA'
      },
      graphic: (
        <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center p-4">
          <div className="w-[190px] h-[125px] bg-neutral-900/80 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:border-amber-500/30 group-hover:scale-[1.03]">
            <div className="flex justify-between items-center text-[0.35rem] font-mono text-neutral-400 shrink-0 border-b border-white/5 pb-1">
              <span> causal_attention.py </span>
              <span className="text-amber-400 font-bold">Compiled</span>
            </div>
            
            {/* Attention weight graph mockup */}
            <div className="flex-1 relative flex items-center justify-between py-1 select-none">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 15 20 Q 50 20 85 20 M 15 50 Q 50 35 85 20 M 15 80 Q 50 50 85 20 M 15 50 Q 50 65 85 50 M 15 80 Q 50 80 85 80" stroke="rgba(245, 158, 11, 0.25)" strokeWidth="0.8" fill="none" />
                <path d="M 15 20 Q 50 35 85 50" stroke="rgba(245, 158, 11, 0.45)" strokeWidth="1.2" fill="none" className="animate-pulse" />
              </svg>
              
              {/* Query nodes */}
              <div className="flex flex-col justify-between h-full z-10 gap-0.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-2.5 h-2.5 rounded-sm bg-neutral-950 border border-amber-500/30 flex items-center justify-center text-[3.5px] font-mono text-amber-400">Q{i}</div>
                ))}
              </div>
              
              {/* Key nodes */}
              <div className="flex flex-col justify-between h-full z-10 gap-0.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-2.5 h-2.5 rounded-sm bg-neutral-950 border border-amber-500/30 flex items-center justify-center text-[3.5px] font-mono text-amber-400">K{i}</div>
                ))}
              </div>
            </div>

            <div className="text-[3.5px] font-mono text-neutral-500 text-left border-t border-white/5 pt-1 flex justify-between">
              <span>Scale: 1/sqrt(d_model)</span>
              <span className="text-amber-400">heads=8</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'AI Chatbot',
      description: 'A responsive, context-aware chatbot powered by Large Language Models. Features semantic query routing, prompt caching, persistent chat history, and fluid conversational feedback loops.',
      tags: ['Python', 'LLMs', 'NLP', 'MongoDB'],
      categories: ['ai-ml', 'nlp-cv'],
      github: '#',
      live: '#',
      color: 'linear-gradient(135deg, #0e071e 0%, #030109 100%)',
      glowRGB: '139, 92, 246', // purple-500
      icon: <MessageSquare size={13} className="text-purple-400" />,
      metrics: {
        engine: 'Mistral-7B',
        latency: '24ms',
        score: '0.96 BLEU'
      },
      graphic: (
        <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center p-4">
          <div className="w-[190px] h-[125px] bg-neutral-900/80 border border-white/10 rounded-xl flex flex-col overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:border-purple-500/30 group-hover:scale-[1.03]">
            <div className="h-6 border-b border-white/5 bg-black/40 px-2 flex justify-between items-center shrink-0 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                <span className="text-[5px] font-mono text-neutral-300 font-bold uppercase tracking-wider">Mistral-7B Core</span>
              </div>
              <span className="text-[3.5px] font-mono text-purple-400 bg-purple-500/10 px-1 py-0.2 rounded border border-purple-500/20">READY</span>
            </div>
            <div className="flex-1 p-2 flex flex-col justify-end gap-2 bg-neutral-950/20">
              <div className="flex gap-1 items-start max-w-[85%] self-start text-left">
                <div className="w-3.5 h-3.5 rounded bg-neutral-800 border border-white/10 text-white flex items-center justify-center text-[0.32rem] font-bold shrink-0">U</div>
                <div className="rounded-lg p-1.5 text-[0.38rem] leading-normal font-mono bg-purple-950/30 border border-purple-500/15 text-purple-300">
                  Optimize causal attention matrix
                </div>
              </div>
              <div className="flex gap-1 items-start max-w-[85%] self-end flex-row-reverse text-right">
                <div className="w-3.5 h-3.5 rounded bg-white text-black flex items-center justify-center text-[0.32rem] font-bold shrink-0">M</div>
                <div className="rounded-lg p-1.5 text-[0.38rem] leading-normal font-mono bg-white/5 border border-white/10 text-neutral-200">
                  Applied FlashAttention. Latency: 24ms. BLEU: 0.96.
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Neural Style Transfer',
      description: 'Generates hybrid images by merging the content of one image with the artistic style of another. Utilizes deep convolutional feature layers (VGG-19) to compute separate style and content loss matrices.',
      tags: ['TensorFlow', 'Computer Vision', 'Style Loss', 'CNNs'],
      categories: ['ai-ml', 'nlp-cv'],
      github: '#',
      live: '#',
      color: 'linear-gradient(135deg, #05181e 0%, #010609 100%)',
      glowRGB: '6, 182, 212', // cyan-500
      icon: <Eye size={13} className="text-cyan-400" />,
      metrics: {
        engine: 'VGG-19 Model',
        latency: '340ms',
        score: '97.8% Percept'
      },
      graphic: (
        <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center p-4">
          <div className="w-[190px] h-[125px] bg-neutral-900/80 border border-white/10 rounded-xl relative overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:border-cyan-500/30 group-hover:scale-[1.03] flex items-center">
            
            {/* Split Comparison Frame */}
            <div className="w-1/2 h-full bg-cover relative border-r border-cyan-500/40 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center p-2">
                <span className="text-[5px] font-mono text-neutral-400 select-none uppercase tracking-wider mb-1">Content Input</span>
                <div className="w-10 h-10 rounded border border-white/5 bg-white/5 relative flex items-center justify-center">
                  <span className="text-[8px] text-neutral-400">🖼️</span>
                </div>
              </div>
            </div>
            
            <div className="w-1/2 h-full bg-cover relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-neutral-950/80 flex flex-col items-center justify-center p-2">
                <span className="text-[5px] font-mono text-cyan-400 select-none uppercase tracking-wider mb-1">Merged Output</span>
                <div className="w-10 h-10 rounded border border-cyan-500/20 bg-cyan-500/10 relative flex items-center justify-center overflow-hidden">
                  <span className="text-[8px] text-cyan-300 animate-pulse">🎨</span>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(6,182,212,0.15))]"></div>
                </div>
              </div>
            </div>

            {/* Slider bar mockup */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)] z-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 border border-white shadow"></div>
            </div>

          </div>
        </div>
      )
    },
    {
      title: 'Personal Portfolio Website',
      description: 'A premium, responsive portfolio web application featuring bento grid layout, interactive micro-animations, glassmorphic styling, custom terminal simulation, and an integrated AI assistant.',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Lucide Icons'],
      categories: ['frontend'],
      github: '#',
      live: '#',
      color: 'linear-gradient(135deg, #04160e 0%, #010604 100%)',
      glowRGB: '16, 185, 129', // emerald-500
      icon: <Terminal size={13} className="text-emerald-400" />,
      metrics: {
        engine: 'Vite / React19',
        latency: '1.2s LCP',
        score: '100% SEO'
      },
      graphic: (
        <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center p-4">
          <div className="w-[190px] h-[125px] bg-neutral-900/80 border border-white/10 rounded-xl p-2 flex flex-col gap-1.5 overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:border-emerald-500/30 group-hover:scale-[1.03]">
            <div className="flex justify-between items-center px-0.5 shrink-0 select-none">
              <div className="flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-red-500/70"></span>
                <span className="w-1 h-1 rounded-full bg-yellow-500/70"></span>
                <span className="w-1 h-1 rounded-full bg-green-500/70"></span>
              </div>
              <span className="text-[3.5px] font-mono text-neutral-500 font-bold uppercase tracking-wider">bento_dashboard.js</span>
            </div>
            <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-1 overflow-hidden">
              <div className="col-span-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-1 flex items-center gap-1.5 text-left">
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
                <span className="text-[3.5px] font-mono font-bold text-neutral-400 uppercase tracking-wider select-none">METRICS</span>
                <div className="flex items-end justify-around h-5 px-0.5 mb-0.5">
                  <div className="w-0.5 bg-emerald-500/30 rounded-t h-4"></div>
                  <div className="w-0.5 bg-emerald-400 rounded-t h-6"></div>
                  <div className="w-0.5 bg-emerald-500/30 rounded-t h-5"></div>
                </div>
                <div className="text-[3px] font-mono text-emerald-400 font-bold leading-none text-center">LCP: 1.2s</div>
              </div>
              <div className="col-span-2 bg-black/40 border border-white/5 rounded-lg p-1 flex flex-col justify-between font-mono text-[3.5px] leading-snug text-neutral-300 overflow-hidden text-left">
                <div className="flex justify-between border-b border-white/5 pb-0.5 mb-0.5 leading-none">
                  <span className="text-[2.5px] text-neutral-500">attn.py</span>
                  <span className="text-[2.5px] text-rose-400 font-bold">PyTorch</span>
                </div>
                <code className="text-[3px] overflow-hidden whitespace-nowrap text-neutral-400 block truncate">
                  <span className="text-purple-400">out</span> = sdpa(q, k, v)
                </code>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Filter projects by active category selection
  const filteredProjects = activeFilter === 'all' 
    ? projectsList 
    : projectsList.filter(project => project.categories.includes(activeFilter));

  return (
    <section id="projects" className="pt-24 pb-24 md:pt-32 md:pb-32 relative scroll-reveal bg-bg-primary overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] rounded-full bg-purple-500/5 blur-[140px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-cyan-500/5 blur-[140px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-text-primary text-center mb-4 tracking-tight">
            My <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 60%, #525252 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Projects</span>
          </h2>
          <p className="text-center max-w-[600px] mx-auto text-text-secondary text-base md:text-lg font-sans leading-relaxed opacity-90">
            Explore some of my recent engineering projects, custom visual models, and interactive AI integrations.
          </p>
        </div>

        {/* Dynamic Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-16 select-none font-sans">
          {categories.map(category => {
            const isActive = activeFilter === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4.5 py-2 text-xs font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-white text-black border-white shadow-[0_4px_16px_rgba(255,255,255,0.12)] scale-102 font-bold'
                    : 'bg-white/[0.02] border-white/5 text-text-secondary hover:border-white/20 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[480px]">
          {filteredProjects.map((project, index) => (
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
                {project.graphic}

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 z-20 flex gap-1.5 font-mono text-[0.62rem] font-bold select-none">
                  <span className="bg-black/85 border border-white/5 px-2.5 py-1 rounded-full text-neutral-200 flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                    {project.icon}
                    <span>{project.metrics.engine}</span>
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 sm:p-7.5 flex flex-col grow text-left bg-neutral-950/20 relative z-10">
                <h3 className="text-xl font-heading font-black mb-3.5 text-white tracking-tight flex items-center gap-2">
                  {project.title}
                </h3>
                <p className="font-sans text-[0.88rem] text-text-secondary leading-relaxed mb-5 grow opacity-90">
                  {project.description}
                </p>
                
                {/* Technical Metrics Block */}
                <div className="grid grid-cols-3 gap-2.5 border-t border-white/5 pt-4.5 mb-5 font-mono text-[0.65rem] text-text-muted select-none">
                  <div className="bg-white/[0.01] border border-white/5 rounded-lg p-1.5 text-center">
                    <span className="block text-[0.52rem] text-neutral-500 uppercase font-bold tracking-wider mb-0.5">Engine</span>
                    <span className="text-white font-extrabold truncate block">{project.metrics.engine.split(' ')[0]}</span>
                  </div>
                  <div className="bg-white/[0.01] border border-white/5 rounded-lg p-1.5 text-center">
                    <span className="block text-[0.52rem] text-neutral-500 uppercase font-bold tracking-wider mb-0.5">Latency</span>
                    <span className="text-white font-extrabold truncate block">{project.metrics.latency}</span>
                  </div>
                  <div className="bg-white/[0.01] border border-white/5 rounded-lg p-1.5 text-center">
                    <span className="block text-[0.52rem] text-neutral-500 uppercase font-bold tracking-wider mb-0.5">Performance</span>
                    <span className="text-white font-extrabold truncate block">{project.metrics.score}</span>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 select-none">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[0.6rem] font-mono font-bold bg-[#161b22]/40 border border-[#30363d]/60 px-2 py-0.5 rounded-md text-neutral-300 hover:text-white hover:border-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 border-t border-white/5 pt-5 mt-auto font-mono text-[0.68rem] select-none">
                  {project.github && (
                    <a 
                      href={project.github} 
                      className="flex items-center gap-1.5 font-black text-text-secondary hover:text-white transition-all duration-200 uppercase tracking-wider" 
                      aria-label="GitHub Repository"
                    >
                      <Github size={13} /> Code
                    </a>
                  )}
                  {project.live && (
                    <a 
                      href={project.live} 
                      className="flex items-center gap-1.5 font-black text-white hover:text-neutral-300 transition-all duration-200 uppercase tracking-wider ml-auto" 
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={13} /> Run Demo
                    </a>
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
