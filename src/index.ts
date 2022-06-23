import { tokenRule } from "./parsingEngine/types/tokenRule";
import { grammerRule } from "./parsingEngine/types/grammerRule";
import { inputLineToParseNodeTree, subArray, tryToReduceTree } from "./parsingEngine/parsingServiceUtils";
import { parseTreeNode } from "./parsingEngine/types/parseNodesTree";
import { stringArrayToParseTreeNodesArray } from "./testUtils/testUtils";
import { grammerRuleMatch } from "./parsingEngine/types/grammerRuleMatch";
import { Nullable } from "./parsingEngine/types/nullable";

function stringsToTokens(tokenList : string[]) : tokenRule[] {
    return tokenList.map(tokenStr => {return {name : tokenStr , regex : null};});
}

const line: string = "a b c d e";
const grammerRule1: grammerRule = { name: "ruleName", description: ["b", "c", "d"] , handler : null };
const grammerRule2: grammerRule = { name: "ruleName", description: ["a", "ruleName", "e"] , 
handler : ((nodes : parseTreeNode[]) => 
{ 
    let root = nodes[1];
    return { name : root.name , value : root.value , children : [nodes[0], ...root.children , nodes[2]]}
} 
)};
const tokens: tokenRule[] = stringsToTokens(["a", "b", "c", "d", "e", "ruleName"]);
const res = inputLineToParseNodeTree(line, tokens, [grammerRule1, grammerRule2]);
console.log(res);