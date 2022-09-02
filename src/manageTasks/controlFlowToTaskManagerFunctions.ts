import { Dictionary } from "typescript-collections";
import { Nullable } from "../commonTypes/nullable";
import { AttackTask, ICommandTask, ITask, MoveTask, SetValuesForCommandsTask } from "./task";
import { AttackControlFlowNode, IcontrolFlowNode, SetValuesForCommands } from "../generateControlFlowGraph/controlFlowNode";
import { ImemScopeService} from "../scopeManagment/scopeService";

export type GenNextTasksFunc = 
(currentControlFlowNode : IcontrolFlowNode ,scopeService : ImemScopeService , id : number , formerTask : Nullable<ITask> ) => ITask[];
export function getGenNextTasksFuncDict() : Dictionary<string,GenNextTasksFunc> {
    let dict = new Dictionary<string,GenNextTasksFunc>();

    dict.setValue("order",(currentControlFlowNode, scopeService,id,formerTask = null) => {
        let cmdFormerTask : ICommandTask = formerTask as ICommandTask;
        let cmdCurrentNode : AttackControlFlowNode = currentControlFlowNode as AttackControlFlowNode;
        let attackTask : AttackTask = {
            unitsIds: cmdFormerTask.unitsIds, 
            destCoords: scopeService.Load(cmdCurrentNode.group) as number[],
            controlFlowRef : currentControlFlowNode,
            id : id,
            getFollowingControlFlowNode: () => currentControlFlowNode.edgeNodes[0]
         }
        return [attackTask]
    })
    dict.setValue("atkCmd",(currentControlFlowNode, scopeService,id,formerTask = null) => {
        let cmdFormerTask : ICommandTask = formerTask as ICommandTask;
        let cmdCurrentNode : AttackControlFlowNode = currentControlFlowNode as AttackControlFlowNode;
        let attackTask : AttackTask = {
            unitsIds: cmdFormerTask.unitsIds, 
            destCoords: scopeService.Load(cmdCurrentNode.group) as number[],
            controlFlowRef : currentControlFlowNode,
            id : id,
            getFollowingControlFlowNode: () => currentControlFlowNode.edgeNodes[0]
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
            getFollowingControlFlowNode: () => currentControlFlowNode.edgeNodes[0]
         }
        return [attackTask]
    })

    dict.setValue("setValuesForCmds",(currentControlFlowNode, memScopeService,id,_formerTask = null): ICommandTask[] => {
        let cmdCurrentNode : SetValuesForCommands = currentControlFlowNode as SetValuesForCommands;
        let setValuesForCmdsTask : SetValuesForCommandsTask = {
            unitsIds: memScopeService.Load(cmdCurrentNode.group) as number[], 
            destCoords: memScopeService.Load(cmdCurrentNode.dest) as number[],
            controlFlowRef: currentControlFlowNode,
            id : id,
            getFollowingControlFlowNode: () => currentControlFlowNode.edgeNodes[0]
         }
        return [setValuesForCmdsTask]
    })
    return dict;
}