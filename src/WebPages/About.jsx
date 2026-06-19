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
  const [activeSkillCategory, setActiveSkillCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeSandboxTab, setActiveSandboxTab] = useState('playground'); // playground | visualizer | training
  const [expandedExperience, setExpandedExperience] = useState(0); // expand first item by default
  const [expandedEducation, setExpandedEducation] = useState(null);
  const [skillsViewMode, setSkillsViewMode] = useState('tags'); // tags | radar | network
  
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
      bg: 'bg-[#0d1117]',
      text: 'text-[#c9d1d9]',
      comment: 'text-[#8b949e] font-mono italic',
      variable: 'text-[#ffa657]',
      string: 'text-[#a5d6ff]',
      keyword: 'text-[#ff7b72]',
      func: 'text-[#d2a8ff]',
      type: 'text-[#79c0ff]',
      number: 'text-[#79c0ff]',
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

  // Technical stack items grouped by category
  const skillsList = [
    // AI & Machine Learning
    { name: 'PyTorch',           cat: 'AI/ML',  level: 'Expert',       years: '3+ yrs', use: 'Neural networks, tensor transformations, flash-attention layer optimizations.' },
    { name: 'TensorFlow',        cat: 'AI/ML',  level: 'Advanced',     years: '2+ yrs', use: 'Deep learning pipelines, CNN convolutions, model graphs, sequential models.' },
    { name: 'Deep Learning',     cat: 'AI/ML',  level: 'Expert',       years: '3+ yrs', use: 'Backpropagation mechanisms, optimizers, learning rate scheduling, attention.' },
    { name: 'Generative AI',     cat: 'AI/ML',  level: 'Expert',       years: '2+ yrs', use: 'LLM scaling architectures, prompt chains, agent orchestration pipelines.' },
    
    // Programming & Libraries
    { name: 'Python',            cat: 'Prog',   level: 'Expert',       years: '3+ yrs', use: 'Data structures, backend service orchestration, numeric calculations.' },
    { name: 'SQL',               cat: 'Prog',   level: 'Advanced',     years: '2+ yrs', use: 'Relational databases, indexing schemas, performance-tuned query layers.' },
    { name: 'MongoDB',           cat: 'Prog',   level: 'Advanced',     years: '2+ yrs', use: 'Document structures, unstructured model storage, persistent collections.' },
    { name: 'Scikit-Learn',      cat: 'Prog',   level: 'Advanced',     years: '2+ yrs', use: 'Classical ML regressions, data standardizers, feature dimensionality reductions.' },
    
    // NLP & Computer Vision
    { name: 'LLMs & Agents',     cat: 'NLP/CV', level: 'Expert',       years: '2+ yrs', use: 'Fine-tuning (QLoRA), model merges, multi-agent frameworks, semantic prompt flows.' },
    { name: 'NLP',               cat: 'NLP/CV', level: 'Expert',       years: '3+ yrs', use: 'Text processing pipelines, token embedding grids, semantic embeddings.' },
    { name: 'Computer Vision',   cat: 'NLP/CV', level: 'Intermediate', years: '2+ yrs', use: 'Object detection bounding boxes, image classification kernels, OpenCV transforms.' },
    
    // Cloud & DevTools
    { name: 'AWS',               cat: 'Cloud',  level: 'Advanced',     years: '2+ yrs', use: 'EC2 computing nodes, S3 storage buckets, serverless endpoint architectures.' },
    { name: 'Git & GitHub',      cat: 'Cloud',  level: 'Expert',       years: '3+ yrs', use: 'Branch branching models, source merges, commit history logging, workflow actions.' },
    { name: 'Model Deployment',  cat: 'Cloud',  level: 'Advanced',     years: '2+ yrs', use: 'Containerized inference runtimes, fast HTTP api wrappers, latency benchmarks.' }
  ];

  const skillFilterCategories = [
    { key: 'All',    label: 'All Technologies' },
    { key: 'AI/ML',  label: 'AI & Deep Learning' },
    { key: 'Prog',   label: 'Languages & DBs' },
    { key: 'NLP/CV', label: 'NLP & Vision' },
    { key: 'Cloud',  label: 'Cloud & Infrastructure' }
  ];

  const filteredSkills = useMemo(() => {
    if (activeSkillCategory === 'All') return skillsList;
    return skillsList.filter(s => s.cat === activeSkillCategory);
  }, [activeSkillCategory]);

  const getRadarScores = (cat) => {
    switch (cat) {
      case 'AI/ML':  return [0.98, 0.95, 0.70, 0.65, 0.55];
      case 'Prog':   return [0.65, 0.75, 0.60, 0.95, 0.80];
      case 'NLP/CV': return [0.85, 0.95, 0.95, 0.60, 0.65];
      case 'Cloud':  return [0.55, 0.70, 0.55, 0.80, 0.95];
      default:       return [0.90, 0.92, 0.85, 0.82, 0.78]; // All
    }
  };

  const radarScores = useMemo(() => getRadarScores(activeSkillCategory), [activeSkillCategory]);
  
  const radarPoints = useMemo(() => {
    const radius = 35;
    const cx = 50;
    const cy = 50;
    return radarScores.map((score, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      const x = cx + radius * score * Math.cos(angle);
      const y = cy + radius * score * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  }, [radarScores]);

  const backgroundRadarPolygons = useMemo(() => {
    const radius = 35;
    const cx = 50;
    const cy = 50;
    return [0.25, 0.5, 0.75, 1.0].map(scale => {
      return Array.from({ length: 5 }).map((_, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        const x = cx + radius * scale * Math.cos(angle);
        const y = cy + radius * scale * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(' ');
    });
  }, []);

  const radarAxisLines = useMemo(() => {
    const radius = 35;
    const cx = 50;
    const cy = 50;
    return Array.from({ length: 5 }).map((_, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      return { x1: cx, y1: cy, x2: x.toFixed(1), y2: y.toFixed(1) };
    });
  }, []);

  const radarLabels = useMemo(() => {
    const radius = 43;
    const cx = 50;
    const cy = 50;
    const labels = ['ML/DL', 'GenAI', 'NLP', 'SoftEng', 'Cloud'];
    return labels.map((label, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      
      let anchor = 'middle';
      if (Math.cos(angle) > 0.1) anchor = 'start';
      else if (Math.cos(angle) < -0.1) anchor = 'end';
      
      let dy = "0.33em";
      if (i === 0) dy = "-0.2em";
      if (i === 2 || i === 3) dy = "0.8em";
      
      return { label, x: x.toFixed(1), y: y.toFixed(1), anchor, dy };
    });
  }, []);

  const getSkillCategoryDetails = (cat) => {
    switch(cat) {
      case 'AI/ML': return { color: '#a855f7', icon: <Brain size={12} className="text-purple-400" /> };
      case 'Prog':  return { color: '#6366f1', icon: <Terminal size={12} className="text-indigo-400" /> };
      case 'NLP/CV': return { color: '#10b981', icon: <Eye size={12} className="text-emerald-400" /> };
      case 'Cloud': return { color: '#06b6d4', icon: <Cloud size={12} className="text-cyan-400" /> };
      default:      return { color: '#abb2bf', icon: <Code2 size={12} className="text-neutral-400" /> };
    }
  };

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
            <span className="bg-linear-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="mt-4 text-text-secondary text-base max-w-lg mx-auto font-sans leading-relaxed">
            Discover my background, core technical skills, and play with my interactive model simulator.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── CARD 1: Profile & Activity ── */}
          <div
            className="bento-card glass-card relative group overflow-hidden lg:col-span-2 p-7 md:p-9 flex flex-col gap-6 rounded-3xl transition-all duration-300"
            onMouseMove={handleMouseMove}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(168, 85, 247, 0.05), transparent 80%)`
              }}
            />

            {/* Profile Row */}
            <div className="flex items-center gap-5 relative z-10 flex-wrap sm:flex-nowrap">
              <div className="relative shrink-0">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white font-heading relative overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                  style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #fcd34d 100%)' }}
                >
                  PL
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                </div>
                {/* Status indicator heartbeat */}
                <span className="absolute bottom-[-3px] right-[-3px] flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-neutral-950" />
                </span>
              </div>

              <div className="text-left">
                <h3 className="font-heading font-black text-2xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent leading-none tracking-tight">
                  Piyush Landge
                </h3>
                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted">
                    <Sparkles size={10} className="text-purple-500 animate-pulse" /> AI Engineer
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted">
                    <MapPin size={10} className="text-cyan-500" /> Pune, India
                  </span>
                </div>
              </div>

              {/* Hire Button */}
              <a
                href="#contact"
                className="ml-auto hidden sm:inline-flex items-center gap-2 text-[0.7rem] font-bold px-4 py-2 rounded-full border border-white/10 text-text-secondary hover:text-white hover:border-white/25 transition-all duration-200 font-mono uppercase tracking-wider shrink-0"
              >
                <Mail size={12} /> Hire Me
              </a>
            </div>

            {/* Profile Bio */}
            <div className="font-sans text-text-secondary text-[0.92rem] leading-[1.8] text-left flex flex-col gap-3 relative z-10">
              <p>
                I'm an <strong className="text-white font-semibold">AI Engineer</strong> specialized in developing, evaluation testing, and deploying deep learning paradigms. My toolkit focuses on building high-performance models using <strong className="text-white">PyTorch, TensorFlow, LLMs, and Python</strong>, while managing backend architectures with databases and cloud services.
              </p>
              <p>
                Whether fine-tuning open-source models, setting up automated evaluation pipelines, or coding interactive browser visualizers, I bridge the gap between heavy computational science and crisp, responsive frontend utility.
              </p>
            </div>

            {/* GitHub Style Contribution Mock Grid & Mini Console Status */}
            <div className="border-t border-white/5 pt-5 mt-auto relative z-10 flex flex-col md:flex-row gap-5 justify-between items-stretch">
              
              {/* Contributions Grid */}
              <div className="flex flex-col gap-2 text-left shrink-0">
                <div className="flex items-center justify-between text-[0.63rem] font-mono text-text-muted">
                  <span>MODEL COMMITS (LATEST DEV RUNS)</span>
                  <span className="text-[0.6rem] text-purple-400 font-bold min-h-[14px]">
                    {hoveredContributionDate ? hoveredContributionDate : 'Hover blocks to inspect commits'}
                  </span>
                </div>
                <div className="flex gap-1">
                  {contributionGrid.map((row, rIdx) => (
                    <div key={rIdx} className="flex flex-col gap-1">
                      {row.map((day, dIdx) => (
                        <div
                          key={dIdx}
                          onMouseEnter={() => setHoveredContributionDate(`${day.date}: ${day.commits} runs`)}
                          onMouseLeave={() => setHoveredContributionDate(null)}
                          className={`w-[10px] h-[10px] rounded-[2px] transition-colors cursor-pointer ${
                            day.level === 0 ? 'bg-white/5 hover:bg-white/15' :
                            day.level === 1 ? 'bg-purple-950/40 hover:bg-purple-900/40' :
                            day.level === 2 ? 'bg-purple-800/40 hover:bg-purple-700/50' :
                            day.level === 3 ? 'bg-purple-600/70 hover:bg-purple-500/70' :
                            'bg-purple-400 hover:bg-purple-300'
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Status Terminal Mock */}
              <div className="flex-1 bg-black/35 border border-white/5 rounded-xl p-3 flex flex-col justify-between font-mono text-[0.7rem] text-left min-w-[200px]">
                <div className="flex items-center gap-1.5 text-text-muted border-b border-white/5 pb-1.5 mb-1.5">
                  <Activity size={12} className="text-purple-400 animate-pulse" />
                  <span>PROCESS AGENT STATUS</span>
                </div>
                <div className="text-text-secondary flex-1 flex items-center">
                  <span className="text-green-500 mr-1.5 shrink-0">~</span>
                  <span className="text-neutral-200 select-all truncate">{developerStatuses[currentStatusIdx]}</span>
                </div>
                <div className="text-[0.6rem] text-text-muted mt-2 flex justify-between">
                  <span>active_port: 5173</span>
                  <span className="animate-pulse text-green-400">RUNNING</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── CARD 2: Tech Stack / Interactive Skills ── */}
          <div
            id="skills"
            className="bento-card glass-card relative group overflow-hidden lg:col-span-1 p-6 flex flex-col gap-5 rounded-3xl transition-all duration-300 scroll-mt-24"
            onMouseMove={handleMouseMove}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(34, 211, 238, 0.06), transparent 80%)`
              }}
            />

            {/* Header: Tech Stack Title & Visual Mode Buttons */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 relative z-10 shrink-0 select-none">
              <div className="flex items-center gap-2">
                <Code2 size={18} className="text-white" />
                <h3 className="font-heading font-black text-lg text-white">Tech Stack</h3>
              </div>
              
              {/* Mode toggles */}
              <div className="flex items-center gap-1 bg-white/5 border border-white/5 rounded-lg p-0.5 text-[0.6rem] font-mono">
                {[
                  { mode: 'tags', label: 'Grid' },
                  { mode: 'radar', label: 'Radar' },
                  { mode: 'network', label: 'Network' }
                ].map(btn => (
                  <button
                    key={btn.mode}
                    onClick={() => {
                      setSkillsViewMode(btn.mode);
                      setHoveredSkill(null);
                    }}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      skillsViewMode === btn.mode
                        ? 'bg-neutral-800 text-cyan-400 font-bold border border-white/5'
                        : 'text-text-muted hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1 relative z-10 shrink-0">
              {skillFilterCategories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveSkillCategory(cat.key);
                    setHoveredSkill(null);
                  }}
                  className={`text-[0.58rem] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors duration-200 border cursor-pointer ${
                    activeSkillCategory === cat.key
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      : 'bg-white/5 border-white/5 text-text-muted hover:text-white'
                  }`}
                >
                  {cat.key}
                </button>
              ))}
            </div>

            {/* MAIN PRESENTATION CONTAINER */}
            <div className="flex-1 relative z-10 flex flex-col justify-center">

              {/* View 1: Modern Grid Tiles with Proficiency segment bars */}
              {skillsViewMode === 'tags' && (
                <div className="overflow-y-auto max-h-[380px] lg:max-h-[340px] pr-1 custom-scrollbar text-left py-1">
                  <div className="flex flex-wrap gap-2">
                    {filteredSkills.map((skill, idx) => {
                      const dots = skill.level === 'Expert' ? 3 : skill.level === 'Advanced' ? 2 : 1;
                      
                      // Theme config
                      let tagColor = 'rgba(168, 85, 247, 0.08)';
                      let tagBorder = 'rgba(168, 85, 247, 0.2)';
                      let tagText = 'text-purple-400';
                      if (skill.cat === 'Prog') {
                        tagColor = 'rgba(99, 102, 241, 0.08)';
                        tagBorder = 'rgba(99, 102, 241, 0.2)';
                        tagText = 'text-indigo-400';
                      } else if (skill.cat === 'NLP/CV') {
                        tagColor = 'rgba(16, 185, 129, 0.08)';
                        tagBorder = 'rgba(16, 185, 129, 0.2)';
                        tagText = 'text-emerald-400';
                      } else if (skill.cat === 'Cloud') {
                        tagColor = 'rgba(6, 182, 212, 0.08)';
                        tagBorder = 'rgba(6, 182, 212, 0.2)';
                        tagText = 'text-cyan-400';
                      }

                      return (
                        <div
                          key={idx}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          style={{ background: tagColor, borderColor: tagBorder }}
                          className={`flex flex-col p-2.5 rounded-xl border transition-all duration-200 cursor-help hover:scale-[1.03] select-none text-left w-[calc(50%-4px)] xs:w-[calc(33.33%-6px)] lg:w-[calc(50%-4px)]`}
                        >
                          <span className={`text-[0.68rem] font-bold font-sans truncate ${tagText}`}>{skill.name}</span>
                          
                          {/* Segmented rating meters */}
                          <div className={`flex gap-0.5 mt-1.5 ${tagText}`}>
                            {Array.from({ length: 3 }).map((_, i) => (
                              <span
                                key={i}
                                className={`w-3.5 h-1 rounded-[1px] transition-all duration-300 ${
                                  i < dots ? 'bg-current shadow-[0_0_5px_rgba(255,255,255,0.15)]' : 'bg-white/10'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* View 2: SVG Radar Strength Analytics */}
              {skillsViewMode === 'radar' && (
                <div className="flex items-center justify-center min-h-[220px] relative select-none">
                  <svg className="w-[195px] h-[195px]" viewBox="0 0 100 100">
                    <defs>
                      <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.03" />
                      </radialGradient>
                    </defs>
                    
                    {/* Concentric grid lines */}
                    {backgroundRadarPolygons.map((pts, idx) => (
                      <polygon
                        key={idx}
                        points={pts}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="0.5"
                      />
                    ))}
                    
                    {/* Axis rays */}
                    {radarAxisLines.map((line, idx) => (
                      <line
                        key={idx}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="0.5"
                      />
                    ))}
                    
                    {/* Morphing filled stats area */}
                    <polygon
                      points={radarPoints}
                      fill="url(#radarGrad)"
                      stroke="#06b6d4"
                      strokeWidth="1.2"
                      className="transition-all duration-500 ease-out"
                    />
                    
                    {/* Accent nodes */}
                    {radarScores.map((score, i) => {
                      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
                      const x = 50 + 35 * score * Math.cos(angle);
                      const y = 50 + 35 * score * Math.sin(angle);
                      return (
                        <circle
                          key={i}
                          cx={x.toFixed(1)}
                          cy={y.toFixed(1)}
                          r="1.8"
                          fill="#06b6d4"
                          stroke="#ffffff"
                          strokeWidth="0.5"
                          className="transition-all duration-500 ease-out"
                        />
                      );
                    })}
                    
                    {/* Label texts */}
                    {radarLabels.map((lbl, idx) => (
                      <text
                        key={idx}
                        x={lbl.x}
                        y={lbl.y}
                        textAnchor={lbl.anchor}
                        dy={lbl.dy}
                        fill="rgba(255, 255, 255, 0.5)"
                        fontSize="4.8"
                        fontFamily="var(--font-mono)"
                        className="font-bold cursor-default"
                      >
                        {lbl.label}
                      </text>
                    ))}
                  </svg>
                </div>
              )}

              {/* View 3: Interactive Category Orbital Network */}
              {skillsViewMode === 'network' && (
                <div className="flex flex-col sm:flex-row items-center justify-between min-h-[220px] py-1 select-none gap-4">
                  
                  {/* Orbital Nodes Connector */}
                  <svg className="w-[125px] h-[125px] shrink-0" viewBox="0 0 100 100">
                    {[
                      { x: 28, y: 28, cat: 'AI/ML' },
                      { x: 72, y: 28, cat: 'Prog' },
                      { x: 28, y: 72, cat: 'NLP/CV' },
                      { x: 72, y: 72, cat: 'Cloud' }
                    ].map((orbit, i) => {
                      const isActive = activeSkillCategory === orbit.cat;
                      return (
                        <line
                          key={i}
                          x1="50" y1="50"
                          x2={orbit.x} y2={orbit.y}
                          stroke={isActive ? "#06b6d4" : "rgba(255, 255, 255, 0.08)"}
                          strokeWidth={isActive ? "1.5" : "0.8"}
                          strokeDasharray={isActive ? "none" : "2,2"}
                          className="transition-all duration-300"
                        />
                      );
                    })}
                    
                    {/* Center Core */}
                    <circle cx="50" cy="50" r="7.5" fill="#14141d" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="50" y="50" textAnchor="middle" dy="0.32em" fill="#ffffff" fontSize="2.8" fontFamily="var(--font-mono)" className="font-black">CORE</text>
                    
                    {/* Orbitals */}
                    {[
                      { x: 28, y: 28, label: 'ML', cat: 'AI/ML', color: '#a855f7' },
                      { x: 72, y: 28, label: 'PROG', cat: 'Prog', color: '#6366f1' },
                      { x: 28, y: 72, label: 'NLP', cat: 'NLP/CV', color: '#10b981' },
                      { x: 72, y: 72, label: 'CLOUD', cat: 'Cloud', color: '#06b6d4' }
                    ].map((node, i) => {
                      const isActive = activeSkillCategory === node.cat;
                      return (
                        <g
                          key={i}
                          onClick={() => {
                            setActiveSkillCategory(node.cat);
                            setHoveredSkill(null);
                          }}
                          className="cursor-pointer"
                        >
                          <circle
                            cx={node.x} cy={node.y} r="7.5"
                            fill={isActive ? `${node.color}25` : "#0b0f19"}
                            stroke={isActive ? node.color : "rgba(255,255,255,0.15)"}
                            strokeWidth="1.2"
                            className="transition-all duration-300 hover:stroke-white"
                          />
                          <text
                            x={node.x} y={node.y} textAnchor="middle" dy="0.32em"
                            fill={isActive ? "#ffffff" : "rgba(255, 255, 255, 0.45)"}
                            fontSize="2.6" fontFamily="var(--font-mono)" className="font-bold"
                          >
                            {node.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Connected list */}
                  <div className="flex-1 w-full text-left self-stretch flex flex-col justify-center max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
                    <span className="text-[0.56rem] font-mono text-text-muted uppercase tracking-wider mb-2">Connected nodes</span>
                    <div className="flex flex-col gap-1">
                      {filteredSkills.slice(0, 4).map((skill, idx) => {
                        let textClass = 'text-purple-400';
                        if (skill.cat === 'Prog') textClass = 'text-indigo-400';
                        else if (skill.cat === 'NLP/CV') textClass = 'text-emerald-400';
                        else if (skill.cat === 'Cloud') textClass = 'text-cyan-400';

                        return (
                          <div
                            key={idx}
                            onMouseEnter={() => setHoveredSkill(skill)}
                            className="flex items-center justify-between p-1.5 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/5 cursor-pointer transition-all hover:translate-x-0.5"
                          >
                            <span className="text-[0.66rem] font-mono text-text-secondary truncate">{skill.name}</span>
                            <span className={`text-[0.58rem] font-mono font-bold ${textClass}`}>{skill.level}</span>
                          </div>
                        );
                      })}
                      {filteredSkills.length > 4 && (
                        <span className="text-[0.54rem] font-mono text-text-muted/60 pl-1">
                          + {filteredSkills.length - 4} more nodes
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Skill Details Panel */}
            <div className="bg-black/30 border border-white/5 rounded-xl p-3.5 mt-auto relative z-10 text-left font-mono text-[0.66rem] min-h-[90px] flex flex-col justify-center">
              {hoveredSkill ? (
                <div className="flex flex-col gap-1 transition-all duration-300">
                  <div className="flex justify-between items-center text-[0.64rem] font-bold text-white border-b border-white/5 pb-1 mb-1">
                    <span className="text-cyan-400 font-sans text-xs">{hoveredSkill.name}</span>
                    <span className="text-[0.6rem] bg-cyan-500/10 text-cyan-400 px-1.5 py-px rounded">{hoveredSkill.level} · {hoveredSkill.years}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed text-[0.62rem]">{hoveredSkill.use}</p>
                </div>
              ) : (
                <div className="text-center text-text-muted py-2">
                  <Sparkles size={14} className="mx-auto text-cyan-500/40 mb-1 animate-pulse" />
                  <span>Hover tags or nodes to view specialization and project use cases</span>
                </div>
              )}
            </div>
          </div>

          {/* ── CARD 3: Interactive Sandbox & Visualizer (spans 3 columns, height-bound) ── */}
          <div
            className="bento-card glass-card relative group lg:col-span-3 p-0 flex flex-col rounded-3xl overflow-hidden border border-white/5 h-[530px]"
            onMouseMove={handleMouseMove}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(700px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(168, 85, 247, 0.04), transparent 80%)`
              }}
            />

            {/* Sandbox Tab controls - Styled as GitHub Repo Navbar Tabs */}
            <div className="flex items-center justify-between px-5 bg-[#0d1117] border-b border-[#30363d] shrink-0 z-10 relative select-none">
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
                <span className="flex gap-1.5 mr-4 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </span>
                
                {/* GitHub style repository navbar tabs */}
                <div className="flex gap-4 text-[0.72rem] font-sans">
                  {[
                    { key: 'playground', label: 'Code Editor', icon: <Code2 size={13} /> },
                    { key: 'visualizer', label: 'Attention Visualizer', icon: <Eye size={13} /> },
                    { key: 'training', label: 'Training Curve', icon: <LineChart size={13} /> }
                  ].map(tab => {
                    const isActive = activeSandboxTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => { setActiveSandboxTab(tab.key); setCopied(false); }}
                        className={`flex items-center gap-1.5 py-3.5 px-1 border-b-2 cursor-pointer transition-colors font-semibold ${
                          isActive
                            ? 'border-[#f78166] text-[#c9d1d9]'
                            : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Tab Actions / COPY and RUN */}
              <div className="flex items-center gap-2.5 shrink-0 py-2">
                {activeSandboxTab === 'visualizer' && (
                  <div className="flex gap-1 text-[0.63rem] font-mono font-bold bg-[#161b22] border border-[#30363d] rounded-lg p-0.5 mr-1">
                    {[1, 2, 3, 4].map(h => (
                      <button
                        key={h}
                        onClick={() => setActiveVisualizerHead(h)}
                        className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                          activeVisualizerHead === h ? 'bg-purple-500/20 text-purple-400 border border-purple-500/25' : 'text-[#8b949e] hover:text-white border border-transparent'
                        }`}
                      >
                        H{h}
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Prominent COPY Button */}
                <button
                  onClick={() => {
                    if (activeSandboxTab === 'playground') {
                      handleCopy();
                    } else if (activeSandboxTab === 'visualizer') {
                      navigator.clipboard.writeText(`softmax(Q * K^T / sqrt(${dModelVal}))`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    } else if (activeSandboxTab === 'training') {
                      navigator.clipboard.writeText(`Epoch: ${trainingEpoch}, Loss: ${trainingLoss}, Acc: ${trainingAcc}%`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] transition-all cursor-pointer text-[0.65rem] font-bold font-mono rounded-md"
                >
                  {copied ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>

                {/* Prominent RUN Button */}
                <button
                  onClick={() => {
                    if (activeSandboxTab === 'training') {
                      runModelTraining();
                    } else {
                      handleRunCode();
                    }
                  }}
                  disabled={isRunning || isTraining}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#2ea043] bg-[#238636] text-white hover:bg-[#2ea043] transition-all cursor-pointer text-[0.65rem] font-bold font-mono rounded-md disabled:opacity-60"
                >
                  {isRunning || isTraining ? (
                    <RefreshCw size={11} className="animate-spin" />
                  ) : (
                    <Play size={11} fill="currentColor" />
                  )}
                  <span>
                    {isRunning 
                      ? 'COMPILING...' 
                      : isTraining 
                        ? `TRAINING EP ${trainingEpoch}/40` 
                        : 'RUN'
                    }
                  </span>
                </button>
              </div>
            </div>

            {/* Sandbox Main body */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative z-10 bg-[#0d1117]">

              {/* ── SUB-TAB 1: Code Playground (GitHub Repo Mockup) ── */}
              {activeSandboxTab === 'playground' && (
                <div className="flex flex-1 flex-col overflow-hidden h-full bg-[#0d1117]">
                  
                  {/* Code File Viewer */}
                  <div className="flex-1 flex flex-col overflow-hidden h-full bg-[#0d1117]">
                    
                    {/* Path Breadcrumbs */}
                    <div className="px-4 py-2 border-b border-[#30363d] bg-[#0d1117] text-left text-[0.66rem] font-mono text-[#8b949e] shrink-0 select-none">
                      <span className="text-[#58a6ff] hover:underline cursor-pointer">flash-attention-sandbox</span>
                      <span className="mx-1">/</span>
                      {activeTab !== 'README.md' && (
                        <>
                          <span className="text-[#58a6ff] hover:underline cursor-pointer">src</span>
                          <span className="mx-1">/</span>
                        </>
                      )}
                      <span className="text-[#c9d1d9] font-bold">{activeTab}</span>
                    </div>

                    {/* Commit Header Panel */}
                    <div className="mx-4 mt-3.5 border border-[#30363d] rounded-t-lg bg-[#161b22] px-4 py-2.5 flex items-center justify-between text-left shrink-0 text-[0.68rem] select-none">
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-[0.55rem] font-black text-white">PL</div>
                        <span className="font-bold text-[#c9d1d9]">piyushlandge</span>
                        <span className="text-[#8b949e] truncate max-w-[200px] sm:max-w-[320px]">
                          feat: configure heads={headsVal} &amp; d_model={dModelVal}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[#8b949e] shrink-0">
                        <span className="font-mono text-[#58a6ff] hover:underline cursor-pointer">7ab8efd</span>
                        <span>2 hours ago</span>
                      </div>
                    </div>

                    {/* File Header Panel */}
                    <div className="mx-4 border-x border-[#30363d] bg-[#0d1117] border-t border-[#30363d] px-4 py-2 flex items-center justify-between shrink-0 text-[0.66rem] select-none">
                      <div className="text-[#8b949e] font-mono flex items-center gap-2">
                        <span>{getActiveCode().split('\n').length} lines</span>
                        <span>·</span>
                        <span>{getActiveCode().length} Bytes</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button className="px-2 py-0.5 border border-[#30363d] bg-[#21262d] text-[#c9d1d9] rounded font-bold hover:bg-[#30363d] transition-colors cursor-pointer text-[0.6rem]">Raw</button>
                        <button className="px-2 py-0.5 border border-[#30363d] bg-[#21262d] text-[#c9d1d9] rounded font-bold hover:bg-[#30363d] transition-colors cursor-pointer text-[0.6rem]">Blame</button>
                        <button
                          onClick={() => setShowConsole(!showConsole)}
                          className="px-2 py-0.5 border border-[#30363d] bg-[#21262d] text-[#c9d1d9] rounded font-bold hover:bg-[#30363d] transition-colors cursor-pointer text-[0.6rem] flex items-center gap-1"
                        >
                          <Terminal size={10} />
                          <span>{showConsole ? 'Hide Logs' : 'Show Logs'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Code Frame Body */}
                    <div className="mx-4 border-x border-[#30363d] flex-1 flex overflow-hidden bg-[#0d1117] border-b border-[#30363d] rounded-b-lg">
                      {showLineNumbers && (
                        <div className="py-4 pl-3.5 pr-2.5 text-right select-none font-mono text-[0.74rem] leading-[1.65] text-[#8b949e]/30 border-r border-[#30363d] bg-[#0d1117] min-w-[2.2rem] shrink-0">
                          {Array.from({ length: getActiveCode().split('\n').length }, (_, i) => (
                            <div key={i}>{i + 1}</div>
                          ))}
                        </div>
                      )}
                      
                      <div className="p-4 overflow-auto text-left font-mono leading-[1.65] flex-1 select-text custom-scrollbar text-[12px]">
                        {activeTab === 'README.md' ? (
                          <div className="font-sans text-[0.8rem] text-[#c9d1d9] leading-relaxed space-y-4 max-w-xl pb-6 select-text">
                            <div className="border-b border-[#30363d] pb-2 flex items-center gap-2">
                              <Sparkles size={14} className="text-purple-400" />
                              <h1 className="text-sm font-bold text-white uppercase tracking-wider">Causal Self-Attention Compiler</h1>
                            </div>
                            <p>An optimized self-attention sequence engine utilizing native PyTorch <code className="font-mono text-[#ff7b72] bg-white/5 px-1.5 py-0.5 rounded text-[0.75rem]">scaled_dot_product_attention</code> matrices.</p>
                            <div className="space-y-1.5 bg-[#161b22] border border-[#30363d] rounded-lg p-3">
                              <span className="text-[0.6rem] font-mono font-bold text-[#8b949e] block uppercase">Hyperparameter Synced:</span>
                              <div className="font-mono text-[0.72rem] text-[#c9d1d9] space-y-0.5">
                                <div>heads = <span className="text-[#ff7b72]">{headsVal}</span></div>
                                <div>d_model = <span className="text-[#ff7b72]">{dModelVal}</span></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <pre className="m-0 select-text whitespace-pre overflow-visible text-[0.76rem]">
                            <code className="select-text text-[#c9d1d9]">
                              {(() => {
                                const codeStr = getActiveCode();
                                const syntaxTheme = {
                                  comment: 'text-[#8b949e] font-mono italic',
                                  variable: 'text-[#ffa657]',
                                  string: 'text-[#a5d6ff]',
                                  keyword: 'text-[#ff7b72]',
                                  func: 'text-[#d2a8ff]',
                                  type: 'text-[#79c0ff]',
                                  number: 'text-[#79c0ff]',
                                };
                                return codeStr.split('\n').map((line, idx) => {
                                  let elements = [];
                                  if (line.trim().startsWith('#')) {
                                    elements.push(<span key="comment" className={syntaxTheme.comment}>{line}</span>);
                                  } else {
                                    const parts = line.split(/(\s+)/);
                                    parts.forEach((part, pidx) => {
                                      if (['import', 'from', 'as', 'def', 'class', 'return', 'super'].includes(part)) {
                                        elements.push(<span key={pidx} className={syntaxTheme.keyword}>{part}</span>);
                                      } else if (part.startsWith('"') || part.endsWith('"') || part.startsWith("'") || part.endsWith("'")) {
                                        elements.push(<span key={pidx} className={syntaxTheme.string}>{part}</span>);
                                      } else if (/^\d+$/.test(part)) {
                                        elements.push(<span key={pidx} className={syntaxTheme.number}>{part}</span>);
                                      } else if (['torch', 'nn', 'Module', 'Linear', 'scaled_dot_product_attention', 'FlashSelfAttention', 'FlashAttention'].includes(part)) {
                                        elements.push(<span key={pidx} className={syntaxTheme.type}>{part}</span>);
                                      } else if (['self', 'x', 'qkv', 'q', 'k', 'v', 'out'].includes(part)) {
                                        elements.push(<span key={pidx} className={syntaxTheme.variable}>{part}</span>);
                                      } else {
                                        elements.push(<span key={pidx}>{part}</span>);
                                      }
                                    });
                                  }
                                  return (
                                    <span key={idx} className="block min-h-[1.2rem]">
                                      {elements}
                                    </span>
                                  );
                                });
                              })()}
                            </code>
                          </pre>
                        )}
                      </div>
                    </div>

                    {/* CUDA Term Logs Terminal Console */}
                    {showConsole && (
                      <div className="mx-4 mt-3 bg-[#0d1117] border border-[#30363d] rounded-lg p-3.5 text-left shrink-0 font-mono select-none">
                        <div className="flex items-center justify-between border-b border-[#30363d] pb-2 mb-2 text-[#8b949e]">
                          <span className="font-bold flex items-center gap-2 text-[0.62rem] uppercase tracking-wider text-green-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                            CUDA Term Logs
                          </span>
                          <button onClick={() => setShowConsole(false)} className="hover:text-[#ff5f56] transition-colors cursor-pointer text-[0.58rem] font-bold">✕ Close Console</button>
                        </div>
                        <div className="flex flex-col gap-1 text-[#8b949e] overflow-y-auto max-h-20 custom-scrollbar select-text leading-relaxed text-[11px]">
                          {consoleLogs.map((log, idx) => (
                            <div key={idx} className="flex gap-1.5 items-start">
                              <span className="text-[#8b949e] font-bold shrink-0">›</span>
                              <span className="whitespace-pre-wrap text-[#c9d1d9]">{log}</span>
                            </div>
                          ))}
                          {isRunning && (
                            <div className="text-[#58a6ff] animate-pulse flex items-center gap-1.5">
                              <span className="text-[#58a6ff] font-bold shrink-0">›</span>
                              <span>Running CUDA compile test...</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Dynamic Status Footer */}
                        <div className="flex flex-wrap items-center justify-between text-[#8b949e] font-mono text-[0.6rem] border-t border-[#30363d] pt-2 mt-2 select-none">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span>Compiled: <span className="text-[#c9d1d9] font-bold">PyTorch 2.3</span></span>
                            <span className="text-[#30363d]">•</span>
                            <span>device: <span className="text-[#c9d1d9] font-bold">CUDA_0</span></span>
                            <span className="text-[#30363d]">•</span>
                            <span>sandbox_mode: <span className="text-[#c9d1d9] font-bold">{activeSandboxTab === 'playground' ? 'playground' : activeSandboxTab}</span></span>
                          </div>
                          <div>
                            <span>Status: <span className={isRunning ? "text-amber-400 font-bold animate-pulse" : isTraining ? "text-cyan-400 font-bold animate-pulse" : "text-green-400 font-bold"}>
                              {isRunning ? 'Compiling...' : isTraining ? 'Training...' : 'Synthesized ok'}
                            </span></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── SUB-TAB 2: Attention Heatmap & Graph Visualizer ── */}
              {activeSandboxTab === 'visualizer' && (
                <div className="flex flex-1 flex-col md:flex-row h-full overflow-hidden p-5 gap-6">
                  
                  {/* Visualizer description & parameter overview */}
                  <div className="w-full md:w-56 text-left flex flex-col justify-between shrink-0 font-mono text-[0.68rem] text-text-secondary border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 md:pr-5">
                    <div>
                      <span className="text-[0.62rem] font-mono font-bold text-text-muted block uppercase mb-1.5">Attention Context Mapping</span>
                      <p className="font-sans leading-relaxed mb-4 text-[0.74rem]">
                        Visualizes self-attention connections between sequence tokens. Connection lines represent matrix weights computed via scaled dot product:
                      </p>
                      <div className="bg-black/30 border border-white/5 p-2.5 rounded-lg flex flex-col gap-1 mb-4 select-all text-neutral-300">
                        <span className="text-purple-400 font-bold text-[0.62rem]">FORMULA:</span>
                        <code className="text-[0.65rem] leading-normal font-bold">softmax(Q * K^T / sqrt(d_model))</code>
                        <span className="text-[0.58rem] text-text-muted mt-1">d_model = {dModelVal}</span>
                        <span className="text-[0.58rem] text-text-muted">scale = {(1 / Math.sqrt(dModelVal)).toFixed(4)}</span>
                      </div>
                    </div>

                    {/* Interactive token hover details info */}
                    <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-3">
                      {hoveredQueryToken !== null ? (
                        <div>
                          <div className="font-bold text-white border-b border-purple-500/20 pb-1 mb-1">
                            Query: "{visualizerTokens[hoveredQueryToken]}"
                          </div>
                          <div className="space-y-1 text-[0.62rem] text-text-secondary">
                            {visualizerTokens.map((kToken, kIdx) => {
                              const weight = getAttentionWeight(hoveredQueryToken, kIdx, activeVisualizerHead);
                              if (weight === 0) return null;
                              return (
                                <div key={kIdx} className="flex justify-between">
                                  <span>attends to "{kToken}":</span>
                                  <span className="text-purple-400 font-bold">{(weight * 100).toFixed(0)}%</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-text-muted font-sans text-[0.7rem] py-2">
                          Hover on any Query token in the left column to isolate attention weights.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SVG Graph Grid Visualizer */}
                  <div className="flex-1 relative flex items-center justify-between h-full max-h-[360px]">
                    
                    {/* SVG overlay for line draws */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: '280px' }}>
                      <defs>
                        <linearGradient id="attnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#c678dd" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#61afef" stopOpacity="0.4" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid draws */}
                      {visualizerTokens.map((qVal, qIdx) => {
                        const isQueryActive = hoveredQueryToken === null || hoveredQueryToken === qIdx;
                        
                        return visualizerTokens.map((kVal, kIdx) => {
                          const weight = getAttentionWeight(qIdx, kIdx, activeVisualizerHead);
                          if (weight === 0) return null;
                          
                          // Convert indexes to coordinate percentages
                          const y1 = ((qIdx / (visualizerTokens.length - 1)) * 84 + 8).toFixed(1);
                          const y2 = ((kIdx / (visualizerTokens.length - 1)) * 84 + 8).toFixed(1);
                          
                          const opacity = isQueryActive ? Math.max(0.04, weight * 0.75) : 0.02;
                          const strokeWidth = isQueryActive ? Math.max(0.6, weight * 3.5) : 0.4;
                          
                          return (
                            <line
                              key={`${qIdx}-${kIdx}`}
                              x1="22%"
                              y1={`${y1}%`}
                              x2="78%"
                              y2={`${y2}%`}
                              stroke={isQueryActive ? "url(#attnGrad)" : "rgba(255, 255, 255, 0.08)"}
                              strokeWidth={strokeWidth}
                              opacity={opacity}
                              className="transition-all duration-300"
                            />
                          );
                        });
                      })}
                    </svg>

                    {/* Left Column: Query nodes */}
                    <div className="flex flex-col justify-between h-[85%] select-none z-10 w-24">
                      {visualizerTokens.map((token, idx) => (
                        <div
                          key={idx}
                          onMouseEnter={() => setHoveredQueryToken(idx)}
                          onMouseLeave={() => setHoveredQueryToken(null)}
                          className={`text-[0.68rem] font-mono px-2 py-1 rounded text-center border cursor-default transition-all duration-200 ${
                            hoveredQueryToken === idx
                              ? 'bg-purple-500/15 border-purple-500/50 text-white font-bold scale-[1.03] shadow-[0_0_12px_rgba(168,85,247,0.15)]'
                              : 'bg-black/40 border-white/5 text-text-secondary hover:border-purple-500/20'
                          }`}
                        >
                          {token}
                        </div>
                      ))}
                    </div>

                    {/* Middle title details labels */}
                    <div className="flex-1 flex flex-col justify-center items-center pointer-events-none px-4 text-center">
                      <div className="text-[0.55rem] font-mono text-text-muted uppercase tracking-widest border border-white/5 bg-black/60 rounded px-2 py-1">
                        Causal Attention Head {activeVisualizerHead}
                      </div>
                      <span className="text-[0.52rem] font-mono text-text-muted/60 mt-1 uppercase tracking-widest">
                        scale_factor: {(1 / Math.sqrt(dModelVal)).toFixed(4)}
                      </span>
                    </div>

                    {/* Right Column: Key nodes */}
                    <div className="flex flex-col justify-between h-[85%] select-none z-10 w-24">
                      {visualizerTokens.map((token, idx) => {
                        let isAttended = false;
                        if (hoveredQueryToken !== null) {
                          const w = getAttentionWeight(hoveredQueryToken, idx, activeVisualizerHead);
                          if (w > 0) isAttended = true;
                        }
                        return (
                          <div
                            key={idx}
                            className={`text-[0.68rem] font-mono px-2 py-1 rounded text-center border cursor-default transition-all duration-200 ${
                              isAttended
                                ? 'bg-cyan-500/15 border-cyan-500/50 text-white font-bold scale-[1.03]'
                                : 'bg-black/40 border-white/5 text-text-secondary'
                            }`}
                          >
                            {token}
                          </div>
                        );
                      })}
                    </div>

                  </div>

                </div>
              )}

              {/* ── SUB-TAB 3: Training Curve Simulator ── */}
              {activeSandboxTab === 'training' && (
                <div className="flex flex-1 flex-col md:flex-row h-full overflow-hidden p-5 gap-6">
                  
                  {/* Parameters list and gauges */}
                  <div className="w-full md:w-56 text-left flex flex-col justify-between shrink-0 font-mono text-[0.68rem] text-text-secondary border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 md:pr-5">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[0.62rem] font-mono font-bold text-text-muted block uppercase mb-1.5">Loss Convergence Trace</span>
                        <p className="font-sans leading-relaxed text-[0.74rem]">
                          Simulates model backpropagation iterations, charting gradient steps in real-time.
                        </p>
                      </div>
                      
                      <div className="space-y-2 text-[0.72rem] bg-black/40 border border-white/5 rounded-xl p-3">
                        <div className="flex justify-between">
                          <span className="text-text-muted">EPOCH:</span>
                          <span className="text-white font-bold">{trainingEpoch} / 40</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">TRAIN LOSS:</span>
                          <span className="text-purple-400 font-bold">{trainingEpoch > 0 ? trainingLoss.toFixed(3) : '--'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">VALID ACC:</span>
                          <span className="text-cyan-400 font-bold">{trainingEpoch > 0 ? `${trainingAcc.toFixed(1)}%` : '--'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">LEARNING RATE:</span>
                          <span className="text-amber-400 font-bold">{(1e-3 * Math.exp(-trainingEpoch / 18)).toExponential(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[0.6rem] text-text-muted leading-relaxed font-sans mt-auto">
                      Click the "RUN" button in the upper-right corner to execute gradient calculations.
                    </div>
                  </div>

                  {/* SVG Line Charts Container */}
                  <div className="flex-1 flex flex-col gap-4 justify-center h-full max-h-[360px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                      
                      {/* Chart 1: Training Loss Curve */}
                      <div className="border border-white/5 rounded-xl bg-black/35 p-3 flex flex-col relative">
                        <div className="flex justify-between text-[0.6rem] font-mono text-text-muted mb-2 uppercase select-none">
                          <span>Cross Entropy Loss</span>
                          <span className="text-purple-400 font-bold">Min: {lossHistory.length > 0 ? Math.min(...lossHistory).toFixed(3) : '2.2'}</span>
                        </div>
                        
                        <div className="flex-1 relative border-l border-b border-white/10 select-none">
                          <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {/* Horizontal guide lines */}
                            <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            
                            {lossHistory.length > 0 && (
                              <polyline
                                fill="none"
                                stroke="#a855f7"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={getChartPoints(lossHistory, 0, 2.5)}
                                className="transition-all duration-200"
                              />
                            )}
                          </svg>
                          {lossHistory.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-[0.62rem] font-mono text-text-muted/40">
                              NO DATA RUN
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Chart 2: Validation Accuracy Curve */}
                      <div className="border border-white/5 rounded-xl bg-black/35 p-3 flex flex-col relative">
                        <div className="flex justify-between text-[0.6rem] font-mono text-text-muted mb-2 uppercase select-none">
                          <span>Validation Accuracy</span>
                          <span className="text-cyan-400 font-bold">Max: {accHistory.length > 0 ? `${Math.max(...accHistory).toFixed(1)}%` : '0%'}</span>
                        </div>

                        <div className="flex-1 relative border-l border-b border-white/10 select-none">
                          <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {/* Horizontal guide lines */}
                            <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

                            {accHistory.length > 0 && (
                              <polyline
                                fill="none"
                                stroke="#22d3ee"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={getChartPoints(accHistory, 25, 96)}
                                className="transition-all duration-200"
                              />
                            )}
                          </svg>
                          {accHistory.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-[0.62rem] font-mono text-text-muted/40">
                              NO DATA RUN
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              )}

            {/* Sandbox Right Column Settings Panel (GitHub Repository Sidebar layout) */}
            <div className="w-full lg:w-56 bg-[#0d1117] border-t lg:border-t-0 lg:border-l border-[#30363d] p-4 text-left flex flex-col gap-5 shrink-0 font-sans select-none overflow-y-auto custom-scrollbar relative z-10">
              
              {/* Hyperparameters Config */}
              <div className="flex flex-col gap-3">
                <div className="font-bold text-white text-[0.75rem] border-b border-[#30363d] pb-1.5 uppercase tracking-wide">Hyperparameters</div>
                
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[0.66rem] font-mono text-[#8b949e]">
                    <span>Heads Count</span>
                    <span className="text-[#58a6ff] font-bold">{headsVal}</span>
                  </div>
                  <input 
                    type="range" min="1" max="16" step="1"
                    value={headsVal}
                    onChange={(e) => setHeadsVal(parseInt(e.target.value))}
                    className="w-full accent-[#58a6ff] h-1 bg-[#21262d] rounded appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[0.66rem] font-mono text-[#8b949e]">
                    <span>d_model size</span>
                    <span className="text-[#58a6ff] font-bold">{dModelVal}</span>
                  </div>
                  <input 
                    type="range" min="128" max="1024" step="64"
                    value={dModelVal}
                    onChange={(e) => setDModelVal(parseInt(e.target.value))}
                    className="w-full accent-[#58a6ff] h-1 bg-[#21262d] rounded appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Estimated CUDA Run */}
              <div className="flex flex-col gap-2.5">
                <div className="font-bold text-white text-[0.75rem] border-b border-[#30363d] pb-1.5 uppercase tracking-wide">Estimated CUDA Run</div>
                <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-2.5 flex flex-col gap-1.5 text-[0.64rem] font-mono text-[#8b949e]">
                  <div className="flex justify-between items-center">
                    <span>Forward Latency:</span>
                    <span className="text-white font-bold">{(1.1 + (headsVal * 0.08) + (dModelVal / 512) * 0.45).toFixed(2)}ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Estimated Peak VRAM:</span>
                    <span className="text-white font-bold">{(3.8 + (dModelVal / 512) * 6.2 + (headsVal * 0.15)).toFixed(1)}MB</span>
                  </div>
                </div>
              </div>

              {/* Repository Files List inside sidebar */}
              <div className="flex flex-col gap-2.5">
                <div className="font-bold text-white text-[0.75rem] border-b border-[#30363d] pb-1.5 uppercase tracking-wide">Repository Files</div>
                <div className="flex flex-col gap-1">
                  {filesList.map(file => {
                    const isSelected = activeSandboxTab === 'playground' && activeTab === file;
                    return (
                      <button
                        key={file}
                        onClick={() => {
                          setActiveSandboxTab('playground');
                          setActiveTab(file);
                          setCopied(false);
                        }}
                        className={`flex items-center gap-2 px-2 py-1 text-[0.66rem] font-mono cursor-pointer transition-colors text-left w-full rounded ${
                          isSelected 
                            ? 'text-[#58a6ff] font-bold bg-[#1f2937]/35 border border-[#30363d]/80' 
                            : 'text-[#c9d1d9] hover:text-[#58a6ff] hover:bg-[#161b22]/30 border border-transparent'
                        }`}
                      >
                        <span className="text-[0.75rem]">📄</span>
                        <span className="truncate">{file}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

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
              <h3 className="font-heading font-black text-2xl text-white mb-1.5">Education &amp; Experience</h3>
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
                        className={`relative pl-7 border-l-2 text-left cursor-pointer rounded-r-xl transition-all duration-300 p-3 hover:bg-white/[0.02] ${
                          isExpanded ? 'border-purple-500 bg-white/[0.015]' : 'border-white/10'
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
                            <h5 className="text-[0.95rem] font-black text-white leading-tight">{event.role}</h5>
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
                        className={`relative pl-7 border-l-2 text-left cursor-pointer rounded-r-xl transition-all duration-300 p-3 hover:bg-white/[0.02] ${
                          isExpanded ? 'border-cyan-500 bg-white/[0.015]' : 'border-white/10'
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
                            <h5 className="text-[0.95rem] font-black text-white leading-tight">{event.degree}</h5>
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
