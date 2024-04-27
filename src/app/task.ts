export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

export interface TaskForm {
  title: string;
  description: string;
  dueDate: string;
}

export interface credentials {
  user: string;
  password: string;
  email: string;
}

export interface IdentityRole {
  id: string | null;
  name: string | null;
  normalizedName: string | null;
  concurrencyStamp: string | null;
}
