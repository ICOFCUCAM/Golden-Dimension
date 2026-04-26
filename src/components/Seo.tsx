import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://golden-dimension.vercel.app';
const FIRM_NAME = 'Golden Dimensions Ltd';
const DEFAULT_DESCRIPTION =
  'Integrated consulting and engineering capabilities for institutions, enterprises, and governments worldwide. Multidisciplinary delivery across finance, infrastructure, healthcare, education, and digital systems since 2003.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

interface SeoProps {
  title: string;          // page-specific title (without firm name)
  description?: string;
  path: string;           // route path, e.g. "/services"
  ogType?: 'website' | 'article';
}

/**
 * Per-route SEO + social meta tags.
 * Adds <title>, description, canonical, and og:* / twitter:* via Helmet.
 * Wrap the app in <HelmetProvider> at the root for this to work.
 */
export const Seo: React.FC<SeoProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  ogType = 'website',
}) => {
  const fullTitle = `${title} · ${FIRM_NAME}`;
  const canonical = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={FIRM_NAME} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
    </Helmet>
  );
};
