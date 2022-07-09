import { Dictionary } from "typescript-collections";
import { ICommandTask, ITask } from "./task";
import { ControlFlowService } from "../generateControlFlowGraph/controlFlowService";
import { memScopeService } from "../scopeManagment/scopeService";
import { IcontrolFlowNode } from '../generateControlFlowGraph/controlFlowNode';
import { GenNextTasksFunc, getGenNextTasksFuncDict } from "./controlFlowToTaskManagerFunctions";
import { Nullable } from "../commonTypes/nullable";
import { MovementManager } from "../movementManager/movementManager";

export class TaskManager {
    
    readonly scopeService: memScopeService;
    readonly controlFlowService : ControlFlowService;
    readonly activeTasks: Dictionary<number,ITask> = new Dictionary<number,ITask>();
    readonly dict: Dictionary<string,GenNextTasksFunc>;

    lastId: number = 0;

    constructor(memScopeService : memScopeService , controlFlowService : ControlFlowService,movementManager : MovementManager){
        this.scopeService = memScopeService;
        this.controlFlowService = controlFlowService;
        this.dict = getGenNextTasksFuncDict();
    }

    generateNewTaskFromFormer(controlFlowNode : IcontrolFlowNode,formerTask : Nullable<ITask>): ITask[] {
        return this.dict.getValue(controlFlowNode.name)!(controlFlowNode,this.scopeService,this.lastId++,formerTask);
    }

    executeControlFlowNodes(controlFlowNode : IcontrolFlowNode){
        let tasks  =this.generateNewTaskFromFormer(controlFlowNode,null);
        for(var task of tasks) this.activeTasks.setValue(task.id,task);
    }

    tick() : void {
        let finishedTasks : ITask[] = [];
        for(let task of this.activeTasks.values()){
            if(this.tickTask(task)) {
                finishedTasks.push(task)
            }
        }
        for(let finishedTask of finishedTasks){
            this.activeTasks.remove(finishedTask.id);
            let nextNode = finishedTask.getFollowingControlFlowNode();
            if(!nextNode) continue;
             let newTasks = this.generateNewTaskFromFormer(nextNode,finishedTask);
             for(let newTask of newTasks) this.activeTasks.setValue(newTask.id,newTask);
        }
    }

    tickTask(task: ITask) : boolean{ return true;}
    

}