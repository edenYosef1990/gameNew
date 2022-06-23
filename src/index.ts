import { tokenRule } from "./parsingEngine/types/tokenRule";
import { grammerRule } from "./parsingEngine/types/grammerRule";
import { inputLineToParseNodeTree, subArray, tryToReduceTree } from "./parsingEngine/parsingServiceUtils";
import { parseTreeNode } from "./parsingEngine/types/parseNodesTree";
import { stringArrayToParseTreeNodesArray } from "./testUtils/testUtils";

function stringsToTokens(tokenList : string[]) : tokenRule[] {
    return tokenList.map(tokenStr => {return {name : tokenStr , regex : null};});
}
//tryToReduceTree(lineParseTree : parseTreeNode[] , grammerRules : grammerRule[])

const parseTreeNode1 : parseTreeNode[] = stringArrayToParseTreeNodesArray(["a","b","c","d","e"]);
const grammerRule1 : grammerRule = {name : "ruleName" , description: ["b","c","d"] , handler : null};
const parseTreeNode2 : parseTreeNode[] = stringArrayToParseTreeNodesArray(["a","ruleName","e"]);
const grammerRule2 : grammerRule = {name : "alone" , description: ["a","ruleName","e"] , handler : null};
const res1 = tryToReduceTree(parseTreeNode1,[grammerRule1]);
const res2 = tryToReduceTree(parseTreeNode2,[grammerRule2]);
console.log(res1);
console.log(res2);

let currentRes : {ruleName: string , start : number, end :number} | null = null;
while(
    parseTreeNode1.length > 1 && 
     (currentRes = tryToReduceTree(parseTreeNode1,[grammerRule1,grammerRule2])) !== null) 
     {
         console.log("before:");
         console.log(parseTreeNode1);
        parseTreeNode1.splice(currentRes.start,1 + currentRes.end - currentRes.start,
        {name : currentRes.ruleName , value : null, children : subArray(parseTreeNode1,currentRes.start,currentRes.end)});
        console.log("after:");
        console.log(parseTreeNode1);
}