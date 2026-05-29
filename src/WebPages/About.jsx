import React from 'react';
import { User, Code2, Database, LayoutTemplate, Terminal, Cpu, Brain, LineChart, Eye, MessageSquare, Cloud } from 'lucide-react';

export default function About() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x-relative', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y-relative', `${y}px`);
  };



  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      icon: <Brain size={16} className="text-accent-purple" />,
      skills: [
        'Artificial Intelligence (AI)',
        'Machine Learning (ML)',
        'Deep Learning',
        'Generative AI',
        'Agentic AI',
        'Large Language Models (LLMs)',
        'Prompt Engineering'
      ],
      colorClass: 'bg-accent-purple/10'
    },
    {
      title: 'Programming & Libraries',
      icon: <Code2 size={16} className="text-accent-cyan" />,
      skills: [
        'Python',
        'SQL',
        'MongoDB',
        'TensorFlow',
        'Scikit-Learn',
        'Pandas',
        'NumPy',
        'Flask'
      ],
      colorClass: 'bg-accent-cyan/10'
    },
    {
      title: 'Data Science & Analytics',
      icon: <LineChart size={16} className="text-accent-pink" />,
      skills: [
        'Data Analysis',
        'Data Visualization',
        'Statistics',
        'Feature Engineering',
        'Time Series Forecasting',
        'Tableau',
        'Power BI'
      ],
      colorClass: 'bg-accent-pink/15'
    },
    {
      title: 'NLP & Computer Vision',
      icon: <Eye size={16} className="text-accent-green" />,
      skills: [
        'Natural Language Processing (NLP)',
        'Sentiment Analysis',
        'Computer Vision',
        'OpenCV',
        'Object Detection'
      ],
      colorClass: 'bg-accent-green/10'
    },
    {
      title: 'Cloud & Tools',
      icon: <Cloud size={16} className="text-accent-cyan" />,
      skills: [
        'AWS',
        'Azure',
        'Git',
        'GitHub',
        'VS Code',
        'Antigravity',
        'Model Deployment'
      ],
      colorClass: 'bg-accent-cyan/10'
    },
    {
      title: 'AI Tools & Assistants',
      icon: <Terminal size={16} className="text-accent-pink" />,
      skills: [
        'ChatGPT',
        'Claude',
        'Gemini',
        'Perplexity AI',
        'GitHub Copilot'
      ],
      colorClass: 'bg-accent-pink/15'
    }
  ];

  const experienceEvents = [
    {
      period: 'Apr 2026 – Present',
      duration: '2 mos',
      role: 'AI Intern',
      company: 'Applogix Solutions',
      type: 'Internship',
      details: '~ Backend Data\n~ Python\n~ Data preprocessing and dataset structuring.\n~ Machine learning model support and testing.\n~ Model performance evaluation and optimisation.\n~ Technical documentation and experiment tracking'
    },
    {
      period: 'Feb 2026 – Mar 2026',
      duration: '2 mos',
      role: 'AI Project Intern',
      company: 'Applogix Solutions',
      type: 'Internship',
      details: '~ Data preprocessing and dataset structuring.\n~ Machine learning model support and testing.\n~ Model performance evaluation and optimisation.\n~ Technical documentation and experiment tracking'
    }
  ];

  const educationEvents = [
    {
      period: '2023 – 2026',
      degree: 'B.Sc. Computer Science',
      institution: 'B.K. Birla College, Kalyan',
      grade: 'CGPA 8.00',
      details: 'Successfully completed a degree in Computer Science with a CGPA of 8.00, specializing in high-performance backend architecture and the engineering of intelligent, AI-powered systems.'
    },
    {
      period: '2022 – 2023',
      degree: 'HSC – State Board of Maharashtra',
      institution: 'D.D.S.P. College, Erandol, Jalgaon',
      details: 'Successfully completed Higher Secondary Certificate with a rigorous focus on scientific methodology and advanced mathematical principles, building a strong analytical foundation.'
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative scroll-reveal scroll-reveal-init bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text-primary text-center mb-4 tracking-tight">About <span className="bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">Me</span></h2>
        <p className="text-center max-w-[600px] mx-auto text-text-secondary text-lg mb-16">
          An interactive, high-tech diagnostic display of my professional stack, background, and coding layers.
        </p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Biography & Neural Stats */}
          <div 
            className="bento-card glass-card lg:col-span-2 p-8 md:p-10 flex flex-col gap-6" 
            onMouseMove={handleMouseMove}
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-[18px] bg-gradient-to-r from-accent-cyan to-accent-purple flex items-center justify-center text-white shadow-[0_4px_15px_rgba(0,255,255,0.2)]">
                <User size={30} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-text-primary">Piyush Landge</h3>
                 <p className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent font-semibold font-mono text-sm">AI ENGINEER</p>
              </div>
            </div>
            <div className="font-sans text-text-secondary text-[0.98rem] md:text-[1.02rem] leading-relaxed text-left flex flex-col gap-4">
              <p>
                I am an AI Engineer passionate about designing and deploying intelligent solutions using Artificial Intelligence, Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, and Generative AI. My expertise includes Python, SQL, MongoDB, AWS, TensorFlow, Git, and modern AI frameworks.
              </p>
              <p>
                Through intensive training, real-world projects, and internships, I have developed practical skills in predictive modeling, AI-powered automation, LLM applications, data analysis, and intelligent agent systems. I continuously explore emerging AI technologies and build solutions that solve real-world business challenges.
              </p>
            </div>
            
            {/* About Me Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-border-color/30 pt-6 mt-auto">
              <div className="text-center">
                <span className="block font-mono text-3xl font-extrabold text-accent-cyan">3+ Yrs</span>
                <span className="text-[0.7rem] text-text-muted uppercase tracking-wider font-bold">Operational Exp</span>
              </div>
              <div className="text-center">
                <span className="block font-mono text-3xl font-extrabold text-accent-purple">12B+</span>
                <span className="text-[0.7rem] text-text-muted uppercase tracking-wider font-bold">Tokens Processed</span>
              </div>
              <div className="text-center">
                <span className="block font-mono text-3xl font-extrabold text-accent-pink">99.8%</span>
                <span className="text-[0.7rem] text-text-muted uppercase tracking-wider font-bold">Model Accuracy</span>
              </div>
            </div>
          </div>

          {/* Card 2: Core Stack Skills */}
          <div 
            id="skills"
            className="bento-card glass-card lg:col-span-1 lg:row-span-2 p-8 flex flex-col gap-6 scroll-mt-24" 
            onMouseMove={handleMouseMove}
          >
            <h3 className="font-heading font-bold text-xl text-text-primary text-left flex items-center gap-2">
              <Code2 size={20} className="text-accent-cyan" /> Synaptic Stack
            </h3>
            <div className="flex flex-col gap-6">
              {skillCategories.map((category, index) => (
                <div key={index} className="flex flex-col gap-3 text-left">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${category.colorClass}`}>
                      {category.icon}
                    </div>
                    <h4 className="text-[0.95rem] font-bold text-text-primary">{category.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="bg-bg-secondary border border-border-color/40 px-3 py-1.5 rounded-lg text-[0.75rem] font-mono text-text-primary hover:border-accent-cyan hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(0,255,255,0.15)] transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Interactive Mock Code Editor */}
          <div 
            className="bento-card glass-card lg:col-span-2 p-0 flex flex-col bg-black/45 border border-border-color/20" 
            onMouseMove={handleMouseMove}
          >
            <div className="flex items-center justify-between px-5 py-3 bg-black/20 border-b border-border-color/30">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
              </div>
              <span className="font-mono text-xs text-text-muted flex items-center gap-1.5">
                <Terminal size={14} className="text-accent-cyan" /> attention_layer.py
              </span>
            </div>
            <div className="p-6 overflow-x-auto text-left font-mono text-sm leading-relaxed text-[#abb2bf] bg-black/10">
              <pre className="m-0">
                <code>
                  <span className="text-[#5c6370]"># Dev Signature</span><br />
                  <span className="text-[#e06c75]">engineer</span> = <span className="text-[#98c379]">"Piyush Landge"</span><br />
                  <span className="text-[#e06c75]">focus</span>    = <span className="text-[#98c379]">"Deep Learning &amp; Generative AI"</span><br />
                  <br />
                  <span className="text-[#c678dd]">import</span> <span className="text-[#e5c07b]">torch</span><br />
                  <span className="text-[#c678dd]">import</span> <span className="text-[#e5c07b]">torch.nn</span> <span className="text-[#c678dd]">as</span> <span className="text-[#e5c07b]">nn</span><br />
                  <br />
                  <span className="text-[#c678dd]">class</span> <span className="text-[#61afef]">SynapticAttention</span>(<span className="text-[#e5c07b]">nn.Module</span>):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c678dd]">def</span> <span className="text-[#61afef]">__init__</span>(<span className="text-[#e06c75]">self</span>, heads=<span className="text-[#d19a66]">8</span>, d_model=<span className="text-[#d19a66]">512</span>):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#e5c07b]">super</span>().<span className="text-[#61afef]">__init__</span>()<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#5c6370]"># Initialize Q / K / V projections</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#e06c75]">self</span>.attn = <span className="text-[#e5c07b]">nn.MultiheadAttention</span>(d_model, heads)<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#e06c75]">self</span>.norm = <span className="text-[#e5c07b]">nn.LayerNorm</span>(d_model)<br />
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c678dd]">def</span> <span className="text-[#61afef]">forward</span>(<span className="text-[#e06c75]">self</span>, q, k, v):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;score, _ = <span className="text-[#e06c75]">self</span>.attn(q, k, v)<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c678dd]">return</span> <span className="text-[#e06c75]">self</span>.norm(score + q) <span className="text-[#5c6370]"># Residual</span>
                </code>
              </pre>
            </div>
          </div>


          {/* Card 4: Education & Experience */}
          <div 
            id="education"
            className="bento-card glass-card lg:col-span-3 p-8 flex flex-col scroll-mt-24" 
            onMouseMove={handleMouseMove}
          >
            <div className="w-full text-left">
              <h3 className="font-heading font-bold text-2xl text-text-primary mb-2">Education & Experience</h3>
              <p className="text-sm text-text-muted mb-8 font-sans">Academic background and professional milestones</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Experience Column */}
                <div className="flex flex-col gap-6">
                  <h4 className="font-heading font-semibold text-[0.95rem] text-accent-cyan uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span> Professional Milestones
                  </h4>
                  <div className="flex flex-col gap-6 relative">
                    {experienceEvents.map((event, idx) => (
                      <div key={idx} className="relative pl-6 border-l border-border-color/40 text-left">
                        <div className="absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-cyan shadow-[0_0_8px_var(--accent-cyan)]"></div>
                        <span className="text-[0.7rem] font-mono font-bold text-accent-cyan uppercase tracking-wider">
                          {event.period} {event.duration && `· ${event.duration}`}
                        </span>
                        <h5 className="text-[1rem] font-bold text-text-primary my-0.5">{event.role}</h5>
                        <p className="text-xs text-text-muted font-semibold mb-2">{event.company} {event.type && `· ${event.type}`}</p>
                        <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-line">{event.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education Column */}
                <div className="flex flex-col gap-6">
                  <h4 className="font-heading font-semibold text-[0.95rem] text-accent-purple uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-purple"></span> Academic Background
                  </h4>
                  <div className="flex flex-col gap-6 relative">
                    {educationEvents.map((event, idx) => (
                      <div key={idx} className="relative pl-6 border-l border-border-color/40 text-left">
                        <div className="absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-purple shadow-[0_0_8px_var(--accent-purple)]"></div>
                        <span className="text-[0.7rem] font-mono font-bold text-accent-purple uppercase tracking-wider">
                          {event.period}
                        </span>
                        <h5 className="text-[1rem] font-bold text-text-primary my-0.5">{event.degree}</h5>
                        <p className="text-xs text-text-muted font-semibold mb-2">{event.institution} {event.grade && `· Grade: ${event.grade}`}</p>
                        <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-line">{event.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
