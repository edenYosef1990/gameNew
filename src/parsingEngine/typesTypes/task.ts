import { scopeService } from "../services/scopeService/scopeService";
import { Point } from "./coordinates"
import { Nullable } from "./nullable";

export interface TaskRuntimeData {

}

export interface ITask {
    id: number;
    tick: () => boolean;
    onFinish: () => Nullable<ITask>;
    runtimeData : TaskRuntimeData;
    onStart: (scopeService : scopeService) => void;
}

export interface ICommandTask extends ITask {

}

export interface AttackTask extends ICommandTask {
    unitsIds: string;
    destCoords: string;
}

export interface MoveTask extends ICommandTask {
    unitsIds: string;
    destCoords: string;
}
