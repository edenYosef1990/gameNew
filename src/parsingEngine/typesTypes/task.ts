import { Point } from "./coordinates"
import { Nullable } from "./nullable";

export interface ITask {
    id: number;
    tick: () => boolean;
    onFinish: () => Nullable<ITask>;
}

export interface ICommandTask extends ITask {

}

export interface AttackTask extends ICommandTask {
    unitsIds: number[];
    destCoords: Point;
}

export interface MoveTask extends ICommandTask {
    unitsIds: number[];
    destCoords: Point;
}
