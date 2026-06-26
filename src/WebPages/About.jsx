import { useState, useEffect } from 'react';
import { 
  GraduationCap, Briefcase, Sparkles, MapPin, Mail, 
  ChevronDown, ChevronUp, Activity, Terminal, Cpu, HardDrive
} from 'lucide-react';

const MOCK_TERMINAL_LOGS = [
  { type: 'sys', text: 'Initializing Agent Environment...' },
  { type: 'ok', text: 'Local workspace synchronized (12 files loaded)' },
  { type: 'ok', text: 'Loaded PyTorch runtime - CUDA 12.1' },
  { type: 'sys', text: 'Handshake completed on ports...' },
  { type: 'ok', text: 'Agent Node online on PORT 5173' },
  { type: 'run', text: 'Compiling flash-attention kernel layers...' },
  { type: 'stat', text: 'Attention projections verified [heads: 8, d_model: 512]' },
  { type: 'ok', text: 'Forward pass latency optimized: 1.14ms' },
  { type: 'run', text: 'Evaluating transformer pipelines...' },
  { type: 'stat', text: 'Pipeline accuracy matched target threshold' },
  { type: 'ok', text: 'Active learning loop listening for triggers...' },
  { type: 'run', text: 'Monitoring vector database queries...' },
  { type: 'sys', text: 'Agent status: monitoring runtime logs' }
];

const experienceTimeline = [
  {
    period: 'Apr 2026 – Present',
    duration: '2 mos',
    role: 'AI Intern',
    company: 'Applogix Solutions',
    type: 'Internship',
    color: '#a855f7',
    details: [
      'Organized complex backend data pipelines and designed pre-processing methodologies using Python.',
      'Executed fine-tuning parameter sweeps and managed tensor matrices to optimize inference latency.',
      'Audited model evaluations, compiled metric trackers, and produced technical documentation.'
    ],
    takeaway: 'Acquired deep production experience in scaling data prep pipelines and adjusting weight parameters.'
  },
  {
    period: 'Feb 2026 – Mar 2026',
    duration: '2 mos',
    role: 'AI Project Intern',
    company: 'Applogix Solutions',
    type: 'Internship',
    color: '#6366f1',
    details: [
      'Maintained automated auditing modules for deep learning models, identifying gradient clipping bottlenecks.',
      'Implemented validation checks that verified dataset token structures before neural compiler inputs.',
      'Collaborated on optimization parameters which resulted in improved validation benchmark results.'
    ],
    takeaway: 'Mastered standard regression auditing loops and model training parameter verification patterns.'
  }
];

const educationTimeline = [
  {
    period: '2023 – 2026',
    degree: 'B.Sc. Computer Science',
    institution: 'B.K. Birla College, Kalyan',
    grade: 'CGPA 8.00',
    color: '#22d3ee',
    details: 'Comprehensive exploration of backend database models, high-performance algorithms, and computational principles. Maintained an excellent academic track record.',
  },
  {
    period: '2022 – 2023',
    degree: 'HSC – Maharashtra State Board',
    institution: 'D.D.S.P. College, Erandol',
    color: '#34d399',
    details: 'Scientific stream curriculum focusing on mathematics, logical theorems, and engineering concepts.',
  }
];

