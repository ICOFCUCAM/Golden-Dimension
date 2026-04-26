/**
 * Smoke tests for the static data modules. They guard against accidental
 * breakage of the cross-references the app depends on (industry → pillar
 * mappings, case-study → sector mappings, etc.) and assert the SEO-
 * critical fields are present.
 */
import { describe, expect, it } from 'vitest';
import { industries, pillars, methodology, capabilityModel, globalStats } from '@/data/servicesPage';
import { services } from '@/data/services';
import { caseStudies, engagementModelsById } from '@/data/caseStudies';
import { newsArticles } from '@/data/news';
import { practitioners } from '@/data/team';

describe('servicesPage data', () => {
  it('has 5 capability pillars with 16 services total', () => {
    expect(pillars).toHaveLength(5);
    const totalServices = pillars.reduce((acc, p) => acc + p.services.length, 0);
    expect(totalServices).toBe(16);
  });

  it('has 6 industries; every industry references valid pillar ids', () => {
    expect(industries).toHaveLength(6);
    const pillarIds = new Set(pillars.map((p) => p.id));
    industries.forEach((i) => {
      i.pillars.forEach((pid) => {
        expect(pillarIds.has(pid), `industry ${i.id} → unknown pillar ${pid}`).toBe(true);
      });
    });
  });

  it('every industry has the homepage narrative fields', () => {
    industries.forEach((i) => {
      expect(i.impact.length).toBeGreaterThan(20);
      expect(i.scope.length).toBeGreaterThan(20);
      expect(i.relevance.length).toBeGreaterThan(20);
      expect(i.clients.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('has 6 methodology phases with sequential indices', () => {
    expect(methodology).toHaveLength(6);
    methodology.forEach((m, idx) => {
      expect(m.index).toBe(String(idx + 1).padStart(2, '0'));
    });
  });

  it('has 6 capability layers and 4 global stats', () => {
    expect(capabilityModel).toHaveLength(6);
    expect(globalStats).toHaveLength(4);
  });
});

describe('services data', () => {
  it('has 16 services; each service is referenced by exactly one pillar', () => {
    expect(services).toHaveLength(16);
    const referenced = new Set(pillars.flatMap((p) => p.services.map((s) => s.id)));
    services.forEach((svc) => {
      expect(referenced.has(svc.id), `service ${svc.id} not in any pillar`).toBe(true);
    });
  });
});

describe('case studies data', () => {
  it('every case references a valid sector + pillar + engagement model', () => {
    const sectorIds = new Set(industries.map((i) => i.id));
    const pillarIds = new Set(pillars.map((p) => p.id));
    const modelIds  = new Set(Object.keys(engagementModelsById));
    caseStudies.forEach((c) => {
      expect(sectorIds.has(c.sectorId), `case ${c.id} → unknown sector`).toBe(true);
      expect(pillarIds.has(c.pillarId), `case ${c.id} → unknown pillar`).toBe(true);
      expect(modelIds.has(c.engagementModelId), `case ${c.id} → unknown engagement model`).toBe(true);
    });
  });

  it('every case carries metrics + workstreams', () => {
    caseStudies.forEach((c) => {
      expect(c.metrics.length).toBeGreaterThanOrEqual(3);
      expect(c.workstreams.length).toBeGreaterThanOrEqual(2);
      expect(c.context.length).toBeGreaterThan(50);
      expect(c.intervention.length).toBeGreaterThan(50);
      expect(c.outcome.length).toBeGreaterThan(50);
    });
  });

  it('case slugs are unique', () => {
    const slugs = caseStudies.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('news (insights) data', () => {
  it('every article carries a slug, body, category, and date', () => {
    newsArticles.forEach((a) => {
      expect(a.slug.length).toBeGreaterThan(3);
      expect(a.body.length).toBeGreaterThanOrEqual(2);
      expect(a.category).toBeTruthy();
      expect(Number.isNaN(new Date(a.date).getTime())).toBe(false);
    });
  });

  it('article slugs are unique', () => {
    const slugs = newsArticles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('related slugs reference real articles', () => {
    const known = new Set(newsArticles.map((a) => a.slug));
    newsArticles.forEach((a) => {
      (a.related ?? []).forEach((r) => {
        expect(known.has(r), `${a.slug} → unknown related ${r}`).toBe(true);
      });
    });
  });
});

describe('team data', () => {
  it('every practitioner has the required fields', () => {
    practitioners.forEach((p) => {
      expect(p.initials).toMatch(/^[A-Z]{2}$/);
      expect(p.name).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.bio.length).toBeGreaterThan(50);
      expect(p.expertise.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('practice areas reference pillars or "firm"', () => {
    const valid = new Set([...pillars.map((p) => p.id), 'firm']);
    practitioners.forEach((p) => {
      expect(valid.has(p.practiceArea), `${p.id} → invalid practice area ${p.practiceArea}`).toBe(true);
    });
  });
});
