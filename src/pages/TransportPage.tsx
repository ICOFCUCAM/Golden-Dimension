import React, { useState } from 'react';
import { Plane, Ship, Truck, Package, Check, Send } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const transportServices = [
  {
    icon: <Plane size={28} />, title: 'Air Freight',
    desc: 'Fast, reliable air cargo services connecting major airports worldwide. Ideal for time-sensitive shipments and high-value goods.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977465594_6c17eb87.png',
    features: ['Express delivery options', 'Temperature-controlled cargo', 'Real-time tracking', 'Customs clearance support']
  },
  {
    icon: <Ship size={28} />, title: 'Maritime Cargo',
    desc: 'Cost-effective ocean freight solutions for bulk and containerized cargo. Our maritime network spans all major global ports.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977387826_06abad98.jpg',
    features: ['Full container load (FCL)', 'Less than container load (LCL)', 'Port-to-port service', 'Cargo insurance']
  },
  {
    icon: <Truck size={28} />, title: 'Ground Transportation',
    desc: 'Comprehensive road freight services including full truckload, partial load, and last-mile delivery across all major routes.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977554897_3c0c7791.jpg',
    features: ['Full & partial truckload', 'Last-mile delivery', 'Cross-border transport', 'Fleet management']
  },
  {
    icon: <Package size={28} />, title: 'Heavy Cargo',
    desc: 'Specialized logistics for oversized, heavy, and project cargo. Expert handling of complex shipments requiring special equipment.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977387826_06abad98.jpg',
    features: ['Project cargo management', 'Oversized load handling', 'Route planning & permits', 'Specialized equipment']
  }
];

const TransportPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('shipment_requests').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        details: formData.details.trim(),
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success('Shipment request submitted successfully!');
      setFormData({ name: '', email: '', details: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      toast.error('Failed to submit request. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-ivory">
      {/* Hero */}
      <section className="relative pt-20 overflow-hidden">
        <div className="h-[500px] relative">
          <img src="https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977387826_06abad98.jpg" alt="Maritime cargo logistics" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ivory via-brand-ivory to-brand-ivory" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ivory to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
            <span className="text-brand-accent text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">Transport & Logistics</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-ink mb-4 leading-tight">
              Golden <span className="italic text-brand-accent">Transport</span>
            </h1>
            <p className="text-xl text-brand-ink-2 max-w-2xl leading-relaxed">
              Comprehensive logistics solutions spanning air, sea, and land. We move your cargo safely, efficiently, and on time — anywhere in the world.
            </p>
          </div>
        </div>
      </section>

      {/* Transport Services */}
      <section className="py-24" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-accent text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">Our Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-ink mb-6">Logistics Services</h2>
          </div>
          <div className="space-y-8">
            {transportServices.map((service, i) => (
              <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 md:p-8 rounded-2xl bg-brand-paper border border-brand-hair hover:border-brand-accent/30 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="rounded-xl overflow-hidden h-64">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="w-14 h-14 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-brand-ink mb-3">{service.title}</h3>
                  <p className="text-brand-ink-2 leading-relaxed mb-6">{service.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-brand-mute text-sm"><Check size={14} className="text-brand-accent flex-shrink-0" />{f}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipment Request Form */}
      <section className="py-24 bg-brand-stone">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-accent text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">Get Started</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-ink mb-6">Shipment Request</h2>
            <p className="text-brand-mute text-lg">Submit your shipment details and our logistics team will provide a customized quote.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-brand-ink-2 text-sm font-medium mb-2">Full Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your full name" className="w-full px-5 py-4 bg-brand-paper border border-brand-hair rounded-xl text-brand-ink placeholder-brand-mute focus:outline-none focus:border-brand-accent/30 focus:bg-brand-paper transition-all" required />
            </div>
            <div>
              <label className="block text-brand-ink-2 text-sm font-medium mb-2">Email Address</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter your email address" className="w-full px-5 py-4 bg-brand-paper border border-brand-hair rounded-xl text-brand-ink placeholder-brand-mute focus:outline-none focus:border-brand-accent/30 focus:bg-brand-paper transition-all" required />
            </div>
            <div>
              <label className="block text-brand-ink-2 text-sm font-medium mb-2">Shipment Details</label>
              <textarea value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} placeholder="Describe your shipment requirements (origin, destination, cargo type, weight, timeline, etc.)" rows={6} className="w-full px-5 py-4 bg-brand-paper border border-brand-hair rounded-xl text-brand-ink placeholder-brand-mute focus:outline-none focus:border-brand-accent/30 focus:bg-brand-paper transition-all resize-none" required />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-ink to-brand-ink text-brand-ivory font-semibold rounded-xl hover:shadow-xl hover:shadow-black/5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
              {isSubmitting ? <div className="w-5 h-5 border-2 border-brand-ink/30 border-t-brand-ink rounded-full animate-spin" /> : submitted ? <><Check size={18} /> Request Submitted</> : <><Send size={18} /> Submit Shipment Request</>}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default TransportPage;
