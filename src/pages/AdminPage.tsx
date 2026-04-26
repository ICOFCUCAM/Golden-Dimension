import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Truck, RefreshCw, CheckCircle, Eye, Clock, ArrowLeft, Inbox, LogOut, Database, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import AdminLogin from '@/components/AdminLogin';
import AdminCms from '@/components/AdminCms';
import VoidRequestsList from '@/components/finance/VoidRequestsList';
import {
  fetchAccounts,
  fetchFxRates,
  fetchTransactions,
  type Account,
  type FinancialTransaction,
} from '@/lib/finance';
import { hasAnyRole } from '@/lib/roles';

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
  unread:  'bg-red-50 text-red-700 border-red-200',
  read:    'bg-amber-50 text-amber-700 border-amber-200',
  handled: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const statusIcons: Record<string, React.ReactNode> = {
  unread:  <Inbox size={11} />,
  read:    <Eye size={11} />,
  handled: <CheckCircle size={11} />,
};

const StatTile: React.FC<{ value: number; label: string; accent?: boolean }> = ({ value, label, accent }) => (
  <div className="border border-brand-hair-strong p-5 bg-brand-paper">
    <div className={`font-display font-medium text-[28px] tracking-[-0.02em] leading-none font-mono-tab ${accent ? 'text-brand-accent' : 'text-brand-ink'}`}>
      {value}
    </div>
    <div className="mt-2.5 label-technical text-brand-mute">{label}</div>
  </div>
);

