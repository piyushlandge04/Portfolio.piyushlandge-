import { useState } from 'react';
import { 
  GraduationCap, Briefcase, ChevronDown, ChevronUp, MapPin, 
  Sparkles, Brain, Cpu, BarChart2, Database, Cloud, Terminal, 
  Code, Settings, FileText, CheckCircle2 
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
  const [activeTab, setActiveTab] = useState('profile');
  const [expandedMilestone, setExpandedMilestone] = useState(0); // first item expanded
  
  // Terminal Simulation States
  const [isRunningAgent, setIsRunningAgent] = useState(false);
  const [agentStep, setAgentStep] = useState(0);

  const runAgentSimulation = () => {
    if (isRunningAgent) return;
    setIsRunningAgent(true);
    setAgentStep(0);
    
    const interval = setInterval(() => {
      setAgentStep((prev) => {
        if (prev >= 5) {
          clearInterval(interval);
          setIsRunningAgent(false);
          return 5;
        }
        return prev + 1;
      });
    }, 600);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x-relative', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y-relative', `${e.clientY - rect.top}px`);
  };

  // Rendering terminal contents
  const renderTerminalContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="font-mono text-[0.76rem] sm:text-xs leading-relaxed text-neutral-300">
            <span className="text-neutral-500 font-normal"># system_profile.yaml</span>
            <div className="mt-2">
              <span className="text-purple-400">developer:</span>
              <div className="pl-4">
                <span className="text-purple-400">name:</span> <span className="text-emerald-400">"Piyush Landge"</span><br />
                <span className="text-purple-400">role:</span> <span className="text-emerald-400">"AI / Machine Learning Engineer"</span><br />
                <span className="text-purple-400">location:</span> <span className="text-emerald-400">"Pune, India"</span><br />
                <span className="text-purple-400">status:</span> <span className="text-emerald-400">"Available for Work"</span><br />
                <span className="text-purple-400">specialization:</span>
                <div className="pl-4 text-cyan-400">
                  - "Large Language Models (LLMs)"<br />
                  - "RAG Pipelines & Agentic Workflows"<br />
                  - "High-Performance Python Backends"<br />
                  - "Model Tuning & Neural Evaluations"
                </div>
              </div>
              <div className="mt-3">
                <span className="text-purple-400">philosophy:</span> <span className="text-yellow-400">|</span>
                <p className="pl-4 text-neutral-400 italic">
                  "I build clean, optimized, production-ready backend systems driven by intelligence. I focus on reducing system latency, streamlining complex pipeline models, and deploying reliable solutions."
                </p>
              </div>
            </div>
          </div>
        );
      case 'agent':
        return (
          <div className="font-mono text-[0.76rem] sm:text-xs leading-relaxed text-neutral-300">
            <span className="text-neutral-500 font-normal"># agentic_flow.sh</span>
            {agentStep === 0 && !isRunningAgent ? (
              <div className="mt-4 text-center py-6 border border-dashed border-neutral-800 rounded-xl bg-neutral-900/30">
                <span className="text-neutral-500 block mb-3 font-sans text-xs">Simulate an end-to-end evaluation cycle</span>
                <button 
                  onClick={runAgentSimulation}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Terminal size={12} /> Execute flow.sh
                </button>
              </div>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                {agentStep >= 1 && (
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 font-bold">[STEP 1]</span>
                    <span className="text-neutral-300 font-medium">Ingest Raw Data Pipelines</span>
                    <span className="text-emerald-400 ml-auto font-bold">✔ OK</span>
                  </div>
                )}
                {agentStep >= 2 && (
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 font-bold">[STEP 2]</span>
                    <span className="text-neutral-300 font-medium">Embedding Representation (Vector DB)</span>
                    <span className="text-emerald-400 ml-auto font-bold">✔ OK</span>
                  </div>
                )}
                {agentStep >= 3 && (
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 font-bold">[STEP 3]</span>
                    <span className="text-neutral-300 font-medium">Context Routing & Prompt Cache Optimization</span>
                    <span className="text-emerald-400 ml-auto font-bold">✔ OK</span>
                  </div>
                )}
                {agentStep >= 4 && (
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 font-bold">[STEP 4]</span>
                    <span className="text-neutral-300 font-medium">Model Inference & Fine-Tuning Evaluations</span>
                    <span className="text-cyan-400 ml-auto font-bold animate-pulse">
                      {agentStep === 4 ? '⟳ SWEEPS' : '✔ DONE'}
                    </span>
                  </div>
                )}
                {agentStep >= 5 && (
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 font-bold">[STEP 5]</span>
                    <span className="text-neutral-300 font-medium">Deployment Verification & Latency Audits</span>
                    <span className="text-yellow-400 ml-auto font-bold">⚡ 24ms</span>
                  </div>
                )}
                
                {agentStep >= 4 && (
                  <div className="mt-3 p-3 bg-neutral-900/60 rounded-lg border border-neutral-800/80">
                    <span className="text-neutral-400 text-[0.7rem] block mb-1">CURRENT AGENT METADATA:</span>
                    <code className="text-purple-400 text-xs">
                      {agentStep === 5 
                        ? '{ status: "idle", temperature: 0.2, evaluation: "completed" }'
                        : '{ status: "running_evaluation", temperature: 0.2, sweeps: 12 }'
                      }
                    </code>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 'metrics':
        return (
          <div className="font-mono text-[0.76rem] sm:text-xs leading-relaxed text-neutral-300">
            <span className="text-neutral-500 font-normal"># tail -f metrics.log</span>
            <div className="mt-2 space-y-1">
              <div><span className="text-neutral-500">[2026-07-06 14:10:02]</span> <span className="text-blue-400">INFO</span> Loaded pre-processed tokenizer models.</div>
              <div><span className="text-neutral-500">[2026-07-06 14:10:05]</span> <span className="text-blue-400">INFO</span> Gradient clipping limits set to 1.0.</div>
              <div><span className="text-neutral-500">[2026-07-06 14:11:12]</span> <span className="text-emerald-400">SUCCESS</span> Validation loss reached: 0.084.</div>
              <div><span className="text-neutral-500">[2026-07-06 14:11:15]</span> <span className="text-yellow-400">STATS</span> Validation accuracy: <span className="text-emerald-400 font-bold">98.4%</span></div>
              <div><span className="text-neutral-500">[2026-07-06 14:11:16]</span> <span className="text-yellow-400">STATS</span> BLEU Score: <span className="text-cyan-400 font-bold">0.96</span></div>
              <div><span className="text-neutral-500">[2026-07-06 14:11:16]</span> <span className="text-yellow-400">STATS</span> Token Latency: <span className="text-purple-400 font-bold">24ms</span></div>
              <div className="text-neutral-500 animate-pulse mt-2">_ (listening for updates)</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 relative scroll-reveal bg-bg-primary overflow-hidden">
      {/* Background radial ambience glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[130px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
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

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* COLUMN 1: AI Developer Terminal & Dashboard (5 Cols on Large Screen) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Brief Introduction card */}
            <div className="bg-white border border-neutral-200/60 rounded-[24px] p-6 text-left shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <span className="text-[0.6rem] font-mono font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md mb-3 inline-block">
                Developer Profile
              </span>
              <h3 className="font-heading font-black text-2xl tracking-tight text-text-primary mb-3">
                Piyush Landge
              </h3>
              <p className="font-sans text-neutral-600 text-sm leading-relaxed mb-4">
                I design and build optimized backend databases, intelligence layers, and fine-tuning pipelines to productionize complex models.
              </p>
              
              <div className="flex flex-wrap gap-2.5 border-t border-neutral-100 pt-4 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                  <MapPin size={13} className="text-neutral-400" />
                  <span>Pune, India</span>
                </div>
                <div className="h-4 w-px bg-neutral-200" />
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-600 font-semibold">Available for Work</span>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Window */}
            <div className="w-full bg-[#121214] border border-neutral-800 rounded-[20px] shadow-2xl overflow-hidden flex flex-col h-[320px] text-left">
              {/* Terminal Window Header */}
              <div className="bg-[#1a1a1e] px-4 py-3 flex items-center justify-between border-b border-neutral-800 shrink-0 select-none">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md text-[0.62rem] font-mono font-bold transition-all duration-200 cursor-pointer ${
                      activeTab === 'profile' 
                        ? 'bg-neutral-800 text-white shadow-sm' 
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <FileText size={10} /> profile.yaml
                  </button>
                  <button 
                    onClick={() => setActiveTab('agent')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md text-[0.62rem] font-mono font-bold transition-all duration-200 cursor-pointer ${
                      activeTab === 'agent' 
                        ? 'bg-neutral-800 text-white shadow-sm' 
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <Code size={10} /> flow.sh
                  </button>
                  <button 
                    onClick={() => setActiveTab('metrics')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md text-[0.62rem] font-mono font-bold transition-all duration-200 cursor-pointer ${
                      activeTab === 'metrics' 
                        ? 'bg-neutral-800 text-white shadow-sm' 
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <Settings size={10} /> metrics.log
                  </button>
                </div>
              </div>

              {/* Terminal Code Display Area */}
              <div className="p-5 overflow-y-auto custom-scrollbar grow relative">
                {/* Visual scanline overlay for retro effect */}
                <div className="absolute inset-0 terminal-scanline pointer-events-none opacity-30 z-10" />
                <div className="relative z-20">
                  {renderTerminalContent()}
                </div>
              </div>

              {/* Terminal Input Line Footer */}
              <div 
                className={`bg-[#16161a] border-t border-neutral-800 px-5 py-2.5 flex items-center font-mono text-[0.7rem] select-none ${
                  activeTab === 'agent' && !isRunningAgent ? 'cursor-pointer hover:bg-neutral-800/40 group/term transition-colors' : ''
                }`}
                onClick={activeTab === 'agent' ? runAgentSimulation : undefined}
              >
                <Terminal size={11} className="text-neutral-600 mr-2" />
                <span className="text-neutral-500">guest@piyushlandge:~$ </span>
                <span className="text-neutral-300 ml-1">
                  {activeTab === 'profile' ? 'cat profile.yaml' : activeTab === 'agent' ? './flow.sh' : 'tail -f metrics.log'}
                </span>
                {activeTab === 'agent' && !isRunningAgent && (
                  <span className="ml-auto text-[0.62rem] text-purple-400 font-bold bg-purple-950/40 border border-purple-800/40 rounded px-1.5 py-0.5 animate-pulse group-hover/term:bg-purple-900/60 group-hover/term:text-white transition-all">
                    RUN SCRIPT
                  </span>
                )}
                {isRunningAgent && (
                  <span className="ml-auto text-[0.62rem] text-cyan-400 font-bold bg-cyan-950/40 border border-cyan-800/40 rounded px-1.5 py-0.5 animate-pulse">
                    RUNNING...
                  </span>
                )}
                <span className="w-1.5 h-3 bg-neutral-300 ml-1.5 animate-blink shrink-0" />
              </div>
            </div>

          </div>

          {/* COLUMN 2: Connected Milestone Timeline (7 Cols on Large Screen) */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <div className="border border-neutral-200/60 bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              
              <div className="mb-6 border-b border-neutral-100 pb-5">
                <span className="text-[0.6rem] font-mono font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                  Interactive Timeline
                </span>
                <h3 className="font-heading font-black text-2xl text-text-primary mb-1">
                  My Career Roadmap
                </h3>
                <p className="text-xs text-text-muted font-sans">
                  Click a milestone to expand and inspect primary deliverables, metrics, and technology toolkits utilized.
                </p>
              </div>

              {/* Timeline Container */}
              <div className="relative pl-4 sm:pl-6 space-y-6">
                
                {/* Vertical Central Line */}
                <div className="absolute left-[9px] sm:left-[13px] top-3 bottom-3 w-[2px] bg-neutral-100" />

                {experienceTimeline.map((item, idx) => {
                  const isExpanded = expandedMilestone === idx;
                  const isWork = item.type === 'experience';
                  
                  return (
                    <div key={idx} className="relative group">
                      
                      {/* Milestone glowing node icon */}
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

                      {/* Timeline Detail Card */}
                      <div 
                        className={`transition-all duration-300 rounded-[20px] border p-4 sm:p-5 cursor-pointer ml-3 sm:ml-5 ${
                          isExpanded 
                            ? 'bg-neutral-50/50 border-purple-300/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)]' 
                            : 'bg-white border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50/20'
                        }`}
                        onClick={() => setExpandedMilestone(isExpanded ? null : idx)}
                      >
                        {/* Header Section */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="grow">
                            <span className="text-[0.62rem] font-mono font-bold text-neutral-400 uppercase tracking-wide block mb-0.5">
                              {item.period} {item.duration ? `· ${item.duration}` : ''}
                            </span>
                            <h4 className="text-[0.98rem] font-black text-text-primary leading-tight flex items-center gap-1.5">
                              {isWork ? item.role : item.degree}
                            </h4>
                            <span className="text-xs font-semibold text-neutral-600 mt-1 block">
                              {isWork ? item.company : item.institution}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1 shrink-0">
                            {/* Short Grade Badge for Education */}
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

                        {/* Preview summary / skills tags when collapsed */}
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

                        {/* Collapsed Description details */}
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
          </div>

        </div>

        {/* EXPERTISE HUB / SKILL PILLS GRID */}
        <div id="skills" className="w-full scroll-mt-24">
          <div className="border border-neutral-200/60 bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            {/* Header */}
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

            {/* 5-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
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
    </section>
  );
}
