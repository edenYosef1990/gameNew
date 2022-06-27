import { Dictionary } from "typescript-collections";
import { parseTreeNode } from "../../../typesTypes/parseNodesTree";
import { IcontrolFlowNode as ControlFlowNode, IcontrolFlowNode } from "../types/controlFlowNode";
import { DefinitionsScope, getDict } from './controlFlowFunctions';

export class ControlFlowService {

    dict: Dictionary<string,(parseTreeNode : parseTreeNode , definitionsScope : DefinitionsScope) => IcontrolFlowNode[]>
    startNodes: ControlFlowNode[] = []

    constructor(){
        this.dict = getDict();
    }


    absorveParsedTree(parseNodesTree : parseTreeNode) : void{
        this.startNodes.push(this.dict.getValue(parseNodesTree.name)!
        (parseNodesTree, new Dictionary<string,number>() )[0]);
    }
}