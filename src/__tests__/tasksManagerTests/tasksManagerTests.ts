import { AttackControlFlowNode, IcontrolFlowNode, MoveControlFlowNode, SetValuesForCommands } from "../../generateControlFlowGraph/controlFlowNode";
import { ControlFlowService, IControlFlowService } from "../../generateControlFlowGraph/controlFlowService";
import { TaskManager } from "../../manageTasks/taskManager";
import { ImemScopeService } from "../../scopeManagment/scopeService";
import { ControlFlowNodesArrayToControlFlowLinkedList } from "../../testUtils/testUtils";
import { mock } from 'jest-mock-extended';
import { IMovementManager } from "../../movementManager/movementManager";
import { ITaskAggragatorService } from "../../tasksAggragatorService";
import { SetValuesForCommandsTask } from "../../manageTasks/task";

describe('test taskManager',() => {
    test('pass controlFlow nodes into task manager and expecet it to generate the proper task',() => {
        let mockScopeService = mock<ImemScopeService>();
        let mockControlFlowService = new ControlFlowService(); 
        let mockMovementMAnager = mock<IMovementManager>();
        let mockTasksAggragatorService = mock<ITaskAggragatorService>();
        let tasksService : TaskManager = new TaskManager(mockScopeService,mockControlFlowService,mockMovementMAnager,
            mockTasksAggragatorService);
        let commands : IcontrolFlowNode = ControlFlowNodesArrayToControlFlowLinkedList(
            [{name : "attack" , group: "group123" , dest: "dest123" , edgeNodes : []} as AttackControlFlowNode, 
            {name : "move" , group: "group123" , dest: "dest123" , edgeNodes: []} as MoveControlFlowNode ,
            {name : "attack" , group: "group123" , dest: "dest123" , edgeNodes : []} as AttackControlFlowNode , 
            {name : "move" , group: "group123" , dest: "dest123" , edgeNodes : []} as MoveControlFlowNode , 
            {name : "attack" , group: "group123" , dest: "dest123" , edgeNodes : []} as AttackControlFlowNode ])!;
        let order = ControlFlowNodesArrayToControlFlowLinkedList(
            [{name: "setValuesForCmds", group : "group" , dest : "dest"} as SetValuesForCommands , commands ]
        ) 
        tasksService.executeControlFlowNodes(order!);

        expect(tasksService.activeTasks.size()).toEqual(1);
        let task = tasksService.activeTasks.values()[0] as SetValuesForCommandsTask;
        expect(task!=null).toBeTruthy();
        //let generatedTask = tasksService.activeTasks.values()[0];
        //expect(typeof generatedTask).toBe("AttackTask");
    })
})