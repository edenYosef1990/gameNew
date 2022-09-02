import { ITask } from "./manageTasks/task";

export interface ITaskAggragatorService {

    runTask(task : ITask) : boolean;
}

export class tasksAggragatorService implements ITaskAggragatorService {

    runTask(task : ITask) : boolean{ return true}
}