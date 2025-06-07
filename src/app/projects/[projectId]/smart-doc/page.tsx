'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useStore } from '@/store';
import { useState } from 'react';

export default function SmartDocPage() {
  const params = useParams<{ projectId: string }>();
  const project = useStore((s) => s.projects.find(p => p.id === params.projectId));
  const [text, setText] = useState(project?.smartDoc || '');
  if (!project) return <div className="p-4">Project not found</div>;
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link href={`/projects/${project.id}`} className="text-sm text-blue-600">&larr; Back to project</Link>
      <h1 className="text-2xl font-bold my-4">Smart Doc</h1>
      <textarea
        className="w-full h-64 border rounded p-2 mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="text-sm text-gray-500">Auto-generated summaries from AI would appear here.</div>
    </div>
  );
}
