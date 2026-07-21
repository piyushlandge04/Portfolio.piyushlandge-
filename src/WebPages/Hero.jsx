import { useState, useEffect } from 'react';
import { 
  Search, Download, BrainCircuit, Layers, Eye, Brain, Languages, 
  Sparkles, Bot, Binary, Table, BarChart3, PieChart, FlaskConical, Database, 
  Flame 
} from 'lucide-react';
import Navbar from './Navbar';

/* ─── Core Technical Stack ─────────────────────────────────────────── */
const STACK = [
  {
    name: 'Python',
    color: '#3776AB',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.884S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.403 3.347-3.403h5.766s3.24.052 3.24-3.132V3.19S18.28 0 11.914 0zm-3.2 1.848a1.044 1.044 0 1 1 0 2.088 1.044 1.044 0 0 1 0-2.088zM12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H12v-.826h8.137S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.403-3.347 3.403H9.454s-3.24-.052-3.24 3.132v5.337S5.72 24 12.086 24zm3.2-1.848a1.044 1.044 0 1 1 0-2.088 1.044 1.044 0 0 1 0 2.088z" />
      </svg>
    )
  },
  {
    name: 'Machine Learning',
    color: '#a855f7',
    icon: <BrainCircuit />
  },
  {
    name: 'Deep Learning',
    color: '#6366f1',
    icon: <Layers />
  },
  {
    name: 'Computer Vision',
    color: '#14b8a6',
    icon: <Eye />
  },
  {
    name: 'Artificial Intelligence',
    color: '#a855f7',
    icon: <Brain />
  },
  {
    name: 'Natural Language Processing (NLP)',
    color: '#3b82f6',
    icon: <Languages />
  },
  {
    name: 'Generative AI',
    color: '#ec4899',
    icon: <Sparkles />
  },
  {
    name: 'Large Language Models (LLMs)',
    color: '#00a294',
    icon: <Bot />
  },
  {
    name: 'NumPy',
    color: '#4d77cf',
    icon: <Binary />
  },
  {
    name: 'Pandas',
    color: '#15045C',
    icon: <Table />
  },
  {
    name: 'Statistics',
    color: '#f59e0b',
    icon: <BarChart3 />
  },
  {
    name: 'Data Visualization',
    color: '#eab308',
    icon: <PieChart />
  },
  {
    name: 'Flask',
    color: '#000000',
    icon: <FlaskConical />
  },
  {
    name: 'SQL',
    color: '#00758F',
    icon: <Database />
  },
  {
    name: 'MongoDB',
    color: '#47A248',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
      </svg>
    )
  },
  {
    name: 'Git',
    color: '#F05032',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M23.546 10.93L13.067.452a1.436 1.436 0 0 0-2.032 0L8.59 2.895l3.197 3.197a1.442 1.442 0 0 1 1.956 0 1.444 1.444 0 0 1 0 2.038c-.3.3-.675.438-1.053.42l2.369 2.37c.394-.176.845-.138 1.205.125a1.444 1.444 0 0 1-.038 2.072 1.442 1.442 0 0 1-2.031 0 1.442 1.442 0 0 1-.163-1.68l-2.226-2.228v4.99a1.447 1.447 0 0 1-.954 1.282v-4.99L7.42 7.42a1.442 1.442 0 0 1 0-2.038l-4.52-4.52a1.438 1.438 0 0 0 0 2.032l10.48 10.478a1.438 1.438 0 0 0 2.03 0l10.478-10.48a1.438 1.438 0 0 0 0-2.03z"/>
      </svg>
    )
  },
  {
    name: 'PySpark',
    color: '#E25A2C',
    icon: <Flame />
  },
  {
    name: 'Hadoop',
    color: '#662D91',
    icon: <Database />
  },
  {
    name: 'AWS',
    color: '#FF9900',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576a.347.347 0 0 1 .056.176c0 .08-.048.16-.152.24l-.503.336a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.368-1.3-.368-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.778.778 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z" />
      </svg>
    )
  },
  {
    name: 'Azure',
    color: '#0089D6',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M5.4 19L0 15.3 9.4 0H16l-7 11.2L15.3 24H8.7L5.4 19zM16.5 0l-5.6 9L18.6 19l5.4-3.7L16.5 0z" />
      </svg>
    )
  }
];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* Render 3 identical copies so the loop is seamless at any viewport width */
  const marqueeItems = [1, 2, 3].flatMap((copy) =>
    STACK.map((tech, idx) => (
      <div
        key={`${copy}-${idx}`}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full shrink-0"
        style={{
          background: `${tech.color}14`,
          border: `1px solid ${tech.color}2e`,
        }}
      >
        <span style={{ color: tech.color }} className="flex items-center shrink-0 w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">
          {tech.icon}
        </span>
        <span className="text-[0.68rem] font-semibold text-text-primary font-sans whitespace-nowrap tracking-wide">
          {tech.name}
        </span>
      </div>
    ))
  );

  return (
    <section id="home" className="min-h-dvh flex flex-col relative overflow-visible bg-bg-primary select-none">
      {/* Background Ambient Glows */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-75 sm:w-125 h-75 sm:h-125 bg-indigo-400/8 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 50}px), calc(-50% + ${mousePos.y * 50}px))`
        }}
      ></div>
      <div
        className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-62.5 sm:w-112.5 h-62.5 sm:h-112.5 bg-purple-400/8 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(calc(50% + ${mousePos.x * -40}px), calc(50% + ${mousePos.y * -40}px))`
        }}
      ></div>

      {/* Navbar */}
      <Navbar />

      {/* Hero copy */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8">
        {/* Availability badge */}
        <div className="hero-fade-in flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[0.6rem] sm:text-[0.65rem] font-mono font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-green-600">
            Available for Opportunities
          </span>
        </div>

        <h1 className="hero-fade-in delay-100 font-heading font-normal text-[40px] min-[380px]:text-[48px] min-[480px]:text-[56px] sm:text-[76px] md:text-[96px] lg:text-[116px] xl:text-[136px] 2xl:text-[156px] leading-[1.02] tracking-[-0.024em] text-text-primary text-center">
          Piyush{' '}
          <span
            className="bg-clip-text text-transparent bg-linear-to-l"
            style={{ backgroundImage: 'linear-gradient(to left, #6366f1, #a855f7, #fcd34d)' }}
          >
            Landge
          </span>
        </h1>

        {/* Role tag */}
        <div className="hero-fade-in delay-200 mt-3 sm:mt-4 flex justify-center">
          <p className="font-heading text-[0.55rem] sm:text-[0.65rem] md:text-[0.68rem] font-bold uppercase tracking-[0.15em] sm:tracking-[0.22em] text-neutral-700 mt-1 text-center px-4 max-w-3xl mx-auto leading-relaxed flex flex-wrap justify-center items-center gap-y-1 select-none">
            <span className="inline-block whitespace-nowrap">AI Engineer</span>
            <span className="text-neutral-300 mx-2 sm:mx-3">|</span>
            <span className="inline-block whitespace-nowrap">Machine Learning</span>
            <span className="text-neutral-300 mx-2 sm:mx-3">|</span>
            <span className="inline-block whitespace-nowrap">Deep Learning</span>
            <span className="text-neutral-300 mx-2 sm:mx-3">|</span>
            <span className="inline-block whitespace-nowrap">Generative AI</span>
            <span className="text-neutral-300 mx-2 sm:mx-3">|</span>
            <span className="inline-block whitespace-nowrap">LLMs</span>
            <span className="text-neutral-300 mx-2 sm:mx-3">|</span>
            <span className="inline-block whitespace-nowrap">AWS</span>
          </p>
        </div>

        {/* Description */}
        <p className="hero-fade-in delay-300 font-sans text-text-secondary text-[0.82rem] sm:text-[0.92rem] md:text-[0.98rem] leading-relaxed max-w-5xl mt-5 text-center px-4">
          AI Engineer specializing in Machine Learning, Deep Learning, Generative AI, and Large Language Models (LLMs).
          <br className="hidden sm:inline" /> Passionate about building intelligent, scalable AI solutions to solve real-world problems.
        </p>

        {/* CTA buttons */}
        <div className="hero-fade-in delay-400 flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 sm:mt-7 w-full max-w-xs sm:max-w-none px-4">
          <a
            href="#projects"
            className="w-full sm:w-auto bg-black text-white hover:bg-neutral-800 rounded-full px-6 py-3 text-[0.7rem] sm:text-[0.72rem] font-bold uppercase tracking-widest cursor-pointer shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 transition-all duration-150"
          >
            <Search className="w-3.5 h-3.5" />
            Explore Projects
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="w-full sm:w-auto rounded-full px-6 py-3 text-[0.7rem] sm:text-[0.72rem] font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2 border border-text-primary/25 text-text-primary/90 hover:text-text-primary hover:border-text-primary/40 hover:bg-text-primary/5 transition-all duration-200"
          >
            <Download className="w-3.5 h-3.5" />
            Download Resume
          </a>
        </div>
      </div>

      {/* ── Tech Stack Marquee ── */}
      <div className="w-full relative z-10 pb-8 sm:pb-12 pt-2 sm:pt-3">
        <p className="text-center text-[0.58rem] sm:text-[0.62rem] font-bold uppercase tracking-[0.22em] text-text-muted mb-4 sm:mb-5 font-mono">
          Core Technical Stack
        </p>

        {/* Scrolling ticker with soft edge-fade mask */}
        <div
          className="marquee-container w-full overflow-hidden"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div className="marquee-content">
            {marqueeItems}
          </div>
        </div>
      </div>

    </section>
  );
}
