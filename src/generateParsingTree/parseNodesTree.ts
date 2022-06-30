import { Nullable } from "../commonTypes/nullable";

export interface parseTreeNode {
    name: string;
    value: Nullable<string>;
    children: parseTreeNode[];
}