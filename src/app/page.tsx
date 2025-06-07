'use client';
import Link from 'next/link';
import { useStore } from '@/store';

export default function Dashboard() {
  const projects = useStore((s) => s.projects);
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="grid gap-4">
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="border rounded p-4 hover:bg-gray-50"
          >
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-500">Owner: {p.members.find(m=>m.id===p.ownerId)?.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
