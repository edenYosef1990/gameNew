export interface IcontrolFlowNode {
    name: string,
    followup :IcontrolFlowNode[]
}

export interface AttackcontrolFlowNode extends IcontrolFlowNode {
    group: string,
    dest: string;
}