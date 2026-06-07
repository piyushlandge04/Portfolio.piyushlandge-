import { useState, useEffect } from 'react';
import { Award, ExternalLink, ShieldCheck, Copy, Check, Calendar } from 'lucide-react';

const DEFAULT_CERTIFICATES = [
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: 'March 2026',
    credentialId: 'COURSERA-DL-998',
    link: 'https://coursera.org/verify/specialization/deep-learning',
    color: '#EE4C2C', // Orange-red PyTorch style
    logoText: 'DL'
  },
  {
    title: 'AWS Certified Machine Learning – Specialty',
    issuer: 'Amazon Web Services (AWS)',
    date: 'January 2026',
    credentialId: 'AWS-ML-SPC-772',
    link: 'https://aws.amazon.com/verification',
    color: '#FF9900', // AWS Orange
    logoText: 'AWS'
  },
  {
    title: 'Professional Machine Learning Engineer',
    issuer: 'Google Cloud (GCP)',
    date: 'November 2025',
    credentialId: 'GCP-PMLE-442',
    link: 'https://google.acredible.com',
    color: '#4285F4', // Google Blue
    logoText: 'GCP'
  },
  {
    title: 'Natural Language Processing Specialization',
    issuer: 'DeepLearning.AI',
    date: 'September 2025',
    credentialId: 'COURSERA-NLP-330',
    link: 'https://coursera.org/verify/specialization/nlp',
    color: '#00BFFF', // Cyan NLP style
    logoText: 'NLP'
  }
];

export default function Certificates() {
  const [copiedId, setCopiedId] = useState(null);
  const [certificatesList, setCertificatesList] = useState(() => {
    const stored = localStorage.getItem('portfolio_certificates');
    if (stored) return JSON.parse(stored);
    return DEFAULT_CERTIFICATES;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const stored = localStorage.getItem('portfolio_certificates');
      if (stored) {
        setCertificatesList(JSON.parse(stored));
      } else {
        setCertificatesList(DEFAULT_CERTIFICATES);
      }
    };
    window.addEventListener('portfolio-certificates-changed', handleUpdate);
    return () => window.removeEventListener('portfolio-certificates-changed', handleUpdate);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x-relative', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y-relative', `${y}px`);
  };

  const handleCopyId = (id, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="certificates" className="pt-16 pb-12 md:pt-20 md:pb-16 relative scroll-reveal scroll-reveal-init bg-bg-primary overflow-hidden">
      {/* Background Ambience */}
      <div className="ambient-glow glow-purple" style={{ top: '10%', right: '5%', opacity: 0.08 }}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-black text-text-primary text-center mb-4 tracking-tight">
          Verified <span className="bg-linear-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">Certifications</span>
        </h2>
        <p className="text-center max-w-[600px] mx-auto text-text-secondary text-base md:text-lg mb-16 font-sans">
          Verified professional credentials, specialization tracks, and industry certifications in AI Engineering.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {certificatesList.map((cert, index) => (
            <div 
              key={index} 
              className="certificate-card glass-card p-6 sm:p-7 rounded-[28px] border border-white/5 flex flex-col sm:flex-row items-start gap-5 hover:border-white/10 hover:shadow-2xl transition-all duration-300 text-left group relative"
              onMouseMove={handleMouseMove}
            >
              {/* Card Mouse Glow Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[28px]"
                style={{
                  background: `radial-gradient(350px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), ${cert.color}0d, transparent 80%)`
                }}
              />

              {/* Icon Container */}
              <div 
                className="w-12 h-12 rounded-2xl border flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: `${cert.color}15`,
                  borderColor: `${cert.color}35`,
                  color: cert.color
                }}
              >
                {cert.logoText}
              </div>

              {/* Details */}
              <div className="grow flex flex-col w-full relative z-10">
                <h3 className="text-[1.15rem] font-black text-white mb-1 group-hover:text-white transition-colors">
                  {cert.title}
                </h3>
                <span className="text-[0.88rem] font-bold text-text-secondary">
                  {cert.issuer}
                </span>
                
                {/* Meta details with icons */}
                <div className="flex flex-wrap gap-4 mt-3 text-text-muted font-mono text-[0.68rem] uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    <span>{cert.date}</span>
                  </div>
                  <button 
                    onClick={(e) => handleCopyId(cert.credentialId, e)}
                    className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer bg-transparent border-0 font-mono text-[0.68rem] uppercase"
                    title="Copy Credential ID"
                  >
                    {copiedId === cert.credentialId ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                    <span>ID: {cert.credentialId}</span>
                  </button>
                </div>
                
                {/* Footer bar */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-5 font-mono text-[0.68rem]">
                  <span className="text-green-400/90 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    Verified Clearance
                  </span>
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 font-bold text-text-muted hover:text-white transition-all duration-200"
                    aria-label={`Verify credential for ${cert.title}`}
                  >
                    Verify Credential <ExternalLink size={11} />
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
