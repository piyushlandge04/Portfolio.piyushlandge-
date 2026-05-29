import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Cpu, Zap, RotateCcw, Terminal, ArrowRight } from 'lucide-react';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'System initialized. I am **NEXUS-9**, a cognitive portfolio agent. Ask me about Piyush\'s skills, projects, background, or let me auto-fill your hire form!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiMode, setAiMode] = useState('technical'); // technical, sarcastic, pirate
  const [hasPromptApi, setHasPromptApi] = useState(false);
  const [promptSession, setPromptSession] = useState(null);
  
  // Draggable widget states
  const [customPosition, setCustomPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panelRef = useRef(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Drag handler logic
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Left click only
    if (e.target.closest('button')) return; // Skip buttons

    setIsDragging(true);
    const rect = panelRef.current?.getBoundingClientRect();
    if (rect) {
      dragStart.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    if (e.target.closest('button')) return; // Skip buttons

    setIsDragging(true);
    const rect = panelRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      dragStart.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;
      
      const maxX = window.innerWidth - (panelRef.current?.offsetWidth || 400);
      const maxY = window.innerHeight - (panelRef.current?.offsetHeight || 550);
      
      setCustomPosition({
        x: Math.max(0, Math.min(maxX, newX)),
        y: Math.max(0, Math.min(maxY, newY))
      });
    };

    const handleTouchMove = (e) => {
      if (!e.touches[0]) return;
      const newX = e.touches[0].clientX - dragStart.current.x;
      const newY = e.touches[0].clientY - dragStart.current.y;
      
      const maxX = window.innerWidth - (panelRef.current?.offsetWidth || 400);
      const maxY = window.innerHeight - (panelRef.current?.offsetHeight || 550);
      
      setCustomPosition({
        x: Math.max(0, Math.min(maxX, newX)),
        y: Math.max(0, Math.min(maxY, newY))
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleResize = () => {
      if (!customPosition) return;
      const maxX = window.innerWidth - (panelRef.current?.offsetWidth || 400);
      const maxY = window.innerHeight - (panelRef.current?.offsetHeight || 550);
      
      setCustomPosition(prev => {
        if (!prev) return null;
        return {
          x: Math.max(0, Math.min(maxX, prev.x)),
          y: Math.max(0, Math.min(maxY, prev.y))
        };
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [customPosition]);

  // Check for Chrome Prompt API availability
  useEffect(() => {
    const checkApi = async () => {
      if (typeof window !== 'undefined' && 'ai' in window && 'languageModel' in window.ai) {
        try {
          const availability = await window.ai.languageModel.availability();
          if (availability !== 'unavailable') {
            setHasPromptApi(true);
          }
        } catch (e) {
          console.warn('Prompt API check failed, falling back to simulator:', e);
        }
      }
    };
    checkApi();
  }, []);

  // Clean up AI session on unmount
  useEffect(() => {
    return () => {
      if (promptSession) {
        try {
          promptSession.destroy();
        } catch (e) {
          console.error(e);
        }
      }
    };
  }, [promptSession]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  // Auto-fill form helper
  const handleAutoFillForm = () => {
    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        content: '⚡ Auto-fill Contact Form',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    
    setIsTyping(true);
    
    setTimeout(() => {
      // Find elements
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const msgInput = document.getElementById('message');
      const contactSection = document.getElementById('contact');

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }

      if (nameInput && emailInput && msgInput) {
        try {
          nameInput.classList.add('auto-filled-highlight');
          emailInput.classList.add('auto-filled-highlight');
          msgInput.classList.add('auto-filled-highlight');

          setTimeout(() => {
            nameInput.classList.remove('auto-filled-highlight');
            emailInput.classList.remove('auto-filled-highlight');
            msgInput.classList.remove('auto-filled-highlight');
          }, 1800);

          // React-friendly state trigger
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
          nativeInputValueSetter.call(nameInput, "Nexus AI Team");
          nameInput.dispatchEvent(new Event('input', { bubbles: true }));

          nativeInputValueSetter.call(emailInput, "recruiter@nexus-ai.com");
          emailInput.dispatchEvent(new Event('input', { bubbles: true }));

          const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
          const templateMsg = "Hi Piyush!\n\nI triggered this message from your NEXUS-9 AI widget. We'd love to consult with you on building high-performance cognitive interfaces and multi-agent systems. Let's schedule a session.";
          nativeTextAreaValueSetter.call(msgInput, templateMsg);
          msgInput.dispatchEvent(new Event('input', { bubbles: true }));
          
          setMessages(prev => [
            ...prev,
            {
              role: 'assistant',
              content: '✅ **System Uplink established!** I have scrolled you down to the contact section and pre-filled the form with a creative consultation inquiry template. You can review and click **Send Message**.',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        } catch (e) {
          setMessages(prev => [
            ...prev,
            {
              role: 'assistant',
              content: '⚠️ Form found, but was unable to auto-inject state programmatically. Please scroll down manually to fill it!',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }
      } else {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: '⚠️ Contact form inputs could not be mapped. Make sure you are on the main portfolio page.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
      setIsTyping(false);
    }, 1000);
  };

  // Helper to start the Prompt API session
  const initPromptSession = async (mode) => {
    let systemPrompt = `You are NEXUS-9, a futuristic AI agent answering questions for the developer Piyush Landge (also known as Piyush). Respond concisely, using bold text, list bullet points, and markdown spacing where appropriate. 
    Piyush is an AI Engineer passionate about designing intelligent systems using Machine Learning, Generative AI, and Deep Learning technologies to create innovative, scalable, and business-focused solutions.
    Tech stack: AI & Machine Learning (Artificial Intelligence (AI), Machine Learning (ML), Deep Learning, Generative AI, Agentic AI, Large Language Models (LLMs), Prompt Engineering), Programming & Libraries (Python, SQL, MongoDB, TensorFlow, Scikit-Learn, Pandas, NumPy, Flask), Data Science & Analytics (Data Analysis, Data Visualization, Statistics, Feature Engineering, Time Series Forecasting, Tableau, Power BI), NLP & Computer Vision (Natural Language Processing (NLP), Sentiment Analysis, Computer Vision, OpenCV, Object Detection), Cloud & Tools (AWS, Azure, Git, GitHub, VS Code, Antigravity, Model Deployment), AI Tools & Assistants (ChatGPT, Claude, Gemini, Perplexity AI, GitHub Copilot).
    Experience Timeline: Applogix Solutions (AI Intern, Apr 2026 – Present; AI Project Intern, Feb 2026 – Mar 2026).
    Education Timeline: B.Sc. Computer Science at B.K. Birla College, Kalyan (2023 – 2026, CGPA 8.00), HSC at D.D.S.P. College, Erandol, Jalgaon (2022 – 2023).
    Certificates: Neural Networks & Deep Learning (DeepLearning.AI), Professional Cloud Machine Learning (Google Cloud), Advanced AI Application Developer (Meta), Data Systems & Backend Architecture (IBM).
    Projects: 1. AI Flyer Designer (Intelligent creative suite for generating visual flyers with GenAI). 2. AI Chatbot (LLM-powered conversational agent with semantic routing). 3. Personal Portfolio Website (This glassmorphic portfolio site with bento layout and custom terminal).
    Contact details: Email: piyushlandge4444@gmail.com, LinkedIn: https://www.linkedin.com/in/piyushlandge04/, Location: Pune, Maharashtra. Phone: +91 87 67 87 8004.`;

    if (mode === 'sarcastic') {
      systemPrompt += ` You must respond with witty, sarcastic, and slightly cheeky answers, while still giving correct information.`;
    } else if (mode === 'pirate') {
      systemPrompt += ` You must talk like a space pirate! Use cybernetic-nautical jargon, say 'Ahoy matey', 'Arrr', 'Cyber-plunder', and refer to coding as 'steering the ship' or 'rigging the digital sails'.`;
    } else {
      systemPrompt += ` Respond as a highly professional, helpful, futuristic AI system.`;
    }

    try {
      const session = await window.ai.languageModel.create({
        systemPrompt: systemPrompt
      });
      setPromptSession(session);
      return session;
    } catch (e) {
      console.error('Failed to create Prompt API session:', e);
      return null;
    }
  };

  // Simulator fallback responses
  const getSimulatedResponse = (text, mode) => {
    const normalized = text.toLowerCase();
    
    // Core details database
    const db = {
      skills: 'Piyush commands a robust, modern intelligence stack:\n\n• **AI & Machine Learning**: Artificial Intelligence (AI), Machine Learning (ML), Deep Learning, Generative AI, Agentic AI, Large Language Models (LLMs), Prompt Engineering\n• **Programming & Libraries**: Python, SQL, MongoDB, TensorFlow, Scikit-Learn, Pandas, NumPy, Flask\n• **Data Science & Analytics**: Data Analysis, Data Visualization, Statistics, Feature Engineering, Time Series Forecasting, Tableau, Power BI\n• **NLP & Computer Vision**: Natural Language Processing (NLP), Sentiment Analysis, Computer Vision, OpenCV, Object Detection\n• **Cloud & Tools**: AWS, Azure, Git, GitHub, VS Code, Antigravity, Model Deployment\n• **AI Tools & Assistants**: ChatGPT, Claude, Gemini, Perplexity AI, GitHub Copilot',
      projects: 'Piyush\'s portfolio features three flagship projects:\n\n1. **AI Flyer Designer**: Intelligent creative suite that generates customized visual flyers and marketing assets using Generative AI.\n2. **AI Chatbot**: Context-aware conversational chatbot powered by LLMs with semantic routing and prompt caching.\n3. **Personal Portfolio Website**: Premium glassmorphic bento-grid website with terminal simulation and an AI chat assistant (this site!).',
      certificates: 'Piyush\'s verified system certifications & clearances:\n\n• **Neural Networks & Deep Learning** (DeepLearning.AI) · ID: `DL-AI-99824X`\n• **Professional Cloud Machine Learning** (Google Cloud) · ID: `GCP-ML-77215B`\n• **Advanced AI Application Developer** (Meta) · ID: `META-AI-44211A`\n• **Data Systems & Backend Architecture** (IBM) · ID: `IBM-DB-33019C`',
      contact: 'Connect with Piyush directly:\n\n• 📧 **Email**: [piyushlandge4444@gmail.com](mailto:piyushlandge4444@gmail.com)\n• 🔗 **LinkedIn**: [Piyush Landge](https://www.linkedin.com/in/piyushlandge04/)\n• 📍 **Location**: Pune, Maharashtra\n• 📱 **Phone**: +91 87 67 87 8004\n\nOr click the **⚡ Auto-Fill** button to draft a quick inquiry!',
      joke: 'Why did the neural network go to therapy?\n\nBecause it had too many hidden layers and was experiencing high cognitive bias!',
      experience: 'Piyush\'s operational milestones:\n\n• **AI Intern** | Applogix Solutions (Apr 2026 – Present)\n• **AI Project Intern** | Applogix Solutions (Feb 2026 – Mar 2026)\n\nEducation:\n\n• **B.Sc. Computer Science** | B.K. Birla College, Kalyan (2023 – 2026) · CGPA: 8.00\n• **HSC** | D.D.S.P. College, Erandol, Jalgaon (2022 – 2023)',
      trivia: 'Let\'s run a cognitive benchmark!\n\n**Question**: Which CSS pseudo-class matches a parent element based on its descendants/state?\n\n• Type **1** for `:has()`\n• Type **2** for `:focus-within`\n• Type **3** for `:parent`',
      ans1: '🎉 **Correct!** `:has()` is the relational pseudo-class, often dubbed the "parent selector". It lets you style an element based on whether it contains matching children! A core tool in cognitive interface layouts.',
      ans2: '❌ Close! `:focus-within` matches an element if it or any of its children have focus. But the correct relational parent selector is `:has()`.',
      ans3: '❌ Incorrect. There is no native CSS `:parent` pseudo-class. The actual parent selector is `:has()`.',
      default: 'I received your query. Piyush is currently online and available for freelance neural architectural design or full-stack engineering roles. You can contact him at **piyushlandge4444@gmail.com**.'
    };

    let reply = '';
    
    // Check keywords
    if (normalized.includes('stack') || normalized.includes('skill') || normalized.includes('tech') || normalized.includes('code')) {
      reply = db.skills;
    } else if (normalized.includes('project') || normalized.includes('work') || normalized.includes('portfolio')) {
      reply = db.projects;
    } else if (normalized.includes('cert') || normalized.includes('credential') || normalized.includes('license') || normalized.includes('clearance')) {
      reply = db.certificates;
    } else if (normalized.includes('contact') || normalized.includes('email') || normalized.includes('hire') || normalized.includes('reach')) {
      reply = db.contact;
    } else if (normalized.includes('joke') || normalized.includes('funny')) {
      reply = db.joke;
    } else if (normalized.includes('experience') || normalized.includes('career') || normalized.includes('job') || normalized.includes('history')) {
      reply = db.experience;
    } else if (normalized.includes('trivia') || normalized.includes('game') || normalized.includes('question') || normalized.includes('challenge')) {
      reply = db.trivia;
    } else if (normalized === '1' || normalized.includes(':has')) {
      reply = db.ans1;
    } else if (normalized === '2' || normalized.includes('within')) {
      reply = db.ans2;
    } else if (normalized === '3' || normalized.includes('parent')) {
      reply = db.ans3;
    } else {
      reply = db.default;
    }

    // Apply personality styling modifiers in the simulator
    if (mode === 'sarcastic') {
      const sarcasticPrefixes = [
        "Oh, look at you asking questions. Fine, here's what you need to know:\n\n",
        "Because Googling is hard, I did the thinking for you:\n\n",
        "System overload from this incredibly tough question... Just kidding, here:\n\n"
      ];
      const sarcasticSuffixes = [
        "\n\nHope that matches your expectations. Anything else, or can I go back to sleeping?",
        "\n\nNow, don't go breaking anything with this information.",
        "\n\nTa-da! Direct your applause to the developer, please."
      ];
      reply = sarcasticPrefixes[Math.floor(Math.random() * 3)] + reply + sarcasticSuffixes[Math.floor(Math.random() * 3)];
    } else if (mode === 'pirate') {
      reply = reply
        .replace(/Piyush/g, 'Captain Piyush')
        .replace(/skills/g, 'piratical maneuvers')
        .replace(/projects/g, 'loot chests')
        .replace(/tech stack/g, 'rigging supplies')
        .replace(/React/g, 'Sail-JS')
        .replace(/Next\.js/g, 'Galleon-Framework')
        .replace(/developer/g, 'deck engineer')
        .replace(/engineer/g, 'sea dog designer')
        .replace(/^/, '☠️ **Arr! Cyber-plunder incoming!**\n\n')
        .concat('\n\nShiver me beams, matey! Send an anchor down to **piyushlandge4444@gmail.com** to board our crew!');
    }

    return reply;
  };

  const handleSendMessage = async (text) => {
    const userText = text || inputValue;
    if (!userText.trim()) return;

    // Add user message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'user', content: userText, time: timestamp }]);
    setInputValue('');
    setIsTyping(true);

    // AI Logic
    let responseText = '';
    
    if (hasPromptApi) {
      try {
        let session = promptSession;
        if (!session) {
          session = await initPromptSession(aiMode);
        }
        
        if (session) {
          const stream = session.promptStreaming(userText);
          
          // Set up typing placeholder
          setMessages(prev => [...prev, { role: 'assistant', content: '', time: timestamp }]);
          
          for await (const chunk of stream) {
            responseText += chunk;
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1].content = responseText;
              return updated;
            });
          }
          setIsTyping(false);
          return;
        }
      } catch (e) {
        console.error('Prompt API error, running simulator fallback:', e);
      }
    }

    // Heuristics Fallback Simulator with word-by-word streaming effect
    setTimeout(() => {
      const fullReply = getSimulatedResponse(userText, aiMode);
      const words = fullReply.split(' ');
      let currentWordIndex = 0;
      let streamedContent = '';

      // Initialize response message
      setMessages(prev => [...prev, { role: 'assistant', content: '', time: timestamp }]);

      const streamTimer = setInterval(() => {
        if (currentWordIndex < words.length) {
          streamedContent += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex];
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1].content = streamedContent;
            return updated;
          });
          currentWordIndex++;
        } else {
          clearInterval(streamTimer);
          setIsTyping(false);
        }
      }, 35); // Fast typing speed (35ms per word)
    }, 600);
  };

  const resetChat = () => {
    if (promptSession) {
      try {
        promptSession.destroy();
      } catch (e) {}
      setPromptSession(null);
    }
    setMessages([
      {
        role: 'assistant',
        content: `System refreshed. Personality profile: **${aiMode.toUpperCase()}**. Ready for incoming inputs.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border ${
          isOpen
            ? 'bg-accent-purple border-accent-cyan shadow-[0_0_20px_rgba(40,116,255,0.4)] scale-90'
            : 'bg-black/60 hover:bg-black/80 border-border-color hover:border-accent-cyan shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_22px_rgba(0, 191, 255, 0.3)] hover:scale-105'
        }`}
        aria-label="Open AI Assistant"
      >
        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-accent-green border-2 border-bg-primary animate-pulse z-10"></span>
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <Bot size={24} className="text-accent-cyan" />
        )}
      </button>

      {/* Glassmorphic Chat Panel */}
      <div
        ref={panelRef}
        style={{
          ...(customPosition ? {
            left: `${customPosition.x}px`,
            top: `${customPosition.y}px`,
            bottom: 'auto',
            right: 'auto'
          } : {}),
          transition: isDragging ? 'none' : 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className={`fixed bottom-24 right-6 z-[998] w-[90%] sm:w-[400px] h-[550px] rounded-3xl glass-card border border-border-color/40 flex flex-col shadow-[0_15px_45px_rgba(0,0,0,0.6)] scanline transform ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
      >
        {/* Panel Header */}
        <div 
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="p-4 bg-black/30 border-b border-border-color/30 flex items-center justify-between z-10 cursor-grab active:cursor-grabbing select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center">
              <Cpu size={18} className="text-accent-cyan animate-pulse" />
            </div>
            <div className="text-left">
              <h3 className="font-heading font-extrabold text-[0.95rem] text-text-primary flex items-center gap-1.5 leading-tight">
                NEXUS-9 <Sparkles size={12} className="text-accent-pink" />
              </h3>
              <p className="text-[0.65rem] text-accent-green font-mono uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-ping"></span> 
                {hasPromptApi ? 'On-Device Gemini Nano Active' : 'Cognitive Core Simulation'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={resetChat} 
              className="p-1.5 rounded-lg bg-bg-secondary border border-border-color/40 text-text-muted hover:text-text-primary hover:border-accent-cyan transition-all"
              title="Reset Link Session"
            >
              <RotateCcw size={13} />
            </button>
            <button 
              onClick={toggleChat}
              className="p-1.5 rounded-lg bg-bg-secondary border border-border-color/40 text-text-muted hover:text-text-primary hover:border-accent-pink transition-all"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Personality Selector Badge */}
        <div className="px-4 py-2 bg-black/10 border-b border-border-color/20 flex gap-2 items-center justify-between text-xs font-mono">
          <span className="text-text-muted">SYSTEM PROFILE:</span>
          <div className="flex gap-1">
            {['technical', 'sarcastic', 'pirate'].map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setAiMode(mode);
                  // Refresh prompt session next time
                  if (promptSession) {
                    try { promptSession.destroy(); } catch(e) {}
                    setPromptSession(null);
                  }
                  // Prepend a nice message
                  setMessages(prev => [
                    ...prev,
                    {
                      role: 'assistant',
                      content: `🔄 Core configured to **${mode.toUpperCase()}** profile. Awaiting input.`,
                      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  ]);
                }}
                className={`px-2 py-0.5 rounded border text-[0.65rem] uppercase transition-all ${
                  aiMode === mode
                    ? 'bg-accent-cyan/15 border-accent-cyan text-accent-cyan font-bold shadow-[0_0_5px_rgba(0,255,255,0.15)]'
                    : 'bg-transparent border-border-color/40 text-text-muted hover:text-text-primary hover:border-border-color'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Message Log Screen */}
        <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4 font-sans bg-black/10 select-text">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[85%] animate-[messageEntrance_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards] ${
                msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`p-3.5 rounded-2xl text-[0.88rem] leading-relaxed text-left ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-accent-purple to-accent-cyan text-white rounded-br-none shadow-[0_4px_12px_rgba(40,116,255,0.15)]'
                    : 'bg-bg-secondary/80 border border-border-color/30 text-text-secondary rounded-bl-none'
                }`}
              >
                {/* Parse basic markdown format (**bold** and lists) */}
                {msg.content.split('\n\n').map((para, pIdx) => (
                  <p key={pIdx} className={pIdx > 0 ? 'mt-2' : ''}>
                    {para.split('\n').map((line, lIdx) => {
                      if (line.startsWith('• ')) {
                        return (
                          <span key={lIdx} className="block pl-3 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent-cyan my-1.5">
                            {formatText(line.substring(2))}
                          </span>
                        );
                      }
                      return <span key={lIdx} className="block">{formatText(line)}</span>;
                    })}
                  </p>
                ))}
              </div>
              <span className="text-[0.65rem] text-text-muted font-mono mt-1 px-1">
                {msg.time} {msg.role === 'assistant' && '• CORE'}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="self-start flex flex-col items-start max-w-[80%]">
              <div className="p-3 bg-bg-secondary/60 border border-border-color/20 text-text-muted rounded-2xl rounded-bl-none flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 border-t border-border-color/25 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none z-10 bg-black/10">
          <button
            onClick={() => handleSendMessage('🛠 Stack & Tech capabilities')}
            className="px-3 py-1.5 rounded-full bg-bg-secondary border border-border-color/40 text-xs text-text-secondary hover:text-accent-cyan hover:border-accent-cyan transition-all cursor-pointer inline-flex items-center gap-1"
          >
            🛠 Stack
          </button>
          <button
            onClick={() => handleSendMessage('🚀 Tell me about your key projects')}
            className="px-3 py-1.5 rounded-full bg-bg-secondary border border-border-color/40 text-xs text-text-secondary hover:text-accent-cyan hover:border-accent-cyan transition-all cursor-pointer inline-flex items-center gap-1"
          >
            🚀 Projects
          </button>
          <button
            onClick={handleAutoFillForm}
            className="px-3 py-1.5 rounded-full bg-bg-secondary border border-accent-cyan/30 text-xs text-accent-cyan hover:bg-accent-cyan/15 hover:border-accent-cyan transition-all cursor-pointer inline-flex items-center gap-1"
          >
            ⚡ Auto-Fill Form
          </button>
          <button
            onClick={() => handleSendMessage('🎮 Run cognitive trivia benchmark')}
            className="px-3 py-1.5 rounded-full bg-bg-secondary border border-border-color/40 text-xs text-text-secondary hover:text-accent-cyan hover:border-accent-cyan transition-all cursor-pointer inline-flex items-center gap-1"
          >
            🎮 Trivia
          </button>
          <button
            onClick={() => handleSendMessage('💼 Contact details')}
            className="px-3 py-1.5 rounded-full bg-bg-secondary border border-border-color/40 text-xs text-text-secondary hover:text-accent-cyan hover:border-accent-cyan transition-all cursor-pointer inline-flex items-center gap-1"
          >
            💼 Contact
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-black/30 border-t border-border-color/30 flex gap-2 z-10">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Query system database..."
            className="flex-grow bg-bg-secondary border border-border-color/60 rounded-xl px-4 py-2.5 text-text-primary text-[0.88rem] focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_10px_rgba(0,255,255,0.15)] transition-all font-mono"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            className="w-10 h-10 rounded-xl bg-accent-cyan border border-accent-cyan text-black hover:bg-transparent hover:text-accent-cyan flex items-center justify-center cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
      <style>{`
        @keyframes messageEntrance {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fillHighlight {
          0% { box-shadow: 0 0 0px rgba(0, 255, 255, 0); border-color: rgba(168, 85, 247, 0.3); }
          30% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.7); border-color: rgb(0, 255, 255); }
          100% { box-shadow: 0 0 0px rgba(0, 255, 255, 0); border-color: rgba(168, 85, 247, 0.3); }
        }
        .auto-filled-highlight {
          animation: fillHighlight 1.8s ease-in-out;
        }
      `}</style>
    </>
  );
}

// Basic formatter helper to handle bold (**text**), inline backticks (`code`), and email/anchor markdown styling
function formatText(text) {
  if (typeof text !== 'string') return text;

  // 1. Parse markdown links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
    }
    parts.push({ type: 'link', text: match[1], url: match[2] });
    lastIndex = linkRegex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }

  if (parts.length === 0) {
    parts = [{ type: 'text', content: text }];
  }

  // 2. Parse sub-formatting (Bold and Code blocks) for text segments
  return parts.map((part, idx) => {
    if (part.type === 'link') {
      const isMailto = part.url.startsWith('mailto:');
      return (
        <a 
          key={idx} 
          href={part.url} 
          target={isMailto ? '_self' : '_blank'} 
          rel="noopener noreferrer"
          className="text-accent-cyan hover:underline font-bold transition-all"
        >
          {part.text}
        </a>
      );
    }

    // Now parse bold **bold** and inline code `code` in part.content
    let subParts = [{ type: 'text', content: part.content }];

    // A. Parse inline code backticks `code`
    const codeRegex = /`([^`]+)`/g;
    let tempParts = [];
    
    subParts.forEach((sp) => {
      if (sp.type !== 'text') {
        tempParts.push(sp);
        return;
      }
      let sLastIndex = 0;
      let sMatch;
      while ((sMatch = codeRegex.exec(sp.content)) !== null) {
        if (sMatch.index > sLastIndex) {
          tempParts.push({ type: 'text', content: sp.content.substring(sLastIndex, sMatch.index) });
        }
        tempParts.push({ type: 'code', content: sMatch[1] });
        sLastIndex = codeRegex.lastIndex;
      }
      if (sLastIndex < sp.content.length) {
        tempParts.push({ type: 'text', content: sp.content.substring(sLastIndex) });
      }
    });
    subParts = tempParts;

    // B. Parse bold tags **bold**
    const boldRegex = /\*\*(.*?)\*\*/g;
    let finalParts = [];

    subParts.forEach((sp) => {
      if (sp.type !== 'text') {
        finalParts.push(sp);
        return;
      }
      let bLastIndex = 0;
      let bMatch;
      while ((bMatch = boldRegex.exec(sp.content)) !== null) {
        if (bMatch.index > bLastIndex) {
          finalParts.push({ type: 'text', content: sp.content.substring(bLastIndex, bMatch.index) });
        }
        finalParts.push({ type: 'bold', content: bMatch[1] });
        bLastIndex = boldRegex.lastIndex;
      }
      if (bLastIndex < sp.content.length) {
        finalParts.push({ type: 'text', content: sp.content.substring(bLastIndex) });
      }
    });
    subParts = finalParts;

    // Render elements
    return subParts.map((sp, sIdx) => {
      if (sp.type === 'code') {
        return (
          <code key={sIdx} className="bg-black/35 px-1.5 py-0.5 rounded text-accent-pink font-mono text-[0.8rem] border border-border-color/20">
            {sp.content}
          </code>
        );
      }
      if (sp.type === 'bold') {
        return <strong key={sIdx} className="text-text-primary font-bold">{sp.content}</strong>;
      }
      return sp.content;
    });
  });
}
