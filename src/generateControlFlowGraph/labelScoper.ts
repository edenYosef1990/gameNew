import { Dictionary } from "typescript-collections";
import { parseTreeNode } from '../generateParsingTree/parseNodesTree';
import { IcontrolFlowNode } from "./controlFlowNode";

export type DefinitionsScope = Dictionary<string,number>;

export class labelScoper {
    private definitionScope : Dictionary<string,number> = new Dictionary<string,number>();    

    CreateNewScopeOfLabel(label : string) : string {
        let currScopeDepthOfLabel : number = this.definitionScope.getValue(label) || 0;
        this.definitionScope.setValue(label,currScopeDepthOfLabel+1);
        return label+currScopeDepthOfLabel;
    }

    RemoveLabelOfCurrentScope(label: string): boolean {

        let currScopeDepthOfLabel : number | undefined = this.definitionScope.getValue(label);
        if(!currScopeDepthOfLabel) return false;
        this.definitionScope.setValue(label,currScopeDepthOfLabel > 0 ? currScopeDepthOfLabel-1 : currScopeDepthOfLabel);
        return true;
    }

    getLabelInCurrentScope(label : string) : string | null {
        let currScopeDepthOfLabel : number = this.definitionScope.getValue(label) || 0;
        return label+currScopeDepthOfLabel;
    }
}