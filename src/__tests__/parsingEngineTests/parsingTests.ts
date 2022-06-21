import { reduceTreeByRule, stringToToken, subArray } from "../../parsingEngine/parsingServiceUtils";
import { grammerRule } from "../../parsingEngine/types/grammerRule";
import { parseTreeNode } from "../../parsingEngine/types/parseNodesTree";
import { tokenRule } from "../../parsingEngine/types/tokenRule";
import { CompareArrays, CompareParseTreeNodeArrays, CompareParseTreeNodes, stringArrayToParseTreeNodesArray } from "../../testUtils/testUtils";

describe('subArray() tests' , () => {

    const InvalidParametersErrorMsg: string = "invalid parameters for function subArray()";

    test('success', () => {
        const source = [1,2,3,4,5,6];
        const result : number[] = subArray(source,3,5);
        const expected : number[] = [4,5,6];
        expect(CompareArrays(result,expected)).toBe(true);   
    })

    test('start Idx Out of Range - too small', () => {
        const source : number[] = [1,2,3,4,5,6];
        expect(() => subArray(source,-1,3)).toThrowError(InvalidParametersErrorMsg);
    })

    test('start Idx Out of Range - too big', () => {
        const source : number[] = [1,2,3,4,5,6];
        expect(() => subArray(source,source.length + 2,3)).toThrowError(InvalidParametersErrorMsg);
    })

    test('end Idx Out of Range - too small', () => {
        const source : number[] = [1,2,3,4,5,6];
        expect(() => subArray(source,1,-3)).toThrowError(InvalidParametersErrorMsg);
    })

    test('end Idx Out of Range - too big', () => {
        const source : number[] = [1,2,3,4,5,6];
        expect(() => subArray(source,1,source.length + 3)).toThrowError(InvalidParametersErrorMsg);
    })

    test('end and start Idx Out of Range - start Idx bigger then end Idx', () => {
        const source : number[] = [1,2,3,4,5,6];
        expect(() => subArray(source,3,1)).toThrowError(InvalidParametersErrorMsg);
    })
})

describe('stringToToken() tests' , () => {
    
    const InvalidTokenErrorMsg: string = "invalid token!";
    
    test('success : with one non-regex rule , match for token',() => {
        const tokenRules : tokenRule[] = [{name: 'token' ,regex : null}];
        const res = stringToToken('token',tokenRules);
        const expeted : parseTreeNode = { name : 'token' , value: null, children: []};
        expect(CompareParseTreeNodes(res,expeted)).toBe(true);
    })
    
    test('fail : with one non-regex rule , no match for token',() => {
        const tokenRules : tokenRule[] = [{name: 'token' , regex : null}];
        expect(()=>stringToToken('token2',tokenRules)).toThrowError(InvalidTokenErrorMsg);
    })
    
    test('success : with one regex rule , matching regex for token',() => {
        const tokenRules : tokenRule[] = [{name: 'token' ,regex: '^[a-zA-Z_$][a-zA-Z_$0-9]*$' }];
        const res = stringToToken('varName123',tokenRules);
        const expeted : parseTreeNode = { name : 'token' , value: 'varName123', children: []};
        expect(CompareParseTreeNodes(res,expeted)).toBe(true);
    })
    
    test('fail : with one regex rule , no matching regex for token',() => {
        const tokenRules : tokenRule[] = [{name: 'token' ,regex: '^[a-zA-Z_$][a-zA-Z_$0-9]*$' }];
        expect(()=>stringToToken('123varName123',tokenRules)).toThrowError(InvalidTokenErrorMsg);
    })
    
    test('success : match to a token by order of token rules',() => {
        const tokenRules : tokenRule[] = [
            {name: 'token' ,regex: '^[a-zA-Z_$][a-zA-Z_$0-9]*$' },
            {name: 'token2' ,regex: '^[a-zA-Z_$][a-zA-Z_$0-9]*$' }
        ];
        const res = stringToToken('token',tokenRules);
        const expeted : parseTreeNode = { name : 'token' , value : null , children: []} 
        expect(!CompareParseTreeNodes(res,expeted)).toBe(true);
    })
})

describe('reduceTreeByRule() tests', () => {

    function compareObjects(
        left : {ruleName : string , start : number , end : number} | null , 
        right : {ruleName : string , start : number , end : number} | null): boolean{
            if(left === null && right === null) return true;
            return (left!.ruleName === right!.ruleName && left!.start === right!.start && left!.end === right!.end);
        }

    test('success : reduce by rule succesed',() => {
        const parseTreeNode : parseTreeNode[] = stringArrayToParseTreeNodesArray(["a","b","c","d","e"]);
        const grammerRule : grammerRule = {name : "ruleName" , description: ["b","c","d"]};
        const res = reduceTreeByRule(parseTreeNode,grammerRule);
        const expected = {ruleName : 'ruleName' , start : 1 , end : 3};
        expect(compareObjects(res,expected)).toBe(true);
    })

    test('fail : reduce by rule failed',() => {
        const parseTreeNode : parseTreeNode[] = stringArrayToParseTreeNodesArray(["a","b","c","d","e"]);
        const grammerRule : grammerRule = {name : "ruleName" , description: ["b","z","d"]};
        const res = reduceTreeByRule(parseTreeNode,grammerRule);
        const expected = null;
        expect(compareObjects(res,expected)).toBeTruthy();
    })
})

