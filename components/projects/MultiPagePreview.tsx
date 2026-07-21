'use client';

import { useState, useEffect } from 'react';

type GeneratedPage = {
  id: string;
  slug: string;
  title: string;
  html: string;
};

export function MultiPagePreview({ projectId }: { projectId: string }) {
  const [pages, setPages] = useState<GeneratedPage[]>([]);
  const [activeSlug, setActiveSlug] = useState('home');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPages();
  }, [projectId]);

  async function fetchPages() {
    const response = await fetch(`/api/projects/${projectId}/pages`);
    const data = await response.json();
    setPages(data.pages ?? []);
  }

  async function handleGenerate() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/projects/${projectId}/generate-multipage`, {
        method: 'POST'
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }
      setPages(data.pages ?? []);
      setActiveSlug('home');
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const activePage = pages.find((p) => p.slug === activeSlug);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Multi-Page Website</h2>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-full bg-brand px-5 py-3 font-bold disabled:opacity-60"
        >
          {loading ? 'Generating…' : pages.length > 0 ? 'Regenerate site' : 'Generate 3-page site'}
        </button>
      </div>

      {error && <p className="mt-4 rounded-xl bg-red-500/20 p-3 text-sm text-red-300">{error}</p>}

      {loading && (
        <p className="mt-4 text-white/60">Claude is designing your 3-page website, this can take 30-60 seconds…</p>
      )}

      {pages.length > 0 && (
        <>
          <div className="mt-6 flex gap-2">
            {pages.map((page) => (
              <button
                key={page.slug}
                onClick={() => setActiveSlug(page.slug)}
                className={`rounded-full px-5 py-2 text-sm font-semibold ${
                  activeSlug === page.slug ? 'bg-white text-ink' : 'bg-white/10'
                }`}
              >
                {page.title}
              </button>
            ))}
          </div>

          {activePage && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                srcDoc={activePage.html}
                className="h-[600px] w-full bg-white"
                sandbox=""
                title={`${activePage.title} preview`}
              />
            </div>
          )}

          <p className="mt-4 text-sm text-white/50">
            Live site: <a className="underline" href={`/preview/${projectId}`} target="_blank" rel="noopener noreferrer">
              /preview/{projectId}
            </a>
          </p>
        </>
      )}
    </div>
  );
}