import React, { useEffect, useMemo, useState } from 'react';
import { Loader2, Plus, Save, Trash2, Database, AlertCircle, Check, Cloud } from 'lucide-react';
import { toast } from 'sonner';
import { supabase, supabaseConfigured } from '@/lib/supabase';
import { caseStudies as staticCaseStudies } from '@/data/caseStudies';
import { newsArticles as staticInsights } from '@/data/news';
import { practitioners as staticTeam } from '@/data/team';

/**
 * Admin CMS — minimal but functional editor for the three CMS tables.
 *
 * Each row stores its full content as JSON; the editor uses a textarea.
 * Not pretty, but it lets the firm seed and edit content without a
 * redeploy. A richer per-field editor can be built later — the schema
 * supports it.
 *
 * The "Seed from static" button bulk-uploads the bundled .ts data into
 * Supabase. Run it once after creating the tables to bootstrap.
 */

type CollectionName = 'case_studies' | 'insights' | 'practitioners';

interface Collection {
  name: CollectionName;
  label: string;
  icon: React.ReactNode;
  staticRows: any[];
  // Map a static-row blob to (slug, top-level columns, content) for an upsert.
  toSupabase: (row: any, idx: number) => Record<string, any>;
}

const collections: Collection[] = [
  {
    name: 'case_studies',
    label: 'Case Studies',
    icon: <Database size={14} />,
    staticRows: staticCaseStudies,
    toSupabase: (row, idx) => ({
      slug: row.slug,
      title: row.title,
      sector_id: row.sectorId,
      pillar_id: row.pillarId,
      engagement_model_id: row.engagementModelId,
      year: row.year,
      ordinal: idx,
      published: true,
      content: row,
    }),
  },
  {
    name: 'insights',
    label: 'Insights',
    icon: <Database size={14} />,
    staticRows: staticInsights,
    toSupabase: (row, idx) => ({
      slug: row.slug,
      title: row.title,
      category: row.category,
      published_at: new Date(row.date).toISOString(),
      ordinal: idx,
      published: true,
      content: row,
    }),
  },
  {
    name: 'practitioners',
    label: 'Practitioners',
    icon: <Database size={14} />,
    staticRows: staticTeam,
    toSupabase: (row, idx) => ({
      practice_area: row.practiceArea,
      ordinal: idx,
      published: true,
      content: row,
    }),
  },
];

interface DbRow {
  id: string;
  ordinal: number;
  published: boolean;
  content: any;
  updated_at?: string;
}

