import { useState } from 'react';
import { Code2, Terminal, Cpu, Brain, LineChart, Eye, Cloud, Play, Check, Copy, GraduationCap, Briefcase, Sparkles, MapPin, Mail, GitBranch, Search, Plus, Settings } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('README.md');
  const [copied, setCopied]       = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  
  // Interactive IDE States
  const [activeSidebarTab, setActiveSidebarTab] = useState('explorer');
  const [searchQuery, setSearchQuery] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [headsVal, setHeadsVal] = useState(8);
  const [dModelVal, setDModelVal] = useState(512);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [filesList, setFilesList] = useState(['README.md']);
  const [newFileName, setNewFileName] = useState('');
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [customFilesData, setCustomFilesData] = useState({});
  const [editorFontSize, setEditorFontSize] = useState(13);
  const [editorTheme, setEditorTheme] = useState('one-dark');

  const themes = {
    'one-dark': {
      bg: 'bg-[#1e1e24]/60',
      text: 'text-[#abb2bf]',
      comment: 'text-[#5c6370]',
      variable: 'text-[#e06c75]',
      string: 'text-[#98c379]',
      keyword: 'text-[#c678dd]',
      func: 'text-[#61afef]',
      type: 'text-[#e5c07b]',
      number: 'text-[#d19a66]',
    },
    'monokai': {
      bg: 'bg-[#272822]/60',
      text: 'text-[#f8f8f2]',
      comment: 'text-[#75715e]',
      variable: 'text-[#f92672]',
      string: 'text-[#e6db74]',
      keyword: 'text-[#f92672]',
      func: 'text-[#a6e22e]',
      type: 'text-[#66d9ef]',
      number: 'text-[#ae81ff]',
    },
    'dracula': {
      bg: 'bg-[#282a36]/60',
      text: 'text-[#f8f8f2]',
      comment: 'text-[#6272a4]',
      variable: 'text-[#ff79c6]',
      string: 'text-[#f1fa8c]',
      keyword: 'text-[#ff79c6]',
      func: 'text-[#50fa7b]',
      type: 'text-[#8be9fd]',
      number: 'text-[#bd93f9]',
    },
    'github-dark': {
      bg: 'bg-[#24292e]/60',
      text: 'text-[#e1e4e8]',
      comment: 'text-[#6a737d]',
      variable: 'text-[#f97583]',
      string: 'text-[#9ecbff]',
      keyword: 'text-[#f97583]',
      func: 'text-[#b392f0]',
      type: 'text-[#ffab70]',
      number: 'text-[#79b8ff]',
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x-relative', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y-relative', `${e.clientY - rect.top}px`);
  };

  const getCodeForFile = (filename) => {
    if (filename === 'README.md') {
      return `# Portfolio Workspace & Sandbox

Welcome to the interactive coding sandbox! This bento card simulates a lightweight web IDE.

## Developer Signature
- **Engineer**: Piyush Landge
- **Focus**: Deep Learning & Generative AI

## Interactive Sandbox Features
1. **Explorer**: Add new custom Python files (\`.py\`) or text documents using the Plus icon in the Explorer sidebar.
2. **Settings**: Switch color themes (Dracula, Monokai, One Dark) or change font size.
3. **Search**: Search for text segments across all workspace documents.
4. **Git Integration**: Write commit messages and simulate Git pushes in the Source Control panel.

## Try It Out
Create a new file in the Explorer (e.g., \`agent.py\`) and write some PyTorch code, adjust attention parameters, and hit the **RUN** button to watch compilation logs update in real-time.`;
    }
    if (filename === 'attention_layer.py') {
      return `# Dev Signature
engineer = "Piyush Landge"
focus    = "Deep Learning & Generative AI"

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
        # Shape splits for scaled dot-product attention
        qkv = self.qkv_proj(x)
        q, k, v = qkv.chunk(3, dim=-1)
        
        # Flash-optimized attention compute
        out = nn.functional.scaled_dot_product_attention(
            q, k, v, is_causal=True
        )
        return self.out_proj(out)`;
    }
    if (filename === 'model_eval.py') {
      return `# Causal Attention Benchmark
import time
import torch

def run_benchmark():
    model = FlashSelfAttention(d_model=${dModelVal}, heads=${headsVal}).cuda()
    x = torch.randn(4, 1024, 512).cuda()
    
    # Warping attention compute
    torch.cuda.synchronize()
    start = time.perf_counter()
    out = model(x)
    torch.cuda.synchronize()
    latency = (time.perf_counter() - start) * 1000
    
    print(f"Latency: {latency:.2f}ms")
    print(f"Memory: {torch.cuda.max_memory_allocated() / 1e6:.1f}MB")

run_benchmark()`;
    }
    return customFilesData[filename] || `# Custom Module: ${filename}
import torch
import torch.nn as nn

# Configured parameters
heads = ${headsVal}
d_model = ${dModelVal}

print("Running pipeline on ${filename}...")`;
  };

  const getActiveCode = () => {
    return getCodeForFile(activeTab);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setShowConsole(true);
    setConsoleLogs(['SYSTEM: Building workspace configurations...', 'ALLOC: Compiling PyTorch tensor runtime...']);
    setTimeout(() => setConsoleLogs(p => [...p, `FILE: Loaded ${activeTab} source codes.`]), 300);
    setTimeout(() => setConsoleLogs(p => [...p,
      `TENSOR: Creating input sequence matrix [shape: (4, 1024, ${dModelVal})]...`,
      'COMPUTE: Running attention layer forward computations...'
    ]), 700);
    setTimeout(() => {
      if (activeTab === 'attention_layer.py') {
        setConsoleLogs(p => [...p,
          `OUTPUT: FlashAttention forward pass output → torch.Size([4, 1024, ${dModelVal}])`,
          'VERIFY: Chunk dimension splits verified [Q, K, V] → SUCCESS',
          `SYSTEM: Execution complete. Status → OK (took ${(1.8 + (headsVal * 0.08) + (dModelVal / 512) * 0.4).toFixed(1)}ms)`
        ]);
      } else if (activeTab === 'model_eval.py') {
        const calculatedLatency = (1.2 + (headsVal * 0.12) + (dModelVal / 512) * 0.8).toFixed(2);
        const calculatedVram = (4.5 + (dModelVal / 512) * 8.5 + (headsVal * 0.2)).toFixed(1);
        setConsoleLogs(p => [...p,
          'BENCHMARK: CUDA execution test initiated...',
          `MEASURED LATENCY: ${calculatedLatency}ms`,
          `GPU PEAK VRAM USE: ${calculatedVram}MB / 16.0GB`,
          'SYSTEM: Evaluation run complete. Status → OK'
        ]);
      } else if (activeTab === 'README.md') {
        setConsoleLogs(p => [...p,
          'SYSTEM: Displaying README.md. No binary target available to compile.',
          'HINT: Select attention_layer.py or model_eval.py to run computational benchmarks.'
        ]);
      } else {
        setConsoleLogs(p => [...p,
          `SYSTEM: Executing custom file ${activeTab}...`,
          `PARAMS: heads=${headsVal}, d_model=${dModelVal}`,
          'OUTPUT: Executed successfully (took 1.5ms)'
        ]);
      }
      setIsRunning(false);
    }, 1400);
  };

  const toggleSidebarTab = (tab) => {
    if (activeSidebarTab === tab) {
      setActiveSidebarTab(null);
    } else {
      setActiveSidebarTab(tab);
    }
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
        [name]: `# Custom Module: ${name}
import torch
import torch.nn as nn

# Configured parameters
heads = ${headsVal}
d_model = ${dModelVal}

print("Running pipeline on ${name}...")`
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

  const renderCodeLines = () => {
    const t = themes[editorTheme] || themes['one-dark'];
    
    if (activeTab === 'README.md') {
      return (
        <div className="font-sans text-left text-[0.82rem] leading-relaxed text-text-secondary select-text space-y-4 max-w-xl pb-6">
          <div className="border-b border-white/10 pb-2.5">
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles size={16} className="text-purple-400" />
              FlashSelfAttention &amp; Causal Benchmark
            </h1>
            <p className="text-xs text-text-muted mt-1 font-mono">Workspace Overview &amp; Documentation</p>
          </div>
          
          <p>
            An optimized self-attention module utilizing PyTorch's native FlashAttention kernel (<code className="font-mono text-purple-400 bg-white/5 px-1.5 py-0.5 rounded">scaled_dot_product_attention</code>) with causal masking.
          </p>
          
          <div className="space-y-2 bg-white/5 border border-white/5 rounded-lg p-3">
            <div className="text-[0.68rem] font-mono font-bold uppercase tracking-widest text-text-muted">
              Dev Signature
            </div>
            <div className="font-mono text-xs text-text-secondary space-y-1">
              <div><span className="text-purple-400">engineer</span> = "Piyush Landge"</div>
              <div><span className="text-purple-400">focus</span>    = "Deep Learning &amp; Generative AI"</div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-white border-b border-white/5 pb-1">
              Files in Workspace
            </h2>
            <ul className="list-disc pl-4 space-y-1.5 text-xs text-text-secondary">
              <li>
                <strong className="text-purple-300 font-mono">attention_layer.py</strong>: Core PyTorch implementation with Multihead splits and causal attention calculations.
              </li>
              <li>
                <strong className="text-purple-300 font-mono">model_eval.py</strong>: Causal attention benchmark script to sync CUDA runtime and evaluate memory utilization and execution latencies.
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-white border-b border-white/5 pb-1">
              Interactive Controls
            </h2>
            <p className="text-xs">
              Go to the <span className="font-bold text-white">Run Configurations</span> tab in the sidebar (Play icon) to adjust the <code className="font-mono text-cyan-400">heads</code> and <code className="font-mono text-cyan-400">d_model</code> values, then hit the <span className="font-bold text-white">RUN</span> button in the top right to execute the CUDA benchmark simulation.
            </p>
          </div>
        </div>
      );
    }
    
    if (activeTab === 'attention_layer.py') {
      return (
        <pre className="m-0 select-text whitespace-pre overflow-visible">
          <code className="select-text">
            <span className={t.comment}># Dev Signature</span><br />
            <span className={t.variable}>engineer</span> = <span className={t.string}>"Piyush Landge"</span><br />
            <span className={t.variable}>focus</span>    = <span className={t.string}>"Deep Learning &amp; Generative AI"</span><br />
            <br />
            <span className={t.keyword}>import</span> <span className={t.type}>torch</span><br />
            <span className={t.keyword}>import</span> <span className={t.type}>torch.nn</span> <span className={t.keyword}>as</span> <span className={t.type}>nn</span><br />
            <br />
            <span className={t.keyword}>class</span> <span className={t.func}>FlashSelfAttention</span>(<span className={t.type}>nn.Module</span>):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className={t.keyword}>def</span> <span className={t.func}>__init__</span>(<span className={t.variable}>self</span>, d_model=<span className={t.number}>{dModelVal}</span>, heads=<span className={t.number}>{headsVal}</span>):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={t.type}>super</span>().<span className={t.func}>__init__</span>()<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={t.variable}>self</span>.heads = heads<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={t.variable}>self</span>.d_model = d_model<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={t.variable}>self</span>.qkv_proj = <span className={t.type}>nn.Linear</span>(d_model, <span className={t.number}>3</span> * d_model)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={t.variable}>self</span>.out_proj = <span className={t.type}>nn.Linear</span>(d_model, d_model)<br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className={t.keyword}>def</span> <span className={t.func}>forward</span>(<span className={t.variable}>self</span>, x):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;qkv = <span className={t.variable}>self</span>.qkv_proj(x)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;q, k, v = qkv.chunk(<span className={t.number}>3</span>, dim=-<span className={t.number}>1</span>)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;out = <span className={t.type}>nn.functional.scaled_dot_product_attention</span>(<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;q, k, v, is_causal=<span className={t.number}>True</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={t.keyword}>return</span> <span className={t.variable}>self</span>.out_proj(out)
          </code>
        </pre>
      );
    }
    
    if (activeTab === 'model_eval.py') {
      return (
        <pre className="m-0 select-text whitespace-pre overflow-visible">
          <code className="select-text">
            <span className={t.comment}># Causal Attention Benchmark</span><br />
            <span className={t.keyword}>import</span> <span className={t.type}>time</span><br />
            <span className={t.keyword}>import</span> <span className={t.type}>torch</span><br />
            <br />
            <span className={t.keyword}>def</span> <span className={t.func}>run_benchmark</span>():<br />
            &nbsp;&nbsp;&nbsp;&nbsp;model = FlashSelfAttention(d_model=<span className={t.number}>{dModelVal}</span>, heads=<span className={t.number}>{headsVal}</span>).cuda()<br />
            &nbsp;&nbsp;&nbsp;&nbsp;x = torch.randn(<span className={t.number}>4</span>, <span className={t.number}>1024</span>, <span className={t.number}>512</span>).cuda()<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className={t.comment}># Warping attention compute</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;torch.cuda.synchronize()<br />
            &nbsp;&nbsp;&nbsp;&nbsp;start = time.perf_counter()<br />
            &nbsp;&nbsp;&nbsp;&nbsp;out = model(x)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;torch.cuda.synchronize()<br />
            &nbsp;&nbsp;&nbsp;&nbsp;latency = (time.perf_counter() - start) * <span className={t.number}>1000</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className={t.type}>print</span>(f<span className={t.string}>"Latency: {"{latency:.2f}"}ms"</span>)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className={t.type}>print</span>(f<span className={t.string}>"Memory: {"{torch.cuda.max_memory_allocated() / 1e6:.1f}"}MB"</span>)<br />
            <br />
            run_benchmark()
          </code>
        </pre>
      );
    }
    
    const customCode = getActiveCode();
    return (
      <pre className="m-0 select-text whitespace-pre overflow-visible">
        <code className="select-text">
          {customCode.split('\n').map((line, idx) => {
            let elements = [];
            if (line.startsWith('#')) {
              elements.push(<span key="comment" className={t.comment}>{line}</span>);
            } else {
              const parts = line.split(/(\s+)/);
              parts.forEach((part, pidx) => {
                if (part === 'import' || part === 'from' || part === 'as' || part === 'def' || part === 'class' || part === 'return' || part === 'print') {
                  elements.push(<span key={pidx} className={t.keyword}>{part}</span>);
                } else if (part.startsWith('"') || part.endsWith('"') || part.startsWith("'") || part.endsWith("'")) {
                  elements.push(<span key={pidx} className={t.string}>{part}</span>);
                } else if (/^\d+$/.test(part)) {
                  elements.push(<span key={pidx} className={t.number}>{part}</span>);
                } else if (part === 'torch' || part === 'nn' || part === 'Module') {
                  elements.push(<span key={pidx} className={t.type}>{part}</span>);
                } else {
                  elements.push(<span key={pidx}>{part}</span>);
                }
              });
            }
            return (
              <span key={idx}>
                {elements}
                <br />
              </span>
            );
          })}
        </code>
      </pre>
    );
  };

  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      icon: <Brain size={13} />,
      color: '#a855f7',
      skills: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Generative AI', 'Agentic AI', 'LLMs', 'Prompt Engineering'],
    },
    {
      title: 'Programming & Libraries',
      icon: <Code2 size={13} />,
      color: '#3776AB',
      skills: ['Python', 'SQL', 'MongoDB', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'NumPy', 'Flask'],
    },
    {
      title: 'Data Science & Analytics',
      icon: <LineChart size={13} />,
      color: '#22d3ee',
      skills: ['Data Analysis', 'Data Visualization', 'Statistics', 'Feature Engineering', 'Time Series', 'Tableau', 'Power BI'],
    },
    {
      title: 'NLP & Computer Vision',
      icon: <Eye size={13} />,
      color: '#34d399',
      skills: ['NLP', 'Sentiment Analysis', 'Computer Vision', 'OpenCV', 'Object Detection'],
    },
    {
      title: 'Cloud & DevTools',
      icon: <Cloud size={13} />,
      color: '#FF9900',
      skills: ['AWS', 'Azure', 'Git', 'GitHub', 'VS Code', 'Model Deployment'],
    },
    {
      title: 'AI Tools',
      icon: <Terminal size={13} />,
      color: '#74aa9c',
      skills: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity AI', 'GitHub Copilot'],
    },
  ];

  const experienceEvents = [
    {
      period: 'Apr 2026 – Present',
      duration: '2 mos',
      role: 'AI Intern',
      company: 'Applogix Solutions',
      type: 'Internship',
      color: '#a855f7',
      details: [
        'Backend Data orchestration and Python preprocessing scripts',
        'Data preprocessing pipelines and dataset structuring methodologies',
        'Machine learning model support, automated metrics auditing, and testing',
        'Model performance evaluation, fine-tuning, and gradient optimization',
        'Technical documentation, configuration files, and experiment tracking',
      ],
    },
    {
      period: 'Feb 2026 – Mar 2026',
      duration: '2 mos',
      role: 'AI Project Intern',
      company: 'Applogix Solutions',
      type: 'Internship',
      color: '#6366f1',
      details: [
        'Data preprocessing pipelines and dataset structuring methodologies',
        'Machine learning model support, automated metrics auditing, and testing',
        'Model performance evaluation, fine-tuning, and gradient optimization',
        'Technical documentation, configuration files, and experiment tracking',
      ],
    },
  ];

  const educationEvents = [
    {
      period: '2023 – 2026',
      degree: 'B.Sc. Computer Science',
      institution: 'B.K. Birla College, Kalyan',
      grade: 'CGPA 8.00',
      color: '#22d3ee',
      details: 'Specialized in high-performance backend architecture and intelligent AI-powered systems. Maintained a CGPA of 8.00 throughout the programme.',
    },
    {
      period: '2022 – 2023',
      degree: 'HSC – State Board of Maharashtra',
      institution: 'D.D.S.P. College, Erandol, Jalgaon',
      color: '#34d399',
      details: 'Completed Higher Secondary Certificate with a rigorous focus on scientific methodology and advanced mathematical principles.',
    },
  ];

  const stats = [
    { value: '3+', label: 'Yrs Learning' },
    { value: '2+', label: 'Projects Built' },
    { value: '4+', label: 'Months Experience' },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative scroll-reveal scroll-reveal-init bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

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
            An interactive snapshot of my skills, engineering philosophy, and professional journey.
          </p>
        </div>

        {/* ── Bento Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ── Card 1 · Bio & Stats (spans 2 cols) ── */}
          <div
            className="bento-card glass-card relative group overflow-hidden lg:col-span-2 p-7 md:p-10 flex flex-col gap-7 rounded-3xl"
            onMouseMove={handleMouseMove}
          >
            {/* Card Mouse Glow Overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(168, 85, 247, 0.06), transparent 80%)`
              }}
            />
            {/* Avatar row */}
            <div className="flex items-center gap-5 relative z-10">
              {/* Premium gradient avatar container with active beacon */}
              <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white font-heading relative overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #fcd34d 100%)' }}
                >
                  PL
                  {/* Subtle glare overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                </div>
                {/* Active Availability indicator */}
                <span className="absolute bottom-[-2px] right-[-2px] flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-neutral-950" />
                </span>
              </div>

              <div className="text-left">
                <h3 className="font-heading font-black text-2xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent leading-none tracking-tight">
                  Piyush Landge
                </h3>
                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  <span
                    className="inline-flex items-center gap-1.5 text-[0.65rem] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted transition-colors duration-300 group-hover:border-purple-500/30 group-hover:text-purple-400"
                  >
                    <Sparkles size={10} className="text-purple-500 animate-pulse" /> AI Engineer
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted transition-colors duration-300 group-hover:border-cyan-500/30 group-hover:text-cyan-400">
                    <MapPin size={10} className="text-cyan-500" /> Pune, India
                  </span>
                </div>
              </div>

              {/* Hire / contact pill — pushed right */}
              <a
                href="#contact"
                className="ml-auto hidden sm:inline-flex items-center gap-2 text-[0.7rem] font-bold px-4 py-2 rounded-full border border-white/10 text-text-secondary hover:text-white hover:border-white/25 transition-all duration-200 font-mono uppercase tracking-wider shrink-0"
              >
                <Mail size={12} /> Hire Me
              </a>
            </div>

            {/* Bio text */}
            <div className="font-sans text-text-secondary text-[0.95rem] leading-[1.85] text-left flex flex-col gap-3">
              <p>
                I'm an AI Engineer passionate about building intelligent, scalable solutions at the intersection of
                <strong className="text-white font-semibold"> Machine Learning, Deep Learning, Generative AI, </strong>
                and modern backend systems. My stack spans Python, TensorFlow, MongoDB, AWS, and cutting-edge LLM frameworks.
              </p>
              <p>
                Through internships and self-driven projects I've tackled predictive modelling, LLM-powered automation, 
                computer vision pipelines, and intelligent agent systems — always solving real-world challenges with clean, 
                production-ready code.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-7 mt-auto relative z-10">
              {/* Stat 1 */}
              <div className="text-center">
                <span
                  className="block font-mono font-extrabold text-3xl md:text-4xl text-white"
                  style={{ textShadow: '0 0 30px rgba(168,85,247,0.35)' }}
                >
                  3+
                </span>
                <span className="text-[0.6rem] font-bold uppercase tracking-widest text-text-muted block mt-1.5">
                  Yrs Learning
                </span>
              </div>
              {/* Stat 2 */}
              <a href="#projects" className="text-center group/stat hover:scale-[1.03] transition-transform duration-200 block">
                <span
                  className="block font-mono font-extrabold text-3xl md:text-4xl text-white group-hover/stat:text-purple-400 transition-colors"
                  style={{ textShadow: '0 0 30px rgba(168,85,247,0.35)' }}
                >
                  2+
                </span>
                <span className="text-[0.6rem] font-bold uppercase tracking-widest text-text-muted group-hover/stat:text-text-secondary block mt-1.5 transition-colors">
                  Projects Built
                </span>
              </a>
              {/* Stat 3 */}
              <a href="#experience" className="text-center group/stat hover:scale-[1.03] transition-transform duration-200 block">
                <span
                  className="block font-mono font-extrabold text-3xl md:text-4xl text-white group-hover/stat:text-cyan-400 transition-colors"
                  style={{ textShadow: '0 0 30px rgba(168,85,247,0.35)' }}
                >
                  4+
                </span>
                <span className="text-[0.6rem] font-bold uppercase tracking-widest text-text-muted group-hover/stat:text-text-secondary block mt-1.5 transition-colors">
                  Months Experience
                </span>
              </a>
            </div>
          </div>

          {/* ── Card 2 · Skills (tall column) ── */}
          <div
            id="skills"
            className="bento-card glass-card relative group overflow-hidden lg:col-span-1 lg:row-span-2 p-6 sm:p-7 flex flex-col gap-5 scroll-mt-24 rounded-3xl"
            onMouseMove={handleMouseMove}
          >
            {/* Card Mouse Glow Overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(99, 102, 241, 0.08), transparent 80%)`
              }}
            />
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <Code2 size={18} className="text-white" />
              <h3 className="font-heading font-black text-lg text-white">Tech Stack</h3>
            </div>

            <div className="flex flex-col gap-5 overflow-y-auto max-h-[620px] pr-1 scrollbar-none">
              {skillCategories.map((cat, i) => (
                <div key={i} className="flex flex-col gap-2.5 text-left">
                  {/* Category header */}
                  <div className="flex items-center gap-2">
                    <span
                      className="p-1.5 rounded-md flex items-center justify-center"
                      style={{ background: `${cat.color}18`, color: cat.color }}
                    >
                      {cat.icon}
                    </span>
                    <h4 className="text-[0.75rem] font-bold text-white tracking-wide">{cat.title}</h4>
                  </div>
                  {/* Skill pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, si) => (
                      <span
                        key={si}
                        className="text-[0.63rem] font-mono px-2 py-[3px] rounded-md transition-all duration-300 cursor-default hover:scale-[1.05] hover:border-current hover:bg-white/5"
                        style={{
                          background: `${cat.color}0d`,
                          border: `1px solid ${cat.color}22`,
                          color: cat.color,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Card 3 · Code Editor ── */}
          <div
            className="bento-card glass-card relative group lg:col-span-2 p-0 flex flex-col rounded-3xl overflow-hidden border border-white/5 h-[480px]"
            onMouseMove={handleMouseMove}
          >
            {/* Card Mouse Glow Overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(252, 211, 77, 0.05), transparent 80%)`
              }}
            />

            <div className="flex flex-1 overflow-hidden relative z-10 h-full">
              {/* 1. VS Code Activity Bar (leftmost sidebar) */}
              <div className="w-12 bg-[#0e0e12]/80 border-r border-white/5 flex flex-col justify-between items-center py-4 shrink-0 text-text-muted select-none">
                {/* Top icons */}
                <div className="flex flex-col gap-5 items-center w-full">
                  <button 
                    onClick={() => toggleSidebarTab('explorer')}
                    className={`hover:text-white cursor-pointer relative focus:outline-none transition-colors ${
                      activeSidebarTab === 'explorer' ? 'text-purple-400' : 'text-text-muted/60'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    {activeSidebarTab === 'explorer' && (
                      <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-purple-500 rounded-r" />
                    )}
                  </button>
                  <button 
                    onClick={() => toggleSidebarTab('search')}
                    className={`hover:text-white cursor-pointer relative focus:outline-none transition-colors ${
                      activeSidebarTab === 'search' ? 'text-purple-400' : 'text-text-muted/60'
                    }`}
                  >
                    <Search size={18} />
                    {activeSidebarTab === 'search' && (
                      <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-purple-500 rounded-r" />
                    )}
                  </button>
                  <button 
                    onClick={() => toggleSidebarTab('git')}
                    className={`hover:text-white cursor-pointer relative focus:outline-none transition-colors ${
                      activeSidebarTab === 'git' ? 'text-purple-400' : 'text-text-muted/60'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7a3 3 0 100-6 3 3 0 000 6zM8 7a7 7 0 1114 0c0 3.866-3.582 7-8 7M8 7V13a3 3 0 106 0v-6" />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-purple-500/80 text-white font-mono font-bold text-[0.5rem] w-3.5 h-3.5 rounded-full flex items-center justify-center scale-90">1</span>
                    {activeSidebarTab === 'git' && (
                      <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-purple-500 rounded-r" />
                    )}
                  </button>
                  <button 
                    onClick={() => toggleSidebarTab('run')}
                    className={`hover:text-white cursor-pointer relative focus:outline-none transition-colors ${
                      activeSidebarTab === 'run' ? 'text-purple-400' : 'text-text-muted/60'
                    }`}
                  >
                    <Play size={17} />
                    {activeSidebarTab === 'run' && (
                      <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-purple-500 rounded-r" />
                    )}
                  </button>
                </div>
                {/* Bottom icons */}
                <div className="flex flex-col gap-4 items-center w-full">
                  <button 
                    onClick={() => toggleSidebarTab('settings')}
                    className={`hover:text-white cursor-pointer relative focus:outline-none transition-colors ${
                      activeSidebarTab === 'settings' ? 'text-purple-400' : 'text-text-muted/60'
                    }`}
                  >
                    <Settings size={18} />
                    {activeSidebarTab === 'settings' && (
                      <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-purple-500 rounded-r" />
                    )}
                  </button>
                </div>
              </div>

              {/* 2. Interactive Sidebar Panel */}
              {activeSidebarTab && (
                <div className="w-56 bg-[#0c0c10]/95 border-r border-white/5 flex flex-col text-left py-3 px-3 shrink-0 font-sans select-none overflow-y-auto">
                  {/* Explorer Panel */}
                  {activeSidebarTab === 'explorer' && (
                    <div className="flex flex-col gap-3 h-full">
                      <div className="flex items-center justify-between pl-1">
                        <div className="text-[0.62rem] font-mono font-bold uppercase tracking-widest text-text-muted/70">Explorer</div>
                        <button 
                          onClick={() => setShowNewFileInput(!showNewFileInput)}
                          className="p-1 rounded hover:bg-white/5 text-text-muted hover:text-white transition-colors"
                          title="New File"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      {showNewFileInput && (
                        <form onSubmit={handleCreateFile} className="flex gap-1.5 mt-1">
                          <input 
                            type="text"
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            placeholder="filename.py"
                            autoFocus
                            className="bg-neutral-900 border border-white/10 rounded px-2 py-1 text-[0.68rem] font-mono text-white focus:outline-none focus:border-purple-500 flex-1"
                          />
                          <button 
                            type="submit"
                            className="p-1 rounded bg-purple-500 hover:bg-purple-600 text-white font-mono text-[0.68rem] font-bold"
                          >
                            Add
                          </button>
                        </form>
                      )}

                      <div className="flex flex-col gap-1 mt-2">
                        <div className="flex items-center gap-1.5 text-[0.68rem] font-bold text-white mb-2 pl-1 uppercase tracking-wide">
                          <svg className="w-3.5 h-3.5 text-purple-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                          Workspace
                        </div>
                        {filesList.map((file) => (
                          <div key={file} className="group flex items-center justify-between w-full rounded-md hover:bg-white/5 px-2">
                            <button
                              onClick={() => { setActiveTab(file); setCopied(false); }}
                              className={`flex items-center gap-1.5 py-1.5 text-[0.66rem] font-mono cursor-pointer transition-colors text-left flex-1 ${
                                activeTab === file
                                  ? 'text-purple-400 font-semibold'
                                  : 'text-text-secondary hover:text-white'
                              }`}
                            >
                              {file.endsWith('.py') ? (
                                <span className={activeTab === file ? 'text-purple-400' : 'text-blue-400 font-bold'}>py</span>
                              ) : file.endsWith('.md') ? (
                                <span className={activeTab === file ? 'text-purple-400' : 'text-purple-400 font-bold'}>md</span>
                              ) : (
                                <span className="text-amber-400 font-bold">txt</span>
                              )}
                              <span className="truncate max-w-[120px]">{file}</span>
                            </button>
                            {file !== 'attention_layer.py' && file !== 'model_eval.py' && file !== 'README.md' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const nextFiles = filesList.filter(f => f !== file);
                                  setFilesList(nextFiles);
                                  if (activeTab === file) {
                                    setActiveTab(nextFiles[0] || 'README.md');
                                  }
                                }}
                                className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-text-muted hover:text-red-400 hover:bg-white/5 transition-all text-[0.65rem] font-bold"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search Panel */}
                  {activeSidebarTab === 'search' && (
                    <div className="flex flex-col gap-3 h-full">
                      <div className="text-[0.62rem] font-mono font-bold uppercase tracking-widest text-text-muted/70 pl-1">Search Workspace</div>
                      <div className="relative">
                        <input 
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search text..."
                          className="bg-neutral-900 border border-white/10 rounded-md pl-7 pr-2.5 py-1.5 text-[0.68rem] font-mono text-white focus:outline-none focus:border-purple-500 w-full"
                        />
                        <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted/70" />
                      </div>
                      
                      <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 mt-2 max-h-[300px] pr-1">
                        {searchQuery.trim() ? (
                          getSearchResults().length > 0 ? (
                            getSearchResults().map((res, index) => (
                              <button
                                key={index}
                                onClick={() => { setActiveTab(res.file); }}
                                className="text-left p-1.5 rounded bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all w-full flex flex-col gap-1 cursor-pointer"
                              >
                                <div className="flex items-center justify-between text-[0.6rem] font-mono font-bold text-purple-400">
                                  <span className="truncate max-w-[120px]">{res.file}</span>
                                  <span>Line {res.lineNumber}</span>
                                </div>
                                <div className="text-[0.62rem] font-mono text-text-secondary truncate leading-tight">
                                  {res.content}
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="text-[0.65rem] font-mono text-text-muted/50 text-center py-4">No results found</div>
                          )
                        ) : (
                          <div className="text-[0.65rem] font-mono text-text-muted/50 text-center py-4">Type to search lines</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Git Panel */}
                  {activeSidebarTab === 'git' && (
                    <div className="flex flex-col gap-3 h-full">
                      <div className="text-[0.62rem] font-mono font-bold uppercase tracking-widest text-text-muted/70 pl-1">Source Control</div>
                      
                      <div className="flex flex-col gap-1 mt-1 pl-1">
                        <div className="text-[0.65rem] font-semibold text-white mb-2 flex items-center gap-1.5">
                          <GitBranch size={11} className="text-purple-400" />
                          Branch: <span className="font-mono text-purple-300">main*</span>
                        </div>
                        <div className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider mb-1">Staged Changes (0)</div>
                        <div className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider mb-2">Changes ({filesList.length})</div>
                        
                        <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                          {filesList.map(file => (
                            <div key={file} className="flex items-center justify-between text-[0.66rem] font-mono text-text-secondary pl-1 py-0.5">
                              <span className="truncate max-w-[140px]">{file}</span>
                              <span className="text-[0.6rem] font-bold font-mono px-1 rounded bg-amber-500/10 text-amber-400">M</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-white/5">
                        <textarea
                          value={commitMessage}
                          onChange={(e) => setCommitMessage(e.target.value)}
                          placeholder="Commit message..."
                          rows="3"
                          className="bg-neutral-900 border border-white/10 rounded-md p-2 text-[0.68rem] font-mono text-white placeholder-text-muted/60 focus:outline-none focus:border-purple-500 w-full resize-none"
                        />
                        <button
                          onClick={() => {
                            if (!commitMessage.trim()) return;
                            const msg = commitMessage.trim();
                            setShowConsole(true);
                            setIsRunning(true);
                            setConsoleLogs(p => [...p, 
                              `GIT: git add .`,
                              `GIT: git commit -m "${msg}"`,
                              `GIT: [main ${Math.random().toString(16).substr(2, 7)}] ${msg}`,
                              `GIT: git push origin main`,
                              `GIT: Uploading objects... 100%`,
                              `GIT: Pushed to origin/main successfully!`
                            ]);
                            setCommitMessage('');
                            setTimeout(() => {
                              setIsRunning(false);
                            }, 800);
                          }}
                          disabled={!commitMessage.trim() || isRunning}
                          className="flex items-center justify-center gap-1.5 py-1.5 rounded bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white text-[0.68rem] font-bold uppercase font-mono cursor-pointer transition-colors"
                        >
                          <GitBranch size={11} />
                          Commit &amp; Push
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Run Configurations Panel */}
                  {activeSidebarTab === 'run' && (
                    <div className="flex flex-col gap-4 h-full">
                      <div className="text-[0.62rem] font-mono font-bold uppercase tracking-widest text-text-muted/70 pl-1">Run Configurations</div>
                      
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[0.66rem] font-mono">
                          <span className="text-text-secondary">Attention Heads</span>
                          <span className="text-purple-400 font-bold">{headsVal}</span>
                        </div>
                        <input 
                          type="range"
                          min="1"
                          max="16"
                          step="1"
                          value={headsVal}
                          onChange={(e) => setHeadsVal(parseInt(e.target.value))}
                          className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[0.66rem] font-mono">
                          <span className="text-text-secondary">d_model (Dim)</span>
                          <span className="text-purple-400 font-bold">{dModelVal}</span>
                        </div>
                        <input 
                          type="range"
                          min="128"
                          max="1024"
                          step="64"
                          value={dModelVal}
                          onChange={(e) => setDModelVal(parseInt(e.target.value))}
                          className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="p-2.5 rounded bg-white/5 border border-white/5 flex flex-col gap-1.5 text-left">
                        <div className="text-[0.6rem] font-mono font-bold text-text-muted uppercase tracking-wider">Est. Performance</div>
                        <div className="flex justify-between text-[0.64rem] font-mono">
                          <span className="text-text-secondary">Latency:</span>
                          <span className="text-white font-bold">{(1.2 + (headsVal * 0.12) + (dModelVal / 512) * 0.8).toFixed(2)}ms</span>
                        </div>
                        <div className="flex justify-between text-[0.64rem] font-mono">
                          <span className="text-text-secondary">Peak VRAM:</span>
                          <span className="text-white font-bold">{(4.5 + (dModelVal / 512) * 8.5 + (headsVal * 0.2)).toFixed(1)}MB</span>
                        </div>
                      </div>

                      <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="flex items-center justify-center gap-1.5 py-1.5 rounded bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-[0.68rem] font-bold uppercase font-mono cursor-pointer transition-colors mt-auto"
                      >
                        <Play size={11} fill="currentColor" />
                        Run Target
                      </button>
                    </div>
                  )}

                  {/* Settings Panel */}
                  {activeSidebarTab === 'settings' && (
                    <div className="flex flex-col gap-4 h-full">
                      <div className="text-[0.62rem] font-mono font-bold uppercase tracking-widest text-text-muted/70 pl-1">Settings</div>
                      
                      <div className="flex items-center justify-between text-[0.68rem] font-mono py-1">
                        <span className="text-text-secondary">Line Numbers</span>
                        <button
                          onClick={() => setShowLineNumbers(!showLineNumbers)}
                          className={`w-8 h-4 rounded-full p-px transition-colors ${
                            showLineNumbers ? 'bg-purple-500' : 'bg-white/10'
                          } flex items-center justify-${showLineNumbers ? 'end' : 'start'} cursor-pointer`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-white shadow-md inline-block" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[0.68rem] font-mono py-1">
                        <span className="text-text-secondary">Terminal Console</span>
                        <button
                          onClick={() => setShowConsole(!showConsole)}
                          className={`w-8 h-4 rounded-full p-px transition-colors ${
                            showConsole ? 'bg-purple-500' : 'bg-white/10'
                          } flex items-center justify-${showConsole ? 'end' : 'start'} cursor-pointer`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-white shadow-md inline-block" />
                        </button>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[0.68rem] font-mono">
                          <span className="text-text-secondary">Font Size</span>
                          <span className="text-purple-400 font-bold">{editorFontSize}px</span>
                        </div>
                        <input 
                          type="range"
                          min="10"
                          max="16"
                          step="1"
                          value={editorFontSize}
                          onChange={(e) => setEditorFontSize(parseInt(e.target.value))}
                          className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <span className="text-[0.68rem] font-mono text-text-secondary">Color Theme</span>
                        <select
                          value={editorTheme}
                          onChange={(e) => setEditorTheme(e.target.value)}
                          className="bg-neutral-900 border border-white/10 rounded-md px-2 py-1.5 text-[0.68rem] font-mono text-white focus:outline-none focus:border-purple-500 cursor-pointer w-full"
                        >
                          <option value="one-dark">One Dark Pro</option>
                          <option value="monokai">Monokai</option>
                          <option value="dracula">Dracula</option>
                          <option value="github-dark">GitHub Dark</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Main Editor Panel */}
              <div className="flex-1 flex flex-col overflow-hidden h-full">
                {/* Editor Tab Bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/60 border-b border-white/5 shrink-0 select-none">
                  <div className="flex items-center gap-4">
                    {/* Traffic lights */}
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    {/* Tabs */}
                    <div className="flex gap-1 text-[0.67rem] font-mono font-bold">
                      {filesList.map((tab) => (
                        <button
                          key={tab}
                          onClick={() => { setActiveTab(tab); setCopied(false); }}
                          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                            activeTab === tab
                              ? 'bg-neutral-800 text-white border-b-2 border-purple-500'
                              : 'text-text-muted hover:text-white'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-white/5 text-text-muted hover:text-white transition-all cursor-pointer text-[0.65rem] font-mono font-bold"
                    >
                      {copied ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                      {copied ? 'COPIED' : 'COPY'}
                    </button>
                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white text-black hover:bg-neutral-200 transition-all cursor-pointer text-[0.65rem] font-bold font-mono disabled:opacity-50"
                    >
                      <Play size={11} fill="currentColor" />
                      {isRunning ? 'RUNNING…' : 'RUN'}
                    </button>
                  </div>
                </div>

                {/* Editor Content Area */}
                <div className={`flex-1 flex overflow-hidden ${themes[editorTheme]?.bg || 'bg-[#121214]/10'}`}>
                  {/* Line Numbers Column */}
                  {showLineNumbers && (
                    <div className="py-5 pl-4 pr-2.5 text-right select-none font-mono text-[0.79rem] leading-relaxed text-text-muted/30 border-r border-white/5 bg-[#0f0f12]/20 min-w-[2.5rem] shrink-0">
                      {Array.from({ length: getActiveCode().split('\n').length }, (_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                  )}

                  {/* Code editor body */}
                  <div 
                    className="p-5 overflow-auto text-left font-mono leading-relaxed flex-1 select-text custom-scrollbar"
                    style={{ fontSize: `${editorFontSize}px` }}
                  >
                    {renderCodeLines()}
                  </div>
                </div>

                {/* Console drawer */}
                {showConsole && (
                  <div className="border-t border-white/5 bg-neutral-950/70 p-4 font-mono text-[0.7rem] text-left shrink-0 relative z-10">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                      <span className="text-white font-bold flex items-center gap-1.5 text-[0.7rem]">
                        <Terminal size={12} /> TERMINAL OUTPUT
                      </span>
                      <button
                        onClick={() => setShowConsole(false)}
                        className="text-text-muted hover:text-white text-[0.6rem] uppercase tracking-wider cursor-pointer"
                      >
                        ✕ Close
                      </button>
                    </div>
                    <div className="flex flex-col gap-1 text-text-secondary select-text max-h-24 overflow-y-auto scrollbar-none font-mono">
                      {consoleLogs.map((log, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-green-500 font-bold select-none shrink-0">›</span>
                          <span className="select-text whitespace-pre-wrap">{log}</span>
                        </div>
                      ))}
                      {isRunning && (
                        <div className="text-text-muted animate-pulse flex items-center gap-1.5 select-none">
                          <Cpu size={11} className="animate-spin" /> Computing graph tensors...
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Status Bar */}
                <div className="px-4 py-1.5 bg-neutral-900/50 border-t border-white/5 flex items-center justify-between shrink-0 relative z-10 select-none">
                  <span className="text-[0.6rem] font-mono text-text-muted flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                      {activeTab.endsWith('.py') ? 'Python' : activeTab.endsWith('.md') ? 'Markdown' : 'Plain Text'}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      <GitBranch size={11} className="text-text-muted/80" />
                      main*
                    </span>
                    <span>·</span>
                    <span>PyTorch 2.x</span>
                  </span>
                  <span className="text-[0.6rem] font-mono text-text-muted">
                    Ln {getActiveCode().split('\n').length}, Col 1
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Card 4 · Education & Experience (full width) ── */}
          <div
            id="experience"
            className="bento-card glass-card relative group overflow-hidden lg:col-span-3 p-7 md:p-10 flex flex-col scroll-mt-24 rounded-3xl"
            onMouseMove={handleMouseMove}
          >
            {/* Card Mouse Glow Overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(800px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(34, 211, 238, 0.05), transparent 80%)`
              }}
            />
            <div className="mb-8 text-left">
              <h3 className="font-heading font-black text-2xl text-white mb-1">Education &amp; Experience</h3>
              <p className="text-sm text-text-muted font-sans">Academic background and professional milestones</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

              {/* Experience */}
              <div className="flex flex-col gap-2">
                <h4 className="font-heading font-bold text-[0.72rem] uppercase tracking-widest flex items-center gap-2 mb-4 text-text-muted">
                  <Briefcase size={13} /> Professional Milestones
                </h4>
                <div className="flex flex-col gap-8 pl-1">
                  {experienceEvents.map((event, idx) => (
                    <div key={idx} className="relative pl-7 border-l border-white/8 text-left">
                      {/* Coloured node */}
                      <div
                        className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full border-2 border-current flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ 
                          color: event.color, 
                          background: `${event.color}20`,
                          boxShadow: `0 0 12px ${event.color}80` 
                        }}
                      >
                        <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: event.color }} />
                      </div>

                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[0.62rem] font-mono font-bold text-text-muted uppercase tracking-wide">
                          {event.period}
                        </span>
                        {event.duration && (
                          <span
                            className="text-[0.58rem] font-mono font-bold px-1.5 py-px rounded"
                            style={{ background: `${event.color}18`, color: event.color }}
                          >
                            {event.duration}
                          </span>
                        )}
                      </div>

                      <h5 className="text-[1rem] font-black text-white leading-tight mb-0.5">{event.role}</h5>
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="text-xs font-bold text-text-muted">{event.company}</span>
                        {event.type && (
                          <span className="text-[0.6rem] font-mono text-text-muted bg-white/5 px-1.5 py-px rounded">
                            {event.type}
                          </span>
                        )}
                      </div>

                      <ul className="text-xs text-text-secondary leading-relaxed flex flex-col gap-2 list-none font-sans">
                        {event.details.map((d, di) => (
                          <li key={di} className="relative pl-4 text-text-secondary hover:text-text-primary transition-colors duration-200 before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-1 before:h-1 before:rounded-full before:transition-all before:duration-300 before:bg-white/30 hover:before:bg-indigo-400 hover:before:scale-[1.5]">
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="flex flex-col gap-2">
                <h4 className="font-heading font-bold text-[0.72rem] uppercase tracking-widest flex items-center gap-2 mb-4 text-text-muted">
                  <GraduationCap size={13} /> Academic Background
                </h4>
                <div className="flex flex-col gap-8 pl-1">
                  {educationEvents.map((event, idx) => (
                    <div key={idx} className="relative pl-7 border-l border-white/8 text-left">
                      {/* Coloured node */}
                      <div
                        className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full border-2 border-current flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ 
                          color: event.color, 
                          background: `${event.color}20`,
                          boxShadow: `0 0 12px ${event.color}80` 
                        }}
                      >
                        <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: event.color }} />
                      </div>

                      <span className="text-[0.62rem] font-mono font-bold text-text-muted uppercase tracking-wide block mb-1">
                        {event.period}
                      </span>
                      <h5 className="text-[1rem] font-black text-white leading-tight mb-0.5">{event.degree}</h5>
                      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                        <span className="text-xs font-bold text-text-muted">{event.institution}</span>
                        {event.grade && (
                          <span
                            className="text-[0.6rem] font-mono font-bold px-1.5 py-px rounded"
                            style={{ background: `${event.color}18`, color: event.color }}
                          >
                            {event.grade}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed font-sans">{event.details}</p>
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
