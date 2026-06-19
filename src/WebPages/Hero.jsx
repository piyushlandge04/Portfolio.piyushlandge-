import { useState, useEffect, useRef } from 'react';
import { Search, Download } from 'lucide-react';
import Navbar from './Navbar';

/* ─── Brand SVG icons ─────────────────────────────────────────── */
const STACK = [
  {
    name: 'PyTorch',
    color: '#EE4C2C',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
        <path d="M12 2.5c-3.6 0-6.5 2.9-6.5 6.5 0 1.8.7 3.4 1.9 4.6L12 8.1l4.6 5.5c1.2-1.2 1.9-2.8 1.9-4.6 0-3.6-2.9-6.5-6.5-6.5zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 10.3c-3.6 0-6.5 2.9-6.5 6.5h13c0-3.6-2.9-6.5-6.5-6.5z" />
      </svg>
    ),
  },
  {
    name: 'TensorFlow',
    color: '#FF6F00',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
        <path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.153 3.564V5.856zm21.416 0L12.46 0v24l4.095-2.378V7.603l6.153 3.564V5.856z" />
      </svg>
    ),
  },
  {
    name: 'Python',
    color: '#3776AB',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.884S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.403 3.347-3.403h5.766s3.24.052 3.24-3.132V3.19S18.28 0 11.914 0zm-3.2 1.848a1.044 1.044 0 1 1 0 2.088 1.044 1.044 0 0 1 0-2.088zM12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H12v-.826h8.137S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.403-3.347 3.403H9.454s-3.24-.052-3.24 3.132v5.337S5.72 24 12.086 24zm3.2-1.848a1.044 1.044 0 1 1 0-2.088 1.044 1.044 0 0 1 0 2.088z" />
      </svg>
    ),
  },
  {
    name: 'OpenAI',
    color: '#74aa9c',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.073 14.08a4.5 4.5 0 0 1-1.732-6.184zm16.597 3.855l-5.843-3.371 2.019-1.168a.075.075 0 0 1 .072 0l4.742 2.73a4.5 4.5 0 0 1-.676 8.125v-5.678a.79.79 0 0 0-.314-.638zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061L14.17 4.14a4.496 4.496 0 0 1 6.777 4.67zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.496 4.496 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    color: '#47A248',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
      </svg>
    ),
  },
  {
    name: 'HuggingFace',
    color: '#FFD21E',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
        <path d="M10.155 8.07A3.73 3.73 0 0 0 9.27 8c-.372 0-.72.045-1.03.128A6.688 6.688 0 0 1 8.156 7H9.27c.34 0 .66.037.963.106zm3.69-.07a3.73 3.73 0 0 1 .885.07c-.303-.069-.623-.106-.963-.106h-1.112c.16.29.276.635.343 1.003.31-.083.658-.128 1.03-.128zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 5.5c1.027 0 1.96.346 2.701.919L14.5 6.25h-.003a4.58 4.58 0 0 0-2.498-.726 4.58 4.58 0 0 0-2.498.726l-.001-.002-.201-.171.001.002A4.496 4.496 0 0 1 12 5.5zm-4.5 6.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm9 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm-4.5 4.5c-1.5 0-2.5-.9-2.5-1.5s.5-.5 2.5-.5 2.5-.1 2.5.5-.999 1.5-2.5 1.5z" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    color: '#FF9900',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576a.347.347 0 0 1 .056.176c0 .08-.048.16-.152.24l-.503.336a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.368-1.3-.368-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.778.778 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z" />
      </svg>
    ),
  },
  {
    name: 'FastAPI',
    color: '#009688',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm-.624 21.552v-7.704H6.864L13.2 2.448v7.704h4.512L11.376 21.552z" />
      </svg>
    ),
  },
];

