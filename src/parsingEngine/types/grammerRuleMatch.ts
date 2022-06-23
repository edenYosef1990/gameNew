import { grammerRule } from "./grammerRule";

export interface grammerRuleMatch {
    grammerRule: grammerRule;
    start: number;
    end: number;
}