import { parseTreeNode } from "../parsingEngine/typesTypes/parseNodesTree";

export function CompareArrays<T>(left: T[] , right: T[]): boolean {
    if(left === null && right === null) return true;
    if(left === null && right !== null) return false;
    if(left !== null && right === null) return false;
    if(left.length !== right.length) return false;
    for(let i = 0 ; i < left.length ; i++){
        if(left[i] !== right[i]) return false;
    }
    return true;
}

export function CompareParseTreeNodes(left : parseTreeNode , right : parseTreeNode ) : boolean {
    if(left === null && right === null) return true;
    if(left.name !== right.name || left.value !==  right.value) return false;
    if(left.children.length !== right.children.length) return false;
    for(let i=0 ; i < left.children.length ; i++){
        if (! CompareParseTreeNodes(left.children[i] ,right.children[i])) return false;
    };
    return true;
}

export function CompareParseTreeNodeArrays(left : parseTreeNode[] , right : parseTreeNode[] ) : boolean {
    if(left === null && right === null) return true;
    if(left.length !== right.length) return false;
    for(let i=0 ; i < left.length ; i++){
        if (! CompareParseTreeNodes(left[i] ,right[i])) return false;
    };
    return true;
}

export function stringArrayToParseTreeNodesArray(input: string[] ) : parseTreeNode[] {
    return input.map(str => {return { name : str , value : null , children: []};});
}