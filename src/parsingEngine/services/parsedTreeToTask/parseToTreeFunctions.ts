import { Dictionary } from "typescript-collections";
import { Nullable } from "../../typesTypes/nullable";
import { parseTreeNode } from "../../typesTypes/parseNodesTree";
import { ICommandTask, ITask } from "../../typesTypes/task";

export function GetDict() : Dictionary<string,(node: parseTreeNode) => Nullable<ITask>> {

    let handlersDict = new Dictionary<string,(node: parseTreeNode) => Nullable<ITask>>();

    handlersDict.setValue("commands" , (node : parseTreeNode ) : Nullable<ITask> => {
        const nodesOfCommands = node.children;
        let root : Nullable<ICommandTask> = null;
        let lastTask : Nullable<ICommandTask> = null;
        for(let command of nodesOfCommands){
            if(root === null ){ 
                root = (handlersDict.getValue(command.name))!(command);
                lastTask = root;
                continue;
            }
            let task = (handlersDict.getValue(command.name))!(command);
            lastTask!.onFinish = () => {return task;}
            lastTask = task;
        }
        return root;
    });
    
    
    return handlersDict;
}

    
    