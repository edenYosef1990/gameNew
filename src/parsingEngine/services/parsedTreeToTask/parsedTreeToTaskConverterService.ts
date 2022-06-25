import { Dictionary } from "typescript-collections";
import { DefinitionsScope, GetDict } from "./parseToTreeFunctions";
import { Nullable } from "../../typesTypes/nullable";
import { parseTreeNode } from "../../typesTypes/parseNodesTree";
import { ITask } from "../../typesTypes/task";

export class parsedTreeToTaskConverterService {

    handlersDict : Dictionary<string,(node: parseTreeNode, definitionsScope : DefinitionsScope) => Nullable<ITask>> = 
    new Dictionary<string,(node: parseTreeNode) => Nullable<ITask>>();
    
    constructor() {
        this.handlersDict = GetDict();
    }
    ConvertParseTree(root : parseTreeNode) : Nullable<ITask> {
        let definitionsScope : DefinitionsScope = new Dictionary<string,string[]>();
        return (this.handlersDict.getValue(root.name))!(root,definitionsScope);
    }
}