export default function About() {
  const [expandedExperience, setExpandedExperience] = useState(0); // expand first item by default
  const [expandedEducation, setExpandedEducation] = useState(null);

  // Dynamic Terminal Logs State
  const [terminalLogs, setTerminalLogs] = useState(MOCK_TERMINAL_LOGS.slice(0, 5));
  const [sysMetrics, setSysMetrics] = useState({ cpu: 12, vram: 4.8, latency: 1.12 });

  useEffect(() => {
    let logCounter = 5;
    const interval = setInterval(() => {
      // Add next log in sequence
      setTerminalLogs(prev => {
        const nextLog = MOCK_TERMINAL_LOGS[logCounter % MOCK_TERMINAL_LOGS.length];
        logCounter++;
        // Keep last 5 logs for cleanliness
        return [...prev.slice(1), nextLog];
      });

      // Randomly flucutate system metrics slightly
      setSysMetrics({
        cpu: Math.floor(8 + Math.random() * 16),
        vram: parseFloat((4.6 + Math.random() * 0.5).toFixed(2)),
        latency: parseFloat((1.08 + Math.random() * 0.15).toFixed(2))
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x-relative', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y-relative', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="about" className="py-24 md:py-32 relative scroll-reveal bg-bg-primary overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-15">
        <div className="absolute top-[20%] left-[-15%] w-[45%] h-[50%] rounded-full bg-purple-500/10 blur-[140px]"></div>
        <div className="absolute bottom-[10%] right-[-15%] w-[45%] h-[50%] rounded-full bg-cyan-500/10 blur-[140px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[0.65rem] font-mono font-bold uppercase tracking-[0.22em] text-text-primary/30 mb-3">
            Who I Am
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-text-primary tracking-tight">
            About{' '}
            <span className="bg-linear-to-r from-text-primary via-text-secondary to-text-muted bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="mt-4 text-text-secondary text-base max-w-lg mx-auto font-sans leading-relaxed">
            Discover my background, core technical skills, and agentic workflows.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── CARD 1: Profile & Activity (Redesigned) ── */}
          <div
            className="bento-card glass-card relative group overflow-hidden lg:col-span-3 p-7 md:p-9 flex flex-col gap-8 rounded-3xl transition-all duration-300"
            onMouseMove={handleMouseMove}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(168, 85, 247, 0.05), transparent 80%)`
              }}
            />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              {/* Left Column: Identity */}
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left gap-5">
                
                {/* Animated Avatar */}
                <div className="relative shrink-0 group/avatar">
                  {/* Neon Warm Light Glow behind avatar container */}
                  <div className="absolute inset-[-6px] bg-linear-to-tr from-orange-500 via-amber-500 to-rose-600 rounded-3xl blur-[14px] opacity-65 group-hover/avatar:opacity-90 transition-opacity duration-500 animate-[spin_5s_linear_infinite]" />
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex flex-col items-center justify-center font-heading relative overflow-hidden border border-text-primary/10 bg-linear-to-b from-[#1a1c1e] to-[#0f1011] shadow-2xl z-10 select-none group/box"
                  >
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:10px_10px]" />
                    <span className="text-4xl sm:text-5xl font-black bg-linear-to-b from-white to-[#d1d5db] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tight">
                      PL
                    </span>
                  </div>
                  {/* Status indicator heartbeat */}
                  <span className="absolute bottom-[-4px] right-[-4px] flex h-5 w-5 z-20">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-white shadow-sm" />
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 w-full items-center md:items-start">
                  <h3 className="font-heading font-black text-3xl tracking-tight text-text-primary">
                    Piyush Landge
                  </h3>
                  <div className="flex flex-col gap-2 mt-1">
                    <span className="inline-flex items-center justify-center md:justify-start gap-1.5 text-[0.7rem] font-mono font-bold uppercase tracking-widest text-text-secondary">
                      <Sparkles size={12} className="text-purple-500" /> AI Engineer
                    </span>
                    <span className="inline-flex items-center justify-center md:justify-start gap-1.5 text-[0.7rem] font-mono font-bold uppercase tracking-widest text-text-secondary">
                      <MapPin size={12} className="text-cyan-500" /> Pune, India
                    </span>
                  </div>
                </div>

                {/* Hire Button */}
                <a
                  href="#contact"
                  className="mt-2 w-full md:w-auto inline-flex items-center justify-center gap-2 text-[0.75rem] font-bold px-6 py-2.5 rounded-xl border border-text-primary/10 bg-text-primary/5 text-text-primary hover:bg-text-primary/10 hover:border-text-primary/25 transition-all duration-200 font-mono uppercase tracking-wider shrink-0"
                >
                  <Mail size={14} /> Hire Me
                </a>
              </div>

              {/* Right Column: Narrative */}
              <div className="md:col-span-8 flex flex-col gap-6 text-left">
                <h4 className="font-heading text-xl sm:text-2xl font-bold leading-snug text-text-primary">
                  Bridging heavy computational science with crisp, responsive frontend utility.
                </h4>
                
                <div className="font-sans text-text-secondary text-[0.95rem] leading-[1.7] flex flex-col gap-4">
                  <p>
                    I specialize in developing, evaluating, and deploying deep learning paradigms. My core focus lies in building high-performance architectures while simultaneously ensuring they are accessible and visually compelling.
                  </p>
                </div>

                {/* Focus Area Tags */}
                <div className="flex flex-wrap gap-2.5 mt-2">
                  {[
                    { label: 'PyTorch', color: '#ee4c2c', bg: 'rgba(238, 76, 44, 0.05)', border: 'rgba(238, 76, 44, 0.15)' },
                    { label: 'Generative AI', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.05)', border: 'rgba(168, 85, 247, 0.15)' },
                    { label: 'LLMs & Agents', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.05)', border: 'rgba(59, 130, 246, 0.15)' },
                    { label: 'Cloud Architecture', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.05)', border: 'rgba(6, 182, 212, 0.15)' },
                  ].map((tag, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold tracking-wide font-mono transition-all duration-300 hover:scale-[1.03] shadow-xs cursor-default"
                      style={{
                        color: tag.color,
                        backgroundColor: tag.bg,
                        border: `1px solid ${tag.border}`
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: tag.color }} />
                      {tag.label}
                    </span>
                  ))}
                </div>

                {/* Process Agent Status Terminal Widget */}
                <div className="mt-4 bg-[#0a0b0d] border border-neutral-800 rounded-2xl p-4 flex flex-col font-mono text-[0.72rem] text-[#f8f8f2] shadow-xl relative overflow-hidden">
                  {/* Top Bar with window control circles */}
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3 relative z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[0.62rem] text-neutral-500 font-bold uppercase tracking-wider">piyush@agent-node:~</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                      <span className="text-[0.55rem] text-emerald-500 font-bold">ONLINE</span>
                    </span>
                  </div>

                  {/* Terminal Console Stream */}
                  <div className="flex flex-col gap-1.5 min-h-[95px] font-mono leading-relaxed select-none">
                    {terminalLogs.map((log, idx) => {
                      let colorClass = 'text-neutral-400';
                      let prefix = '›';
                      if (log.type === 'ok') {
                        colorClass = 'text-emerald-400';
                        prefix = '✔';
                      } else if (log.type === 'sys') {
                        colorClass = 'text-cyan-400';
                        prefix = 'ℹ';
                      } else if (log.type === 'run') {
                        colorClass = 'text-purple-400';
                        prefix = '⚙';
                      } else if (log.type === 'stat') {
                        colorClass = 'text-amber-400';
                        prefix = '★';
                      }
                      return (
                        <div key={idx} className={`flex items-start gap-2 transition-all duration-300 ${colorClass}`}>
                          <span className="shrink-0 opacity-80">{prefix}</span>
                          <span className="break-all">{log.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* System Stats Section */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-neutral-800 text-[0.6rem] font-bold text-neutral-500">
                    <div className="flex items-center gap-1.5">
                      <Cpu size={12} className="text-purple-500" />
                      <span>CPU: <span className="text-neutral-300">{sysMetrics.cpu}%</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HardDrive size={12} className="text-cyan-500" />
                      <span>VRAM: <span className="text-neutral-300">{sysMetrics.vram} GB</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Activity size={12} className="text-amber-500" />
                      <span>LATENCY: <span className="text-neutral-300">{sysMetrics.latency}ms</span></span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── CARD 2: Tech Stack / Interactive Skills (Restructured to "My Expertise") ── */}
          <div
            id="skills"
            className="bento-card glass-card relative group overflow-hidden lg:col-span-3 p-8 flex flex-col gap-6 rounded-3xl transition-all duration-300 scroll-mt-24"
            onMouseMove={handleMouseMove}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(34, 211, 238, 0.05), transparent 80%)`
              }}
            />

            {/* Header: Title & Subtitle */}
            <div className="text-center md:text-left relative z-10 border-b border-text-primary/5 pb-5">
              <h3 className="font-heading font-black text-2xl text-text-primary tracking-tight mb-2 uppercase">
                MY EXPERTISE
              </h3>
              <p className="font-sans text-sm text-text-muted">
                Building AI-powered applications from idea to deployment
              </p>
            </div>

            {/* 5-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 relative z-10 w-full mt-2">
              {[
                {
                  title: 'AI & ML',
                  icon: '🧠',
                  skills: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV']
                },
                {
                  title: 'GenAI',
                  icon: '🤖',
                  skills: ['LangChain', 'RAG', 'Embeddings', 'Vector DB']
                },
                {
                  title: 'Backend',
                  icon: '⚡',
                  skills: ['FastAPI', 'Django', 'Flask', 'PostgreSQL']
                },
                {
                  title: 'Frontend',
                  icon: '💻',
                  skills: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS']
                },
                {
                  title: 'DevOps',
                  icon: '☁',
                  skills: ['Docker', 'Git', 'Linux', 'Vercel']
                }
              ].map((category, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded-2xl border border-text-primary/5 bg-text-primary/1 hover:bg-text-primary/2 hover:-translate-y-1 hover:shadow-xs transition-all duration-300 p-5 text-left h-full"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-2 border-b border-text-primary/5 pb-3 mb-4 shrink-0">
                    <span className="text-base select-none">{category.icon}</span>
                    <span className="font-heading font-bold text-xs text-text-primary uppercase tracking-wider">
                      {category.title}
                    </span>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-col gap-2.5 grow font-mono text-[0.72rem] text-text-secondary">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-1.5 py-1 px-1.5 rounded-md hover:bg-white hover:shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all cursor-default"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-text-primary/20 shrink-0"></span>
                        <span className="font-medium truncate">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CARD 4: Interactive Experience & Education Timeline (full width) ── */}
          <div
            id="experience"
            className="bento-card glass-card relative group overflow-hidden lg:col-span-3 p-7 md:p-9 flex flex-col rounded-3xl transition-all duration-300 scroll-mt-24"
            onMouseMove={handleMouseMove}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(800px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(34, 211, 238, 0.04), transparent 80%)`
              }}
            />
            
            <div className="mb-8 text-left relative z-10">
              <h3 className="font-heading font-black text-2xl text-text-primary mb-1.5">Education &amp; Experience</h3>
              <p className="text-sm text-text-muted font-sans">Click timeline milestones to expand details, achievements, and technology tools utilized</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">

              {/* Column 1: Experience */}
              <div className="flex flex-col gap-2">
                <h4 className="font-heading font-bold text-[0.72rem] uppercase tracking-widest flex items-center gap-2 mb-4 text-text-muted text-left">
                  <Briefcase size={13} className="text-purple-400" /> Work Milestones
                </h4>
                
                <div className="flex flex-col gap-3 pl-1">
                  {experienceTimeline.map((event, idx) => {
                    const isExpanded = expandedExperience === idx;
                    return (
                      <div
                        key={idx}
                        className={`relative pl-7 border-l-2 text-left cursor-pointer rounded-r-xl transition-all duration-300 p-3 hover:bg-text-primary/2 ${
                          isExpanded ? 'border-purple-500 bg-text-primary/1.5' : 'border-text-primary/10'
                        }`}
                        onClick={() => setExpandedExperience(isExpanded ? null : idx)}
                      >
                        {/* Milestone indicator dot */}
                        <div
                          className="absolute left-[-7px] top-4 w-3 h-3 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                          style={{
                            borderColor: isExpanded ? event.color : 'rgba(255, 255, 255, 0.2)',
                            background: isExpanded ? `${event.color}35` : 'rgba(255,255,255,0.05)',
                            boxShadow: isExpanded ? `0 0 10px ${event.color}` : 'none'
                          }}
                        >
                          <span className="w-1 h-1 rounded-full" style={{ background: isExpanded ? event.color : 'transparent' }} />
                        </div>

                        {/* Summary Header */}
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-[0.6rem] font-mono font-bold text-text-muted uppercase tracking-wide block mb-0.5">
                              {event.period} · {event.duration}
                            </span>
                            <h5 className="text-[0.95rem] font-black text-text-primary leading-tight">{event.role}</h5>
                            <span className="text-xs font-bold text-text-muted">{event.company}</span>
                          </div>
                          <span className="text-text-muted mt-2">
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </span>
                        </div>

                        {/* Collapsible Details */}
                        <div className={`transition-all duration-500 overflow-hidden font-sans ${
                          isExpanded ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0 pointer-events-none'
                        }`}>
                          <ul className="text-xs text-text-secondary leading-relaxed flex flex-col gap-2 list-disc pl-4 mb-4">
                            {event.details.map((d, di) => (
                              <li key={di}>{d}</li>
                            ))}
                          </ul>

                          {/* Highlight box */}
                          <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-2.5 text-[0.68rem] italic text-purple-300">
                            <strong>Takeaway:</strong> {event.takeaway}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: Education */}
              <div className="flex flex-col gap-2">
                <h4 className="font-heading font-bold text-[0.72rem] uppercase tracking-widest flex items-center gap-2 mb-4 text-text-muted text-left">
                  <GraduationCap size={13} className="text-cyan-400" /> Academic Path
                </h4>

                <div className="flex flex-col gap-3 pl-1">
                  {educationTimeline.map((event, idx) => {
                    const isExpanded = expandedEducation === idx;
                    return (
                      <div
                        key={idx}
                        className={`relative pl-7 border-l-2 text-left cursor-pointer rounded-r-xl transition-all duration-300 p-3 hover:bg-text-primary/2 ${
                          isExpanded ? 'border-cyan-500 bg-text-primary/1.5' : 'border-text-primary/10'
                        }`}
                        onClick={() => setExpandedEducation(isExpanded ? null : idx)}
                      >
                        {/* Milestone dot */}
                        <div
                          className="absolute left-[-7px] top-4 w-3 h-3 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                          style={{
                            borderColor: isExpanded ? event.color : 'rgba(255, 255, 255, 0.2)',
                            background: isExpanded ? `${event.color}35` : 'rgba(255,255,255,0.05)',
                            boxShadow: isExpanded ? `0 0 10px ${event.color}` : 'none'
                          }}
                        >
                          <span className="w-1 h-1 rounded-full" style={{ background: isExpanded ? event.color : 'transparent' }} />
                        </div>

                        {/* Summary Header */}
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-[0.6rem] font-mono font-bold text-text-muted uppercase tracking-wide block mb-0.5">
                              {event.period}
                            </span>
                            <h5 className="text-[0.95rem] font-black text-text-primary leading-tight">{event.degree}</h5>
                            <span className="text-xs font-bold text-text-muted">{event.institution}</span>
                          </div>
                          <span className="text-text-muted mt-2">
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </span>
                        </div>

                        {/* Collapsible details */}
                        <div className={`transition-all duration-500 overflow-hidden font-sans ${
                          isExpanded ? 'max-h-[220px] opacity-100 mt-4' : 'max-h-0 opacity-0 pointer-events-none'
                        }`}>
                          <p className="text-xs text-text-secondary leading-relaxed mb-3">{event.details}</p>
                          {event.grade && (
                            <span className="text-[0.62rem] font-mono font-bold bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
                              {event.grade}
                            </span>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
