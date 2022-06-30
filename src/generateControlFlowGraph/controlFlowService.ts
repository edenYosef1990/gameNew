import { Dictionary } from "typescript-collections";
import { IcontrolFlowNode as ControlFlowNode, IcontrolFlowNode } from "./controlFlowNode";
import { DefinitionsScope, getDict } from './controlFlowFunctions';
import { parseTreeNode } from '../generateParsingTree/parseNodesTree';

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