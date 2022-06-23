import { grammerRule } from "./types/grammerRule";
import { grammerRuleMatch } from "./types/grammerRuleMatch";
import { Nullable } from "./types/nullable";
import { parseTreeNode } from "./types/parseNodesTree";
import { tokenRule } from "./types/tokenRule";

export function subArray<T>(array: T[] , start : number, end : number) : T[] {
    if( array === null || start < 0 || start >= array.length || end < 0 || end >= array.length || start > end) {
        throw new Error("invalid parameters for function subArray()");
    }
    let output: T[] = [];
    for(let i = start ; i <= end ; i ++) output.push(array[i]);
    return output;
}

export function DivideToTokens(input: string , 
    tokenRules : tokenRule[] , grammerRules : grammerRule[]): parseTreeNode {
    const lines : string[] = input.split('\n');
    const linesRoots : parseTreeNode[] = lines.map(line => inputLineToParseNodeTree(line,tokenRules,grammerRules));
    const root : parseTreeNode = { name : 'root' , value : null , children : linesRoots};
    return root;
}

export function stringToToken(input: string , tokenRules : tokenRule[]): parseTreeNode {
    for(let tokenRule of tokenRules) {
        if (tokenRule.regex !== null && (input.match(tokenRule.regex) !== null)) {
            return { name : tokenRule.name , value : input , children : [] };
        }
        if(input === tokenRule.name) {
            return { name : tokenRule.name , value : null,  children : [] };
        }
    };
    throw new Error("invalid token!");
}

export function reduceTreeByRule(lineParseTree : parseTreeNode[] , grammerRule : grammerRule)
 : Nullable<grammerRuleMatch> {
    for(let i = 0 ; i < lineParseTree.length ; i ++){
        if((i + grammerRule.description.length) > lineParseTree.length ) break;
        let isMatchToRule : boolean = true;
        for(let j = 0; j < grammerRule.description.length ; j ++){
            if (grammerRule.description[j] !== lineParseTree[i+j].name) {
                isMatchToRule = false; break;
            }
        }
        if (isMatchToRule) return {grammerRule : grammerRule , start : i , end :  i+ grammerRule.description.length - 1 }
    }
    return null;
}

export function tryToReduceTree(lineParseTree : parseTreeNode[] , grammerRules : grammerRule[])
 : Nullable<grammerRuleMatch> {
    for(let rule of grammerRules){
        let res : Nullable<grammerRuleMatch> = null;
        if((res = reduceTreeByRule(lineParseTree,rule)) !== null) return res;
    }
    return null;
}

export function inputLineToParseNodeTree(inputLine : string
    ,tokenRules : tokenRule[] , grammerRules : grammerRule[]): parseTreeNode {
    let lineParseTree : parseTreeNode[] = inputLine.split(' ').map(tokenStr => stringToToken(tokenStr,tokenRules));
    let currentRes : Nullable<grammerRuleMatch> = null;
    while(
        lineParseTree.length > 1 && 
        (currentRes = tryToReduceTree(lineParseTree,grammerRules)) !== null) {
            lineParseTree.splice(currentRes.start,1 + currentRes.end - currentRes.start,
                currentRes.grammerRule.handler === null ?
                {name : currentRes.grammerRule.name , value : null, children : subArray(lineParseTree,currentRes.start,currentRes.end) }:
                currentRes.grammerRule.handler!(subArray(lineParseTree,currentRes.start,currentRes.end))
                );
    }
    if (lineParseTree.length > 1) throw new Error("cant reduce line!");
    return lineParseTree[0];
}