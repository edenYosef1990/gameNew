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
    unitsIds: string;
}

export interface AttackTask extends ICommandTask {
    destCoords: number[];
}

export interface MoveTask extends ICommandTask {
    destCoords: number[];
}
