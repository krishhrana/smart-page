import { create } from 'zustand';

export type Message = { from: 'user' | 'ai'; text: string };
export type Resource = { id: string; name: string; type: 'file' | 'link'; url: string; uploadedBy: string; };
export type Member = { id: string; name: string; active: boolean; messages: Message[]; resources: Resource[] };
export type Project = { id: string; name: string; ownerId: string; members: Member[]; smartDoc: string };

interface Store {
  projects: Project[];
  currentProjectId?: string;
  selectProject: (id: string) => void;
  addMessage: (projectId: string, memberId: string, message: Message) => void;
  addResource: (projectId: string, memberId: string, resource: Resource) => void;
}

const initialProjects: Project[] = [
  {
    id: 'p1',
    name: 'Example Project',
    ownerId: 'u1',
    smartDoc: 'Project summary will appear here.',
    members: [
      {
        id: 'u1',
        name: 'Alice',
        active: false,
        messages: [
          { from: 'ai', text: 'Welcome to your research chat.' },
        ],
        resources: [],
      },
      {
        id: 'u2',
        name: 'Bob',
        active: false,
        messages: [
          { from: 'ai', text: 'Hello Bob!' },
        ],
        resources: [],
      },
    ],
  },
];

export const useStore = create<Store>((set) => ({
  projects: initialProjects,
  currentProjectId: 'p1',
  selectProject: (id) => set({ currentProjectId: id }),
  addMessage: (projectId, memberId, message) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              members: p.members.map((m) =>
                m.id === memberId
                  ? { ...m, messages: [...m.messages, message] }
                  : m
              ),
            }
          : p
      ),
    })),
  addResource: (projectId, memberId, resource) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              members: p.members.map((m) =>
                m.id === memberId
                  ? { ...m, resources: [...m.resources, resource] }
                  : m
              ),
            }
          : p
      ),
    })),
}));
