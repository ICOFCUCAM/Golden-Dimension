import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronRight, Clock } from 'lucide-react';
import {
  PageHeader,
  Container,
  Section,
  TechnicalLabel,
  PrimaryCta,
  SecondaryCta,
  TertiaryCta,
} from '@/components/section-primitives';
import { Seo } from '@/components/Seo';
import { newsArticles } from '@/data/news';

const InsightDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return <Navigate to="/news" replace />;

  const articleIndex = newsArticles.findIndex((a) => a.slug === slug);
  const relatedArticles = (article.related || [])
    .map((s) => newsArticles.find((a) => a.slug === s))
    .filter((a): a is typeof newsArticles[number] => Boolean(a));

  return (
    <div className="bg-brand-ivory">
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/news/${article.slug}`}
        ogType="article"
      />

      <PageHeader
        eyebrow={`Insight · I.${String(articleIndex + 1).padStart(2, '0')}`}
        index={`I.${String(articleIndex + 1).padStart(2, '0')}`}
        title={article.title}
        subtitle={
          <div>
            <div className="flex items-center gap-2 text-[12px] tracking-tight text-brand-mute mb-4">
              <Link to="/" className="hover:text-brand-accent transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/news" className="hover:text-brand-accent transition-colors">Insights</Link>
              <ChevronRight size={12} />
              <span className="text-brand-ink">{article.category}</span>
            </div>
            {article.excerpt}
          </div>
        }
      />

      {/* Article body */}
      <Section tone="paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Sidebar metadata */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28 space-y-7">
                <div>
                  <div className="label-technical text-brand-mute mb-2">Category</div>
                  <div className="text-[14px] tracking-tight text-brand-ink">{article.category}</div>
                </div>
                <div>
                  <div className="label-technical text-brand-mute mb-2">Published</div>
                  <div className="text-[14px] tracking-tight text-brand-ink font-mono-tab">{article.date}</div>
                </div>
                <div>
                  <div className="label-technical text-brand-mute mb-2">Read time</div>
                  <div className="text-[14px] tracking-tight text-brand-ink inline-flex items-center gap-1.5">
                    <Clock size={11} /> {article.readTime}
                  </div>
                </div>
                {article.author && (
                  <div>
                    <div className="label-technical text-brand-mute mb-2">By</div>
                    <div className="text-[14px] tracking-tight text-brand-ink">{article.author}</div>
                    {article.authorRole && (
                      <div className="text-[12px] text-brand-mute mt-0.5">{article.authorRole}</div>
                    )}
                  </div>
                )}
              </div>
            </aside>

            {/* Article body */}
            <article className="lg:col-span-9 max-w-3xl">
              <div className="space-y-6 text-[16.5px] md:text-[18px] leading-[1.7] text-brand-ink-2">
                {article.body.map((block, i) => {
                  if (block.type === 'p') {
                    return <p key={i}>{block.text}</p>;
                  }
                  if (block.type === 'h2') {
                    return (
                      <h2
                        key={i}
                        className="font-display text-[22px] md:text-[28px] font-medium tracking-[-0.015em] text-brand-ink leading-tight pt-6 mt-2"
                      >
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === 'quote') {
                    return (
                      <figure key={i} className="my-10 border-l-2 border-brand-accent pl-6 md:pl-8">
                        <blockquote className="font-editorial italic text-[20px] md:text-[26px] leading-[1.3] tracking-[-0.005em] text-brand-ink">
                          {block.text}
                        </blockquote>
                      </figure>
                    );
                  }
                  if (block.type === 'list' && block.items) {
                    return (
                      <ul key={i} className="space-y-3 my-2">
                        {block.items.map((item) => (
                          <li key={item} className="flex items-baseline gap-3">
                            <span className="block w-1 h-1 bg-brand-accent shrink-0 mt-2.5" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>

              <div className="mt-14 pt-8 border-t border-brand-hair flex items-center justify-between">
                <Link
                  to="/news"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink-2 hover:text-brand-accent transition-colors"
                >
                  <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                  All insights
                </Link>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
                >
                  Discuss this with the practice
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {/* Related */}
      {relatedArticles.length > 0 && (
        <Section tone="ivory" divided>
          <Container>
            <div className="mb-10">
              <TechnicalLabel index="REL">Related Insights</TechnicalLabel>
              <h2 className="mt-7 font-display text-[24px] md:text-[28px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                Continue reading
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-brand-hair">
              {relatedArticles.map((r) => (
                <Link
                  key={r.slug}
                  to={`/news/${r.slug}`}
                  className="group border-r border-b border-brand-hair p-7 bg-brand-paper hover:bg-brand-stone transition-colors"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="label-technical text-brand-accent">{r.category}</span>
                    <span className="label-technical text-brand-mute font-mono-tab">{r.readTime.replace(/\s*read/i, '')}</span>
                  </div>
                  <h3 className="font-display text-[18px] md:text-[19px] font-medium tracking-[-0.015em] text-brand-ink leading-snug group-hover:text-brand-accent transition-colors line-clamp-3">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.55] text-brand-ink-2 line-clamp-3">
                    {r.excerpt}
                  </p>
                  <ArrowRight size={13} className="mt-5 text-brand-mute group-hover:text-brand-accent group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section tone="paper" divided>
        <Container size="narrow">
          <TechnicalLabel index="ENG">Engage With Us</TechnicalLabel>
          <h2 className="mt-8 font-display text-[28px] md:text-[40px] lg:text-[48px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
            Discuss this perspective with the{' '}
            <span className="font-editorial italic text-brand-accent">practice team</span>.
          </h2>
          <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
            <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
            <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
            <TertiaryCta to="/news">All Insights</TertiaryCta>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default InsightDetailPage;
