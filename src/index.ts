import { tokenRule } from "./parsingEngine/typesTypes/tokenRule";
import { grammerRule } from "./parsingEngine/typesTypes/grammerRule";
import { inputLineToParseNodeTree, subArray, tryToReduceTree } from "./parsingEngine/services/parsingText/parsingServiceUtils";
import { parseTreeNode } from "./parsingEngine/typesTypes/parseNodesTree";
import { stringArrayToParseTreeNodesArray } from "./testUtils/testUtils";
import { grammerRuleMatch } from "./parsingEngine/typesTypes/grammerRuleMatch";
import { Nullable } from "./parsingEngine/typesTypes/nullable";

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