const AdminPage: React.FC = () => {
  const { session, loading: authLoading, roles, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'contacts' | 'shipments' | 'cms' | 'voids'>('contacts');
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [shipments, setShipments] = useState<ShipmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Finance data needed for the Void Approvals tab.
  const [financeAccounts, setFinanceAccounts] = useState<Account[]>([]);
  const [financeTx, setFinanceTx] = useState<FinancialTransaction[]>([]);
  const [financeRates, setFinanceRates] = useState<Record<string, number>>({ GBP: 1 });
  const [pendingVoidsCount, setPendingVoidsCount] = useState(0);
  const canApproveVoids = hasAnyRole(roles, ['admin', 'super_admin']);

  const refreshFinance = async () => {
    const [a, t, r] = await Promise.all([
      fetchAccounts(),
      fetchTransactions(),
      fetchFxRates(),
    ]);
    setFinanceAccounts(a);
    setFinanceTx(t);
    setFinanceRates(r);
    const { count } = await supabase
      .from('void_requests')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'pending');
    setPendingVoidsCount(count ?? 0);
  };

  useEffect(() => {
    if (session && canApproveVoids) void refreshFinance();
  }, [session, canApproveVoids]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contactRes, shipmentRes] = await Promise.all([
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('shipment_requests').select('*').order('created_at', { ascending: false }),
      ]);
      if (contactRes.error) throw contactRes.error;
      if (shipmentRes.error) throw shipmentRes.error;
      if (contactRes.data) setContacts(contactRes.data);
      if (shipmentRes.data) setShipments(shipmentRes.data);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchData();
  }, [session]);

  if (authLoading) {
    return (
      <div className="bg-brand-ivory min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return <AdminLogin />;

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
    } catch {
      toast.error('Failed to update status');
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const unreadContacts = contacts.filter(c => c.status === 'unread').length;
  const unreadShipments = shipments.filter(s => s.status === 'unread').length;

  const renderItem = (item: ContactMessage | ShipmentRequest, table: 'contact_messages' | 'shipment_requests', body: string) => (
    <div key={item.id} className="border border-brand-hair-strong bg-brand-paper">
      <button
        type="button"
        onClick={() => {
          setExpandedId(expandedId === item.id ? null : item.id);
          if (item.status === 'unread') updateStatus(table, item.id, 'read');
        }}
        className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-3 text-left hover:bg-brand-stone transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="font-display font-medium text-[16px] text-brand-ink tracking-[-0.01em]">{item.name}</span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono-tab tracking-widest uppercase border ${statusColors[item.status]}`}>
              {statusIcons[item.status]} {item.status}
            </span>
          </div>
          <p className="text-[12.5px] text-brand-ink-2">{item.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="label-technical text-brand-mute font-mono-tab inline-flex items-center gap-1.5">
            <Clock size={11} /> {formatDate(item.created_at)}
          </span>
        </div>
      </button>
      {expandedId === item.id && (
        <div className="px-5 pb-5 border-t border-brand-hair pt-4">
          <p className="text-[14px] leading-[1.65] text-brand-ink-2 mb-5 whitespace-pre-wrap">{body}</p>
          <div className="flex flex-wrap gap-2">
            {item.status !== 'read' && (
              <button onClick={() => updateStatus(table, item.id, 'read')} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-amber-300 bg-amber-50 text-amber-800 text-[12px] font-medium hover:bg-amber-100 transition-colors">
                <Eye size={12} /> Mark Read
              </button>
            )}
            {item.status !== 'handled' && (
              <button onClick={() => updateStatus(table, item.id, 'handled')} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-emerald-300 bg-emerald-50 text-emerald-800 text-[12px] font-medium hover:bg-emerald-100 transition-colors">
                <CheckCircle size={12} /> Mark Handled
              </button>
            )}
            {item.status === 'handled' && (
              <button onClick={() => updateStatus(table, item.id, 'unread')} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-brand-hair-strong bg-brand-paper text-brand-ink-2 text-[12px] font-medium hover:bg-brand-stone transition-colors">
                <Inbox size={12} /> Reset
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-brand-ivory min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 mb-10 border-b border-brand-hair-strong">
          <div>
            <Link to="/" className="group inline-flex items-center gap-1.5 text-[13px] text-brand-ink-2 hover:text-brand-accent mb-4 transition-colors">
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" /> Back to site
            </Link>
            <div className="label-technical text-brand-mute mb-3">
              <span className="text-brand-accent">§ ADMIN</span> · Inbox
            </div>
            <h1 className="font-display text-[28px] md:text-[36px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
              Operations dashboard
            </h1>
            <p className="text-brand-ink-2 text-[14px] mt-2">Inbound enquiries and shipment requests.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchData} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors disabled:opacity-50">
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <button onClick={signOut} className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors">
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatTile value={contacts.length} label="Total messages" />
          <StatTile value={unreadContacts} label="Unread messages" accent />
          <StatTile value={shipments.length} label="Shipment requests" />
          <StatTile value={unreadShipments} label="Unread shipments" accent />
        </div>

        {/* Tabs */}
        <div className="flex gap-px bg-brand-hair-strong border border-brand-hair-strong mb-6 w-fit">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`inline-flex items-center gap-2 px-5 py-3 text-[13px] font-medium tracking-tight transition-colors ${
              activeTab === 'contacts' ? 'bg-brand-ink text-brand-ivory' : 'bg-brand-paper text-brand-ink-2 hover:bg-brand-stone'
            }`}
          >
            <Mail size={13} /> Contact Messages
            {unreadContacts > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-brand-accent text-brand-ivory text-[10px] font-mono-tab">
                {unreadContacts}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('shipments')}
            className={`inline-flex items-center gap-2 px-5 py-3 text-[13px] font-medium tracking-tight transition-colors ${
              activeTab === 'shipments' ? 'bg-brand-ink text-brand-ivory' : 'bg-brand-paper text-brand-ink-2 hover:bg-brand-stone'
            }`}
          >
            <Truck size={13} /> Shipment Requests
            {unreadShipments > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-brand-accent text-brand-ivory text-[10px] font-mono-tab">
                {unreadShipments}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('cms')}
            className={`inline-flex items-center gap-2 px-5 py-3 text-[13px] font-medium tracking-tight transition-colors ${
              activeTab === 'cms' ? 'bg-brand-ink text-brand-ivory' : 'bg-brand-paper text-brand-ink-2 hover:bg-brand-stone'
            }`}
          >
            <Database size={13} /> CMS
          </button>
          {canApproveVoids && (
            <button
              onClick={() => setActiveTab('voids')}
              className={`inline-flex items-center gap-2 px-5 py-3 text-[13px] font-medium tracking-tight transition-colors ${
                activeTab === 'voids' ? 'bg-brand-ink text-brand-ivory' : 'bg-brand-paper text-brand-ink-2 hover:bg-brand-stone'
              }`}
            >
              <ShieldCheck size={13} /> Void Approvals
              {pendingVoidsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-brand-accent text-brand-ivory text-[10px] font-mono-tab">
                  {pendingVoidsCount}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Content */}
        {activeTab === 'cms' ? (
          <AdminCms />
        ) : activeTab === 'voids' ? (
          canApproveVoids ? (
            <VoidRequestsList
              canDecide
              transactions={financeTx}
              accounts={financeAccounts}
              rates={financeRates}
              display="GBP"
              onDecided={refreshFinance}
            />
          ) : (
            <div className="border border-brand-hair-strong bg-brand-paper py-16 text-center">
              <p className="text-[14px] text-brand-mute">
                Approving voids requires the admin or super-admin role.
              </p>
            </div>
          )
        ) : loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
          </div>
        ) : activeTab === 'contacts' ? (
          contacts.length === 0 ? (
            <div className="border border-brand-hair-strong bg-brand-paper py-20 text-center">
              <Mail size={36} className="mx-auto mb-4 text-brand-mute opacity-40" />
              <p className="text-[14px] text-brand-mute">No contact messages yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {contacts.map((msg) => renderItem(msg, 'contact_messages', msg.message))}
            </div>
          )
        ) : (
          shipments.length === 0 ? (
            <div className="border border-brand-hair-strong bg-brand-paper py-20 text-center">
              <Truck size={36} className="mx-auto mb-4 text-brand-mute opacity-40" />
              <p className="text-[14px] text-brand-mute">No shipment requests yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {shipments.map((req) => renderItem(req, 'shipment_requests', req.details))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminPage;
