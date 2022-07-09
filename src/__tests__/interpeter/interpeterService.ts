import { ControlFlowService } from "../../generateControlFlowGraph/controlFlowService";
import { ParsingService } from "../../generateParsingTree/parsingService";
import { TaskManager } from "../../manageTasks/taskManager";

export class interpeterService {

   parserService : ParsingService;
   controlFlowService : ControlFlowService;
   tasksService: TaskManager;



    constructor(parsingService : ParsingService, controlFlowService : ControlFlowService , tasksManager : TaskManager){
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