


import { stringArrayToParseTreeNodesArray } from "./testUtils/testUtils";
import { ControlFlowService } from "./generateControlFlowGraph/controlFlowService";
import { parseTreeNode } from "./generateParsingTree/parseNodesTree";
import { grammerRule } from "./generateParsingTree/grammerRule";
import { tokenRule } from "./generateParsingTree/tokenRule";
import { inputLineToParseNodeTree } from "./generateParsingTree/parsingServiceUtils";



function stringsToTokens(tokenList: string[]): tokenRule[] {
    return tokenList.map(tokenStr => { return { name: tokenStr, regex: null }; });
}


const line: string = "a cmd";
const grammerRule1: grammerRule = {
    name: "cmds", description: ["cmds", ">", "cmd"],
    handler: ((nodes: parseTreeNode[]) => {
        let root = nodes[0];
        return { name: root.name, value: root.value, children: [...root.children, nodes[2]] }
    }
    )
};
const grammerRule2: grammerRule = { name: "cmds", description: ["cmd"], handler: null };
const grammerRule3: grammerRule = { name: "statment", description: ["a", "cmds"], handler: null };
const tokens: tokenRule[] = stringsToTokens(["a", "cmd", "cmds", ">"]);
const res = inputLineToParseNodeTree(line, tokens, [grammerRule1, grammerRule2, grammerRule3]);
let expected: parseTreeNode[] = stringArrayToParseTreeNodesArray(["cmds"]);
expected[0].children = stringArrayToParseTreeNodesArray(["cmd"]);

console.log(JSON.stringify(res, null, 5));