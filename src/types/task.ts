export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "Low" | "Medium" | "High";
  userEmail: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
}