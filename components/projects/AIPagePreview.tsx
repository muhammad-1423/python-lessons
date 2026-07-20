'use client';

import { useState, useEffect } from 'react';

type Version = {
  id: string;
  label: string;
  html: string;
  createdAt: string;
};

export function AIPagePreview({ projectId, initialHtml }: { projectId: string; initialHtml: string | null }) {
  const [html, setHtml] = useState<string>(initialHtml ?? '');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editInstruction, setEditInstruction] = useState('');
  const [error, setError] = useState('');
  const [versions, setVersions] = useState<Version[]>([]);
  const [showVersions, setShowVersions] = useState(false);

  useEffect(() => {
    fetchVersions();
  }, [projectId]);

  async function fetchVersions() {
    const response = await fetch(`/api/projects/${projectId}/versions`);
    const data = await response.json();
    setVersions(data.versions ?? []);
  }

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
      await fetchVersions();
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit() {
    if (!editInstruction.trim()) return;
    setEditing(true);
    setError('');
    try {
      const response = await fetch(`/api/projects/${projectId}/edit-page`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction: editInstruction })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }
      
      setHtml(data.html);
      setEditInstruction('');
      await fetchVersions();
    } catch {
      setError('Something went wrong');
    } finally {
      setEditing(false);
    }
  }

  function selectVersion(version: Version) {
    setHtml(version.html);
    setShowVersions(false);
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI-Generated Page</h2>
        <div className="flex gap-3">
          {versions.length > 0 && (
            <button
              onClick={() => setShowVersions((v) => !v)}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold"
            >
              Versions ({versions.length})
            </button>
          )}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="rounded-full bg-aqua px-5 py-3 font-bold text-ink disabled:opacity-60"
          >
            {loading ? 'Generating…' : html ? 'Regenerate' : 'Generate with AI'}
          </button>
        </div>
      </div>

      {error && <p className="mt-4 rounded-xl bg-red-500/20 p-3 text-sm text-red-300">{error}</p>}

      {loading && (
        <p className="mt-4 text-white/60">Claude is designing your page, this can take 10-20 seconds…</p>
      )}

      {showVersions && versions.length > 0 && (
        <div className="mt-4 max-h-64 space-y-2 overflow-y-auto rounded-xl bg-black/20 p-3">
          {versions.map((v) => (
            <button
              key={v.id}
              onClick={() => selectVersion(v)}
              className="block w-full rounded-lg bg-white/5 p-3 text-left text-sm hover:bg-white/10"
            >
              <p className="font-semibold">{v.label}</p>
              <p className="text-white/50">{new Date(v.createdAt).toLocaleString()}</p>
            </button>
          ))}
        </div>
      )}

      {html && (
        <>
          <div className="mt-6 flex gap-3">
            <input
              value={editInstruction}
              onChange={(e) => setEditInstruction(e.target.value)}
              placeholder="e.g. make the header purple, change the headline to..."
              className="flex-1 rounded-full bg-white px-5 py-3 text-ink placeholder:text-ink/40"
              onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
            />
            <button
              onClick={handleEdit}
              disabled={editing || !editInstruction.trim()}
              className="rounded-full bg-brand px-6 py-3 font-bold disabled:opacity-60"
            >
              {editing ? 'Applying…' : 'Apply edit'}
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              srcDoc={html}
              className="h-[600px] w-full bg-white"
              sandbox=""
              title="AI generated page preview"
            />
          </div>
        </>
      )}
    </div>
  );
}