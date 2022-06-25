import { inputLineToParseNodeTree, reduceTreeByRule, stringToToken, subArray, tryToReduceTree } from "../../parsingEngine/services/parsingText/parsingServiceUtils";
import { grammerRule } from "../../parsingEngine/typesTypes/grammerRule";
import { parseTreeNode } from "../../parsingEngine/typesTypes/parseNodesTree";
import { tokenRule } from "../../parsingEngine/typesTypes/tokenRule";
import { CompareArrays, CompareParseTreeNodes, stringArrayToParseTreeNodesArray } from "../../testUtils/testUtils";

describe('subArray() tests', () => {

    const InvalidParametersErrorMsg: string = "invalid parameters for function subArray()";

    test('success', () => {
        const source = [1, 2, 3, 4, 5, 6];
        const result: number[] = subArray(source, 3, 5);
        const expected: number[] = [4, 5, 6];
        expect(CompareArrays(result, expected)).toBe(true);
    })

    test('start Idx Out of Range - too small', () => {
        const source: number[] = [1, 2, 3, 4, 5, 6];
        expect(() => subArray(source, -1, 3)).toThrowError(InvalidParametersErrorMsg);
    })

    test('start Idx Out of Range - too big', () => {
        const source: number[] = [1, 2, 3, 4, 5, 6];
        expect(() => subArray(source, source.length + 2, 3)).toThrowError(InvalidParametersErrorMsg);
    })

    test('end Idx Out of Range - too small', () => {
        const source: number[] = [1, 2, 3, 4, 5, 6];
        expect(() => subArray(source, 1, -3)).toThrowError(InvalidParametersErrorMsg);
    })

    test('end Idx Out of Range - too big', () => {
        const source: number[] = [1, 2, 3, 4, 5, 6];
        expect(() => subArray(source, 1, source.length + 3)).toThrowError(InvalidParametersErrorMsg);
    })

    test('end and start Idx Out of Range - start Idx bigger then end Idx', () => {
        const source: number[] = [1, 2, 3, 4, 5, 6];
        expect(() => subArray(source, 3, 1)).toThrowError(InvalidParametersErrorMsg);
    })
})

describe('stringToToken() tests', () => {

    const InvalidTokenErrorMsg: string = "invalid token!";

    test('success : with one non-regex rule , match for token', () => {
        const tokenRules: tokenRule[] = [{ name: 'token', regex: null }];
        const res = stringToToken('token', tokenRules);
        const expeted: parseTreeNode = { name: 'token', value: null, children: [] };
        expect(CompareParseTreeNodes(res, expeted)).toBe(true);
    })

    test('fail : with one non-regex rule , no match for token', () => {
        const tokenRules: tokenRule[] = [{ name: 'token', regex: null }];
        expect(() => stringToToken('token2', tokenRules)).toThrowError(InvalidTokenErrorMsg);
    })

    test('success : with one regex rule , matching regex for token', () => {
        const tokenRules: tokenRule[] = [{ name: 'token', regex: '^[a-zA-Z_$][a-zA-Z_$0-9]*$' }];
        const res = stringToToken('varName123', tokenRules);
        const expeted: parseTreeNode = { name: 'token', value: 'varName123', children: [] };
        expect(CompareParseTreeNodes(res, expeted)).toBe(true);
    })

    test('fail : with one regex rule , no matching regex for token', () => {
        const tokenRules: tokenRule[] = [{ name: 'token', regex: '^[a-zA-Z_$][a-zA-Z_$0-9]*$' }];
        expect(() => stringToToken('123varName123', tokenRules)).toThrowError(InvalidTokenErrorMsg);
    })

    test('success : match to a token by order of token rules', () => {
        const tokenRules: tokenRule[] = [
            { name: 'token', regex: '^[a-zA-Z_$][a-zA-Z_$0-9]*$' },
            { name: 'token2', regex: '^[a-zA-Z_$][a-zA-Z_$0-9]*$' }
        ];
        const res = stringToToken('token', tokenRules);
        const expeted: parseTreeNode = { name: 'token', value: null, children: [] }
        expect(!CompareParseTreeNodes(res, expeted)).toBe(true);
    })
})

