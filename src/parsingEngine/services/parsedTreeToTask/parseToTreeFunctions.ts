import { Dictionary } from "typescript-collections";
import { Nullable } from "../../typesTypes/nullable";
import { parseTreeNode } from "../../typesTypes/parseNodesTree";
import { AttackTask, ICommandTask, ITask } from "../../typesTypes/task";
import { scopeService } from "../scopeService/scopeService";

export type DefinitionsScope = Dictionary<string,string[]>;

export function GetDict() 
    : Dictionary<string,(node: parseTreeNode, definitionsScope : DefinitionsScope) => Nullable<ITask>> {

    let handlersDict = new Dictionary<string,
    (node: parseTreeNode , definitionsScope : DefinitionsScope) => Nullable<ITask>>();

    handlersDict.setValue("commands" , (node : parseTreeNode , definitionsScope : DefinitionsScope ) 
    : Nullable<ITask> => {
        const nodesOfCommands = node.children;
        if(!definitionsScope.containsKey("commandedUnit")){
            definitionsScope.setValue("commandedUnit",[]);
        }
        const currentRes = definitionsScope.getValue("commandedUnit")!;
        const newLabel = `commandedUnit${currentRes.length}`;
        definitionsScope.setValue("commandedUnit",[...currentRes,newLabel]);
        let root : Nullable<ICommandTask> = null;
        let lastTask : Nullable<ICommandTask> = null;
        for(let command of nodesOfCommands){
            if(root === null ){ 
                root = (handlersDict.getValue(command.name))!(command,definitionsScope);
                lastTask = root;
                continue;
            }
            let task = (handlersDict.getValue(command.name))!(command,definitionsScope);
            lastTask!.onFinish = () => {return task;}
            lastTask = task;
        }
        currentRes.pop();
        return root;
    });
    
    handlersDict.setValue("atkCmd" , (node : parseTreeNode , definitionsScope : DefinitionsScope) : Nullable<ITask> => {
        const labels = definitionsScope.getValue("commandedUnit")!;
        const units = labels[labels.length-1];
        const target : string = node.children[0].value!;
        const commandedTask : AttackTask = { id : 1 , unitsIds : units , destCoords : target , 
            tick: () => true,
            onFinish: () => null,
            runtimeData: {},
            onStart: (scopeService : scopeService) => {}
        };
        return commandedTask;
    });
    
    return handlersDict;
}

    
    