export default function Hero() {
  const videoRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(() => {
    return localStorage.getItem('bg_video_enabled') !== 'false';
  });

  useEffect(() => {
    const handleSettings = () => {
      setVideoEnabled(localStorage.getItem('bg_video_enabled') !== 'false');
    };
    window.addEventListener('portfolio-settings-changed', handleSettings);
    return () => window.removeEventListener('portfolio-settings-changed', handleSettings);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoEnabled) return;

    let animationFrameId;

    const checkFade = () => {
      if (video.duration && !isTransitioning) {
        const current = video.currentTime;
        const duration = video.duration;
        const opacity = (current < 0.5
          ? current / 0.5
          : current > duration - 0.5
            ? Math.max(0, (duration - current) / 0.5)
            : 1) * 0.7;
        video.style.opacity = opacity.toString();
      }
      animationFrameId = requestAnimationFrame(checkFade);
    };

    const handleEnded = () => {
      setIsTransitioning(true);
      video.style.opacity = '0';
      video.pause();
      setTimeout(() => {
        video.currentTime = 0;
        video.play()
          .then(() => setIsTransitioning(false))
          .catch((err) => {
            console.error('Replay execution failed:', err);
            setIsTransitioning(false);
          });
      }, 100);
    };

    video.addEventListener('ended', handleEnded);
    video.play().catch((err) => console.error('Initial video play error:', err));
    animationFrameId = requestAnimationFrame(checkFade);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (video) video.removeEventListener('ended', handleEnded);
    };
  }, [isTransitioning, videoEnabled]);

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
        <span style={{ color: tech.color }} className="flex items-center shrink-0 w-3 h-3 [&>svg]:w-full [&>svg]:h-full">
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

      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {videoEnabled && (
          <video
            ref={videoRef}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ opacity: 0 }}
            muted
            playsInline
          />
        )}
      </div>



      {/* Navbar */}
      <Navbar />

      {/* Hero copy */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full px-4 sm:px-6 lg:px-8">
        {/* Availability badge */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[0.6rem] sm:text-[0.65rem] font-mono font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-green-400/80">
            Available for Opportunities
          </span>
        </div>

        <h1 className="font-heading font-normal text-[32px] xs:text-[42px] sm:text-[68px] md:text-[88px] lg:text-[108px] xl:text-[128px] 2xl:text-[148px] leading-[1.02] tracking-[-0.024em] text-text-primary text-center">
          Piyush{' '}
          <span
            className="bg-clip-text text-transparent bg-linear-to-l"
            style={{ backgroundImage: 'linear-gradient(to left, #6366f1, #a855f7, #fcd34d)' }}
          >
            Landge
          </span>
        </h1>

        {/* Role tag */}
        <p className="font-heading text-[0.55rem] sm:text-[0.68rem] md:text-[0.72rem] font-bold uppercase tracking-[0.12em] sm:tracking-[0.22em] text-white/80 mt-3 sm:mt-4 text-center px-2 max-w-xl mx-auto leading-relaxed">
          <span className="inline-block whitespace-nowrap">AI Engineer</span>
          <span className="text-white/20 mx-2">|</span>
          <span className="inline-block whitespace-nowrap">ML &amp; DL</span>
          <span className="text-white/20 mx-2">|</span>
          <span className="inline-block whitespace-nowrap">Generative AI</span>
          <span className="text-white/20 mx-2">|</span>
          <span className="inline-block whitespace-nowrap">LLM</span>
          <span className="text-white/20 mx-2">|</span>
          <span className="inline-block whitespace-nowrap">AWS</span>
        </p>

        {/* Description */}
        <p className="font-sans text-white/90 text-[0.82rem] sm:text-[0.92rem] md:text-[0.98rem] leading-relaxed max-w-5xl mt-4 text-center px-4">
          AI Engineer focused on building intelligent applications using Machine Learning,
          <br className="hidden sm:inline" />
          Generative AI, LLMs, FastAPI, and Cloud Technologies.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-7 flex-wrap w-full px-4">
          <a
            href="#projects"
            className="bg-white text-black hover:bg-neutral-200 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-[0.68rem] sm:text-[0.72rem] font-bold uppercase tracking-widest cursor-pointer shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 transition-all duration-150"
          >
            <Search className="w-3.5 h-3.5" />
            Explore Projects
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-[0.68rem] sm:text-[0.72rem] font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2 border border-white/25 text-white/90 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            <Download className="w-3.5 h-3.5" />
            Download Resume
          </a>
        </div>
      </div>

      {/* ── Tech Stack Marquee ── */}
      <div className="w-full relative z-10 pb-8 sm:pb-12 pt-2 sm:pt-3">
        <p className="text-center text-[0.58rem] sm:text-[0.62rem] font-bold uppercase tracking-[0.22em] text-text-primary/25 mb-4 sm:mb-5 font-mono">
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
