import { useState } from 'react';
import { 
  GraduationCap, Briefcase, ChevronDown, ChevronUp, MapPin, 
  Sparkles, Brain, Cpu, BarChart2, Database, Cloud, CheckCircle2 
} from 'lucide-react';

const experienceTimeline = [
  {
    type: 'experience',
    period: 'Apr 2026 – Present',
    duration: '2 mos',
    role: 'AI Intern',
    company: 'Applogix Solutions',
    color: '#a855f7', // purple-500
    details: [
      'Organized complex backend data pipelines and designed pre-processing methodologies using Python.',
      'Executed fine-tuning parameter sweeps and managed tensor matrices to optimize inference latency.',
      'Audited model evaluations, compiled metric trackers, and produced technical documentation.'
    ],
    takeaway: 'Acquired deep production experience in scaling data prep pipelines and adjusting weight parameters.',
    skills: ['Python', 'PyTorch', 'Data Pipelines', 'Fine-Tuning', 'Model Evaluation']
  },
  {
    type: 'experience',
    period: 'Feb 2026 – Mar 2026',
    duration: '2 mos',
    role: 'AI Project Intern',
    company: 'Applogix Solutions',
    color: '#6366f1', // indigo-500
    details: [
      'Maintained automated auditing modules for deep learning models, identifying gradient clipping bottlenecks.',
      'Implemented validation checks that verified dataset token structures before neural compiler inputs.',
      'Collaborated on optimization parameters which resulted in improved validation benchmark results.'
    ],
    takeaway: 'Mastered standard regression auditing loops and model training parameter verification patterns.',
    skills: ['Deep Learning', 'Token Verification', 'Model Benchmarking', 'Auditing Modules']
  },
  {
    type: 'education',
    period: '2023 – 2026',
    degree: 'B.Sc. in Computer Science',
    institution: 'B.K. Birla College, Kalyan',
    grade: 'CGPA 8.00',
    color: '#06b6d4', // cyan-500
    details: 'Comprehensive exploration of backend database models, high-performance algorithms, and computational principles. Maintained an excellent academic track record.',
    skills: ['Algorithms', 'Database Management', 'Data Structures', 'Computational Math']
  },
  {
    type: 'education',
    period: '2022 – 2023',
    degree: 'HSC – Maharashtra State Board',
    institution: 'D.D.S.P. College, Erandol',
    color: '#10b981', // emerald-500
    details: 'Scientific stream curriculum focusing on mathematics, logical theorems, and engineering concepts.',
    skills: ['Mathematics', 'Physics', 'Computer Science']
  }
];

const skillsData = [
  {
    title: 'AI & Machine Learning',
    icon: <Cpu size={15} className="text-purple-500" />,
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'Computer Vision']
  },
  {
    title: 'Artificial Intelligence',
    icon: <Brain size={15} className="text-indigo-500" />,
    skills: ['Artificial Intelligence', 'Natural Language Processing (NLP)', 'Generative AI', 'Large Language Models (LLMs)']
  },
  {
    title: 'Data Science',
    icon: <BarChart2 size={15} className="text-cyan-500" />,
    skills: ['NumPy', 'Pandas', 'Statistics', 'Data Visualization']
  },
  {
    title: 'Backend & Database',
    icon: <Database size={15} className="text-emerald-500" />,
    skills: ['Flask', 'SQL', 'MongoDB', 'Git']
  },
  {
    title: 'Big Data & Cloud',
    icon: <Cloud size={15} className="text-amber-500" />,
    skills: ['PySpark', 'Hadoop', 'AWS', 'Azure']
  }
];

