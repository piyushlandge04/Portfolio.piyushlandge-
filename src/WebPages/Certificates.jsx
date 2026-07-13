import { useState, useEffect } from 'react';
import { ExternalLink, Copy, Check, Calendar, Eye, X } from 'lucide-react';
import certificateMockup from '../assets/certificate_mockup.png';
import certDeepLearning from '../assets/cert_deep_learning.png';
import certVanderbilt from '../assets/cert_vanderbilt.png';
import certAWS from '../assets/cert_aws.png';
import certStanford from '../assets/cert_stanford.png';
import certGCP from '../assets/cert_gcp.png';
import certDuke from '../assets/cert_duke.png';
import certNLP from '../assets/cert_nlp.png';

const DEFAULT_CERTIFICATES = [
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: 'March 2026',
    credentialId: 'COURSERA-DL-998',
    link: 'https://coursera.org/verify/specialization/deep-learning',
    color: '#EE4C2C',
    logoText: 'DL',
    image: certDeepLearning,
  },
  {
    title: 'Generative AI Leader Specialization',
    issuer: 'Vanderbilt University (Coursera)',
    date: 'May 2026',
    credentialId: 'COURSERA-GENAI-LD-889',
    link: 'https://coursera.org/verify/specialization/gen-ai-leader',
    color: '#a855f7',
    logoText: 'GAI',
    image: certVanderbilt,
  },
  {
    title: 'AWS Certified Machine Learning – Specialty',
    issuer: 'Amazon Web Services (AWS)',
    date: 'January 2026',
    credentialId: 'AWS-ML-SPC-772',
    link: 'https://aws.amazon.com/verification',
    color: '#FF9900',
    logoText: 'AWS',
    image: certAWS,
  },
  {
    title: 'Advanced NLP & Prompt Engineering',
    issuer: 'Stanford Online',
    date: 'February 2026',
    credentialId: 'STANFORD-NLP-PE-119',
    link: 'https://online.stanford.edu/verification',
    color: '#ec4899',
    logoText: 'PE',
    image: certStanford,
  },
  {
    title: 'Professional Machine Learning Engineer',
    issuer: 'Google Cloud (GCP)',
    date: 'November 2025',
    credentialId: 'GCP-PMLE-442',
    link: 'https://google.acredible.com',
    color: '#4285F4',
    logoText: 'GCP',
    image: certGCP,
  },
  {
    title: 'MLOps Deployment & Pipeline Systems',
    issuer: 'Duke University (Coursera)',
    date: 'December 2025',
    credentialId: 'COURSERA-MLOPS-DK-404',
    link: 'https://coursera.org/verify/specialization/mlops-pipeline',
    color: '#10b981',
    logoText: 'OPS',
    image: certDuke,
  },
  {
    title: 'Natural Language Processing Specialization',
    issuer: 'DeepLearning.AI',
    date: 'September 2025',
    credentialId: 'COURSERA-NLP-330',
    link: 'https://coursera.org/verify/specialization/nlp',
    color: '#00BFFF',
    logoText: 'NLP',
    image: certNLP,
  },
];

const imageMap = {
  'Deep Learning Specialization': certDeepLearning,
  'Generative AI Leader Specialization': certVanderbilt,
  'AWS Certified Machine Learning – Specialty': certAWS,
  'Advanced NLP & Prompt Engineering': certStanford,
  'Professional Machine Learning Engineer': certGCP,
  'MLOps Deployment & Pipeline Systems': certDuke,
  'Natural Language Processing Specialization': certNLP,
};

