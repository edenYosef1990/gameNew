export interface IcontrolFlowNode {
    name: string,
    followup :IcontrolFlowNode[]
}

export interface AttackControlFlowNode extends IcontrolFlowNode {
    group: string,
    dest: string;
}

export interface MoveControlFlowNode extends IcontrolFlowNode {
    group: string,
    dest: string;
}