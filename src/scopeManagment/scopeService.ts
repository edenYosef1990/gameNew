import { Dictionary } from "typescript-collections";

export enum MemmoryType { number , numbersArray , string , stringsArray}
export interface Memmory {
    type : MemmoryType;
    data : any;
}

export class memScopeService {

    private memory: Dictionary<string,object> = new Dictionary<string,Memmory>();

    Save<T>(varName : string , data : T) {
        let type : MemmoryType;
        if(Array.isArray(data) && typeof data[0] === "string"){
            type = MemmoryType.stringsArray;
        }
        else if(Array.isArray(data) && typeof data[0] === "number"){
            type = MemmoryType.numbersArray;
        }
        if(typeof data === "string"){
            type = MemmoryType.string;
        }
        else if(typeof data === "number"){
            type = MemmoryType.number;
        }
        else throw new Error("invalid memory Type!");

        this.memory.setValue(varName,{type : type , data : data});
    }

    Load(varName: string){
        return this.memory.getValue(varName);
    }
}