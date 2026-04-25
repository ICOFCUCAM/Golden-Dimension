import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import { Search, ArrowRight } from 'lucide-react';
import { pillars, industries, methodology } from '@/data/servicesPage';
import { services } from '@/data/services';
import { newsArticles } from '@/data/news';

interface SearchEntry {
  id: string;
  group: string;
  label: string;
  hint?: string;
  path: string;
}

const buildIndex = (): SearchEntry[] => {
  const index: SearchEntry[] = [];

  // Top-level pages
  index.push(
    { id: 'home',       group: 'Pages', label: 'Home',                hint: 'Multidisciplinary capability overview', path: '/' },
    { id: 'caps',       group: 'Pages', label: 'Capabilities',        hint: 'Five consulting pillars',               path: '/services' },
    { id: 'inds',       group: 'Pages', label: 'Industries',          hint: 'Six regulated sectors',                 path: '/industries' },
    { id: 'method',     group: 'Pages', label: 'Delivery Methodology', hint: 'Six-phase lifecycle',                  path: '/methodology' },
    { id: 'eng',        group: 'Pages', label: 'Engagement Models',   hint: 'Four ways to engage',                   path: '/engagement-models' },
    { id: 'lead',       group: 'Pages', label: 'Leadership Doctrine', hint: 'Firm philosophy + transformation doctrine', path: '/leadership' },
    { id: 'about',      group: 'Pages', label: 'About the Firm',      hint: 'Multidisciplinary by design',           path: '/about' },
    { id: 'transport',  group: 'Pages', label: 'Transport Logistics', hint: 'Air, sea, ground freight',              path: '/transport' },
    { id: 'insights',   group: 'Pages', label: 'Insights',            hint: 'Practitioner perspectives',             path: '/news' },
    { id: 'legal',      group: 'Pages', label: 'Legal Advisory',      hint: 'Cross-jurisdictional counsel',          path: '/legal' },
    { id: 'contact',    group: 'Pages', label: 'Contact',             hint: 'Discuss an engagement',                  path: '/contact' },
  );

  // Pillars
  pillars.forEach((p) => {
    index.push({
      id: `pillar-${p.id}`,
      group: 'Capability Pillars',
      label: `${p.index} · ${p.name}`,
      hint: p.tagline,
      path: '/services#pillars',
    });
  });

  // Services
  services.forEach((s) => {
    index.push({
      id: `service-${s.id}`,
      group: 'Capabilities',
      label: s.title,
      hint: s.shortDescription,
      path: `/services/${s.id}`,
    });
  });

  // Industries
  industries.forEach((i) => {
    index.push({
      id: `industry-${i.id}`,
      group: 'Industries',
      label: i.name,
      hint: i.description,
      path: `/industries/${i.id}`,
    });
  });

  // Methodology phases
  methodology.forEach((m) => {
    index.push({
      id: `method-${m.index}`,
      group: 'Methodology',
      label: `${m.index} · ${m.name}`,
      hint: m.description,
      path: '/methodology',
    });
  });

  // Insights
  newsArticles.forEach((a) => {
    index.push({
      id: `insight-${a.slug}`,
      group: 'Insights',
      label: a.title,
      hint: a.excerpt,
      path: `/news/${a.slug}`,
    });
  });

  return index;
};

const SEARCH_INDEX = buildIndex();

interface SiteSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SiteSearch: React.FC<SiteSearchProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const goto = (path: string) => {
    onOpenChange(false);
    if (path.startsWith('/services#') || path.includes('#')) {
      // hash anchor — let router handle
      window.location.assign(path);
    } else {
      navigate(path);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-brand-ink/40 backdrop-blur-[1px] animate-fade-in"
      onClick={() => onOpenChange(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
    >
      <div className="max-w-2xl mx-auto pt-[10vh] px-4">
        <Command
          label="Site search"
          className="bg-brand-paper border border-brand-hair-strong shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-brand-hair-strong">
            <Search size={16} className="text-brand-mute" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search capabilities, industries, methodology, insights…"
              className="flex-1 bg-transparent text-[15px] text-brand-ink placeholder:text-brand-mute focus:outline-none"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 border border-brand-hair-strong text-[10px] font-mono-tab text-brand-mute">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto py-2">
            <Command.Empty className="px-4 py-8 text-center text-[13px] text-brand-mute">
              No results for "{query}"
            </Command.Empty>

            {Array.from(
              SEARCH_INDEX.reduce((map, entry) => {
                if (!map.has(entry.group)) map.set(entry.group, []);
                map.get(entry.group)!.push(entry);
                return map;
              }, new Map<string, SearchEntry[]>())
            ).map(([group, entries]) => (
              <Command.Group
                key={group}
                heading={
                  <span className="label-technical text-brand-mute">{group}</span>
                }
                className="px-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
              >
                {entries.map((entry) => (
                  <Command.Item
                    key={entry.id}
                    value={`${entry.label} ${entry.hint ?? ''} ${entry.group}`}
                    onSelect={() => goto(entry.path)}
                    className="group flex items-start gap-3 px-3 py-2.5 cursor-pointer aria-selected:bg-brand-stone aria-selected:text-brand-ink rounded-none"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] tracking-tight text-brand-ink truncate">
                        {entry.label}
                      </div>
                      {entry.hint && (
                        <div className="text-[12px] text-brand-mute truncate mt-0.5">
                          {entry.hint}
                        </div>
                      )}
                    </div>
                    <ArrowRight size={13} className="text-brand-mute mt-1 shrink-0 group-aria-selected:text-brand-accent" />
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>

          <div className="border-t border-brand-hair-strong px-4 py-2.5 flex items-center justify-between text-[11px] text-brand-mute">
            <span className="label-technical">↑ ↓ navigate · ⏎ select</span>
            <span className="label-technical">Site Search</span>
          </div>
        </Command>
      </div>
    </div>
  );
};
