//ControlFlowService

import { ControlFlowService } from "../../generateControlFlowGraph/controlFlowService";
import { AttackControlFlowNode, IcontrolFlowNode, MoveControlFlowNode, SetValuesForCommands } from "../../generateControlFlowGraph/controlFlowNode";
import { ControlFlowNodesArrayToControlFlowLinkedList, stringArrayToParseTreeNodesArray } from "../../testUtils/testUtils";
import { parseTreeNode } from "../../generateParsingTree/parseNodesTree";

describe('testing converting parsingTrees to control flow graph using the dictionary', () => {
    test('simple test', () => {

        let input: parseTreeNode[] = stringArrayToParseTreeNodesArray(["cmds"]);
        input[0].children = stringArrayToParseTreeNodesArray(["atkCmd", "movCmd", "atkCmd", "movCmd", "atkCmd",]);
        for (let node of input[0].children) {
            node.children = [
                { name: "", value: "group123", children: [] } as parseTreeNode,
                { name: "", value: "dest123", children: [] } as parseTreeNode];
        }
        let service: ControlFlowService = new ControlFlowService();
        let expected: IcontrolFlowNode = ControlFlowNodesArrayToControlFlowLinkedList(
            [{ name: "attack", group: "group123", dest: "dest123", edgeNodes: [] } as AttackControlFlowNode,
            { name: "move", group: "group123", dest: "dest123", edgeNodes: [] } as MoveControlFlowNode,
            { name: "attack", group: "group123", dest: "dest123", edgeNodes: [] } as AttackControlFlowNode,
            { name: "move", group: "group123", dest: "dest123", edgeNodes: [] } as MoveControlFlowNode,
            { name: "attack", group: "group123", dest: "dest123", edgeNodes: [] } as AttackControlFlowNode])!;

        let res = service.parseTreeToTaskGraph(input[0]);
        expect(res).toEqual(expected);
    })
})
//
//{ name: "order" , description: ["varName","cross","varName",":","cmds"] , handler : null },


describe('test complete commands order', () => {
    test('simple test', () => {

        let input: parseTreeNode[] = stringArrayToParseTreeNodesArray(["cmds"]);
        input[0].children = stringArrayToParseTreeNodesArray(["atkCmd", "movCmd", "atkCmd", "movCmd", "atkCmd",]);
        for (let node of input[0].children) {
            node.children = [
                { name: "", value: "group123", children: [] } as parseTreeNode,
                { name: "", value: "dest123", children: [] } as parseTreeNode];
        }
        let service: ControlFlowService = new ControlFlowService();
        let expected: IcontrolFlowNode = ControlFlowNodesArrayToControlFlowLinkedList(
            [{ name: "attack", group: "group123", dest: "dest123", edgeNodes: [] } as AttackControlFlowNode,
            { name: "move", group: "group123", dest: "dest123", edgeNodes: [] } as MoveControlFlowNode,
            { name: "attack", group: "group123", dest: "dest123", edgeNodes: [] } as AttackControlFlowNode,
            { name: "move", group: "group123", dest: "dest123", edgeNodes: [] } as MoveControlFlowNode,
            { name: "attack", group: "group123", dest: "dest123", edgeNodes: [] } as AttackControlFlowNode])!;

        let res = service.parseTreeToTaskGraph(input[0]);
        expect(res).toEqual(expected);
        })

    test('  try complete order test', () => {

        //{ name: "order" , description: ["varName","cross","varName",":","cmds"] , handler : null },
        let input: parseTreeNode[] = stringArrayToParseTreeNodesArray(["cmds"]);
        let order : parseTreeNode[] = stringArrayToParseTreeNodesArray(["grp","cross","dst"]);
        order.push(input[0]);
        input[0].children = stringArrayToParseTreeNodesArray(["atkCmd", "movCmd", "atkCmd", "movCmd", "atkCmd",]);
        for (let node of input[0].children) {
            node.children = [
                { name: "", value: "group123", children: [] } as parseTreeNode,
                { name: "", value: "dest123", children: [] } as parseTreeNode];
        }
        let service: ControlFlowService = new ControlFlowService();
        let expectedCommands : IcontrolFlowNode = ControlFlowNodesArrayToControlFlowLinkedList(
            [{ name: "order" , group : "group123" , dest : "dest123" , edgeNodes : []} as SetValuesForCommands,
            { name: "attack", dest: "dest123", edgeNodes: [] } as AttackControlFlowNode,
            { name: "move", dest: "dest123", edgeNodes: [] } as MoveControlFlowNode,
            { name: "attack", dest: "dest123", edgeNodes: [] } as AttackControlFlowNode,
            { name: "move", dest: "dest123", edgeNodes: [] } as MoveControlFlowNode,
            { name: "attack", dest: "dest123", edgeNodes: [] } as AttackControlFlowNode])!;

        
        let res = service.parseTreeToTaskGraph(input[0]);
        expect(res).toEqual(expectedCommands);
    })

})
//
        //{ name: "order" , description: ["varName","cross","varName",":","cmds"] , handler : null },