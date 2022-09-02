import { Dictionary } from "typescript-collections";
import { parseTreeNode } from '../generateParsingTree/parseNodesTree';
import { AttackControlFlowNode, IcontrolFlowNode, SetValuesForCommands } from "./controlFlowNode";

type controlFlowGenFunc = (parseTreeNode : parseTreeNode) => IcontrolFlowNode[]; 
// return value : first is the root , the rest are the leaves. if the control flow may only end in one way , two identical nodes are returned

export function getDict() : 
Dictionary<string,controlFlowGenFunc>{
    let dict = new 
    Dictionary<string,controlFlowGenFunc>();

    dict.setValue("order",
    (parseTreeNode : parseTreeNode ) => {
        let commandsParsedTree = parseTreeNode.children[4];
        let commandsControlFlow = dict.getValue(commandsParsedTree.name)!(commandsParsedTree);
        let resValue : SetValuesForCommands = {
            name : "order" , edgeNodes : [], 
            group : parseTreeNode.children[1].value! , dest : parseTreeNode.children[3].value! 
         }
        resValue.edgeNodes = [commandsControlFlow[0]];
        return [resValue,commandsControlFlow[1]];
    });

    dict.setValue("cmds",
    (parseTreeNode : parseTreeNode) => {
        let controlFlowNode : IcontrolFlowNode | null = null;
        let first : IcontrolFlowNode | null = null 
        let commands = parseTreeNode.children;
        for(let cmd of commands){
            if(!controlFlowNode){
                let res = dict.getValue(cmd.name)!(cmd);
                controlFlowNode =res[1];
                first = res[0];
                continue;
            }
            let res = dict.getValue(cmd.name)!(cmd);
            let node = res[1];
            controlFlowNode.edgeNodes = [node];
            controlFlowNode = node;
        }
        return [first!,controlFlowNode!];
    });

    dict.setValue("atkCmd",
    (parseTreeNode : parseTreeNode ) => {
        let resValue : AttackControlFlowNode = {
            name : "attack" , edgeNodes : [] , 
            group: parseTreeNode.children[0].value! ,
            dest:  parseTreeNode.children[1].value!}
        return [resValue,resValue];
    });

    dict.setValue("movCmd",
    (parseTreeNode : parseTreeNode) => {
        let resValue : AttackControlFlowNode = {
            name : "move" , edgeNodes : [] , 
            group: parseTreeNode.children[0].value! ,
        dest: parseTreeNode.children[1].value! }
        return [resValue,resValue];
    });    

    
    return dict;
} 