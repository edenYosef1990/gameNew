import { grammerRule } from "./types/grammerRule";
import { parseTreeNode } from "./types/parseNodesTree";
import { tokenRule } from "./types/tokenRule";

export function subArray<T>(array: T[] , start : number, end : number) : T[] {
    let output: T[] = [];
    for(let i = start ; i <= end ; i ++) output.push(array[i]);
    return output;
}

export function DivideToTokens(input: string , 
    tokenRules : tokenRule[] , grammerRules : grammerRule[]): parseTreeNode {
    const lines : string[] = input.split('\n');
    const linesRoots : parseTreeNode[] = lines.map(line => inputLineToParseNodeTree(line,tokenRules,grammerRules));
    const root : parseTreeNode = { name : 'root' , children : linesRoots};
    return root;
}

export function stringToToken(input: string , tokenRules : tokenRule[]): parseTreeNode {
    tokenRules.forEach(tokenRule => {
        if (tokenRule.regex && input.match(tokenRule.regex)) {
            return { name : tokenRule.name , value : input , children : null }
        }
    });
    throw new Error("invalid token!");
}

export function reduceTreeByRule(lineParseTree : parseTreeNode[] , grammerRule : grammerRule)
 : {ruleName : string ,start : number, end :number} | null {
    for(let i = 0 ; i < lineParseTree.length ; i ++){
        if(i + grammerRule.description.length >= lineParseTree.length ) break;
        let isMatchToRule : boolean = true;
        for(let j = 0; j <= grammerRule.description.length ; j ++){
            if (grammerRule.description[i] !== lineParseTree[i+i].name) {
                isMatchToRule = false; break;
            }
        }
        if (isMatchToRule) return {ruleName : grammerRule.name , start : i , end :  i+ grammerRule.description.length }
    }
    return null;
}

export function tryToReduceTree(lineParseTree : parseTreeNode[] , grammerRules : grammerRule[])
 : {ruleName : string , start : number, end :number} | null {
    for(let rule of grammerRules){
        let res : { ruleName : string , start : number, end :number} | null = null;
        if((res = reduceTreeByRule(lineParseTree,rule)) !== null) return res;
    }
    return null;
}

export function inputLineToParseNodeTree(inputLine : string
    ,tokenRules : tokenRule[] , grammerRules : grammerRule[]): parseTreeNode {
    let lineParseTree : parseTreeNode[] = inputLine.split(' ').map(tokenStr => stringToToken(tokenStr,tokenRules));
    let currentRes : {ruleName: string , start : number, end :number} | null = null;
    while(
        lineParseTree.length > 1 && 
         (currentRes = tryToReduceTree(lineParseTree,grammerRules)) !== null) {
        lineParseTree.splice(currentRes.start,currentRes.end - currentRes.start,
            {name : currentRes.ruleName , children : subArray(lineParseTree,currentRes.start,currentRes.end) });
    }
    if (lineParseTree.length) throw new Error("cant reduce line!");
    return lineParseTree[0];
}


export function Return2(): number {
    return 2;
}