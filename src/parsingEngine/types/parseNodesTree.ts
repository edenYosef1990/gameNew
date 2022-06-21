import { Nullable } from "./nullable";

export class parseTreeNode {
    name: string;
    value: Nullable<string>;
    children: parseTreeNode[];
}