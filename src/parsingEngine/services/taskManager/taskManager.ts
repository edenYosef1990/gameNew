import { Dictionary } from "typescript-collections";
import { ICommandTask, ITask } from "../../typesTypes/task";
import { scopeService } from "../scopeService/scopeService";

export class TaskManager {
    
    readonly scopeService: scopeService;
    readonly activeTasks: Dictionary<number,ITask> = new Dictionary<number,ITask>();

    constructor(scopeService : scopeService){
        this.scopeService = scopeService;
    }


    addTask(task: ITask): void{
        if(this.activeTasks.containsKey(task.id)) throw new Error("task already exists!");
        this.activeTasks.setValue(task.id,task);
        task.onStart(this.scopeService);
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