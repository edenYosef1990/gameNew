import { Nullable } from "./nullable";

export interface parseTreeNode {
    name: string;
    value: Nullable<string>;
    children: parseTreeNode[];
}