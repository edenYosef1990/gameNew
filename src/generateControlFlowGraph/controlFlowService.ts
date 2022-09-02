import { Dictionary } from "typescript-collections";
import { IcontrolFlowNode as ControlFlowNode, IcontrolFlowNode } from "./controlFlowNode";
import { getDict } from './controlFlowFunctions';
import { parseTreeNode } from '../generateParsingTree/parseNodesTree';
import { labelScoper } from "./labelScoper";

export interface IControlFlowService {
    parseTreeToTaskGraph(parseNodesTree : parseTreeNode) : IcontrolFlowNode;
}

export class ControlFlowService implements IControlFlowService {

    dict: Dictionary<string,(parseTreeNode : parseTreeNode) => IcontrolFlowNode[]>

    constructor(){
        this.dict = getDict();
    }


    parseTreeToTaskGraph(parseNodesTree : parseTreeNode) : IcontrolFlowNode{
        return this.dict.getValue(parseNodesTree.name)!
        (parseNodesTree)[0];
    }
}