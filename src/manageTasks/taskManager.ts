import { Dictionary } from "typescript-collections";
import { ITask } from "./task";
import { IControlFlowService } from "../generateControlFlowGraph/controlFlowService";
import { ImemScopeService, } from "../scopeManagment/scopeService";
import { IcontrolFlowNode } from '../generateControlFlowGraph/controlFlowNode';
import { GenNextTasksFunc, getGenNextTasksFuncDict } from "./controlFlowToTaskManagerFunctions";
import { Nullable } from "../commonTypes/nullable";
import { IMovementManager} from "../movementManager/movementManager";
import { ITaskAggragatorService} from "../tasksAggragatorService";

export interface ITaskManager {

    generateNewTaskFromFormer(controlFlowNode : IcontrolFlowNode,formerTask : Nullable<ITask>): ITask[];
    executeControlFlowNodes(controlFlowNode : IcontrolFlowNode): void;
    tick() : void;
}

export class TaskManager implements ITaskManager{
    
    readonly scopeService: ImemScopeService;
    readonly controlFlowService : IControlFlowService;
    readonly activeTasks: Dictionary<number,ITask> = new Dictionary<number,ITask>();
    readonly dict: Dictionary<string,GenNextTasksFunc>;
    readonly tasksAggragatorService : ITaskAggragatorService; 

    lastId: number = 0;

    constructor(memScopeService : ImemScopeService , controlFlowService : IControlFlowService,movementManager : IMovementManager
        , tasksAggragatorService : ITaskAggragatorService){
        this.scopeService = memScopeService;
        this.controlFlowService = controlFlowService;
        this.dict = getGenNextTasksFuncDict();
        this.tasksAggragatorService = tasksAggragatorService;
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

    tickTask(task: ITask) : boolean{ 
        return this.tasksAggragatorService.runTask(task)
    }
    

}