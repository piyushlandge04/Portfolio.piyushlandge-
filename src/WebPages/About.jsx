import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Code2, Terminal, Cpu, Brain, LineChart, Eye, Cloud, Play, Check, Copy, 
  GraduationCap, Briefcase, Sparkles, MapPin, Mail, GitBranch, Search, 
  Plus, Settings, ChevronDown, ChevronUp, Activity, Database, Calendar, RefreshCw
} from 'lucide-react';

export default function About() {
  // General Interactive States
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('attention_layer.py');
  const [isRunning, setIsRunning] = useState(false);
  const [showConsole, setShowConsole] = useState(true);
  const [consoleLogs, setConsoleLogs] = useState([
    'SYSTEM: Workspace ready. Run sandbox to benchmark computations.'
  ]);
  
  // Custom configurations
  const [editorFontSize, setEditorFontSize] = useState(12);
  const [editorTheme, setEditorTheme] = useState('one-dark');
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  // Sliders for AI Configurations
  const [headsVal, setHeadsVal] = useState(8);
  const [dModelVal, setDModelVal] = useState(512);

  // New states for the redesigned Bento components
  const [activeSandboxTab, setActiveSandboxTab] = useState('playground'); // playground | visualizer | training
  const [expandedExperience, setExpandedExperience] = useState(0); // expand first item by default
  const [expandedEducation, setExpandedEducation] = useState(null);
  
  // Profile status loops
  const [currentStatusIdx, setCurrentStatusIdx] = useState(0);
  const developerStatuses = [
    'training flash-attention layers...',
    'optimizing transformer pipelines...',
    'evaluating multi-head accuracy...',
    'building intelligent agent nodes...',
    'designing responsive AI sandboxes...'
  ];

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setCurrentStatusIdx((prev) => (prev + 1) % developerStatuses.length);
    }, 3500);
    return () => clearInterval(statusInterval);
  }, []);

  // Git commit and file additions list state
  const [filesList, setFilesList] = useState(['attention_layer.py', 'model_eval.py', 'README.md']);
  const [newFileName, setNewFileName] = useState('');
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [customFilesData, setCustomFilesData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [commitMessage, setCommitMessage] = useState('');

  // 1. Attention Visualizer dynamic states
  const [activeVisualizerHead, setActiveVisualizerHead] = useState(1);
  const [hoveredQueryToken, setHoveredQueryToken] = useState(null);

  // 2. Simulated Training States
  const [isTraining, setIsTraining] = useState(false);
  const [trainingEpoch, setTrainingEpoch] = useState(0);
  const [trainingLoss, setTrainingLoss] = useState(2.45);
  const [trainingAcc, setTrainingAcc] = useState(32.5);
  const [lossHistory, setLossHistory] = useState([]);
  const [accHistory, setAccHistory] = useState([]);

  // Git Hub Grid Hover Status
  const [hoveredContributionDate, setHoveredContributionDate] = useState(null);

  const themes = {
    'one-dark': {
      bg: 'bg-white',
      text: 'text-[#24292f]',
      comment: 'text-[#6e7781] font-mono italic',
      variable: 'text-[#0550ae]',
      string: 'text-[#0a3069]',
      keyword: 'text-[#cf222e]',
      func: 'text-[#8250df]',
      type: 'text-[#0a3069]',
      number: 'text-[#0a3069]',
    }
  };

  const getCodeForFile = (filename) => {
    if (filename === 'README.md') {
      return `# FlashAttention CUDA Benchmark Sandbox

Optimize attention maps directly in the browser.

## Configurations:
- heads = ${headsVal} (Multi-Head Attention count)
- d_model = ${dModelVal} (Hidden size feature embeddings)

## Instructions:
1. Adjust hyperparameters in the sidebar configuration.
2. Click "Run Sandbox Workflow" to compile runtime metrics.
3. Try the "Attention Visualizer" or "Actions (Training)" tabs!`;
    }
    if (filename === 'attention_layer.py') {
      return `# Optimized FlashSelfAttention Layer
import torch
import torch.nn as nn

class FlashSelfAttention(nn.Module):
    def __init__(self, d_model=${dModelVal}, heads=${headsVal}):
        super().__init__()
        self.heads = heads
        self.d_model = d_model
        self.qkv_proj = nn.Linear(d_model, 3 * d_model)
        self.out_proj = nn.Linear(d_model, d_model)

    def forward(self, x):
        # x shape: (batch_size, seq_len, d_model)
        qkv = self.qkv_proj(x)
        q, k, v = qkv.chunk(3, dim=-1)
        
        # Optimized SDPA (calls native flash kernel if causal)
        out = nn.functional.scaled_dot_product_attention(
            q, k, v, is_causal=True
        )
        return self.out_proj(out)`;
    }
    if (filename === 'model_eval.py') {
      return `# Causal Attention Matrix Benchmark
import time
import torch

def run_benchmark():
    # Sync GPU & start timers
    model = FlashSelfAttention(d_model=${dModelVal}, heads=${headsVal}).cuda()
    x = torch.randn(4, 1024, ${dModelVal}).cuda()
    
    torch.cuda.synchronize()
    start = time.perf_counter()
    out = model(x)
    torch.cuda.synchronize()
    latency = (time.perf_counter() - start) * 1000
    
    print(f"Latency: {latency:.2f}ms")
    print(f"Memory allocated: {torch.cuda.max_memory_allocated() / 1e6:.1f}MB")

run_benchmark()`;
    }
    return customFilesData[filename] || `# Custom module: ${filename}\nprint("Executed custom target successfully")`;
  };

  const getActiveCode = () => {
    return getCodeForFile(activeTab);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compile / Run Simulation
  const handleRunCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setShowConsole(true);
    setConsoleLogs(['SYSTEM: Compiling model configurations...', 'ALLOC: Synchronizing CUDA execution graph...']);
    
    setTimeout(() => setConsoleLogs(p => [...p, `FILE: Loaded active file [${activeTab}]`]), 300);
    setTimeout(() => setConsoleLogs(p => [...p,
      `TENSOR: Allocating sequence matrix [shape: (4, 1024, ${dModelVal})]`
    ]), 600);
    
    setTimeout(() => {
      const computedLatency = (1.1 + (headsVal * 0.08) + (dModelVal / 512) * 0.45).toFixed(2);
      const computedVram = (3.8 + (dModelVal / 512) * 6.2 + (headsVal * 0.15)).toFixed(1);
      
      if (activeTab === 'attention_layer.py') {
        setConsoleLogs(p => [...p,
          `VERIFY: Attention projections matched [heads: ${headsVal}, d_model: ${dModelVal}]`,
          `SYSTEM: Completed forward pass. Status → OK (took ${computedLatency}ms)`
        ]);
      } else if (activeTab === 'model_eval.py') {
        setConsoleLogs(p => [...p,
          `BENCHMARK: CUDA execution run finished.`,
          `LATENCY: ${computedLatency}ms`,
          `VRAM UTILIZATION: ${computedVram}MB / 16.0GB VRAM`,
          `STATUS: Benchmark complete.`
        ]);
      } else {
        setConsoleLogs(p => [...p,
          `EXEC: Finished running target ${activeTab}.`,
          `PARAMS: d_model=${dModelVal}, heads=${headsVal}`,
          `STATUS: OK`
        ]);
      }
      setIsRunning(false);
    }, 1400);
  };

  // Dynamic Attention Simulation Details
  const visualizerTokens = [
    "The", "neural", "attention", "mechanism", "learns", "contextual", "word", "vectors"
  ];

  // Mock attention weights matching different heads
  const getAttentionWeight = (queryIdx, keyIdx, head) => {
    if (keyIdx > queryIdx) return 0;
    
    const diff = queryIdx - keyIdx;
    
    if (head === 1) {
      return diff === 0 ? 0.65 : diff === 1 ? 0.35 : 0;
    }
    if (head === 2) {
      if (keyIdx === 2) return 0.55;
      if (keyIdx === 3) return 0.25;
      return diff === 0 ? 0.2 : 0;
    }
    if (head === 3) {
      return 1 / (queryIdx + 1);
    }
    if (keyIdx === 0) return 0.6;
    return diff === 0 ? 0.4 : 0;
  };

  // Live Model Training simulator function
  const runModelTraining = () => {
    if (isTraining) return;
    setIsTraining(true);
    setTrainingEpoch(0);
    setLossHistory([]);
    setAccHistory([]);
    
    let currentEpoch = 0;
    const interval = setInterval(() => {
      currentEpoch += 1;
      setTrainingEpoch(currentEpoch);
      
      const loss = (2.2 * Math.exp(-currentEpoch / 14) + 0.12 + Math.random() * 0.05).toFixed(3);
      const acc = (30 + 64 * (1 - Math.exp(-currentEpoch / 11)) + Math.random() * 1.5).toFixed(1);
      
      setTrainingLoss(parseFloat(loss));
      setTrainingAcc(parseFloat(acc));
      
      setLossHistory(prev => [...prev, parseFloat(loss)]);
      setAccHistory(prev => [...prev, parseFloat(acc)]);
      
      if (currentEpoch >= 40) {
        clearInterval(interval);
        setIsTraining(false);
      }
    }, 120);
  };

  // Convert histories into coordinates for SVG polyline charts (viewBox="0 0 100 100")
  const getChartPoints = (history, minVal, maxVal) => {
    if (history.length === 0) return '';
    return history.map((val, idx) => {
      const x = ((idx / (history.length - 1)) * 80 + 10).toFixed(1);
      const normVal = (val - minVal) / (maxVal - minVal || 1);
      const y = (90 - normVal * 80).toFixed(1);
      return `${x},${y}`;
    }).join(' ');
  };

  // Precalculated mock contributions grid data
  const contributionGrid = useMemo(() => {
    const dates = [];
    const baseDate = new Date();
    for (let r = 0; r < 5; r++) {
      const row = [];
      for (let c = 0; c < 15; c++) {
        const dayOffset = (r * 15 + c) - 75;
        const targetDate = new Date(baseDate);
        targetDate.setDate(baseDate.getDate() + dayOffset);
        
        const rand = Math.random();
        const level = rand > 0.85 ? 4 : rand > 0.7 ? 3 : rand > 0.45 ? 2 : rand > 0.25 ? 1 : 0;
        
        row.push({
          level,
          date: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          commits: level * 2 + (level > 0 ? Math.floor(Math.random() * 2) : 0)
        });
      }
      dates.push(row);
    }
    return dates;
  }, []);

  // Skills data restructured to match user's categories

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

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x-relative', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y-relative', `${e.clientY - rect.top}px`);
  };

  const handleCreateFile = (e) => {
    if (e) e.preventDefault();
    if (!newFileName.trim()) return;
    let name = newFileName.trim();
    if (!name.endsWith('.py') && !name.endsWith('.md') && !name.endsWith('.txt')) {
      name = `${name}.py`;
    }
    if (!filesList.includes(name)) {
      setFilesList([...filesList, name]);
      setCustomFilesData(prev => ({
        ...prev,
        [name]: `# Custom Module: ${name}\n# Configured values: heads=${headsVal}, d_model=${dModelVal}\nprint("Executed custom script")`
      }));
    }
    setActiveTab(name);
    setNewFileName('');
    setShowNewFileInput(false);
  };

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results = [];
    filesList.forEach(file => {
      const code = getCodeForFile(file);
      const lines = code.split('\n');
      lines.forEach((line, index) => {
        if (line.toLowerCase().includes(query)) {
          results.push({
            file,
            lineNumber: index + 1,
            content: line.trim()
          });
        }
      });
    });
    return results;
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
            Discover my background, core technical skills, and play with my interactive model simulator.
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
                  <div className="absolute inset-[-4px] bg-linear-to-tr from-orange-500 via-amber-400 to-rose-500 rounded-3xl blur-[12px] opacity-55 group-hover/avatar:opacity-80 transition-opacity duration-500 animate-[spin_4s_linear_infinite]" />
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center text-4xl sm:text-5xl font-black text-white font-heading relative overflow-hidden border border-text-primary/10 bg-text-primary shadow-xl z-10"
                  >
                    PL
                    <div className="absolute inset-0 bg-linear-to-tr from-black/20 to-transparent pointer-events-none" />
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    { label: 'PyTorch', color: 'text-orange-600', bg: 'bg-orange-500/10' },
                    { label: 'Generative AI', color: 'text-purple-600', bg: 'bg-purple-500/10' },
                    { label: 'LLMs & Agents', color: 'text-blue-600', bg: 'bg-blue-500/10' },
                    { label: 'Cloud Architecture', color: 'text-cyan-600', bg: 'bg-cyan-500/10' },
                  ].map((tag, i) => (
                    <span key={i} className={`inline-flex items-center px-3 py-1.5 rounded-full text-[0.7rem] font-bold tracking-wide ${tag.color} ${tag.bg}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>

                {/* Process Agent Status Widget */}
                <div className="mt-4 bg-bg-card border border-text-primary/10 rounded-2xl p-4 flex flex-col justify-between font-mono text-[0.75rem] shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2 text-text-muted border-b border-text-primary/5 pb-2 mb-3 relative z-10">
                    <Activity size={14} className="text-purple-500 animate-pulse" />
                    <span className="font-bold tracking-widest text-[0.65rem] uppercase">Process Agent Status</span>
                  </div>
                  
                  <div className="flex items-center text-text-primary font-medium relative z-10">
                    <span className="text-emerald-500 mr-2 text-lg leading-none">›</span>
                    <span className="truncate">{developerStatuses[currentStatusIdx] || 'Compiling inference metrics...'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 text-[0.65rem] font-bold relative z-10">
                    <span className="text-text-muted">PORT: 5173</span>
                    <span className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      ACTIVE
                    </span>
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
