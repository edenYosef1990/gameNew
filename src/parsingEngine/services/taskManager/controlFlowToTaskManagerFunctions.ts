import { Dictionary } from "typescript-collections";
import { Nullable } from "../../typesTypes/nullable";
import { AttackTask, ICommandTask, ITask, MoveTask } from "../../typesTypes/task";
import { AttackcontrolFlowNode, IcontrolFlowNode } from "../controlFlowGraph/types/controlFlowNode";
import { scopeService } from "../scopeService/scopeService";

export type GenNextTasksFunc = 
(currentControlFlowNode : IcontrolFlowNode ,scopeService : scopeService , id : number , formerTask : Nullable<ITask> ) => ITask[];
export function getGenNextTasksFuncDict() : Dictionary<string,GenNextTasksFunc> {
    let dict = new Dictionary<string,GenNextTasksFunc>();

    dict.setValue("atkCmd",(currentControlFlowNode, scopeService,id,formerTask = null) => {
        let cmdFormerTask : ICommandTask = formerTask as ICommandTask;
        let cmdCurrentNode : AttackcontrolFlowNode = currentControlFlowNode as AttackcontrolFlowNode;
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
        let cmdCurrentNode : AttackcontrolFlowNode = currentControlFlowNode as AttackcontrolFlowNode;
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