import { Dictionary } from "typescript-collections";
import { ITask } from "../../typesTypes/task";

export class TaskManager {

    activeTasks: Dictionary<number,ITask> = new Dictionary<number,ITask>();

    addTask(task: ITask): void{
        if(this.activeTasks.containsKey(task.id)) throw new Error("task already exists!");
        this.activeTasks.setValue(task.id,task);
    }

    tick() : void {
        let finishedTasks : ITask[] = [];
        for(let task of this.activeTasks.values()){
            if(task.tick()) {
                finishedTasks.push(task)
            }
        }
        for(let finishedTask of finishedTasks){
            this.activeTasks.remove(finishedTask.id);
            finishedTask.onFinish();
        }
    }
}