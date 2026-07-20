import { 
  MapPin, Briefcase, GraduationCap, Calendar,
  Terminal, Flame, BrainCircuit, Layers, Languages, Sparkles, 
  Bot, Database, Zap, Cloud, GitBranch,
  Cpu, Eye, Workflow, Network, TrendingUp, BarChart2, PieChart, Binary, Layout, Lightbulb, Users
} from 'lucide-react';

const milestones = [
  {
    type: 'work',
    role: 'AI Intern',
    company: 'Applogix Solutions',
    period: 'Apr 2026 – Present',
    details: 'Building optimized backend data pipelines, executing model fine-tuning parameter sweeps, and managing evaluations.'
  },
  {
    type: 'work',
    role: 'AI Project Intern',
    company: 'Applogix Solutions',
    period: 'Feb 2026 – Mar 2026',
    details: 'Developed automated auditing modules for deep learning models and verification loops for compilation datasets.'
  },
  {
    type: 'education',
    role: 'Bachelors of Computer Science',
    company: 'B.K. Birla College - Mumbai University',
    period: '',
    details: 'Focusing on database architectures, computational algorithms, and mathematics. CGPA 7.5.'
  }
];

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    skills: [
      { name: 'Machine Learning', color: '#a855f7', icon: <BrainCircuit size={12} /> },
      { name: 'Deep Learning', color: '#6366f1', icon: <Layers size={12} /> },
      { name: 'PyTorch', color: '#EE4C2C', icon: <Flame size={12} /> },
      { name: 'TensorFlow & Keras', color: '#FF6F00', icon: <Cpu size={12} /> },
      { name: 'Computer Vision', color: '#00B0FF', icon: <Eye size={12} /> },
      { name: 'Natural Language Processing (NLP)', color: '#3b82f6', icon: <Languages size={12} /> },
      { name: 'Generative AI', color: '#ec4899', icon: <Sparkles size={12} /> },
      { name: 'Large Language Models (LLMs)', color: '#00a294', icon: <Bot size={12} /> },
      { name: 'Prompt Engineering', color: '#FFD700', icon: <Terminal size={12} /> },
      { name: 'Retrieval-Augmented Generation (RAG)', color: '#8e44ad', icon: <Network size={12} /> },
      { name: 'Agentic AI', color: '#2ecc71', icon: <Workflow size={12} /> }
    ]
  },
  {
    title: 'Data Science & Analytics',
    skills: [
      { name: 'Python', color: '#3776AB', icon: <Terminal size={12} /> },
      { name: 'Statistics', color: '#1abc9c', icon: <TrendingUp size={12} /> },
      { name: 'Data Analysis (NumPy, Pandas)', color: '#1565C0', icon: <BarChart2 size={12} /> },
      { name: 'Data Visualization (Matplotlib, Seaborn)', color: '#2e7d32', icon: <PieChart size={12} /> },
      { name: 'Big Data (PySpark, Hadoop)', color: '#E25A13', icon: <Binary size={12} /> },
      { name: 'Tableau & Power BI', color: '#E9572B', icon: <Layout size={12} /> }
    ]
  },
  {
    title: 'Software & Cloud Engineering',
    skills: [
      { name: 'FastAPI', color: '#009688', icon: <Zap size={12} /> },
      { name: 'Flask & REST APIs', color: '#000000', icon: <Terminal size={12} /> },
      { name: 'SQL', color: '#00758F', icon: <Database size={12} /> },
      { name: 'MongoDB', color: '#47A248', icon: <Database size={12} /> },
      { name: 'AWS & Azure', color: '#FF9900', icon: <Cloud size={12} /> },
      { name: 'Git & GitHub', color: '#F05032', icon: <GitBranch size={12} /> }
    ]
  },
  {
    title: 'Collaboration & Productivity',
    skills: [
      { name: 'AI Tools (ChatGPT, Claude, Gemini, Copilot)', color: '#8a2be2', icon: <Sparkles size={12} /> },
      { name: 'Problem Solving', color: '#e67e22', icon: <Lightbulb size={12} /> },
      { name: 'Team Collaboration', color: '#34495e', icon: <Users size={12} /> }
    ]
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Responsive 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
          
          {/* COLUMN 1: Profile & Bio Description (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <p className="text-[0.62rem] font-mono font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2.5">
                Who I Am
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-neutral-900 tracking-tight mb-4">
                About Me
              </h2>
              <div className="h-1.5 w-12 bg-purple-600 rounded-full mb-6" />
            </div>

            <div className="font-sans text-neutral-600 text-base leading-relaxed flex flex-col gap-4">
              <p>
                I am an <strong className="text-neutral-900 font-semibold">AI &amp; Machine Learning Engineer</strong> focused on designing intelligent systems. I specialize in building data pipelines, fine-tuning LLMs, and constructing high-performance backends.
              </p>
              <p>
                Currently, I engineer core pipeline architectures that reduce latency and ensure reliable validation checkpoints. I am passionate about clean modular code, mathematical computational models, and shipping production-ready systems.
              </p>
            </div>

            {/* Quick specifications / metadata */}
            <div className="border-t border-neutral-100 pt-6 mt-2 flex flex-col gap-3 font-mono text-xs text-neutral-500 font-bold">
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-neutral-400 shrink-0" />
                <span>Pune, India</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-600">Available for Opportunities</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Roadmap Timeline & Tech Stack (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Experience & Education Milestones */}
            <div className="flex flex-col gap-5">
              <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-neutral-400 mb-2">
                Work &amp; Education Roadmap
              </h3>
              
              <div className="relative pl-6 sm:pl-8 space-y-6">
                {/* Connecting Vertical Line (running from bottom item up to top item) */}
                <div className="absolute left-2.75 sm:left-3.75 top-4 bottom-4 w-0.5 bg-linear-to-t from-neutral-100 via-indigo-200 to-purple-500" />

                {milestones.map((m, idx) => (
                  <div 
                    key={idx}
                    className="relative flex gap-4"
                  >
                    {/* Icon Node centered on the vertical line */}
                    <div className="absolute -left-5.75 sm:-left-6.75 top-3.5 w-6 h-6 rounded-full border border-neutral-200 bg-white flex items-center justify-center shadow-2xs text-neutral-500 z-10 hover:border-purple-300 hover:text-purple-600 transition-colors">
                      {m.type === 'work' ? <Briefcase size={12} /> : <GraduationCap size={12} />}
                    </div>

                    {/* Milestone Card Content */}
                    <div className="p-5 rounded-2xl border border-neutral-100 hover:border-neutral-200 bg-neutral-50/30 hover:bg-neutral-50/80 transition-all duration-300 w-full pl-6 sm:pl-7">
                      <div className="flex flex-col">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <h4 className="font-heading font-black text-sm text-neutral-900">
                            {m.role}
                          </h4>
                          <span className="text-xs text-neutral-400 font-semibold font-sans">
                            · {m.company}
                          </span>
                        </div>
                        {m.period && (
                          <div className="flex items-center gap-1 text-[0.68rem] font-mono text-neutral-400 font-bold mt-1 mb-2">
                            <Calendar size={11} />
                            <span>{m.period}</span>
                          </div>
                        )}
                        <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                          {m.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>



          </div>

        </div>

        {/* Standalone Horizontal My Skills Section */}
        <div className="flex flex-col gap-6 border-t border-neutral-100 pt-12 mt-16">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <BrainCircuit size={18} />
            </div>
            <h3 className="font-heading font-black text-lg text-neutral-900 tracking-tight">
              My Skills
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, catIdx) => {
              const catStyles = [
                { border: 'hover:border-purple-200', text: 'text-purple-600' },
                { border: 'hover:border-blue-200', text: 'text-blue-600' },
                { border: 'hover:border-emerald-200', text: 'text-emerald-600' },
                { border: 'hover:border-amber-200', text: 'text-amber-600' }
              ][catIdx] || { border: 'hover:border-neutral-200', text: 'text-neutral-600' };

              return (
                <div 
                  key={category.title} 
                  className={`p-5 rounded-2xl border border-neutral-100 bg-neutral-50/20 hover:bg-white transition-all duration-300 flex flex-col gap-4 shadow-3xs ${catStyles.border}`}
                >
                  <h4 className={`text-[0.62rem] font-heading font-black tracking-wider uppercase flex items-center gap-2 ${catStyles.text}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[0.68rem] font-mono font-bold border border-neutral-100 text-neutral-600 bg-white/60 backdrop-blur-xs transition-all duration-200 cursor-default select-none hover:-translate-y-0.5 hover:shadow-3xs"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = skill.color;
                          e.currentTarget.style.color = skill.color;
                          e.currentTarget.style.backgroundColor = `${skill.color}08`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#f5f5f5';
                          e.currentTarget.style.color = '#525252';
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                        }}
                      >
                        <span className="flex items-center justify-center animate-pulse" style={{ color: 'inherit' }}>
                          {skill.icon}
                        </span>
                        <span>{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
