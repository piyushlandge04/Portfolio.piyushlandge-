import { useState } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

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



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('contact_messages')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              message: formData.message
            }
          ]);
        if (error) throw error;
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
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
          setSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setSubmitted(false), 5000);
        } else {
          alert(data.message || "Failed to send message. Please try again or contact me directly via email.");
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong. Please try again or contact me directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-10 pb-0 md:pt-32 md:pb-0 relative scroll-reveal overflow-hidden bg-bg-primary">
      {/* Background Ambience */}
      <div aria-hidden="true" className="ambient-glow glow-purple" style={{ position: 'absolute', bottom: '10%', left: '10%', opacity: 0.05, width: '450px', height: '450px', borderRadius: '9999px', background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-4xl md:text-6xl font-heading font-black text-black text-center mb-4 tracking-tight">
          Get in Touch
        </h2>
        <p className="text-center max-w-[600px] mx-auto text-text-secondary text-base md:text-xl mb-8 md:mb-16 font-sans leading-relaxed opacity-90">
          Have an exciting project idea, a position to fill, or simply want to say hello? Drop me a message below.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
          {/* Info Column */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div>
              <h3 className="text-2xl font-heading font-black text-text-primary mb-3 tracking-tight">Contact Information</h3>
              <p className="font-sans text-[1.05rem] text-text-secondary leading-relaxed opacity-85">
                Feel free to reach out via email, social links, or phone. Let's create something together!
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Email micro-card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-text-primary/1 border border-text-primary/5 hover:border-text-primary/10 hover:bg-text-primary/2 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-text-primary/3 border border-text-primary/5 flex items-center justify-center text-text-secondary">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-[0.62rem] font-bold text-text-muted font-mono uppercase tracking-wider">Email</h4>
                  <a href="mailto:piyushlandge4444@gmail.com" className="text-text-primary text-sm hover:underline font-semibold mt-0.5 block">piyushlandge4444@gmail.com</a>
                </div>
              </div>

              {/* Location micro-card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-text-primary/1 border border-text-primary/5 hover:border-text-primary/10 hover:bg-text-primary/2 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-text-primary/3 border border-text-primary/5 flex items-center justify-center text-text-secondary">
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 className="text-[0.62rem] font-bold text-text-muted font-mono uppercase tracking-wider">Location</h4>
                  <p className="text-text-primary text-sm font-semibold mt-0.5">Pune, Maharashtra</p>
                </div>
              </div>

              {/* Phone micro-card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-text-primary/1 border border-text-primary/5 hover:border-text-primary/10 hover:bg-text-primary/2 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-text-primary/3 border border-text-primary/5 flex items-center justify-center text-text-secondary">
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="text-[0.62rem] font-bold text-text-muted font-mono uppercase tracking-wider">Phone</h4>
                  <a href="tel:+918767878004" className="text-text-primary text-sm hover:underline font-semibold mt-0.5 block">+91 87 67 87 8004</a>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4 items-center">
              <a href="https://github.com/piyushlandge04" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-text-primary/1 border border-text-primary/5 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary/20 hover:bg-text-primary/5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]" aria-label="GitHub"><Github size={18} /></a>
              <a href="https://www.linkedin.com/in/piyushlandge04/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-text-primary/1 border border-text-primary/5 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary/20 hover:bg-text-primary/5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(66,133,244,0.3)]" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="https://www.instagram.com/piyushlandge_04/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-text-primary/1 border border-text-primary/5 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary/20 hover:bg-text-primary/5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(238,76,44,0.3)]" aria-label="Instagram"><Instagram size={18} /></a>
            </div>
          </div>

          {/* Form Column */}
          <div 
            className="lg:col-span-7 contact-form-wrapper glass-card p-6 sm:p-9 md:p-11 rounded-[32px] border border-text-primary/5 relative overflow-hidden" 
            onMouseMove={handleMouseMove}
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            {/* Shimmer overlay */}
            <div 
              aria-hidden="true"
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x-relative, 0px) var(--mouse-y-relative, 0px), rgba(255, 255, 255, 0.03), transparent 75%)`
              }}
            />

            {submitted ? (
              <div className="flex flex-col items-center text-center py-12 gap-5 relative z-10">
                <CheckCircle size={52} className="text-text-primary drop-shadow-[0_0_12px_rgba(0,0,0,0.3)] animate-[scaleIn_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]" />
                <h3 className="text-2xl font-black text-text-primary font-heading">Message Dispatched</h3>
                <p className="text-text-secondary max-w-[340px] text-sm leading-relaxed font-sans opacity-95">
                  System sync successful. I have received your request and will establish communications shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                {/* Floating Label Name Input */}
                <div className="form-group relative w-full text-left">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                    className="peer w-full bg-white/40 border border-text-primary/5 rounded-2xl p-4 pt-6 pb-2 text-text-primary focus:outline-none focus:border-text-primary/30 focus:bg-white transition-all duration-300 font-medium text-[0.88rem]"
                    required
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-4 top-4 text-text-muted text-[0.85rem] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.85rem] peer-placeholder-shown:font-normal peer-focus:top-1.5 peer-focus:text-[0.7rem] peer-focus:text-text-primary peer-focus:font-bold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:font-bold"
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
                    className="peer w-full bg-white/40 border border-text-primary/5 rounded-2xl p-4 pt-6 pb-2 text-text-primary focus:outline-none focus:border-text-primary/30 focus:bg-white transition-all duration-300 font-medium text-[0.88rem]"
                    required
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-4 top-4 text-text-muted text-[0.85rem] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.85rem] peer-placeholder-shown:font-normal peer-focus:top-1.5 peer-focus:text-[0.7rem] peer-focus:text-text-primary peer-focus:font-bold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:font-bold"
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
                    className="peer w-full bg-white/40 border border-text-primary/5 rounded-2xl p-4 pt-6 pb-2 text-text-primary focus:outline-none focus:border-text-primary/30 focus:bg-white transition-all duration-300 resize-none font-medium text-[0.88rem] h-32"
                    required
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-4 top-4 text-text-muted text-[0.85rem] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.85rem] peer-placeholder-shown:font-normal peer-focus:top-1.5 peer-focus:text-[0.7rem] peer-focus:text-text-primary peer-focus:font-bold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:font-bold"
                  >
                    Message
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary bg-text-primary text-white w-full py-4 rounded-2xl font-black inline-flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-98 transition-all duration-300 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-2 uppercase text-[0.7rem] tracking-wider shadow-lg hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] font-sans"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin text-white" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={13} className="text-white" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
 
      {/* Modern Premium Footer */}
      <footer className="border-t border-text-primary/5 bg-white/60 backdrop-blur-md pt-16 pb-12 mt-20 md:mt-28 w-full relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-10 font-sans text-[0.68rem]">
          
          {/* Top section: Brand/Description and Navigation Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-text-primary/5 pb-10">
            {/* Brand & Bio column */}
            <div className="md:col-span-6 flex flex-col gap-3 text-left">
              <span className="font-heading font-black text-sm tracking-tight text-text-primary flex items-center gap-1.5">
                <span>Piyush Landge</span>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#1D9BF0] text-white shrink-0 inline-block align-middle" aria-label="Verified Developer">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.941.1-1.356.275C14.77 2.52 13.435 1.5 11.9 1.5c-1.535 0-2.87 1.02-3.516 2.285C7.97 3.6 7.51 3.5 7.03 3.5c-2.11 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .941-.1 1.356-.275C9.03 21.48 10.365 22.5 11.9 22.5c1.535 0 2.87-1.02 3.516-2.285.415.175.876.275 1.356.275 2.11 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.72 3.99L5.35 12.23l1.41-1.42 3.02 3.02 6.67-6.67 1.41 1.41-8.08 8.08z"/>
                </svg>
                <span className="text-text-primary/50 font-medium">| AI Engineer</span>
              </span>
              <p className="text-[0.72rem] text-text-muted leading-relaxed max-w-md font-medium">
                AI Engineer &amp; Computer Science Graduate specializing in Machine Learning, Generative AI, and modern backend architectures. Building intelligent applications to solve real-world problems.
              </p>
            </div>
            
            {/* Quick Links Column */}
            <div className="md:col-span-3 flex flex-col gap-3 text-left">
              <span className="font-bold tracking-wider uppercase text-text-primary text-[0.62rem]">Quick Links</span>
              <div className="flex flex-col gap-2 font-bold tracking-wider uppercase text-text-muted">
                <a href="#home" className="hover:text-text-primary hover:translate-x-0.5 transition-all duration-200 block">Back to Top</a>
                <a href="#about" className="hover:text-text-primary hover:translate-x-0.5 transition-all duration-200 block">About</a>
                <a href="#projects" className="hover:text-text-primary hover:translate-x-0.5 transition-all duration-200 block">Projects</a>
                <a href="#contact" className="hover:text-text-primary hover:translate-x-0.5 transition-all duration-200 block">Get in Touch</a>
              </div>
            </div>

            {/* Social Connect Column */}
            <div className="md:col-span-3 flex flex-col gap-3 text-left">
              <span className="font-bold tracking-wider uppercase text-text-primary text-[0.62rem]">Connect</span>
              <div className="flex flex-col gap-2 font-bold tracking-wider uppercase text-text-muted">
                <a href="mailto:piyushlandge4444@gmail.com" className="hover:text-text-primary hover:translate-x-0.5 transition-all duration-200 block">Email</a>
                <a href="https://github.com/piyushlandge04" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary hover:translate-x-0.5 transition-all duration-200 block">GitHub</a>
                <a href="https://www.linkedin.com/in/piyushlandge04/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary hover:translate-x-0.5 transition-all duration-200 block">LinkedIn</a>
                <a href="https://www.instagram.com/piyushlandge_04/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary hover:translate-x-0.5 transition-all duration-200 block">Instagram</a>
              </div>
            </div>
          </div>

          {/* Bottom section: Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-text-muted font-bold tracking-wider">
            <p>Copyright &copy; {new Date().getFullYear()} portfolio.piyushlandge. All rights reserved.</p>
          </div>

        </div>
      </footer>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
