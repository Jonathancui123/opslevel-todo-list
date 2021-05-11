export type TaskId = number;
export interface Todos {
  [key: number]: Map<TaskId, Task>;
}

export interface Task {
  description: string;
  isCompleted: boolean;
}
