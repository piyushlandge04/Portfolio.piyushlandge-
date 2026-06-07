import { useState, useEffect } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle, Loader2, Lock, ShieldCheck, MessageSquare, Settings, Trash2, X, Award, Plus } from 'lucide-react';

const Github = ({ size = 20, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 20, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <path d="M2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = ({ size = 20, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Contact() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x-relative', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y-relative', `${y}px`);
  };

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Admin Panel States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [adminTab, setAdminTab] = useState('messages'); // 'messages' | 'certificates' | 'settings'
  const [adminMessages, setAdminMessages] = useState([]);
  const [adminCertificates, setAdminCertificates] = useState([]);
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    date: '',
    credentialId: '',
    link: '',
    color: '#EE4C2C',
    logoText: 'DL'
  });
  
  // Settings values to sync with state
  const [bgVideo, setBgVideo] = useState(() => localStorage.getItem('bg_video_enabled') !== 'false');
  const [ambientGlow, setAmbientGlow] = useState(() => localStorage.getItem('ambient_glows_enabled') !== 'false');

  const [ambientEnabled, setAmbientEnabled] = useState(() => {
    return localStorage.getItem('ambient_glows_enabled') !== 'false';
  });

  useEffect(() => {
    const handleSettings = () => {
      setAmbientEnabled(localStorage.getItem('ambient_glows_enabled') !== 'false');
    };
    window.addEventListener('portfolio-settings-changed', handleSettings);
    return () => window.removeEventListener('portfolio-settings-changed', handleSettings);
  }, []);

  // Load certificates list for editing
  useEffect(() => {
    if (isAdminOpen && isAdminUnlocked) {
      const stored = localStorage.getItem('portfolio_certificates');
      if (stored) {
        setAdminCertificates(JSON.parse(stored));
      } else {
        const fallback = [
          {
            title: 'Deep Learning Specialization',
            issuer: 'DeepLearning.AI',
            date: 'March 2026',
            credentialId: 'COURSERA-DL-998',
            link: 'https://coursera.org/verify/specialization/deep-learning',
            color: '#EE4C2C',
            logoText: 'DL'
          },
          {
            title: 'AWS Certified Machine Learning – Specialty',
            issuer: 'Amazon Web Services (AWS)',
            date: 'January 2026',
            credentialId: 'AWS-ML-SPC-772',
            link: 'https://aws.amazon.com/verification',
            color: '#FF9900',
            logoText: 'AWS'
          },
          {
            title: 'Professional Machine Learning Engineer',
            issuer: 'Google Cloud (GCP)',
            date: 'November 2025',
            credentialId: 'GCP-PMLE-442',
            link: 'https://google.acredible.com',
            color: '#4285F4',
            logoText: 'GCP'
          },
          {
            title: 'Natural Language Processing Specialization',
            issuer: 'DeepLearning.AI',
            date: 'September 2025',
            credentialId: 'COURSERA-NLP-330',
            link: 'https://coursera.org/verify/specialization/nlp',
            color: '#00BFFF',
            logoText: 'NLP'
          }
        ];
        localStorage.setItem('portfolio_certificates', JSON.stringify(fallback));
        setAdminCertificates(fallback);
      }
    }
  }, [isAdminOpen, isAdminUnlocked]);

  const handleAddCertificate = (e) => {
    e.preventDefault();
    if (!newCert.title || !newCert.issuer) return;
    const updated = [...adminCertificates, newCert];
    setAdminCertificates(updated);
    localStorage.setItem('portfolio_certificates', JSON.stringify(updated));
    setNewCert({
      title: '',
      issuer: '',
      date: '',
      credentialId: '',
      link: '',
      color: '#EE4C2C',
      logoText: 'DL'
    });
    // Notify certificates component
    window.dispatchEvent(new Event('portfolio-certificates-changed'));
  };

  const handleDeleteCertificate = (idxToDelete) => {
    const updated = adminCertificates.filter((_, idx) => idx !== idxToDelete);
    setAdminCertificates(updated);
    localStorage.setItem('portfolio_certificates', JSON.stringify(updated));
    // Notify certificates component
    window.dispatchEvent(new Event('portfolio-certificates-changed'));
  };

  const handleResetCertificates = () => {
    if (window.confirm("Reset all certificates to default?")) {
      localStorage.removeItem('portfolio_certificates');
      const fallback = [
        {
          title: 'Deep Learning Specialization',
          issuer: 'DeepLearning.AI',
          date: 'March 2026',
          credentialId: 'COURSERA-DL-998',
          link: 'https://coursera.org/verify/specialization/deep-learning',
          color: '#EE4C2C',
          logoText: 'DL'
        },
        {
          title: 'AWS Certified Machine Learning – Specialty',
          issuer: 'Amazon Web Services (AWS)',
          date: 'January 2026',
          credentialId: 'AWS-ML-SPC-772',
          link: 'https://aws.amazon.com/verification',
          color: '#FF9900',
          logoText: 'AWS'
        },
        {
          title: 'Professional Machine Learning Engineer',
          issuer: 'Google Cloud (GCP)',
          date: 'November 2025',
          credentialId: 'GCP-PMLE-442',
          link: 'https://google.acredible.com',
          color: '#4285F4',
          logoText: 'GCP'
        },
        {
          title: 'Natural Language Processing Specialization',
          issuer: 'DeepLearning.AI',
          date: 'September 2025',
          credentialId: 'COURSERA-NLP-330',
          link: 'https://coursera.org/verify/specialization/nlp',
          color: '#00BFFF',
          logoText: 'NLP'
        }
      ];
      localStorage.setItem('portfolio_certificates', JSON.stringify(fallback));
      setAdminCertificates(fallback);
      // Notify certificates component
      window.dispatchEvent(new Event('portfolio-certificates-changed'));
    }
  };

  // Load messages from localStorage on panel open
  useEffect(() => {
    if (isAdminOpen && isAdminUnlocked) {
      const stored = localStorage.getItem('contact_messages');
      if (stored) {
        setAdminMessages(JSON.parse(stored));
      } else {
        // Fallback realistic mock data
        const fallback = [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            message: "Hey Piyush, love your portfolio! We are looking for an AI engineer who knows PyTorch and Generative AI for a contract role. Let's connect.",
            date: new Date(Date.now() - 3600000 * 3).toLocaleString()
          },
          {
            id: 2,
            name: "Sarah Jenkins",
            email: "sjenkins@tech-innovations.io",
            message: "Hi there, I saw your project pipeline and the custom attention layers. I'd love to chat about potential collaboration on an LLM fine-tuning project.",
            date: new Date(Date.now() - 3600000 * 25).toLocaleString()
          }
        ];
        localStorage.setItem('contact_messages', JSON.stringify(fallback));
        setAdminMessages(fallback);
      }
    }
  }, [isAdminOpen, isAdminUnlocked]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode.toUpperCase() === 'PIYUSHL04') {
      setIsAdminUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
      setTimeout(() => setPasscodeError(false), 2000);
    }
  };

  const handleDeleteMessage = (id) => {
    const updated = adminMessages.filter(msg => msg.id !== id);
    setAdminMessages(updated);
    localStorage.setItem('contact_messages', JSON.stringify(updated));
  };

  const handleClearAllMessages = () => {
    if (window.confirm("Are you sure you want to clear all messages?")) {
      setAdminMessages([]);
      localStorage.setItem('contact_messages', JSON.stringify([]));
    }
  };

  // Setting handlers
  const toggleSetting = (setting) => {
    if (setting === 'bgVideo') {
      const val = !bgVideo;
      setBgVideo(val);
      localStorage.setItem('bg_video_enabled', val ? 'true' : 'false');
    } else if (setting === 'ambientGlow') {
      const val = !ambientGlow;
      setAmbientGlow(val);
      localStorage.setItem('ambient_glows_enabled', val ? 'true' : 'false');
    }
    // Dispatch settings change event
    window.dispatchEvent(new Event('portfolio-settings-changed'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "df3f120f-1474-4070-ba46-54c32895755f",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`
        })
      });

      const data = await response.json();

      if (data.success) {
        // Save submission to localStorage for admin panel
        const newMsg = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          message: formData.message,
          date: new Date().toLocaleString()
        };
        const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
        localStorage.setItem('contact_messages', JSON.stringify([newMsg, ...existing]));

        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert(data.message || "Failed to send message. Please try again or contact me directly via email.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong. Please try again or contact me directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-10 pb-0 md:pt-12 md:pb-0 relative scroll-reveal scroll-reveal-init overflow-hidden">
      {/* Background Ambience */}
      {ambientEnabled && (
        <div className="ambient-glow glow-purple" style={{ bottom: '5%', left: '5%', opacity: 0.08 }}></div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-black text-text-primary text-center mb-4 tracking-tight">Get in <span className="bg-linear-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">Touch</span></h2>
        <p className="text-center max-w-[600px] mx-auto text-text-secondary text-base md:text-lg mb-16 font-sans">
          Have an exciting project idea, a position to fill, or simply want to say hello? Drop me a message below.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Info Column */}
          <div className="flex flex-col gap-6 text-left">
            <h3 className="text-2xl font-heading font-black text-white">Contact Information</h3>
            <p className="font-sans text-[1.05rem] text-text-secondary leading-relaxed">
              Feel free to reach out via email, social links, or phone. Let's create something together!
            </p>

            <div className="flex flex-col gap-6 mt-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-white shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[0.95rem] font-bold text-white">Email</h4>
                  <p className="text-text-secondary text-sm">piyushlandge4444@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-white shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[0.95rem] font-bold text-white">Location</h4>
                  <p className="text-text-secondary text-sm">Pune, Maharashtra</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-white shadow-sm">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[0.95rem] font-bold text-white">Phone</h4>
                  <p className="text-text-secondary text-sm">+91 87 67 87 8004</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-6">
              <a href="https://github.com/piyushlandge04" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:border-white/20 hover:shadow-md transition-all duration-200" aria-label="GitHub"><Github size={20} /></a>
              <a href="https://www.linkedin.com/in/piyushlandge04/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:border-white/20 hover:shadow-md transition-all duration-200" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="https://www.instagram.com/piyushlandge_04/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:border-white/20 hover:shadow-md transition-all duration-200" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Form Column */}
          <div 
            className="contact-form-wrapper glass-card p-6 sm:p-8 md:p-10 rounded-[28px] border border-white/5" 
            onMouseMove={handleMouseMove}
          >
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10 gap-5">
                <CheckCircle size={48} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] animate-[scaleIn_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]" />
                <h3 className="text-2xl font-black text-white">Message Dispatched</h3>
                <p className="text-text-secondary max-w-[340px] text-sm leading-relaxed">System sync successful. I have received your request and will establish communications shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Floating Label Name Input */}
                <div className="form-group relative w-full text-left">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                    className="peer w-full bg-neutral-900/50 border border-white/5 rounded-xl p-3.5 pt-6 pb-2 text-white focus:outline-none focus:border-white focus:bg-neutral-900 transition-all duration-200 font-medium text-[0.88rem]"
                    required
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-4 top-4 text-text-muted text-[0.85rem] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.85rem] peer-placeholder-shown:font-normal peer-focus:top-1.5 peer-focus:text-[0.7rem] peer-focus:text-white peer-focus:font-bold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:font-bold"
                  >
                    Name
                  </label>
                </div>

                {/* Floating Label Email Input */}
                <div className="form-group relative w-full text-left">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full bg-neutral-900/50 border border-white/5 rounded-xl p-3.5 pt-6 pb-2 text-white focus:outline-none focus:border-white focus:bg-neutral-900 transition-all duration-200 font-medium text-[0.88rem]"
                    required
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-4 top-4 text-text-muted text-[0.85rem] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.85rem] peer-placeholder-shown:font-normal peer-focus:top-1.5 peer-focus:text-[0.7rem] peer-focus:text-white peer-focus:font-bold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:font-bold"
                  >
                    Email
                  </label>
                </div>

                {/* Floating Label Message Input */}
                <div className="form-group relative w-full text-left">
                  <textarea
                    id="message"
                    name="message"
                    placeholder=" "
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="peer w-full bg-neutral-900/50 border border-white/5 rounded-xl p-4 pt-6 pb-2 text-white focus:outline-none focus:border-white focus:bg-neutral-900 transition-all duration-200 resize-none font-medium text-[0.88rem] h-32"
                    required
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-4 top-4 text-text-muted text-[0.85rem] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.85rem] peer-placeholder-shown:font-normal peer-focus:top-1.5 peer-focus:text-[0.7rem] peer-focus:text-white peer-focus:font-bold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:font-bold"
                  >
                    Message
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary bg-white text-black w-full py-3.5 rounded-xl font-heading font-bold inline-flex items-center justify-center gap-2 hover:bg-neutral-200 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-2 uppercase text-[0.68rem] tracking-wider shadow-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={13} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
 
      {/* Modern Premium Footer */}
      <footer className="border-t border-white/5 bg-neutral-950/60 backdrop-blur-md py-10 mt-12 md:mt-16 w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[0.68rem]">
          <p className="text-text-muted font-bold tracking-wide">&copy; {new Date().getFullYear()} PORTFOLIO.PIYUSHLANDGE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 text-text-muted font-bold tracking-wider uppercase items-center">
            <a href="#home" className="hover:text-white transition-colors">Back to Top</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Get in Touch</a>
            <button 
              onClick={() => setIsAdminOpen(true)} 
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-bold text-[0.68rem] uppercase bg-transparent border-0"
            >
              🔒 Admin
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Panel Modal Overlay */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-[fadeIn_0.25s_ease-out_forwards]">
          <div className="relative w-full max-w-2xl bg-neutral-900/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] font-sans">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-white/5 bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck size={18} className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]" />
                <h3 className="font-heading font-extrabold text-[0.95rem] tracking-wider uppercase">PORTFOLIO CONTROL CENTER</h3>
              </div>
              <button 
                onClick={() => {
                  setIsAdminOpen(false);
                  setIsAdminUnlocked(false);
                  setPasscode('');
                }} 
                className="p-1 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Content */}
            {!isAdminUnlocked ? (
              /* Passcode Screen */
              <div className="p-8 flex flex-col items-center justify-center text-center gap-6 py-12">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted">
                  <Lock size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-[0.95rem] mb-1">Enter Passcode</h4>
                  <p className="text-text-muted text-xs">Access is restricted to the administrator of this system.</p>
                </div>
                <form onSubmit={handleUnlock} className="w-full max-w-xs flex flex-col gap-3">
                  <input
                    type="password"
                    placeholder="Enter system passcode..."
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className={`w-full bg-black/50 border ${passcodeError ? 'border-red-500 animate-shake' : 'border-white/10'} rounded-xl p-3 text-center text-white text-sm focus:outline-none focus:border-white transition-all`}
                    autoFocus
                  />
                  {passcodeError && (
                    <p className="text-red-500 text-[0.68rem] font-bold tracking-wider uppercase">Authentication Failed</p>
                  )}
                  <button 
                    type="submit"
                    className="w-full bg-white text-black py-3 rounded-xl font-bold uppercase text-[0.68rem] tracking-wider hover:bg-neutral-200 transition-all cursor-pointer"
                  >
                    Authenticate
                  </button>
                </form>
              </div>
            ) : (
              /* Admin Workspace */
              <>
                {/* Tabs */}
                <div className="bg-black/20 px-5 border-b border-white/5 flex gap-4 text-xs font-mono">
                  <button
                    onClick={() => setAdminTab('messages')}
                    className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                      adminTab === 'messages'
                        ? 'border-white text-white font-bold'
                        : 'border-transparent text-text-muted hover:text-white'
                    }`}
                  >
                    <MessageSquare size={13} /> Form Submissions ({adminMessages.length})
                  </button>
                  <button
                    onClick={() => setAdminTab('certificates')}
                    className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                      adminTab === 'certificates'
                        ? 'border-white text-white font-bold'
                        : 'border-transparent text-text-muted hover:text-white'
                    }`}
                  >
                    <Award size={13} /> Certifications ({adminCertificates.length})
                  </button>
                  <button
                    onClick={() => setAdminTab('settings')}
                    className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                      adminTab === 'settings'
                        ? 'border-white text-white font-bold'
                        : 'border-transparent text-text-muted hover:text-white'
                    }`}
                  >
                    <Settings size={13} /> Site Controls
                  </button>
                </div>

                {/* Tab Views */}
                <div className="flex-1 overflow-y-auto p-5 min-h-[300px]">
                  {adminTab === 'messages' ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center text-[0.7rem] font-mono">
                        <span className="text-text-muted">MANAGE SUBMISSIONS</span>
                        {adminMessages.length > 0 && (
                          <button 
                            onClick={handleClearAllMessages}
                            className="text-red-400 hover:text-red-300 hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-0 font-bold"
                          >
                            <Trash2 size={12} /> CLEAR ALL
                          </button>
                        )}
                      </div>
                      
                      {adminMessages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center gap-3 py-12">
                          <MessageSquare size={32} className="text-white/15" />
                          <p className="text-text-muted text-xs font-mono">No submissions received in current local environment.</p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          {adminMessages.map((msg) => (
                            <div key={msg.id} className="p-4 bg-white/2 border border-white/5 rounded-2xl flex flex-col gap-2 relative group hover:border-white/10 transition-colors">
                              <div className="flex items-center justify-between text-xs">
                                <div className="text-left">
                                  <span className="text-white font-bold">{msg.name}</span>
                                  <span className="text-text-muted mx-2">•</span>
                                  <a href={`mailto:${msg.email}`} className="text-text-muted hover:text-white hover:underline transition-colors font-mono">{msg.email}</a>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-[0.65rem] text-text-muted font-mono">{msg.date}</span>
                                  <button 
                                    onClick={() => handleDeleteMessage(msg.id)}
                                    className="p-1 rounded-md text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                                    title="Delete Message"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                              <p className="text-text-secondary text-xs leading-relaxed text-left whitespace-pre-wrap">{msg.message}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : adminTab === 'certificates' ? (
                    /* Certificates CMS View */
                    <div className="flex flex-col gap-6 text-left">
                      <div className="flex justify-between items-center text-[0.7rem] font-mono">
                        <span className="text-text-muted uppercase">MANAGE CERTIFICATIONS ({adminCertificates.length})</span>
                        <button 
                          type="button"
                          onClick={handleResetCertificates}
                          className="text-white/60 hover:text-white hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-0 font-bold"
                        >
                          RESET DEFAULTS
                        </button>
                      </div>

                      {/* Add Certificate Form */}
                      <form onSubmit={handleAddCertificate} className="p-4 bg-white/2 border border-white/5 rounded-2xl flex flex-col gap-4">
                        <h4 className="text-white font-bold text-xs flex items-center gap-1.5 font-heading">
                          <Plus size={14} className="text-green-400" /> ADD NEW CERTIFICATE
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Certificate Title (e.g. Deep Learning Specialization)"
                            value={newCert.title}
                            onChange={(e) => setNewCert({...newCert, title: e.target.value})}
                            className="bg-black/40 border border-white/5 rounded-xl p-2.5 text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-white transition-colors"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Issuing Authority (e.g. DeepLearning.AI)"
                            value={newCert.issuer}
                            onChange={(e) => setNewCert({...newCert, issuer: e.target.value})}
                            className="bg-black/40 border border-white/5 rounded-xl p-2.5 text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-white transition-colors"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <input
                            type="text"
                            placeholder="Issue Date (e.g. March 2026)"
                            value={newCert.date}
                            onChange={(e) => setNewCert({...newCert, date: e.target.value})}
                            className="bg-black/40 border border-white/5 rounded-xl p-2.5 text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-white transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="Credential ID (e.g. DL-AI-998)"
                            value={newCert.credentialId}
                            onChange={(e) => setNewCert({...newCert, credentialId: e.target.value})}
                            className="bg-black/40 border border-white/5 rounded-xl p-2.5 text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-white transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="Verify Link URL (https://...)"
                            value={newCert.link}
                            onChange={(e) => setNewCert({...newCert, link: e.target.value})}
                            className="bg-black/40 border border-white/5 rounded-xl p-2.5 text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-white transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.62rem] text-text-muted font-mono uppercase pl-1">Theme Brand Color</label>
                            <select
                              value={newCert.color}
                              onChange={(e) => setNewCert({...newCert, color: e.target.value})}
                              className="bg-black/40 border border-white/5 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                            >
                              <option value="#EE4C2C">DL Red-Orange (#EE4C2C)</option>
                              <option value="#FF9900">AWS Orange (#FF9900)</option>
                              <option value="#4285F4">GCP Blue (#4285F4)</option>
                              <option value="#00BFFF">NLP Cyan (#00BFFF)</option>
                              <option value="#a855f7">Purple (#a855f7)</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.62rem] text-text-muted font-mono uppercase pl-1">Logo Text (e.g., AWS, GCP, DL)</label>
                            <input
                              type="text"
                              maxLength={4}
                              placeholder="Logo abbreviation (max 4 chars)"
                              value={newCert.logoText}
                              onChange={(e) => setNewCert({...newCert, logoText: e.target.value.toUpperCase()})}
                              className="bg-black/40 border border-white/5 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-white text-black py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-1"
                        >
                          <Plus size={14} /> Add Certificate
                        </button>
                      </form>

                      {/* Current Certificates List */}
                      <div className="flex flex-col gap-2.5 mt-2">
                        {adminCertificates.map((cert, idx) => (
                          <div key={idx} className="p-3.5 bg-white/2 border border-white/5 rounded-xl flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-9 h-9 rounded-lg border flex items-center justify-center font-mono font-bold text-[0.65rem] shrink-0"
                                style={{
                                  backgroundColor: `${cert.color}15`,
                                  borderColor: `${cert.color}35`,
                                  color: cert.color
                                }}
                              >
                                {cert.logoText}
                              </div>
                              <div className="text-left">
                                <h5 className="text-xs font-bold text-white leading-tight">{cert.title}</h5>
                                <p className="text-[0.68rem] text-text-muted mt-0.5">{cert.issuer} • {cert.date}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteCertificate(idx)}
                              className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                              title="Delete Certificate"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Settings Tab */
                    <div className="flex flex-col gap-6 text-left">
                      <p className="text-[0.7rem] text-text-muted font-mono tracking-wider uppercase mb-1">LOCAL RUNTIME FEATURE TOGGLES</p>
                      
                      <div className="flex flex-col gap-4">
                        
                        {/* Glow Toggle */}


                        {/* Video Toggle */}
                        <div className="flex items-center justify-between p-4 bg-white/2 border border-white/5 rounded-2xl">
                          <div>
                            <h4 className="text-white font-bold text-xs">Hero Background Video</h4>
                            <p className="text-text-muted text-[0.68rem] mt-0.5">Toggle the loops of ambient particle background videos on the landing page.</p>
                          </div>
                          <button
                            onClick={() => toggleSetting('bgVideo')}
                            className="bg-transparent border-0 p-1 cursor-pointer focus:outline-none animate-none"
                          >
                            <div className={`w-11 h-6 rounded-full flex items-center p-1 transition-all ${
                              bgVideo ? 'bg-white justify-end' : 'bg-neutral-800 justify-start border border-white/10'
                            }`}>
                              <div className={`w-4 h-4 rounded-full transition-all ${
                                bgVideo ? 'bg-black' : 'bg-neutral-600'
                              }`} />
                            </div>
                          </button>
                        </div>

                        {/* Ambient Glows Toggle */}
                        <div className="flex items-center justify-between p-4 bg-white/2 border border-white/5 rounded-2xl">
                          <div>
                            <h4 className="text-white font-bold text-xs">Dark Ambient Glow Circles</h4>
                            <p className="text-text-muted text-[0.68rem] mt-0.5">Toggle soft colored gradient background ambience spheres inside pages.</p>
                          </div>
                          <button
                            onClick={() => toggleSetting('ambientGlow')}
                            className="bg-transparent border-0 p-1 cursor-pointer focus:outline-none animate-none"
                          >
                            <div className={`w-11 h-6 rounded-full flex items-center p-1 transition-all ${
                              ambientGlow ? 'bg-white justify-end' : 'bg-neutral-800 justify-start border border-white/10'
                            }`}>
                              <div className={`w-4 h-4 rounded-full transition-all ${
                                ambientGlow ? 'bg-black' : 'bg-neutral-600'
                              }`} />
                            </div>
                          </button>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
