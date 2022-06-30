import { tokenRule } from "./parsingEngine/typesTypes/tokenRule";
import { grammerRule } from "./parsingEngine/typesTypes/grammerRule";
import { inputLineToParseNodeTree, subArray, tryToReduceTree } from "./parsingEngine/services/parsingText/parsingServiceUtils";
import { parseTreeNode } from "./parsingEngine/typesTypes/parseNodesTree";
import { ControlFlowNodesArrayToControlFlowLinkedList, stringArrayToParseTreeNodesArray } from "./testUtils/testUtils";
import { grammerRuleMatch } from "./parsingEngine/typesTypes/grammerRuleMatch";
import { Nullable } from "./parsingEngine/typesTypes/nullable";
import { AttackControlFlowNode, IcontrolFlowNode, MoveControlFlowNode } from "./parsingEngine/services/controlFlowGraph/types/controlFlowNode";
import { ControlFlowService } from "./parsingEngine/services/controlFlowGraph/services/controlFlowService";

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