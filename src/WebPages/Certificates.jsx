import { useState, useEffect } from 'react';
import { ExternalLink, Copy, Check, Calendar, ShieldCheck, Award } from 'lucide-react';

const DEFAULT_CERTIFICATES = [
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: 'March 2026',
    credentialId: 'COURSERA-DL-998',
    link: 'https://coursera.org/verify/specialization/deep-learning',
    color: '#EE4C2C',
    logoText: 'DL',
  },
  {
    title: 'Generative AI Leader Specialization',
    issuer: 'Vanderbilt University (Coursera)',
    date: 'May 2026',
    credentialId: 'COURSERA-GENAI-LD-889',
    link: 'https://coursera.org/verify/specialization/gen-ai-leader',
    color: '#a855f7',
    logoText: 'GAI',
  },
  {
    title: 'AWS Certified Machine Learning – Specialty',
    issuer: 'Amazon Web Services (AWS)',
    date: 'January 2026',
    credentialId: 'AWS-ML-SPC-772',
    link: 'https://aws.amazon.com/verification',
    color: '#FF9900',
    logoText: 'AWS',
  },
  {
    title: 'Advanced NLP & Prompt Engineering',
    issuer: 'Stanford Online',
    date: 'February 2026',
    credentialId: 'STANFORD-NLP-PE-119',
    link: 'https://online.stanford.edu/verification',
    color: '#ec4899',
    logoText: 'PE',
  },
  {
    title: 'Professional Machine Learning Engineer',
    issuer: 'Google Cloud (GCP)',
    date: 'November 2025',
    credentialId: 'GCP-PMLE-442',
    link: 'https://google.acredible.com',
    color: '#4285F4',
    logoText: 'GCP',
  },
  {
    title: 'MLOps Deployment & Pipeline Systems',
    issuer: 'Duke University (Coursera)',
    date: 'December 2025',
    credentialId: 'COURSERA-MLOPS-DK-404',
    link: 'https://coursera.org/verify/specialization/mlops-pipeline',
    color: '#10b981',
    logoText: 'OPS',
  },
  {
    title: 'Natural Language Processing Specialization',
    issuer: 'DeepLearning.AI',
    date: 'September 2025',
    credentialId: 'COURSERA-NLP-330',
    link: 'https://coursera.org/verify/specialization/nlp',
    color: '#00BFFF',
    logoText: 'NLP',
  },
];

