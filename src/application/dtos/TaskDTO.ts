export interface TaskDTO {
  id: string;
  title: string;
  description?: string;
  category?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