describe('reduceTreeByRule() tests', () => {

    function compareObjects(
        left: { ruleName: string, start: number, end: number } | null,
        right: { ruleName: string, start: number, end: number } | null): boolean {
        if (left === null && right === null) return true;
        return (left!.ruleName === right!.ruleName && left!.start === right!.start && left!.end === right!.end);
    }

    test('success : reduce by rule succesed', () => {
        const parseTreeNode: parseTreeNode[] = stringArrayToParseTreeNodesArray(["a", "b", "c", "d", "e"]);
        const grammerRule: grammerRule = { name: "ruleName", description: ["b", "c", "d"] , handler : null};
        const res = reduceTreeByRule(parseTreeNode, grammerRule);
        const expected = { grammerRule : grammerRule, start: 1, end: 3 };
        expect(res).toEqual(expected);
    })

    test('fail : reduce by rule failed', () => {
        const parseTreeNode: parseTreeNode[] = stringArrayToParseTreeNodesArray(["a", "b", "c", "d", "e"]);
        const grammerRule: grammerRule = { name: "ruleName", description: ["b", "z", "d"] , handler : null };
        const res = reduceTreeByRule(parseTreeNode, grammerRule);
        const expected = null;
        expect(res).toEqual(expected);
    })
})

describe('tryToReduceTree() tests', () => {

    test('success : reduce by rule succesed', () => {
        const parseTreeNode: parseTreeNode[] = stringArrayToParseTreeNodesArray(["a", "b", "c", "d", "e"]);
        const grammerRule: grammerRule = { name: "ruleName", description: ["b", "c", "d"] , handler : null };
        const res = tryToReduceTree(parseTreeNode, [grammerRule]);
        const expected = { grammerRule : grammerRule, start: 1, end: 3 };
        expect(res).toEqual(expected);
    })

    test('fail : reduce by rule failed', () => {
        const parseTreeNode: parseTreeNode[] = stringArrayToParseTreeNodesArray(["a", "b", "c", "d", "e"]);
        const grammerRule: grammerRule = { name: "ruleName", description: ["b", "z", "d"] , handler : null };
        const res = tryToReduceTree(parseTreeNode, [grammerRule]);
        const expected = null;
        expect(res).toEqual(expected);
    })
})

describe('inputLineToParseNodeTree() tests', () => {

    function stringsToTokens(tokenList: string[]): tokenRule[] {
        return tokenList.map(tokenStr => { return { name: tokenStr, regex: null }; });
    }

    test('success : reduce by rule succesed m rule with default handler', () => {
        const line: string = "a b c d e";
        const grammerRule1: grammerRule = { name: "ruleName", description: ["b", "c", "d"] , handler : null };
        const grammerRule2: grammerRule = { name: "alone", description: ["a", "ruleName", "e"] , handler : null};
        const tokens: tokenRule[] = stringsToTokens(["a", "b", "c", "d", "e", "ruleName"]);
        const res = inputLineToParseNodeTree(line, tokens, [grammerRule1, grammerRule2]);
        let expected: parseTreeNode[] = stringArrayToParseTreeNodesArray(["alone"]);
        expected[0].children = stringArrayToParseTreeNodesArray(["a", "ruleName", "e"]);
        expected[0].children[1].children = stringArrayToParseTreeNodesArray(["b", "c", "d"]);
        expect(res).toEqual(expected[0]);
    })

    test('success : reduce by rule succesed m rule with custom handler', () => {
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
        let expected: parseTreeNode[] = stringArrayToParseTreeNodesArray(["ruleName"]);
        expected[0].children = stringArrayToParseTreeNodesArray(["a", "b" , "c" , "d" , "e"]);
        expect(res).toEqual(expected[0]);
    })
    
    test('success : reduce by rule succesed multiple times', () => {
        const line: string = "cmd > cmd > cmd > cmd";
        const grammerRule1: grammerRule = { name: "cmds", description: ["cmds",">","cmd"] , 
        handler : ((nodes : parseTreeNode[]) => 
        { 
            let root = nodes[0];
            return { name : root.name , value : root.value , children : [...root.children,nodes[2]]}
        } 
        )};
        const grammerRule2: grammerRule = { name: "cmds", description: ["cmd"] , handler : null };
        const tokens: tokenRule[] = stringsToTokens(["cmd", "cmds", ">"]);
        const res = inputLineToParseNodeTree(line, tokens, [grammerRule1, grammerRule2]);
        let expected: parseTreeNode[] = stringArrayToParseTreeNodesArray(["cmds"]);
        expected[0].children = stringArrayToParseTreeNodesArray(["cmd", "cmd" , "cmd" , "cmd"]);
        expect(res).toEqual(expected[0]);
    })

    test('fail : reduce by rule failed', () => {
        const line: string = "a b c d e";
        const grammerRule: grammerRule = { name: "ruleName", description: ["b", "z", "d"] , handler : null };
        const tokens: tokenRule[] = stringsToTokens(["a", "b", "c", "d", "e", "ruleName"]);
        expect(() => inputLineToParseNodeTree(line, tokens, [grammerRule])).toThrowError("cant reduce line!");
    })
    
})