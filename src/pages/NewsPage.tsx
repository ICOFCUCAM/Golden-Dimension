import React, { useState } from 'react';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import { newsArticles } from '@/data/news';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PageHeader } from '@/components/section-primitives';

const categories = ['All', 'Company News', 'Sustainability', 'Industry Insights', 'Transport', 'Engineering', 'Technology', 'Healthcare', 'Giving'];

const NewsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation(0.05);

  const filteredArticles = activeCategory === 'All'
    ? newsArticles
    : newsArticles.filter((a) => a.category === activeCategory);

  return (
    <div className="bg-brand-ivory">
      <PageHeader
        eyebrow="Insights"
        index="N.01"
        title={<>Company news, industry analysis, and <span className="font-editorial italic text-brand-accent">thought leadership</span>.</>}
        subtitle="Practitioner perspectives from across the firm — engineering, finance, technology, and institutional development."
      />

      {/* Category Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-brand-accent text-brand-ivory'
                    : 'bg-brand-paper text-brand-mute hover:bg-brand-paper hover:text-brand-ink-2'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 pb-24" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-brand-mute text-lg">No articles found in this category.</p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-4 text-brand-accent hover:underline"
              >
                View all articles
              </button>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {activeCategory === 'All' && (
                <div
                  className={`mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-2xl bg-brand-paper border border-brand-hair hover:border-brand-accent/30 transition-all duration-700 cursor-pointer ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  onClick={() => setExpandedArticle(expandedArticle === filteredArticles[0].id ? null : filteredArticles[0].id)}
                >
                  <div className="rounded-xl overflow-hidden h-72">
                    <img
                      src={filteredArticles[0].image}
                      alt={filteredArticles[0].title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-medium">
                        {filteredArticles[0].category}
                      </span>
                      <span className="text-brand-mute text-sm flex items-center gap-1">
                        <Clock size={14} /> {filteredArticles[0].readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-4 hover:text-brand-accent transition-colors">
                      {filteredArticles[0].title}
                    </h2>
                    <p className="text-brand-mute leading-relaxed mb-4">
                      {filteredArticles[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-brand-mute text-sm">{filteredArticles[0].date}</span>
                      <span className="text-brand-accent text-sm font-medium flex items-center gap-1">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                    {expandedArticle === filteredArticles[0].id && (
                      <div className="mt-6 pt-6 border-t border-brand-hair">
                        <p className="text-brand-ink-2 leading-relaxed">
                          This is an expanded view of the article. In a full implementation, this would contain the complete article content with rich formatting, images, and related resources. Golden Dimensions is committed to keeping our stakeholders informed about our latest developments and industry insights.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Article Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeCategory === 'All' ? filteredArticles.slice(1) : filteredArticles).map((article, i) => (
                  <div
                    key={article.id}
                    className={`group rounded-2xl overflow-hidden bg-brand-paper border border-brand-hair hover:border-brand-accent/30 transition-all duration-500 hover:-translate-y-1 cursor-pointer ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                    onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-medium">
                          {article.category}
                        </span>
                        <span className="text-brand-mute text-xs flex items-center gap-1">
                          <Clock size={12} /> {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-brand-ink mb-3 group-hover:text-brand-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-brand-mute text-sm leading-relaxed line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-mute text-xs">{article.date}</span>
                        <span className="text-brand-accent text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Read <ArrowRight size={14} />
                        </span>
                      </div>
                      {expandedArticle === article.id && (
                        <div className="mt-4 pt-4 border-t border-brand-hair">
                          <p className="text-brand-ink-2 text-sm leading-relaxed">
                            Full article content would appear here with detailed analysis, expert commentary, and actionable insights from the Golden Dimensions team.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
