export interface ITask {
  id: number;
  description: string;
}

export interface ITaskList {
  id: number;
  update: number;
  title: string;
  tasks: ITask[];
}