const AdminCms: React.FC = () => {
  const [active, setActive] = useState<CollectionName>('case_studies');
  const [rows, setRows]       = useState<DbRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [seeding, setSeeding] = useState<CollectionName | null>(null);
  const [editing, setEditing] = useState<DbRow | null>(null);
  const [editText, setEditText] = useState('');
  const [saving, setSaving]   = useState(false);

  const collection = useMemo(() => collections.find((c) => c.name === active)!, [active]);

  const fetchRows = async () => {
    setLoading(true);
    setError(null);
    if (!supabaseConfigured) {
      setError('Supabase env vars not set — site is rendering from static data only.');
      setRows([]);
      setLoading(false);
      return;
    }
    try {
      const { data, error: dbErr } = await supabase
        .from(active)
        .select('id, ordinal, published, content, updated_at')
        .order('ordinal', { ascending: true });
      if (dbErr) throw dbErr;
      setRows((data as DbRow[]) || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load rows');
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
    setEditing(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const seedFromStatic = async () => {
    if (!supabaseConfigured) {
      toast.error('Supabase env vars not set.');
      return;
    }
    setSeeding(active);
    try {
      const payload = collection.staticRows.map((row, i) => collection.toSupabase(row, i));
      const onConflict =
        active === 'practitioners' ? undefined : 'slug';
      const { error: dbErr } = await supabase
        .from(active)
        .upsert(payload, onConflict ? { onConflict } : undefined);
      if (dbErr) throw dbErr;
      toast.success(`Seeded ${payload.length} ${collection.label.toLowerCase()} rows`);
      await fetchRows();
    } catch (err: any) {
      toast.error(err?.message || 'Seed failed');
    } finally {
      setSeeding(null);
    }
  };

  const startEdit = (row: DbRow) => {
    setEditing(row);
    setEditText(JSON.stringify(row.content, null, 2));
  };

  const saveEdit = async () => {
    if (!editing) return;
    let parsed: any;
    try {
      parsed = JSON.parse(editText);
    } catch (e: any) {
      toast.error(`Invalid JSON: ${e.message}`);
      return;
    }
    setSaving(true);
    try {
      const { error: dbErr } = await supabase
        .from(active)
        .update({ content: parsed })
        .eq('id', editing.id);
      if (dbErr) throw dbErr;
      toast.success('Saved');
      setEditing(null);
      await fetchRows();
    } catch (err: any) {
      toast.error(err?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (row: DbRow) => {
    try {
      const { error: dbErr } = await supabase
        .from(active)
        .update({ published: !row.published })
        .eq('id', row.id);
      if (dbErr) throw dbErr;
      await fetchRows();
    } catch (err: any) {
      toast.error(err?.message || 'Update failed');
    }
  };

  const deleteRow = async (row: DbRow) => {
    if (!confirm('Delete this row? This cannot be undone.')) return;
    try {
      const { error: dbErr } = await supabase.from(active).delete().eq('id', row.id);
      if (dbErr) throw dbErr;
      toast.success('Deleted');
      await fetchRows();
    } catch (err: any) {
      toast.error(err?.message || 'Delete failed');
    }
  };

  return (
    <div>
      {/* Collection tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {collections.map((c) => {
          const isActive = active === c.name;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => setActive(c.name)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-[12.5px] font-medium tracking-tight border transition-colors ${
                isActive
                  ? 'bg-brand-ink border-brand-ink text-brand-ivory'
                  : 'bg-brand-paper border-brand-hair-strong text-brand-ink-2 hover:border-brand-ink hover:text-brand-ink'
              }`}
            >
              {c.icon}
              {c.label}
              <span className="label-technical font-mono-tab">
                {isActive ? rows.length : ''}
              </span>
            </button>
          );
        })}
      </div>

      {/* Seed action */}
      <div className="mb-6 p-4 border border-brand-hair-strong bg-brand-paper flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <Cloud size={14} className="text-brand-mute" />
          <p className="text-[13px] text-brand-ink-2 max-w-2xl leading-snug">
            <span className="text-brand-ink font-medium">{collection.staticRows.length} static rows</span> bundled in
            the build. Click "Seed from static" to upload them into Supabase. Existing rows with the same slug are
            upserted in place; nothing is destroyed.
          </p>
        </div>
        <button
          type="button"
          onClick={seedFromStatic}
          disabled={seeding === active || !supabaseConfigured}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-ink text-brand-ivory text-[12.5px] font-medium hover:bg-brand-accent transition-colors disabled:opacity-50"
        >
          {seeding === active ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
          Seed from static
        </button>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 px-4 py-3 border border-red-200 bg-red-50 text-[13px] text-red-700">
          <AlertCircle size={13} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={20} className="animate-spin text-brand-accent" />
        </div>
      ) : rows.length === 0 ? (
        <div className="border border-brand-hair-strong bg-brand-paper py-12 text-center text-[14px] text-brand-mute">
          No {collection.label.toLowerCase()} in Supabase yet. Use "Seed from static" to bootstrap.
        </div>
      ) : (
        <div className="border border-brand-hair-strong bg-brand-paper">
          {rows.map((row) => {
            const slug = row.content?.slug || row.id.slice(0, 8);
            const title = row.content?.title || row.content?.name || slug;
            return (
              <div key={row.id} className="border-b border-brand-hair last:border-b-0">
                <div className="flex flex-wrap items-center justify-between p-4 gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-display text-[15px] font-medium text-brand-ink truncate">{title}</span>
                      {!row.published && (
                        <span className="label-technical px-2 py-0.5 border border-amber-300 bg-amber-50 text-amber-800">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-brand-mute font-mono-tab truncate">
                      {slug}
                      {row.updated_at && <> · updated {new Date(row.updated_at).toLocaleString('en-GB')}</>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => togglePublished(row)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-brand-hair-strong text-[11.5px] font-medium hover:bg-brand-stone transition-colors"
                    >
                      {row.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => startEdit(row)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-brand-ink text-[11.5px] font-medium text-brand-ink hover:bg-brand-ink hover:text-brand-ivory transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteRow(row)}
                      aria-label="Delete row"
                      className="inline-flex items-center gap-1.5 px-2 py-1.5 border border-brand-hair-strong text-brand-mute hover:text-red-700 hover:border-red-300 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* JSON edit modal */}
      {editing && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] bg-brand-ink/40 flex items-center justify-center p-4"
          onClick={() => !saving && setEditing(null)}
        >
          <div
            className="w-full max-w-3xl bg-brand-paper border border-brand-hair-strong shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-baseline justify-between p-5 border-b border-brand-hair-strong">
              <span className="label-technical text-brand-mute">
                <span className="text-brand-accent">EDIT</span> · {collection.label} · {editing.content?.slug || editing.id.slice(0, 8)}
              </span>
              <button
                type="button"
                onClick={() => setEditing(null)}
                disabled={saving}
                aria-label="Close editor"
                className="text-brand-mute hover:text-brand-ink"
              >
                ×
              </button>
            </div>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 p-5 font-mono text-[12.5px] leading-[1.5] text-brand-ink bg-brand-paper border-0 focus:outline-none resize-none"
              spellCheck={false}
            />
            <div className="flex items-center justify-end gap-2 p-4 border-t border-brand-hair-strong">
              <button
                type="button"
                onClick={() => setEditing(null)}
                disabled={saving}
                className="px-4 py-2 border border-brand-hair-strong text-[12.5px] font-medium hover:bg-brand-stone"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-ink text-brand-ivory text-[12.5px] font-medium hover:bg-brand-accent disabled:opacity-50"
              >
                {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCms;
