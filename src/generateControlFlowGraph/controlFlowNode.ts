// IncontrolFlowNode represent a graph of NodeList.
// there are 4 possible sanarios : 
// 1) in the case of IControlFlow represing only itself:
//      edge nodes contains nothing
// 1) in the case of IControlFlowNode represnting only a single other node : 
//      edge Nodes contains only one Node
// 2) in case of one start node and only one possible node ending :
//      it contains two nodes : first and last
// 3) the case of one start node and multiple possible node endings : 
//      it contains the first at index 0 and the exit nodes will be the rest of the arrays

export interface IcontrolFlowNode {
    name: string,
    edgeNodes :IcontrolFlowNode[],
}

export interface AttackControlFlowNode extends IcontrolFlowNode {
    dest: string;
    group : string;
}

export interface MoveControlFlowNode extends IcontrolFlowNode {
    dest: string;
}


export interface SetValuesForCommands extends IcontrolFlowNode {
    group: string,
    dest: string
}