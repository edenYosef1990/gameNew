import { Nullable } from "./nullable";
import { parseTreeNode } from "./parseNodesTree";

export interface grammerRule {
    name: string;
    description: string[];
    handler: Nullable<(tokens: parseTreeNode[]) => parseTreeNode>
}