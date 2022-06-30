import { Dictionary } from "typescript-collections";
import { parseTreeNode } from "../../../typesTypes/parseNodesTree";
import { AttackControlFlowNode, IcontrolFlowNode } from "../types/controlFlowNode";

export type DefinitionsScope = Dictionary<string,number>;
type controlFlowGenFunc = (parseTreeNode : parseTreeNode , definitionsScope : DefinitionsScope) => IcontrolFlowNode[]; 
// return value : first is the root , the rest are the leaves. if the control flow may only end in one way , two identical nodes are returned

export function getDict() : 
Dictionary<string,controlFlowGenFunc>{
    let dict = new 
    Dictionary<string,controlFlowGenFunc>();

    dict.setValue("cmds",
    (parseTreeNode : parseTreeNode, definitionsScope : DefinitionsScope) => {
        let controlFlowNode : IcontrolFlowNode | null = null;
        let first : IcontrolFlowNode | null = null 
        let commands = parseTreeNode.children;
        for(let cmd of commands){
            if(!controlFlowNode){
                let res = dict.getValue(cmd.name)!(cmd,definitionsScope);
                controlFlowNode =res[1];
                first = res[0];
                continue;
            }
            let res = dict.getValue(cmd.name)!(cmd,definitionsScope);
            let node = res[1];
            controlFlowNode.followup = [node];
            controlFlowNode = node;
        }
        return [first!,controlFlowNode!];
    });

    dict.setValue("atkCmd",
    (parseTreeNode : parseTreeNode) => {
        let resValue : AttackControlFlowNode = {
            name : "attack" , followup : [] , 
        group : parseTreeNode.children[0].value! , 
        dest: parseTreeNode.children[1].value! }
        return [resValue,resValue];
    });

    dict.setValue("movCmd",
    (parseTreeNode : parseTreeNode) => {
        let resValue : AttackControlFlowNode = {
            name : "move" , followup : [] , 
        group : parseTreeNode.children[0].value! , 
        dest: parseTreeNode.children[1].value! }
        return [resValue,resValue];
    });    

    
    return dict;
} 