import { Nullable } from "./nullable";

export interface tokenRule {
    name : string;
    regex: Nullable<string>;
}