


import { stringArrayToParseTreeNodesArray } from "./testUtils/testUtils";
import { ControlFlowService } from "./generateControlFlowGraph/controlFlowService";
import { parseTreeNode } from "./generateParsingTree/parseNodesTree";
import { grammerRule } from "./generateParsingTree/grammerRule";
import { tokenRule } from "./generateParsingTree/tokenRule";
import { inputLineToParseNodeTree } from "./generateParsingTree/parsingServiceUtils";
import { Path } from "./commonTypes/path";
import { PathToPoints } from "./converters/PathToPointsConverter";



function stringsToTokens(tokenList: string[]): tokenRule[] {
    return tokenList.map(tokenStr => { return { name: tokenStr, regex: null }; });
}

let path: Path = {
    pointsOfPath: [
        { x: 0, y: 0 }, { x: 30, y: 100 }, { x: 85, y: 200 }]
    };
let res = PathToPoints(path,11);
console.log(res);
    //{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},
    //{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}]