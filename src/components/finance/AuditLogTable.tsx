import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { AuditLog } from '@/lib/finance';

interface AuditLogTableProps {
  /** Optional row-id filter — when set, only events for this row are shown. */
  rowId?: string;
}

const ACTION_BADGE: Record<string, string> = {
  insert: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  update: 'border-sky-300 bg-sky-50 text-sky-800',
  void: 'border-red-300 bg-red-50 text-red-700',
};

const AuditLogTable: React.FC<AuditLogTableProps> = ({ rowId }) => {
  const [rows, setRows] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<'all' | 'insert' | 'update' | 'void'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const q = supabase
        .from('audit_log')
        .select('*')
        .order('event_at', { ascending: false })
        .limit(500);
      const query = rowId ? q.eq('row_id', rowId) : q;
      const { data } = await query;
      if (!active) return;
      setRows((data as AuditLog[]) ?? []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [rowId]);

  const filtered = useMemo(
    () => (action === 'all' ? rows : rows.filter((r) => r.action === action)),
    [rows, action],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-6 h-6 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Filter rail */}
      <div className="border border-brand-hair-strong bg-brand-paper p-4 mb-6 flex flex-wrap items-end gap-4">
        <div className="inline-flex items-center gap-2 label-technical text-brand-mute">
          <Filter size={12} /> Filter
        </div>
        <label className="flex flex-col text-[12px]">
          <span className="label-technical text-brand-mute mb-1">Action</span>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value as typeof action)}
            className="px-3 py-2 bg-brand-paper border border-brand-hair-strong text-[13px] text-brand-ink focus:outline-none focus:border-brand-ink"
          >
            <option value="all">All actions</option>
            <option value="insert">Insert</option>
            <option value="update">Update</option>
            <option value="void">Void</option>
          </select>
        </label>
        <span className="ml-auto label-technical text-brand-mute">
          {String(filtered.length).padStart(3, '0')} events
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-brand-hair-strong bg-brand-paper py-16 text-center">
          <p className="text-[14px] text-brand-mute">No audit events match.</p>
        </div>
      ) : (
        <div className="border border-brand-hair-strong bg-brand-paper overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead className="bg-brand-stone text-left">
              <tr>
                <th className="label-technical text-brand-mute py-3 px-4 w-[24px]" />
                <th className="label-technical text-brand-mute py-3 px-4 whitespace-nowrap">
                  Event at
                </th>
                <th className="label-technical text-brand-mute py-3 px-4">Table</th>
                <th className="label-technical text-brand-mute py-3 px-4">Action</th>
                <th className="label-technical text-brand-mute py-3 px-4">Row</th>
                <th className="label-technical text-brand-mute py-3 px-4">Actor</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const isOpen = expanded === r.id;
                return (
                  <React.Fragment key={r.id}>
                    <tr
                      className="border-t border-brand-hair cursor-pointer hover:bg-brand-stone"
                      onClick={() => setExpanded(isOpen ? null : r.id)}
                    >
                      <td className="py-3 px-4 text-brand-mute">
                        {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                      </td>
                      <td className="py-3 px-4 font-mono-tab whitespace-nowrap">
                        {r.event_at}
                      </td>
                      <td className="py-3 px-4 font-mono-tab text-brand-mute">{r.table_name}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10.5px] font-mono-tab tracking-widest uppercase border ${
                            ACTION_BADGE[r.action] ?? 'border-brand-hair-strong bg-brand-stone text-brand-mute'
                          }`}
                        >
                          {r.action}
                        </span>
                      </td>
                      <td
                        className="py-3 px-4 font-mono-tab text-brand-mute max-w-[180px] truncate"
                        title={r.row_id}
                      >
                        {r.row_id}
                      </td>
                      <td
                        className="py-3 px-4 font-mono-tab text-brand-mute max-w-[180px] truncate"
                        title={r.actor_id ?? ''}
                      >
                        {r.actor_id ?? '—'}
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="border-t border-brand-hair bg-brand-ivory">
                        <td colSpan={6} className="p-4">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <DiffPane label="Before" value={r.before} />
                            <DiffPane label="After" value={r.after} />
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const DiffPane: React.FC<{ label: string; value: Record<string, unknown> | null }> = ({
  label,
  value,
}) => (
  <div className="border border-brand-hair bg-brand-paper">
    <div className="px-3 py-2 border-b border-brand-hair label-technical text-brand-mute">
      {label}
    </div>
    {value ? (
      <pre className="p-3 text-[11.5px] leading-[1.5] text-brand-ink-2 overflow-x-auto whitespace-pre-wrap font-mono-tab">
        {JSON.stringify(value, null, 2)}
      </pre>
    ) : (
      <div className="p-3 text-[12px] text-brand-mute">—</div>
    )}
  </div>
);

export default AuditLogTable;
