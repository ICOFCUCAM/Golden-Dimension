/**
 * CMS read layer.
 *
 * Each loader tries Supabase first; if the table is empty, the request
 * fails, or env vars aren't configured, it falls back to the static
 * data shipped in src/data. This means:
 *
 *   - In a fresh Supabase project with empty tables → site renders from
 *     static .ts data exactly as before.
 *   - Once you populate the Supabase tables (via /admin CMS), the site
 *     reads from Supabase on the client.
 *   - If Supabase is unreachable, fallback to static — the site never
 *     goes blank waiting for content.
 *
 * Pages opt into the CMS via the useCmsCollection hook. They keep their
 * static imports as the fallback parameter.
 */

import { useEffect, useState } from 'react';
import { supabase, supabaseConfigured } from '@/lib/supabase';
import type { CaseStudy } from '@/data/caseStudies';
import type { NewsArticle } from '@/data/news';
import type { Practitioner } from '@/data/team';

type CollectionName = 'case_studies' | 'insights' | 'practitioners';

interface CmsRow<T> {
  id: string;
  ordinal: number;
  content: T;
}

const fetchCollection = async <T,>(table: CollectionName): Promise<T[] | null> => {
  if (!supabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from(table)
      .select('id, ordinal, content')
      .eq('published', true)
      .order('ordinal', { ascending: true });
    if (error) throw error;
    if (!data || data.length === 0) return null;
    return (data as CmsRow<T>[]).map((row) => row.content);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`[cms] ${table} fetch failed; falling back to static`, err);
    return null;
  }
};

/**
 * Hook: returns either the CMS rows or the supplied fallback.
 * `loading` is true only on the brief initial fetch; once we've
 * resolved (cms or fallback), it flips to false and stays.
 */
export function useCmsCollection<T>(table: CollectionName, fallback: T[]): {
  data: T[];
  source: 'cms' | 'static';
  loading: boolean;
} {
  const [state, setState] = useState<{ data: T[]; source: 'cms' | 'static'; loading: boolean }>(
    { data: fallback, source: 'static', loading: supabaseConfigured }
  );

  useEffect(() => {
    let active = true;
    if (!supabaseConfigured) return;
    fetchCollection<T>(table).then((rows) => {
      if (!active) return;
      if (rows) setState({ data: rows, source: 'cms', loading: false });
      else setState({ data: fallback, source: 'static', loading: false });
    });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return state;
}

// Typed loaders for direct (non-hook) use — admin pages, etc.
export const loadCaseStudies = () => fetchCollection<CaseStudy>('case_studies');
export const loadInsights    = () => fetchCollection<NewsArticle>('insights');
export const loadPractitioners = () => fetchCollection<Practitioner>('practitioners');
