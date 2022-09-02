import { ControlFlowService, IControlFlowService } from "../generateControlFlowGraph/controlFlowService";
import { IParsingService, ParsingService } from "../generateParsingTree/parsingService";
import { ITaskManager, TaskManager } from "../manageTasks/taskManager";

export class interpeterService {

   parserService : IParsingService;
   controlFlowService : IControlFlowService;
   tasksService: ITaskManager;



    constructor(parsingService : IParsingService, controlFlowService : IControlFlowService , tasksManager : ITaskManager){
        this.parserService = parsingService;
        this.controlFlowService = controlFlowService; 
        this.tasksService = tasksManager;
        //this.tasksService.    
    }

    parseAndExecuteInput(input: string): void {
        let parseTreeNode = this.parserService.parseInput(input);
        let tasksGraph = this.controlFlowService.parseTreeToTaskGraph(parseTreeNode);
        this.tasksService.executeControlFlowNodes(tasksGraph);
    }
    
    

}