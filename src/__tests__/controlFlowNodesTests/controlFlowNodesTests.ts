//ControlFlowService

import { ControlFlowService } from "../../parsingEngine/services/controlFlowGraph/services/controlFlowService";
import { AttackControlFlowNode, IcontrolFlowNode, MoveControlFlowNode } from "../../parsingEngine/services/controlFlowGraph/types/controlFlowNode";
import { parseTreeNode } from "../../parsingEngine/typesTypes/parseNodesTree";
import { ControlFlowNodesArrayToControlFlowLinkedList, stringArrayToParseTreeNodesArray } from "../../testUtils/testUtils";

describe('testing converting parsingTrees to control flow graph using the dictionary',() => {
    test('simple test',() => {
        
        let input: parseTreeNode[] = stringArrayToParseTreeNodesArray(["cmds"]);
        input[0].children = stringArrayToParseTreeNodesArray(["atkCmd","movCmd","atkCmd","movCmd","atkCmd",]);
        for(let node of input[0].children){
            node.children = [
            {name : "" , value: "group123" , children: [] } as parseTreeNode,
            {name : "" , value: "dest123" , children: [] } as parseTreeNode];
        }
        let service : ControlFlowService = new ControlFlowService();
        let expected : IcontrolFlowNode = ControlFlowNodesArrayToControlFlowLinkedList(
            [{name : "attack" , group: "group123" , dest: "dest123" , followup : []} as AttackControlFlowNode, 
            {name : "move" , group: "group123" , dest: "dest123" , followup : []} as MoveControlFlowNode ,
            {name : "attack" , group: "group123" , dest: "dest123" , followup : []} as AttackControlFlowNode , 
            {name : "move" , group: "group123" , dest: "dest123" , followup : []} as MoveControlFlowNode , 
            {name : "attack" , group: "group123" , dest: "dest123" , followup : []} as AttackControlFlowNode ])!;

        service.absorveParsedTree(input[0]);

        expect(service.startNodes[0]).toEqual(expected);
    })
})