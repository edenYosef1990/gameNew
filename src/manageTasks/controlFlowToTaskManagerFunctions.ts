import { Dictionary } from "typescript-collections";
import { Nullable } from "../commonTypes/nullable";
import { AttackTask, ICommandTask, ITask, MoveTask } from "./task";
import { AttackControlFlowNode, IcontrolFlowNode } from "../generateControlFlowGraph/controlFlowNode";
import { scopeService } from "../scopeManagment/scopeService";

export type GenNextTasksFunc = 
(currentControlFlowNode : IcontrolFlowNode ,scopeService : scopeService , id : number , formerTask : Nullable<ITask> ) => ITask[];
export function getGenNextTasksFuncDict() : Dictionary<string,GenNextTasksFunc> {
    let dict = new Dictionary<string,GenNextTasksFunc>();

    dict.setValue("atkCmd",(currentControlFlowNode, scopeService,id,formerTask = null) => {
        let cmdFormerTask : ICommandTask = formerTask as ICommandTask;
        let cmdCurrentNode : AttackControlFlowNode = currentControlFlowNode as AttackControlFlowNode;
        let attackTask : AttackTask = {
            unitsIds: cmdFormerTask.unitsIds, 
            destCoords: scopeService.Load(cmdCurrentNode.group) as number[],
            controlFlowRef : currentControlFlowNode,
            id : id,
            getFollowingControlFlowNode: () => currentControlFlowNode.followup[0]
         }
        return [attackTask]
    })

    dict.setValue("moveCmd",(currentControlFlowNode, scopeService,id,formerTask = null) => {
        let cmdFormerTask : ICommandTask = formerTask as ICommandTask;
        let cmdCurrentNode : AttackControlFlowNode = currentControlFlowNode as AttackControlFlowNode;
        let attackTask : MoveTask = {
            unitsIds: cmdFormerTask.unitsIds, 
            destCoords: scopeService.Load(cmdCurrentNode.group) as number[],
            controlFlowRef : currentControlFlowNode,
            id : id,
            getFollowingControlFlowNode: () => currentControlFlowNode.followup[0]
         }
        return [attackTask]
    })

    return dict;
}