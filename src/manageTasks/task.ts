import { IcontrolFlowNode } from "../generateControlFlowGraph/controlFlowNode";
import { Nullable } from "../commonTypes/nullable";

export interface TaskRuntimeData {

}

export interface ITask {
    id: number;
    controlFlowRef: IcontrolFlowNode;
    getFollowingControlFlowNode: () => Nullable<IcontrolFlowNode>
}

export interface ICommandTask extends ITask {
    unitsIds: number[];
    destCoords: number[];
}

export interface AttackTask extends ICommandTask {
}

export interface MoveTask extends ICommandTask {
}
