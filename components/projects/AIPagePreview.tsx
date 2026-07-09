'use client';

import { useState } from 'react';

export function AIPagePreview({ projectId, initialHtml }: { projectId: string; initialHtml: string | null }) {
  const [html, setHtml] = useState<string>(initialHtml ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/projects/${projectId}/generate-page`, {
        method: 'POST'
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }
      setHtml(data.html);
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI-Generated Page</h2>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-full bg-aqua px-5 py-3 font-bold text-ink disabled:opacity-60"
        >
          {loading ? 'Generating…' : html ? 'Regenerate' : 'Generate with AI'}
        </button>
      </div>

      {error && <p className="mt-4 rounded-xl bg-red-500/20 p-3 text-sm text-red-300">{error}</p>}

      {loading && (
        <p className="mt-4 text-white/60">Claude is designing your page, this can take 10-20 seconds…</p>
      )}

      {html && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <iframe
            srcDoc={html}
            className="h-[600px] w-full bg-white"
            sandbox=""
            title="AI generated page preview"
          />
        </div>
      )}
    </div>
  );
}