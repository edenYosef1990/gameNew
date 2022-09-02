export interface IMovementManager {
    
    moveSoldier(soldierId : number, dest: {x:number,y:number}) : void;
}

export class MovementManager implements IMovementManager {

    moveSoldier(soldierId : number, dest: {x:number,y:number}){

    }
}