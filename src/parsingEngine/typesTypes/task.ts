import { IcontrolFlowNode } from "../services/controlFlowGraph/types/controlFlowNode";
import { scopeService } from "../services/scopeService/scopeService";
import { Point } from "./coordinates"
import { Nullable } from "./nullable";

export interface TaskRuntimeData {

}

export interface ITask {
    id: number;
    controlFlowRef: IcontrolFlowNode;
    tick: Nullable<() => boolean>
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
