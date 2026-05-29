import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';

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
    <rect width="4" height="12" x="2" y="9" />
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
      <div className="ambient-glow glow-pink"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text-primary text-center mb-4 tracking-tight">Get in <span className="bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">Touch</span></h2>
        <p className="text-center max-w-[600px] mx-auto text-text-secondary text-lg mb-16">
          Have an exciting project idea, a position to fill, or simply want to say hello? Drop me a message below.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Info Column */}
          <div className="flex flex-col gap-6 text-left">
            <h3 className="text-2xl font-heading font-bold text-text-primary">Contact Information</h3>
            <p className="font-sans text-[1.05rem] text-text-secondary leading-relaxed">
              Feel free to reach out via email, social links, or phone. Let's create something together!
            </p>

            <div className="flex flex-col gap-6 mt-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-bg-secondary border border-border-color/40 flex items-center justify-center text-accent-purple">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[1rem] font-bold text-text-primary">Email</h4>
                  <p className="text-text-secondary text-sm">piyushlandge4444@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-bg-secondary border border-border-color/40 flex items-center justify-center text-accent-purple">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[1rem] font-bold text-text-primary">Location</h4>
                  <p className="text-text-secondary text-sm">Pune, Maharashtra</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-bg-secondary border border-border-color/40 flex items-center justify-center text-accent-purple">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[1rem] font-bold text-text-primary">Phone</h4>
                  <p className="text-text-secondary text-sm">+91 87 67 87 8004</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-6">
              <a href="https://github.com/piyushlandge04" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-lg bg-bg-secondary border border-border-color/40 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-cyan hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:translate-y-[-2px] transition-all duration-200" aria-label="GitHub"><Github size={20} /></a>
              <a href="https://www.linkedin.com/in/piyushlandge04/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-lg bg-bg-secondary border border-border-color/40 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-cyan hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:translate-y-[-2px] transition-all duration-200" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="https://www.instagram.com/piyushlandge_04/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-lg bg-bg-secondary border border-border-color/40 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-cyan hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:translate-y-[-2px] transition-all duration-200" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Form Column */}
          <div 
            className="contact-form-wrapper glass-card p-6 sm:p-8 md:p-10 rounded-[24px]" 
            onMouseMove={handleMouseMove}
          >
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10 gap-4">
                <CheckCircle size={48} className="text-green-500 animate-[scaleIn_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]" />
                <h3 className="text-xl font-bold text-text-primary">Message Sent Successfully!</h3>
                <p className="text-text-secondary max-w-[320px] text-sm">Thank you for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="form-group flex flex-col gap-2 text-left">
                  <label htmlFor="name" className="font-heading font-semibold text-[0.9rem] text-text-primary">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-bg-secondary border border-border-color/50 rounded-xl p-3.5 text-text-primary focus:outline-none focus:border-accent-purple focus:shadow-[0_0_12px_rgba(168,85,247,0.2)] focus:bg-bg-primary transition-all duration-200"
                    required
                  />
                </div>

                <div className="form-group flex flex-col gap-2 text-left">
                  <label htmlFor="email" className="font-heading font-semibold text-[0.9rem] text-text-primary">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-bg-secondary border border-border-color/50 rounded-xl p-3.5 text-text-primary focus:outline-none focus:border-accent-purple focus:shadow-[0_0_12px_rgba(168,85,247,0.2)] focus:bg-bg-primary transition-all duration-200"
                    required
                  />
                </div>

                <div className="form-group flex flex-col gap-2 text-left">
                  <label htmlFor="message" className="font-heading font-semibold text-[0.9rem] text-text-primary">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    className="w-full bg-bg-secondary border border-border-color/50 rounded-xl p-3.5 text-text-primary focus:outline-none focus:border-accent-purple focus:shadow-[0_0_12px_rgba(168,85,247,0.2)] focus:bg-bg-primary transition-all duration-200 resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary bg-gradient-to-r from-accent-purple to-accent-cyan text-white w-full py-4 rounded-xl font-heading font-bold inline-flex items-center justify-center gap-2 hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(40,116,255,0.45)] transition-all duration-300 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Sending Message...</>
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
 
      {/* Modern Premium Footer */}
      <footer className="border-t border-border-color/30 bg-bg-secondary py-8 mt-12 md:mt-16 w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">&copy; {new Date().getFullYear()} Portfolio.Piyushlandge. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-text-muted">
            <a href="#home" className="hover:text-text-primary transition-colors">Back to Top</a>
            <a href="#about" className="hover:text-text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-text-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-text-primary transition-colors">Get in Touch</a>
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
