import { useState } from 'react';
import { 
  GraduationCap, Briefcase, ChevronDown, ChevronUp, MapPin, 
  Sparkles, Brain, Cpu, BarChart2, Database, Cloud 
} from 'lucide-react';



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

          {/* ── CARD 1: Profile & Bio Description ── */}
          <div
            className="bento-card glass-card relative group overflow-hidden lg:col-span-3 p-7 md:p-9 flex flex-col gap-6 rounded-3xl transition-all duration-300 text-left"
            onMouseMove={handleMouseMove}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(168, 85, 247, 0.05), transparent 80%)`
              }}
            />

            <div className="relative z-10 flex flex-col gap-5">
              {/* Greeting & Name */}
              <div>
                <p className="text-[0.65rem] font-mono font-bold uppercase tracking-[0.2em] text-text-primary/30 mb-2">👋 Hello, World</p>
                <h3 className="font-heading font-black text-3xl sm:text-4xl tracking-tight text-text-primary flex items-center gap-3 select-none">
                  I'm Piyush Landge
                  <Sparkles className="text-purple-400 animate-pulse shrink-0" size={22} />
                </h3>
              </div>

              {/* Role Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.68rem] font-bold tracking-wide font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                  AI Engineer
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.68rem] font-bold tracking-wide font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Backend Developer
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.68rem] font-bold tracking-wide font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Generative AI Enthusiast
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.68rem] font-bold tracking-wide font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  CS Graduate
                </span>
              </div>

              {/* Bio */}
              <div className="font-sans text-text-secondary text-[0.93rem] leading-[1.8] max-w-4xl flex flex-col gap-3">
                <p>
                  I turn ideas into <span className="text-text-primary font-semibold">intelligent, production-ready systems</span> — crafting everything from fine-tuned LLM pipelines and Generative AI applications to robust FastAPI backends and data-driven ML solutions.
                </p>
                <p>
                  Currently focused on <span className="text-purple-400 font-semibold">agentic AI</span> and <span className="text-cyan-400 font-semibold">scalable backend architecture</span>, I'm passionate about shipping technology that solves real problems and leaves a measurable impact. When I'm not building, I'm exploring the latest in AI research.
                </p>
              </div>

              {/* Personal Details Micro-Badges */}
              <div className="flex flex-wrap gap-4 md:gap-8 mt-2 pt-5 border-t border-text-primary/5 text-[0.72rem] font-mono font-bold text-text-secondary select-none">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-cyan-500" />
                  <span>Pune, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={13} className="text-amber-500" />
                  <span>Open to AI Engineer Opportunities</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-400">Available for Work</span>
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
                MY SKILLS
              </h3>
              <p className="font-sans text-sm text-text-muted">
                Building AI-powered applications from idea to deployment
              </p>
            </div>

            {/* 5-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 relative z-10 w-full mt-2">
              {[
                {
                  title: 'AI & Machine Learning',
                  icon: <Cpu size={14} className="text-cyan-500" />,
                  skills: ['Python', 'Machine Learning', 'Deep Learning', 'Computer Vision']
                },
                {
                  title: 'Artificial Intelligence',
                  icon: <Brain size={14} className="text-purple-500" />,
                  skills: ['Artificial Intelligence', 'Natural Language Processing (NLP)', 'Generative AI', 'Large Language Models (LLMs)']
                },
                {
                  title: 'Data Science',
                  icon: <BarChart2 size={14} className="text-blue-500" />,
                  skills: ['NumPy', 'Pandas', 'Statistics', 'Data Visualization']
                },
                {
                  title: 'Backend & Database',
                  icon: <Database size={14} className="text-amber-500" />,
                  skills: ['Flask', 'SQL', 'MongoDB', 'Git']
                },
                {
                  title: 'Big Data & Cloud',
                  icon: <Cloud size={14} className="text-emerald-500" />,
                  skills: ['PySpark', 'Hadoop', 'AWS', 'Azure']
                }
              ].map((category, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded-2xl border border-text-primary/5 bg-text-primary/1 hover:bg-text-primary/2 hover:-translate-y-1 hover:shadow-xs transition-all duration-300 p-5 text-left h-full"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-2 border-b border-text-primary/5 pb-3 mb-4 shrink-0">
                    <span className="flex items-center shrink-0">{category.icon}</span>
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
