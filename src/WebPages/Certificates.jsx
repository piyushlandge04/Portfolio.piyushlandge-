import React from 'react';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Certificates() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x-relative', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y-relative', `${y}px`);
  };

  const certificatesList = [
    {
      title: 'Neural Networks & Deep Learning',
      issuer: 'DeepLearning.AI',
      date: 'March 2026',
      credentialId: 'DL-AI-99824X',
      link: '#',
      icon: <Award size={20} className="text-accent-cyan animate-pulse" />
    },
    {
      title: 'Professional Cloud Machine Learning',
      issuer: 'Google Cloud Certifications',
      date: 'January 2026',
      credentialId: 'GCP-ML-77215B',
      link: '#',
      icon: <Award size={20} className="text-accent-purple" />
    },
    {
      title: 'Advanced AI Application Developer',
      issuer: 'Meta Career Certifications',
      date: 'November 2025',
      credentialId: 'META-AI-44211A',
      link: '#',
      icon: <Award size={20} className="text-accent-pink" />
    },
    {
      title: 'Data Systems & Backend Architecture',
      issuer: 'IBM Professional Certifications',
      date: 'August 2025',
      credentialId: 'IBM-DB-33019C',
      link: '#',
      icon: <Award size={20} className="text-accent-green" />
    }
  ];

  return (
    <section id="certificates" className="pt-16 pb-12 md:pt-20 md:pb-16 relative scroll-reveal scroll-reveal-init bg-bg-primary">
      {/* Background Ambience */}
      <div className="ambient-glow glow-purple" style={{ top: '10%', right: '5%', opacity: 0.15 }}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text-primary text-center mb-4 tracking-tight">Verified <span className="bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">Clearances</span></h2>
        <p className="text-center max-w-[600px] mx-auto text-text-secondary text-lg mb-16">
          System certifications and verified professional clearances in AI engineering and database systems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {certificatesList.map((cert, index) => (
            <div 
              key={index} 
              className="certificate-card glass-card p-5 sm:p-6 rounded-[20px] flex flex-col sm:flex-row items-start gap-4 sm:gap-5 hover:border-accent-cyan/40 hover:shadow-[0_8px_30px_rgba(0,255,255,0.08)] transition-all duration-300 text-left group"
              onMouseMove={handleMouseMove}
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-bg-secondary border border-border-color/50 flex items-center justify-center text-text-primary shrink-0 group-hover:scale-105 transition-transform duration-300">
                {cert.icon}
              </div>

              {/* Details */}
              <div className="flex-grow flex flex-col">
                <h3 className="text-[1.15rem] font-bold text-text-primary mb-1 group-hover:text-accent-cyan transition-colors">{cert.title}</h3>
                <span className="text-sm font-semibold text-text-secondary">{cert.issuer}</span>
                <span className="text-xs text-text-muted mt-2 font-mono uppercase tracking-wider">Issued: {cert.date}</span>
                <span className="text-[0.65rem] text-text-muted font-mono uppercase tracking-wider mt-0.5">ID: {cert.credentialId}</span>
                
                <div className="flex items-center justify-between border-t border-border-color/30 pt-4 mt-4 font-mono text-[0.7rem]">
                  <span className="text-accent-green font-semibold flex items-center gap-1.5 uppercase">
                    <ShieldCheck size={14} className="stroke-[2.5]" /> verified_node
                  </span>
                  <a href={cert.link} className="flex items-center gap-1.5 font-bold text-text-muted hover:text-text-primary transition-colors duration-200" aria-label={`View credential for ${cert.title}`}>
                    VERIFY <ExternalLink size={12} />
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