export default function Certificates() {
  const [copiedId, setCopiedId] = useState(null);
  const [activeCertImage, setActiveCertImage] = useState(null);
  const [certificatesList, setCertificatesList] = useState(() => {
    let list = DEFAULT_CERTIFICATES;
    try {
      const stored = localStorage.getItem('portfolio_certificates');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed;
        }
      }
    } catch {
      /* ignore */
    }
    return list.map(cert => ({
      ...cert,
      image: imageMap[cert.title] || cert.image
    }));
  });

  useEffect(() => {
    const handleUpdate = () => {
      let list = DEFAULT_CERTIFICATES;
      try {
        const stored = localStorage.getItem('portfolio_certificates');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            list = parsed;
          }
        }
      } catch {
        /* ignore */
      }
      setCertificatesList(
        list.map(cert => ({
          ...cert,
          image: imageMap[cert.title] || cert.image
        }))
      );
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
    const tiltX = (yc - y) / 50;
    const tiltY = (x - xc) / 75;
    
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-3px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
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
      className="pt-16 pb-16 md:pt-32 md:pb-32 relative scroll-reveal overflow-hidden bg-[#050508] text-white border-y border-neutral-900"
    >
      {/* Background Ambience */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }}
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 relative overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
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
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              System Verifications
            </span>
          </div>

          <h2
            className="text-4xl md:text-6xl font-heading font-black text-white tracking-tight mb-5"
            style={{ letterSpacing: '-0.02em' }}
          >
            Verified Certifications
          </h2>
          <p
            className="text-neutral-400 text-base md:text-xl max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Verified professional credentials, specialization tracks, and industry certifications in
            AI Engineering.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {certificatesList.map((cert, index) => (
            <div
              key={index}
              className="group relative rounded-[32px] p-6 flex flex-col items-start gap-5 text-left h-full"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${cert.color}40`;
                e.currentTarget.style.boxShadow = `0 20px 40px ${cert.color}15, 0 10px 30px rgba(0, 0, 0, 0.5)`;
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
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

              {/* Certificate Image Preview */}
              <div 
                onClick={() => setActiveCertImage(cert.image || certificateMockup)}
                className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/40 relative shrink-0 z-2 select-none group/img cursor-zoom-in" 
                style={{ transform: 'translateZ(10px)' }}
              >
                <img 
                  src={cert.image || certificateMockup} 
                  alt={`${cert.title} preview`} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-[1.02] transition-all duration-500" 
                />
                {/* Click to View Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 text-white font-mono text-[0.62rem] font-bold uppercase tracking-wider">
                  <Eye size={12} />
                  <span>View Certificate</span>
                </div>
                {/* Badge Overlay */}
                <div 
                  className="absolute top-3 left-3 px-2 py-1 rounded-lg border text-[0.62rem] font-mono font-black shadow-xs tracking-wider select-none z-10"
                  style={{
                    backgroundColor: `${cert.color}15`,
                    borderColor: `${cert.color}35`,
                    color: cert.color
                  }}
                >
                  {cert.logoText}
                </div>
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
                  className="font-bold text-neutral-300 opacity-90"
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
                    color: 'rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                    <Calendar size={11} className="text-white/60" />
                    <span className="text-white/80">{cert.date}</span>
                  </div>

                  <button
                    onClick={(e) => handleCopyId(cert.credentialId, e)}
                    title="Copy Credential ID"
                    className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md border border-white/5 hover:border-white/10 transition-all cursor-pointer text-neutral-400 hover:text-white"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: copiedId === cert.credentialId ? '#4ade80' : 'inherit',
                    }}
                  >
                    {copiedId === cert.credentialId ? (
                      <Check size={11} style={{ color: '#4ade80' }} />
                    ) : (
                      <Copy size={11} />
                    )}
                    <span>ID: {cert.credentialId}</span>
                  </button>
                </div>

                {/* Footer verification actions */}
                <div
                  className="flex flex-col gap-3 mt-auto pt-5 w-full"
                  style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                  {/* Verified Badge */}
                  <span
                    className="flex items-center gap-2.5 font-bold uppercase shrink-0"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      letterSpacing: '0.1em',
                      color: 'rgba(255, 255, 255, 0.4)',
                    }}
                  >
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: '#4ade80' }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2.5 w-2.5"
                        style={{ backgroundColor: '#4ade80' }}
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
                    className="flex items-center justify-center gap-1.5 font-bold transition-all duration-300 px-3 py-2 rounded-lg border border-white/5 hover:border-white/20 hover:bg-white/5 w-full text-center"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'rgba(255, 255, 255, 0.6)',
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

      {/* Lightbox / View Modal Overlay */}
      {activeCertImage && (
        <div 
          onClick={() => setActiveCertImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-all duration-300 animate-cert-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-neutral-900 rounded-3xl p-2.5 overflow-hidden shadow-2xl flex flex-col items-center justify-center animate-cert-scale-up border border-neutral-800"
          >
            <button 
              onClick={() => setActiveCertImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/90 hover:bg-neutral-800 text-white transition-all cursor-pointer z-10 shadow-lg"
              aria-label="Close Preview"
            >
              <X size={16} />
            </button>
            <img 
              src={activeCertImage} 
              alt="Certificate Verified Copy" 
              className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain border border-neutral-800 shadow-2xl"
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes certFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes certScaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-cert-fade-in {
          animation: certFadeIn 0.2s ease-out forwards;
        }
        .animate-cert-scale-up {
          animation: certScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
