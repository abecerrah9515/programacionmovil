export interface Tutorial {
  id: string;
  title: string;
  description?: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type TutorialPayload = Pick<Tutorial, 'title' | 'description' | 'published'>;
