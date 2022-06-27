import { Dictionary } from "typescript-collections";
import { ICommandTask, ITask } from "../../typesTypes/task";
import { ControlFlowService } from "../controlFlowGraph/services/controlFlowService";
import { scopeService } from "../scopeService/scopeService";
import { IcontrolFlowNode } from '../controlFlowGraph/types/controlFlowNode';

export class TaskManager {
    
    readonly scopeService: scopeService;
    readonly controlFlowService : ControlFlowService;
    readonly activeTasks: Dictionary<number,ITask> = new Dictionary<number,ITask>();
    lastId: number = 0;

    constructor(scopeService : scopeService , controlFlowService : ControlFlowService){
        this.scopeService = scopeService;
        this.controlFlowService = controlFlowService;
    }

    controlFlowNodToTask(controlFlowNode : IcontrolFlowNode): ITask {
        return {id : this.lastId++ , controlFlowRef : controlFlowNode , 
            tick: () => true ,
             onFinish: () => null,
             runtimeData: {},
             onStart: (scopeService) => {}
            };
    }

    executeControlFlowNodes(){
        const tasks = this.controlFlowService.startNodes
        .map(controlFlowNode => this.controlFlowNodToTask(controlFlowNode));
        for(var task of tasks) this.activeTasks.setValue(task.id,task);
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