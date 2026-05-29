import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Terminal as TermIcon } from 'lucide-react';
import NeuralNetworkCanvas from '../components/NeuralNetworkCanvas';

export default function Hero() {
  const [logs, setLogs] = useState([]);
  const consoleContainerRef = useRef(null);

  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    const initialMessages = [
      "SYSTEM: Booting PiyushGPT v1.5.0-neural...",
      "CRITICAL: Allocating GPU tensor cores (8x A100-SXM4)...",
      "SYSTEM: Custom model weights loaded. (latency: 12ms)",
      "DIAGNOSTIC: Local VRAM status stable. (76.2GB/80GB)",
      "ROUTING: Mapping local vector embeddings (dim: 1536)...",
      "SWARM: Initializing Multi-Agent attention matrices...",
      "READY: Synaptic link established. Awaiting query..."
    ];

    const logTemplates = [
      // AI Diagnostics
      "DIAGNOSTIC: Running cognitive agent loop...",
      "NODE_04: Transmitting state tensors...",
      "OPTIMIZER: Loss → 0.042. Adapting lr to 1.2e-4...",
      "EMBEDDINGS: Query distance computed. (8ms, dim=1536)",
      "AGENT: Querying vector store — top_k=5, threshold=0.84",
      "SYSTEM: Memory at 78.4%. Running garbage collection...",
      "API: Webhook POST /infer — Status: 200 OK (23ms)",
      "SECURITY: Unauthorized token rejected. IP flagged.",
      "VECTOR: HNSW index rebuild complete. 2.4M docs indexed.",
      "LLM: Prompt tokens: 1,842 | Completion: 512 | $0.0031",
      "SWARM: Agent-3 responding to task #289B → COMPLETE",
      "TRAINING: Step 4200/10000. loss=0.031 acc=97.2%",
      "CACHE: Semantic cache hit. Skipping inference. (↑89.4%)",
      "SYNAPSE: Gradient norm 0.124. Clipping applied.",
      // Python REPL
      ">>> import torch; torch.cuda.is_available()",
      "True",
      ">>> model = SynapticAttention(heads=8, d_model=512).cuda()",
      ">>> x = torch.randn(1, 64, 512).cuda()",
      ">>> out = model(x, x, x); out.shape",
      "torch.Size([1, 64, 512])",
      ">>> import numpy as np; np.random.seed(42)",
      ">>> loss = torch.nn.CrossEntropyLoss()(out[0], torch.zeros(64).long().cuda())",
      ">>> loss.item()",
      "6.2187",
      ">>> optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4)",
      ">>> from transformers import pipeline",
      ">>> nlp = pipeline('text-generation', model='gpt2')",
      ">>> nlp('Piyush is an AI engineer who')[0]['generated_text']",
      ">>> from sklearn.metrics import accuracy_score",
      ">>> print(f'Accuracy: {accuracy_score(y_true, y_pred):.4f}')",
      "Accuracy: 0.9724",
      ">>> import pandas as pd; df = pd.read_csv('dataset.csv')",
      ">>> df.shape",
      "(128000, 47)",
    ];

    let currentLine = 0;
    let currentChar = 0;
    let currentText = "";
    let isCancelled = false;
    let isLineStarted = false;

    const typeChar = () => {
      if (isCancelled) return;

      let targetText = "";
      if (currentLine < initialMessages.length) {
        targetText = initialMessages[currentLine];
      } else {
        const idx = Math.floor(Math.random() * logTemplates.length);
        targetText = logTemplates[idx];
      }

      if (!isLineStarted) {
        setLogs(prev => {
          const next = [...prev, ""];
          if (next.length > 20) {
            next.shift();
          }
          return next;
        });
        isLineStarted = true;
      }

      if (currentChar < targetText.length) {
        currentText += targetText[currentChar];
        setLogs(prev => {
          const next = [...prev];
          next[next.length - 1] = currentText;
          return next;
        });
        currentChar++;
        setTimeout(typeChar, 20); // 20ms per character
      } else {
        currentLine++;
        currentChar = 0;
        currentText = "";
        isLineStarted = false;

        const delay = currentLine < initialMessages.length ? 200 : 900;
        setTimeout(typeChar, delay);
      }
    };

    typeChar();

    return () => {
      isCancelled = true;
    };
  }, []);



  return (
    <section id="home" className="min-h-screen flex items-center relative pt-[100px] overflow-hidden bg-bg-primary">

      {/* Background Ambience */}
      <div className="ambient-glow glow-purple"></div>
      <div className="ambient-glow glow-cyan"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side: Content */}
        <div className="flex flex-col items-start text-left lg:text-left max-lg:items-center max-lg:text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border-color/50 rounded-full font-mono text-[0.75rem] font-semibold text-accent-cyan mb-6 cyber-badge">
            <span className="relative w-2.5 h-2.5 rounded-full bg-accent-green">
              <span className="absolute left-0 top-0 w-full h-full rounded-full bg-accent-green animate-ping"></span>
            </span>
            Available for Opportunity
          </div>
          
          <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-[4rem] leading-none tracking-tight text-text-primary mb-3">
            Piyush <span className="bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">Landge</span>
          </h1>

          <h2 className="font-heading font-bold text-[0.8rem] sm:text-[0.9rem] text-accent-cyan tracking-wider mb-6 uppercase max-w-[580px] leading-relaxed">
            AI Engineer | Machine Learning Engineer | Generative AI | NLP | Computer Vision | Python | AWS
          </h2>
          
          <p className="font-sans text-base md:text-lg text-text-secondary mb-8 max-w-[580px] leading-relaxed">
            AI Engineer passionate about designing intelligent systems using Machine Learning, Generative AI, and Deep Learning technologies to create innovative, scalable, and business-focused solutions. 🚀
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-col gap-3 font-mono text-[0.8rem] text-text-secondary/90 mb-10 w-full text-left max-lg:items-center">
            <div className="flex items-center gap-2.5">
              <span className="text-base select-none">📍</span>
              <span className="tracking-wide">Pune, Maharashtra, India</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-base select-none">💼</span>
              <span className="tracking-wide">AI Engineer Intern – Applogix Solutions</span>
            </div>
          </div>
          
          <div className="flex gap-4 flex-wrap max-lg:justify-center">
            <a href="#projects" className="btn btn-primary bg-gradient-to-r from-accent-purple to-accent-cyan text-white px-7 py-3.5 rounded-xl font-heading font-semibold inline-flex items-center gap-2 hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(40,116,255,0.45)] transition-all duration-300 cyber-btn-glow">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="/resume.pdf" download className="btn btn-secondary bg-bg-secondary border border-border-color/60 text-text-primary px-7 py-3.5 rounded-xl font-heading font-semibold inline-flex items-center gap-2 hover:bg-border-color/30 hover:border-accent-cyan hover:translate-y-[-2px] transition-all duration-300">
              Download CV
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Visual Graphic */}
        <div className="flex justify-center items-center relative w-full h-[400px] md:h-[450px]">
          {/* Animated Canvas behind the console */}
          <div className="absolute w-[110%] h-[110%] rounded-full opacity-60 z-0">
            <NeuralNetworkCanvas />
          </div>

          {/* Elegant Cyber Diagnostic Console Overlay */}
          <div className="w-full max-w-[420px] h-[340px] glass-card rounded-2xl border border-border-color/40 shadow-2xl flex flex-col overflow-hidden text-left font-mono text-[0.8rem] text-text-secondary scanline z-10">
            {/* Console Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/45 border-b border-border-color/30">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
              </div>
              <span className="text-[0.65rem] text-text-muted uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <TermIcon size={12} className="text-accent-cyan" /> TERMINAL://PIYUSHGPT.CORE
              </span>
            </div>
            
            {/* Console Output Log */}
            <div 
              ref={consoleContainerRef}
              className="p-5 flex-grow flex flex-col gap-2.5 overflow-y-auto bg-black/20 select-text cursor-text"
            >
              {logs.map((log, idx) => {
                const isCurrent = idx === logs.length - 1;
                return (
                  <div key={idx} className="leading-relaxed select-text flex items-start gap-1.5">
                    <span className="text-accent-cyan select-text">&gt;</span>{' '}
                    <span className="select-text">
                      {log}
                      {isCurrent && <span className="terminal-cursor select-none"></span>}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Console Footer */}
            <div className="px-5 py-2.5 bg-black/45 border-t border-border-color/30 flex justify-between text-[0.65rem] text-text-muted select-none">
              <span className="flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span> RATIO: 1.00
              </span>
              <span>COGNITIVE LOAD: 8%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
