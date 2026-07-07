import { useState, useEffect } from 'react';
import { ExternalLink, Copy, Check, Calendar } from 'lucide-react';
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
    } catch (e) {
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
      } catch (e) {
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
    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)';
    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.03)';
    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)';
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


      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 relative overflow-hidden"
            style={{
              background: 'rgba(0, 0, 0, 0.02)',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500"></span>
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
            className="text-4xl md:text-6xl font-heading font-black text-black tracking-tight mb-5"
            style={{ letterSpacing: '-0.02em' }}
          >
            Verified Certifications
          </h2>
          <p
            className="text-text-secondary text-base md:text-xl max-w-2xl mx-auto font-sans leading-relaxed opacity-90"
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
              style={{
                background: 'rgba(0, 0, 0, 0.02)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
              }}
            >
              {/* Dynamic mouse overlay shimmer */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(0, 0, 0, 0.03), transparent 80%)',
                }}
              />

              {/* Certificate Image Preview */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-text-primary/5 bg-bg-secondary relative shrink-0 z-2 select-none" style={{ transform: 'translateZ(10px)' }}>
                <img 
                  src={cert.image || certificateMockup} 
                  alt={`${cert.title} preview`} 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-[1.02] transition-all duration-500" 
                />
                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 px-2 py-1 rounded-lg border border-text-primary/10 bg-white/95 backdrop-blur-md text-[0.62rem] font-mono font-black text-text-primary shadow-xs tracking-wider select-none">
                  {cert.logoText}
                </div>
              </div>

              {/* Details & Copy Actions */}
              <div className="flex flex-col grow w-full relative" style={{ zIndex: 2, transform: 'translateZ(15px)' }}>
                <h3
                  className="text-text-primary font-black mb-1.5 tracking-tight group-hover:text-text-primary transition-colors duration-200"
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
                  <div className="flex items-center gap-1.5 bg-text-primary/2 px-2.5 py-1 rounded-md border border-text-primary/5">
                    <Calendar size={11} className="text-text-primary/60" />
                    <span className="text-text-primary/80">{cert.date}</span>
                  </div>

                  <button
                    onClick={(e) => handleCopyId(cert.credentialId, e)}
                    title="Copy Credential ID"
                    className="flex items-center gap-1.5 bg-text-primary/2 hover:bg-text-primary/5 px-2.5 py-1 rounded-md border border-text-primary/5 hover:border-text-primary/10 transition-all cursor-pointer text-text-muted hover:text-text-primary"
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
                  className="flex flex-col gap-3 mt-auto pt-5 w-full"
                  style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}
                >
                  {/* Verified Badge */}
                  <span
                    className="flex items-center gap-2.5 font-bold uppercase shrink-0"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      letterSpacing: '0.1em',
                      color: 'var(--text-muted)',
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
                    className="flex items-center justify-center gap-1.5 font-bold transition-all duration-300 px-3 py-2 rounded-lg border border-text-primary/5 hover:border-text-primary/20 hover:bg-text-primary/5 w-full text-center"
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
