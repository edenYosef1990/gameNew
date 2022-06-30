


import { stringArrayToParseTreeNodesArray } from "./testUtils/testUtils";
import { ControlFlowService } from "./generateControlFlowGraph/controlFlowService";
import { parseTreeNode } from "./generateParsingTree/parseNodesTree";

let input: parseTreeNode[] = stringArrayToParseTreeNodesArray(["cmds"]);
input[0].children = stringArrayToParseTreeNodesArray(["atkCmd","movCmd"]);
for(let node of input[0].children){
    node.children = [
    {name : "" , value: "group123" , children: [] } as parseTreeNode,
    {name : "" , value: "dest123" , children: [] } as parseTreeNode];
}
let service : ControlFlowService = new ControlFlowService();

service.absorveParsedTree(input[0]);

//console.log(JSON.stringify(input[0],null,5));
console.log(JSON.stringify(service.startNodes[0],null,5));