import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check, Globe2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const offices = [
  { city: 'London', country: 'United Kingdom', type: 'Headquarters', timezone: 'GMT' },
  { city: 'New York', country: 'United States', type: 'Regional Office', timezone: 'EST' },
  { city: 'Dubai', country: 'UAE', type: 'Regional Office', timezone: 'GST' },
  { city: 'Singapore', country: 'Singapore', type: 'Asia Pacific', timezone: 'SGT' },
];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      toast.error('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0B1F3A]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#C8A44D]/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#C8A44D] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">Get in Touch</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Contact <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
            Ready to discuss how Golden Dimensions can help your organization? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-white mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Full Name</label>
                  <input type="text" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }} placeholder="Enter your full name" className={`w-full px-5 py-4 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#C8A44D]/50 focus:bg-white/[0.08] transition-all ${errors.name ? 'border-red-500/50' : 'border-white/10'}`} />
                  {errors.name && <p className="mt-1 text-red-400 text-sm">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Email Address</label>
                  <input type="email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }); }} placeholder="Enter your email address" className={`w-full px-5 py-4 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#C8A44D]/50 focus:bg-white/[0.08] transition-all ${errors.email ? 'border-red-500/50' : 'border-white/10'}`} />
                  {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Message</label>
                  <textarea value={formData.message} onChange={(e) => { setFormData({ ...formData, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: '' }); }} placeholder="Tell us about your project or inquiry..." rows={6} className={`w-full px-5 py-4 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#C8A44D]/50 focus:bg-white/[0.08] transition-all resize-none ${errors.message ? 'border-red-500/50' : 'border-white/10'}`} />
                  {errors.message && <p className="mt-1 text-red-400 text-sm">{errors.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] text-[#0B1F3A] font-semibold rounded-xl hover:shadow-xl hover:shadow-[#C8A44D]/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? <div className="w-5 h-5 border-2 border-[#0B1F3A]/30 border-t-[#0B1F3A] rounded-full animate-spin" /> : submitted ? <><Check size={18} /> Message Sent</> : <><Send size={18} /> Send Message</>}
                </button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <a href="mailto:admin@golden-dimensions.org" className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#C8A44D]/20 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-[#C8A44D]/10 flex items-center justify-center text-[#C8A44D] flex-shrink-0"><Mail size={20} /></div>
                    <div><h4 className="text-white font-medium mb-1">Email</h4><span className="text-white/50 text-sm group-hover:text-[#C8A44D] transition-colors">admin@golden-dimensions.org</span></div>
                  </a>
                  <a href="tel:+442012345678" className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#C8A44D]/20 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-[#C8A44D]/10 flex items-center justify-center text-[#C8A44D] flex-shrink-0"><Phone size={20} /></div>
                    <div><h4 className="text-white font-medium mb-1">Phone</h4><span className="text-white/50 text-sm group-hover:text-[#C8A44D] transition-colors">+44 20 1234 5678</span></div>
                  </a>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="w-12 h-12 rounded-xl bg-[#C8A44D]/10 flex items-center justify-center text-[#C8A44D] flex-shrink-0"><Clock size={20} /></div>
                    <div><h4 className="text-white font-medium mb-1">Business Hours</h4><span className="text-white/50 text-sm">Mon – Fri: 9:00 AM – 6:00 PM (GMT)</span></div>
                  </div>
                </div>
              </div>
              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
                <div className="h-48 bg-[#0a1a30] flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 800 400" className="w-full h-full" fill="none" stroke="#C8A44D" strokeWidth="0.5">
                      <ellipse cx="400" cy="200" rx="350" ry="150" opacity="0.3" />
                      <ellipse cx="400" cy="200" rx="250" ry="100" opacity="0.2" />
                      <line x1="50" y1="200" x2="750" y2="200" opacity="0.2" />
                      <line x1="400" y1="50" x2="400" y2="350" opacity="0.2" />
                    </svg>
                  </div>
                  <div className="relative text-center">
                    <Globe2 size={32} className="text-[#C8A44D] mx-auto mb-2" />
                    <p className="text-white/50 text-sm">Global Headquarters</p>
                    <p className="text-white font-semibold">London, United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-20 bg-[#0a1a30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#C8A44D] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">Global Presence</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Offices</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#C8A44D]/20 transition-all duration-300 group text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-[#C8A44D]/10 flex items-center justify-center text-[#C8A44D] mb-4 group-hover:bg-[#C8A44D]/20 transition-colors"><MapPin size={20} /></div>
                <h3 className="text-lg font-bold text-white mb-1">{office.city}</h3>
                <p className="text-white/50 text-sm mb-2">{office.country}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-[#C8A44D]/10 text-[#C8A44D] text-xs font-medium">{office.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
