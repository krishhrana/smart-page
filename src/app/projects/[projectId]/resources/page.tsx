'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useStore } from '@/store';

export default function ResourcesPage() {
  const params = useParams<{ projectId: string }>();
  const project = useStore((s) => s.projects.find(p => p.id === params.projectId));
  if (!project) return <div className="p-4">Project not found</div>;
  const resources = project.members.flatMap(m => m.resources.map(r => ({...r, member: m.name})));
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link href={`/projects/${project.id}`} className="text-sm text-blue-600">&larr; Back to project</Link>
      <h1 className="text-2xl font-bold my-4">Resource Hub</h1>
      <ul className="grid gap-2">
        {resources.length === 0 && <li>No resources uploaded.</li>}
        {resources.map(r => (
          <li key={r.id} className="border rounded p-2">
            <div className="font-semibold">{r.name}</div>
            <div className="text-sm text-gray-500">Uploaded by {r.member}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
