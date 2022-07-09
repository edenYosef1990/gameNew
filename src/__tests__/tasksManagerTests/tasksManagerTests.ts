import { AttackControlFlowNode, IcontrolFlowNode, MoveControlFlowNode, SetValuesForCommands } from "../../generateControlFlowGraph/controlFlowNode";
import { ControlFlowService } from "../../generateControlFlowGraph/controlFlowService";
import { TaskManager } from "../../manageTasks/taskManager";
import { MovementManager } from "../../movementManager/movementManager";
import { memScopeService } from "../../scopeManagment/scopeService";
import { ControlFlowNodesArrayToControlFlowLinkedList } from "../../testUtils/testUtils";

describe('test taskManager',() => {
    test('pass controlFlow nodes into task manager and expecet it to generate the proper task',() => {
        
        let controlFlowService = new ControlFlowService(); 
        let ScopeService = new memScopeService();
        let movementManager : MovementManager = new MovementManager();
        let service : TaskManager = new TaskManager(ScopeService,controlFlowService,movementManager);
        let commands : IcontrolFlowNode = ControlFlowNodesArrayToControlFlowLinkedList(
            [{name : "attack" , group: "group123" , dest: "dest123" , edgeNodes : []} as AttackControlFlowNode, 
        {name : "move" , group: "group123" , dest: "dest123" , edgeNodes : []} as MoveControlFlowNode ,
            {name : "attack" , group: "group123" , dest: "dest123" , edgeNodes : []} as AttackControlFlowNode , 
            {name : "move" , group: "group123" , dest: "dest123" , edgeNodes : []} as MoveControlFlowNode , 
            {name : "attack" , group: "group123" , dest: "dest123" , edgeNodes : []} as AttackControlFlowNode ])!;
        let order = ControlFlowNodesArrayToControlFlowLinkedList(
            [{group : "group" , dest : "destt"} as SetValuesForCommands , commands ]
        ) 
        //jest.spyOn(controlFlowService,'startNodes','get').mockReturnValue([commands])
        service.executeControlFlowNodes(order!);

        //expect(service.startNodes[0]).toEqual(input);
    })
})