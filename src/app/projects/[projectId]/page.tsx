'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useStore } from '@/store';

export default function ProjectPage() {
  const params = useParams<{ projectId: string }>();
  const project = useStore((s) => s.projects.find(p => p.id === params.projectId));
  if (!project) return <div className="p-4">Project not found</div>;
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link href="/" className="text-sm text-blue-600">&larr; Back to dashboard</Link>
      <h1 className="text-2xl font-bold my-4">{project.name}</h1>
      <h2 className="font-semibold mb-2">Members</h2>
      <ul className="grid gap-2 mb-4">
        {project.members.map(m => (
          <li key={m.id} className="flex items-center justify-between border rounded p-2">
            <span>{m.name}</span>
            <Link href={`/projects/${project.id}/chat/${m.id}`} className="text-blue-600 text-sm">
              {m.active ? 'View active session' : 'View session'}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-4">
        <Link href={`/projects/${project.id}/resources`} className="text-blue-600">Resource Hub</Link>
        <Link href={`/projects/${project.id}/smart-doc`} className="text-blue-600">Smart Doc</Link>
      </div>
    </div>
  );
}
