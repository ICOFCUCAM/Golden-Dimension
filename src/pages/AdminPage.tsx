import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Truck, RefreshCw, CheckCircle, Eye, Clock, ArrowLeft, Inbox } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

interface ShipmentRequest {
  id: string;
  name: string;
  email: string;
  details: string;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  unread: 'bg-red-500/20 text-red-400 border-red-500/30',
  read: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  handled: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const statusIcons: Record<string, React.ReactNode> = {
  unread: <Inbox size={14} />,
  read: <Eye size={14} />,
  handled: <CheckCircle size={14} />,
};

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contacts' | 'shipments'>('contacts');
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [shipments, setShipments] = useState<ShipmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contactRes, shipmentRes] = await Promise.all([
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('shipment_requests').select('*').order('created_at', { ascending: false }),
      ]);
      if (contactRes.data) setContacts(contactRes.data);
      if (shipmentRes.data) setShipments(shipmentRes.data);
    } catch (err) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (table: string, id: string, newStatus: string) => {
    try {
      const { error } = await supabase.from(table).update({ status: newStatus }).eq('id', id);
      if (error) throw error;
      toast.success(`Marked as ${newStatus}`);
      if (table === 'contact_messages') {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      } else {
        setShipments(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const unreadContacts = contacts.filter(c => c.status === 'unread').length;
  const unreadShipments = shipments.filter(s => s.status === 'unread').length;

  return (
    <div className="bg-[#0B1F3A] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-1 text-white/40 hover:text-[#C8A44D] text-sm mb-3 transition-colors">
              <ArrowLeft size={14} /> Back to Site
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Admin <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-white/50 mt-1">Manage incoming inquiries and shipment requests</p>
          </div>
          <button onClick={fetchData} disabled={loading} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm disabled:opacity-50">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-2xl font-bold text-white">{contacts.length}</div>
            <div className="text-white/40 text-sm">Total Messages</div>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-2xl font-bold text-red-400">{unreadContacts}</div>
            <div className="text-white/40 text-sm">Unread Messages</div>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-2xl font-bold text-white">{shipments.length}</div>
            <div className="text-white/40 text-sm">Shipment Requests</div>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-2xl font-bold text-red-400">{unreadShipments}</div>
            <div className="text-white/40 text-sm">Unread Shipments</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab('contacts')} className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'contacts' ? 'bg-[#C8A44D] text-[#0B1F3A]' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
            <Mail size={16} /> Contact Messages {unreadContacts > 0 && <span className="ml-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs">{unreadContacts}</span>}
          </button>
          <button onClick={() => setActiveTab('shipments')} className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'shipments' ? 'bg-[#C8A44D] text-[#0B1F3A]' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
            <Truck size={16} /> Shipment Requests {unreadShipments > 0 && <span className="ml-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs">{unreadShipments}</span>}
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#C8A44D]/30 border-t-[#C8A44D] rounded-full animate-spin" />
          </div>
        ) : activeTab === 'contacts' ? (
          contacts.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              <Mail size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg">No contact messages yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {contacts.map((msg) => (
                <div key={msg.id} className={`rounded-xl border transition-all ${msg.status === 'unread' ? 'bg-white/[0.05] border-[#C8A44D]/20' : 'bg-white/[0.02] border-white/[0.06]'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-3 cursor-pointer" onClick={() => { setExpandedId(expandedId === msg.id ? null : msg.id); if (msg.status === 'unread') updateStatus('contact_messages', msg.id, 'read'); }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-white">{msg.name}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[msg.status]}`}>
                          {statusIcons[msg.status]} {msg.status}
                        </span>
                      </div>
                      <p className="text-white/40 text-sm">{msg.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/30 text-xs flex items-center gap-1"><Clock size={12} /> {formatDate(msg.created_at)}</span>
                    </div>
                  </div>
                  {expandedId === msg.id && (
                    <div className="px-5 pb-5 border-t border-white/[0.06] pt-4">
                      <p className="text-white/60 leading-relaxed mb-4 whitespace-pre-wrap">{msg.message}</p>
                      <div className="flex gap-2">
                        {msg.status !== 'read' && <button onClick={() => updateStatus('contact_messages', msg.id, 'read')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm hover:bg-yellow-500/20 transition-colors"><Eye size={14} /> Mark Read</button>}
                        {msg.status !== 'handled' && <button onClick={() => updateStatus('contact_messages', msg.id, 'handled')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/10 text-green-400 text-sm hover:bg-green-500/20 transition-colors"><CheckCircle size={14} /> Mark Handled</button>}
                        {msg.status === 'handled' && <button onClick={() => updateStatus('contact_messages', msg.id, 'unread')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 text-white/40 text-sm hover:bg-white/10 transition-colors"><Inbox size={14} /> Reset to Unread</button>}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        ) : (
          shipments.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              <Truck size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg">No shipment requests yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {shipments.map((req) => (
                <div key={req.id} className={`rounded-xl border transition-all ${req.status === 'unread' ? 'bg-white/[0.05] border-[#C8A44D]/20' : 'bg-white/[0.02] border-white/[0.06]'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-3 cursor-pointer" onClick={() => { setExpandedId(expandedId === req.id ? null : req.id); if (req.status === 'unread') updateStatus('shipment_requests', req.id, 'read'); }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-white">{req.name}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[req.status]}`}>
                          {statusIcons[req.status]} {req.status}
                        </span>
                      </div>
                      <p className="text-white/40 text-sm">{req.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/30 text-xs flex items-center gap-1"><Clock size={12} /> {formatDate(req.created_at)}</span>
                    </div>
                  </div>
                  {expandedId === req.id && (
                    <div className="px-5 pb-5 border-t border-white/[0.06] pt-4">
                      <p className="text-white/60 leading-relaxed mb-4 whitespace-pre-wrap">{req.details}</p>
                      <div className="flex gap-2">
                        {req.status !== 'read' && <button onClick={() => updateStatus('shipment_requests', req.id, 'read')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm hover:bg-yellow-500/20 transition-colors"><Eye size={14} /> Mark Read</button>}
                        {req.status !== 'handled' && <button onClick={() => updateStatus('shipment_requests', req.id, 'handled')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/10 text-green-400 text-sm hover:bg-green-500/20 transition-colors"><CheckCircle size={14} /> Mark Handled</button>}
                        {req.status === 'handled' && <button onClick={() => updateStatus('shipment_requests', req.id, 'unread')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 text-white/40 text-sm hover:bg-white/10 transition-colors"><Inbox size={14} /> Reset to Unread</button>}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminPage;
