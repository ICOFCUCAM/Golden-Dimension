import React, { useState } from 'react';
import { Clock, ArrowRight, ArrowUpRight } from 'lucide-react';
import { newsArticles } from '@/data/news';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  PageHeader,
  Container,
  Section,
  TechnicalLabel,
} from '@/components/section-primitives';

const categories = ['All', 'Company News', 'Sustainability', 'Industry Insights', 'Transport', 'Engineering', 'Technology', 'Healthcare', 'Giving'];

const NewsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const { ref } = useScrollAnimation(0.05);

  const filteredArticles =
    activeCategory === 'All'
      ? newsArticles
      : newsArticles.filter((a) => a.category === activeCategory);

  const featured = activeCategory === 'All' ? filteredArticles[0] : null;
  const grid = activeCategory === 'All' ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="bg-brand-ivory">
      <PageHeader
        eyebrow="Insights"
        index="N.01"
        title={<>Company news, industry analysis, and <span className="font-editorial italic text-brand-accent">thought leadership</span>.</>}
        subtitle="Practitioner perspectives from across the firm — engineering, finance, technology, and institutional development."
      />

      {/* Category filter — editorial chip rail */}
      <section className="bg-brand-ivory border-b border-brand-hair">
        <Container>
          <div className="py-6 flex items-baseline gap-6 overflow-x-auto">
            <span className="label-technical text-brand-mute shrink-0">Filter by</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-[12.5px] font-medium tracking-tight border transition-colors ${
                      active
                        ? 'bg-brand-ink border-brand-ink text-brand-ivory'
                        : 'bg-brand-paper border-brand-hair-strong text-brand-ink-2 hover:border-brand-ink hover:text-brand-ink'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Articles */}
      <Section tone="paper">
        <Container>
          {filteredArticles.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-brand-mute text-[15px]">No articles in this category.</p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-4 text-[13px] font-medium text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
              >
                View all articles
              </button>
            </div>
          ) : (
            <div ref={ref}>
              {/* Featured article — editorial wide layout */}
              {featured && (
                <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-14 mb-14 border-b-2 border-brand-ink">
                  <div className="lg:col-span-5">
                    <div className="aspect-[4/3] overflow-hidden bg-brand-stone">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover grayscale-[10%]"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="label-technical text-brand-accent">Featured · {featured.category}</span>
                      <span className="label-technical text-brand-mute flex items-center gap-1.5">
                        <Clock size={11} /> {featured.readTime}
                      </span>
                    </div>
                    <h2 className="font-display text-[28px] md:text-[36px] lg:text-[42px] font-medium tracking-[-0.015em] text-brand-ink leading-[1.1]">
                      {featured.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-[15.5px] md:text-[16.5px] leading-[1.65] text-brand-ink-2">
                      {featured.excerpt}
                    </p>

                    {expandedArticle === featured.id && (
                      <p className="mt-5 max-w-2xl text-[14.5px] leading-[1.7] text-brand-ink-2 border-l-2 border-brand-accent pl-5">
                        Full article content would appear here with detailed analysis, expert commentary, and actionable insights from the Golden Dimensions team.
                      </p>
                    )}

                    <div className="mt-7 flex items-center justify-between">
                      <span className="label-technical text-brand-mute font-mono-tab">
                        {featured.date}
                      </span>
                      <button
                        onClick={() => setExpandedArticle(expandedArticle === featured.id ? null : featured.id)}
                        className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink border-b border-brand-ink pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors"
                      >
                        {expandedArticle === featured.id ? 'Collapse' : 'Read article'}
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              )}

              {/* Article grid — editorial rule grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-brand-hair">
                {grid.map((article, idx) => (
                  <article
                    key={article.id}
                    className="border-r border-b border-brand-hair bg-brand-paper hover:bg-brand-stone transition-colors"
                  >
                    <button
                      onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
                      className="block w-full text-left h-full"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-brand-stone">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover grayscale-[10%]"
                        />
                      </div>

                      <div className="p-7">
                        <div className="flex items-baseline justify-between mb-4">
                          <span className="label-technical text-brand-accent">
                            N.{String(idx + (featured ? 2 : 1)).padStart(2, '0')} · {article.category}
                          </span>
                          <span className="label-technical text-brand-mute font-mono-tab">
                            {article.readTime.replace(/\s*read/i, '')}
                          </span>
                        </div>

                        <h3 className="font-display text-[18px] md:text-[20px] font-medium tracking-[-0.015em] text-brand-ink leading-snug line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="mt-3 text-[13.5px] leading-[1.6] text-brand-ink-2 line-clamp-3">
                          {article.excerpt}
                        </p>

                        <div className="mt-5 pt-4 border-t border-brand-hair flex items-center justify-between">
                          <span className="label-technical text-brand-mute font-mono-tab">
                            {article.date}
                          </span>
                          <ArrowUpRight size={14} className="text-brand-mute" />
                        </div>

                        {expandedArticle === article.id && (
                          <p className="mt-5 text-[13px] leading-[1.65] text-brand-ink-2 border-l-2 border-brand-accent pl-4">
                            Full article content would appear here with detailed analysis, expert commentary, and actionable insights from the Golden Dimensions team.
                          </p>
                        )}
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
};

export default NewsPage;
