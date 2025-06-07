'use client';
import { useParams } from 'next/navigation';
import { useStore } from '@/store';
import Link from 'next/link';
import { useState } from 'react';

export default function ChatPage() {
  const params = useParams<{ projectId: string; memberId: string }>();
  const project = useStore((s) => s.projects.find(p => p.id === params.projectId));
  const addMessage = useStore((s) => s.addMessage);
  const member = project?.members.find(m => m.id === params.memberId);
  const [text, setText] = useState('');
  const isOwner = member?.id === 'u1'; // simulate logged in user u1
  if (!project || !member) return <div className="p-4">Chat not found</div>;

  const send = () => {
    if (!text) return;
    addMessage(project.id, member.id, { from: 'user', text });
    setText('');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link href={`/projects/${project.id}`} className="text-sm text-blue-600">&larr; Back to project</Link>
      <h1 className="text-xl font-bold my-4">{member.name}&apos;s Research Chat</h1>
      <div className="border rounded p-2 h-64 overflow-y-auto mb-4">
        {member.messages.map((m, idx) => (
          <div key={idx} className="mb-2">
            <span className="font-semibold mr-2">{m.from}:</span>{m.text}
          </div>
        ))}
      </div>
      {isOwner ? (
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border rounded px-2 py-1 flex-grow"
            placeholder="Type a message"
          />
          <button onClick={send} className="px-3 py-1 border rounded bg-blue-600 text-white">Send</button>
        </div>
      ) : (
        <div className="text-sm text-gray-500">Read-only session</div>
      )}
    </div>
  );
}