export default function About() {
  const [expandedMilestone, setExpandedMilestone] = useState(0); // expand first timeline milestone

  return (
    <section id="about" className="py-24 md:py-32 relative scroll-reveal bg-bg-primary overflow-hidden">
      {/* Background visual gradient blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-15">
        <div className="absolute top-[20%] left-[-15%] w-[45%] h-[50%] rounded-full bg-purple-500/10 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-15%] w-[45%] h-[50%] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[0.65rem] font-mono font-bold uppercase tracking-[0.25em] text-text-primary/40 mb-3">
            Who I Am
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-text-primary tracking-tight">
            About{' '}
            <span className="bg-linear-to-r from-purple-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="mt-4 text-text-secondary text-base max-w-lg mx-auto font-sans leading-relaxed">
            Unveiling the background, competencies, and system workflows driving my engineering.
          </p>
        </div>

        {/* Split Layout Design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDEBAR COLUMN: Sticky Profile Dashboard (4 Cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6 text-left">
            <div className="bg-white border border-neutral-200/60 rounded-[32px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group">
              {/* Top ambient hover line */}
              <div className="absolute top-0 left-0 w-full h-[4px] bg-linear-to-r from-purple-500 via-indigo-500 to-cyan-500 opacity-80" />
              
              {/* Profile Decorative Tech Graphic */}
              <div className="w-full h-44 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center relative overflow-hidden shrink-0 mb-6">
                {/* Simulated Neural Graph connections in CSS/SVG */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.03)_1.5px,transparent_1.5px)] bg-size-[16px_16px] opacity-70" />
                <svg className="w-20 h-20 text-neutral-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="absolute w-24 h-24 rounded-full bg-purple-500/5 blur-xl animate-pulse" />
              </div>

              {/* Profile Details */}
              <h3 className="font-heading font-black text-2xl tracking-tight text-text-primary mb-2 flex items-center gap-2 select-none">
                Piyush Landge
                <Sparkles className="text-purple-400 size-5 animate-pulse shrink-0" />
              </h3>

              <p className="text-[0.72rem] font-mono font-bold tracking-wide text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md mb-4 inline-block self-start border border-purple-100/50">
                AI / Machine Learning Engineer
              </p>

              <div className="font-sans text-neutral-600 text-sm leading-relaxed mb-6">
                I design and build optimized backend databases, intelligence layers, and fine-tuning pipelines to productionize complex models.
              </div>

              {/* Specs List */}
              <div className="space-y-3.5 border-t border-neutral-100 pt-5 text-xs font-mono font-bold text-text-secondary select-none">
                <div className="flex items-center gap-3">
                  <MapPin size={14} className="text-neutral-400 shrink-0" />
                  <span>Pune, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-600">Available for Work</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SCROLLING COLUMN: Timeline & Technical Skills (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-10 text-left">
            
            {/* TIMELINE SECTION */}
            <div className="border border-neutral-200/60 bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <div className="mb-8 border-b border-neutral-100 pb-5">
                <span className="text-[0.6rem] font-mono font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                  Roadmap
                </span>
                <h3 className="font-heading font-black text-2xl text-text-primary mb-1">
                  My Career Roadmap
                </h3>
                <p className="text-xs text-text-muted font-sans">
                  Click a milestone to expand and inspect key details, outcomes, and tech toolkits.
                </p>
              </div>

              {/* Vertical Timeline container */}
              <div className="relative pl-4 sm:pl-6 space-y-6">
                
                {/* Vertical Central Line */}
                <div className="absolute left-[9px] sm:left-[13px] top-3 bottom-3 w-[2px] bg-neutral-100" />

                {experienceTimeline.map((item, idx) => {
                  const isExpanded = expandedMilestone === idx;
                  const isWork = item.type === 'experience';
                  
                  return (
                    <div key={idx} className="relative group">
                      
                      {/* Interactive Milestone dot node */}
                      <div 
                        className={`absolute left-[-19px] sm:left-[-23px] top-1.5 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer z-10 ${
                          isExpanded 
                            ? 'border-purple-600 ring-4 ring-purple-100 scale-110' 
                            : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                        onClick={() => setExpandedMilestone(isExpanded ? null : idx)}
                      >
                        {isWork ? (
                          <Briefcase size={10} className={isExpanded ? 'text-purple-600' : 'text-neutral-500'} />
                        ) : (
                          <GraduationCap size={10} className={isExpanded ? 'text-purple-600' : 'text-neutral-500'} />
                        )}
                      </div>

                      {/* Detail Card panel */}
                      <div 
                        className={`transition-all duration-300 rounded-[20px] border p-4 sm:p-5 cursor-pointer ml-3 sm:ml-5 ${
                          isExpanded 
                            ? 'bg-neutral-50/50 border-purple-300/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)]' 
                            : 'bg-white border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50/20'
                        }`}
                        onClick={() => setExpandedMilestone(isExpanded ? null : idx)}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="grow">
                            <span className="text-[0.62rem] font-mono font-bold text-neutral-400 uppercase tracking-wide block mb-0.5">
                              {item.period} {item.duration ? `· ${item.duration}` : ''}
                            </span>
                            <h4 className="text-[0.98rem] font-black text-text-primary leading-tight">
                              {isWork ? item.role : item.degree}
                            </h4>
                            <span className="text-xs font-semibold text-neutral-600 mt-1 block">
                              {isWork ? item.company : item.institution}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1 shrink-0">
                            {!isWork && item.grade && (
                              <span className="text-[0.62rem] font-mono font-bold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded border border-cyan-100">
                                {item.grade}
                              </span>
                            )}
                            <span className="text-neutral-400">
                              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </span>
                          </div>
                        </div>

                        {/* Collapsed view tags preview */}
                        {!isExpanded && (
                          <div className="flex flex-wrap gap-1.5 mt-3 select-none">
                            {item.skills.slice(0, 3).map((sk) => (
                              <span key={sk} className="text-[0.58rem] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 border border-neutral-200/30">
                                  {sk}
                              </span>
                            ))}
                            {item.skills.length > 3 && (
                              <span className="text-[0.58rem] font-mono text-neutral-400 px-1 py-0.5">
                                +{item.skills.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Details content drawer */}
                        <div className={`transition-all duration-500 overflow-hidden font-sans ${
                          isExpanded ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 pointer-events-none'
                        }`}>
                          {isWork ? (
                            <ul className="text-xs text-neutral-600 leading-relaxed flex flex-col gap-2.5 list-none pl-1 mb-4">
                              {item.details.map((d, di) => (
                                <li key={di} className="flex gap-2 items-start">
                                  <CheckCircle2 size={12} className="text-purple-500 mt-0.5 shrink-0" />
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-neutral-600 leading-relaxed mb-4 pl-1">
                              {item.details}
                            </p>
                          )}

                          {isWork && item.takeaway && (
                            <div className="bg-purple-50/50 border-l-2 border-purple-400 rounded-r-lg p-3 text-[0.7rem] italic text-neutral-600 mb-4">
                              <strong>Key Takeaway:</strong> {item.takeaway}
                            </div>
                          )}

                          {/* Skill Tags */}
                          <div className="flex flex-wrap gap-1.5 border-t border-neutral-100/80 pt-3.5">
                            {item.skills.map((sk) => (
                              <span key={sk} className="text-[0.58rem] font-mono font-bold px-2 py-0.5 rounded-full bg-white text-neutral-700 border border-neutral-200 shadow-2xs hover:border-neutral-300">
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* TECHNICAL SKILLS SECTION */}
            <div id="skills" className="scroll-mt-24">
              <div className="border border-neutral-200/60 bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                <div className="text-center md:text-left border-b border-neutral-100 pb-5 mb-6">
                  <span className="text-[0.6rem] font-mono font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                    Core Competencies
                  </span>
                  <h3 className="font-heading font-black text-2xl text-text-primary mb-1">
                    Technical Expertise Hub
                  </h3>
                  <p className="font-sans text-xs text-text-muted">
                    Systematically engineered capabilities organized across modern developmental frameworks.
                  </p>
                </div>

                {/* Grid for Skills categories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {skillsData.map((category, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col rounded-2xl border border-neutral-100 bg-neutral-50/20 hover:border-neutral-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 transition-all duration-300 p-5 text-left h-full"
                    >
                      {/* Category Header */}
                      <div className="flex items-center gap-2 border-b border-neutral-100/60 pb-3 mb-4 shrink-0">
                        <span className="flex items-center shrink-0">{category.icon}</span>
                        <span className="font-heading font-bold text-[0.68rem] text-neutral-800 uppercase tracking-wider">
                          {category.title}
                        </span>
                      </div>

                      {/* Skills List */}
                      <div className="flex flex-col gap-2 grow font-mono text-[0.7rem] text-neutral-600">
                        {category.skills.map((skill) => (
                          <div
                            key={skill}
                            className="group/skill flex items-center gap-2 py-1.5 px-2.5 rounded-xl border border-transparent hover:bg-neutral-50 hover:text-neutral-900 hover:border-neutral-200/50 transition-all duration-200 cursor-default font-medium"
                          >
                            <span className="w-1 h-1 rounded-full bg-neutral-300 group-hover/skill:bg-indigo-500 shrink-0 transition-colors" />
                            <span className="truncate">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
