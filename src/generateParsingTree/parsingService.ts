import { grammerRule } from "./grammerRule";
import { parseTreeNode } from "./parseNodesTree";
import { getGrammerRulesList } from "./parsingGrammerRulesList";
import { inputLineToParseNodeTree } from "./parsingServiceUtils";
import { tokenRule } from "./tokenRule";
import { getTokenRulesList } from "./tokensRulesList";

export interface IParsingService{
    parseInput(input: string) : parseTreeNode;
}

export class ParsingService implements IParsingService {

    grammerRules: grammerRule[];
    tokens: tokenRule[];

    constructor() {

        this.grammerRules = getGrammerRulesList();
        this.tokens = getTokenRulesList();
    }

    parseInput(input: string) : parseTreeNode {
        return inputLineToParseNodeTree(input, this.tokens, this.grammerRules)
    }
}

