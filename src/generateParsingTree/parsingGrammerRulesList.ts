
//test('success : reduce by rule succesed multiple times', () => {
//const line: string = "cmd > cmd > cmd > cmd";
//const grammerRule1: grammerRule = { name: "cmds", description: ["cmds",">","cmd"] , 
//handler : ((nodes : parseTreeNode[]) => 
//{ 
//let root = nodes[0];
//return { name : root.name , value : root.value , children : [...root.children,nodes[2]]}
//} 
//)};
//const grammerRule2: grammerRule = { name: "cmds", description: ["cmd"] , handler : null };
//const tokens: tokenRule[] = stringsToTokens(["cmd", "cmds", ">"]);
//const res = inputLineToParseNodeTree(line, tokens, [grammerRule1, grammerRule2]);
//let expected: parseTreeNode[] = stringArrayToParseTreeNodesArray(["cmds"]);
//expected[0].children = stringArrayToParseTreeNodesArray(["cmd", "cmd" , "cmd" , "cmd"]);
//expect(res).toEqual(expected[0]);
//})

import { grammerRule } from "./grammerRule";
import { parseTreeNode } from "./parseNodesTree";

export function getGrammerRulesList(): grammerRule[] {
    let grammerRules: grammerRule[] = [
        {
            name: "cmds", description: ["cmds", ">", "cmd"],
            handler: ((nodes: parseTreeNode[]) => {
                let root = nodes[0];
                return { name: root.name, value: root.value, children: [...root.children, nodes[2]] }
            }
            )
        },
        { name: "cmds", description: ["cmd"], handler: null },
        { name: "order" , description: ["varName","cross","varName",":","cmds"] , handler : null },
        { name: "order" , description: ["varName",":","cmds"] , handler : null }
    ];
    return grammerRules;
} 