export default function Certificates() {
  const [copiedId, setCopiedId] = useState(null);
  const [certificatesList, setCertificatesList] = useState(() => {
    try {
      const stored = localStorage.getItem('portfolio_certificates');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      /* corrupted localStorage — ignore */
    }
    return DEFAULT_CERTIFICATES;
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem('portfolio_certificates');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCertificatesList(parsed);
            return;
          }
        }
      } catch (e) {
        /* ignore */
      }
      setCertificatesList(DEFAULT_CERTIFICATES);
    };
    window.addEventListener('portfolio-certificates-changed', handleUpdate);
    return () => window.removeEventListener('portfolio-certificates-changed', handleUpdate);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mx', `${x}px`);
    e.currentTarget.style.setProperty('--my', `${y}px`);
    
    // Tilt calculations
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const tiltX = (yc - y) / 16;
    const tiltY = (x - xc) / 24;
    
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
  };

  const handleCopyId = (id, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="certificates"
      className="pt-10 pb-10 md:pt-32 md:pb-32 relative scroll-reveal overflow-hidden bg-bg-primary"
    >
      {/* Background radial overlays for hyper-premium visual depth */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '9999px',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '9999px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              System Verifications
            </span>
          </div>

          <h2
            className="text-4xl md:text-6xl font-heading font-black text-text-primary tracking-tight mb-5"
            style={{ letterSpacing: '-0.02em' }}
          >
            Verified{' '}
            <span
              style={{
                background: 'linear-gradient(to right, #ffffff, #a3a3a3 50%, #525252)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Certifications
            </span>
          </h2>
          <p
            className="text-text-secondary text-base md:text-xl max-w-2xl mx-auto font-sans leading-relaxed opacity-90"
          >
            Verified professional credentials, specialization tracks, and industry certifications in
            AI Engineering.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {certificatesList.map((cert, index) => (
            <div
              key={index}
              className="group relative rounded-[32px] p-7 sm:p-8 flex flex-col sm:flex-row items-start gap-6 text-left"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${cert.color}40`;
                e.currentTarget.style.boxShadow = `0 12px 40px ${cert.color}12, 0 4px 30px rgba(0,0,0,0.4)`;
                e.currentTarget.style.background = 'rgba(255,255,255,0.045)';
              }}
            >
              {/* Dynamic mouse overlay shimmer */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), ${cert.color}15, transparent 80%)`,
                }}
              />

              {/* Logo Badge Container */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  minWidth: '56px',
                  borderRadius: '20px',
                  background: `${cert.color}10`,
                  border: `1px solid ${cert.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: cert.color,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900,
                  fontSize: '0.78rem',
                  letterSpacing: '0.05em',
                  transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s ease',
                  position: 'relative',
                  zIndex: 2,
                  boxShadow: `inset 0 2px 6px ${cert.color}15`,
                  transform: 'translateZ(10px)'
                }}
                className="group-hover:scale-105 group-hover:border-opacity-100"
              >
                {cert.logoText}
              </div>

              {/* Details & Copy Actions */}
              <div className="flex flex-col grow w-full relative" style={{ zIndex: 2, transform: 'translateZ(15px)' }}>
                <h3
                  className="text-white font-black mb-1.5 tracking-tight group-hover:text-white transition-colors duration-200"
                  style={{ fontSize: '1.18rem', lineHeight: '1.3', fontFamily: 'var(--font-heading)' }}
                >
                  {cert.title}
                </h3>
                <span
                  className="font-bold text-text-secondary opacity-90"
                  style={{ fontSize: '0.86rem', fontFamily: 'var(--font-sans)' }}
                >
                  {cert.issuer}
                </span>

                {/* Info row */}
                <div
                  className="flex flex-wrap gap-4 mt-4"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                  }}
                >
                  <div className="flex items-center gap-1.5 bg-white/2 px-2.5 py-1 rounded-md border border-white/5">
                    <Calendar size={11} className="text-white/60" />
                    <span className="text-white/80">{cert.date}</span>
                  </div>

                  <button
                    onClick={(e) => handleCopyId(cert.credentialId, e)}
                    title="Copy Credential ID"
                    className="flex items-center gap-1.5 bg-white/2 hover:bg-white/5 px-2.5 py-1 rounded-md border border-white/5 hover:border-white/10 transition-all cursor-pointer text-text-muted hover:text-white"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: copiedId === cert.credentialId ? '#22c55e' : 'inherit',
                    }}
                  >
                    {copiedId === cert.credentialId ? (
                      <Check size={11} style={{ color: '#22c55e' }} />
                    ) : (
                      <Copy size={11} />
                    )}
                    <span>ID: {cert.credentialId}</span>
                  </button>
                </div>

                {/* Footer verification actions */}
                <div
                  className="flex items-center justify-between mt-6 pt-5"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {/* Verified Badge */}
                  <span
                    className="flex items-center gap-2.5 font-bold uppercase"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      letterSpacing: '0.1em',
                      color: '#4ade80',
                    }}
                  >
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: '#22c55e' }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2.5 w-2.5"
                        style={{ backgroundColor: '#22c55e' }}
                      />
                    </span>
                    Verified Clearance
                  </span>

                  {/* Verification Link Button */}
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify credential for ${cert.title}`}
                    className="flex items-center gap-1.5 font-bold transition-all duration-300 px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/20 hover:bg-white/5"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
