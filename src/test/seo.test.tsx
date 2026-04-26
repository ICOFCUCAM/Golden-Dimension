/**
 * Render-level smoke test for the <Seo> primitive — verifies the
 * Helmet output contains the page title, canonical, og:* and
 * twitter:* tags every route depends on.
 */
import { describe, expect, it } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Seo } from '@/components/Seo';

describe('<Seo>', () => {
  it('writes title, canonical, og:* and twitter:* tags into <head>', async () => {
    render(
      <HelmetProvider>
        <Seo title="Test page" description="Desc" path="/test" />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toContain('Test page');
      expect(document.title).toContain('Golden Dimensions Ltd');
    });

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('https://golden-dimension.vercel.app/test');

    const desc = document.querySelector('meta[name="description"]');
    expect(desc?.getAttribute('content')).toBe('Desc');

    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute('content')).toContain('Test page');

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
  });
});
