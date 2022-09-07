import { Point } from "../commonTypes/coordinates";
import { Path } from "../commonTypes/path";

export function CalcDistPoints(p1: Point, p2: Point) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

export function CalcTotalDistanceOfPath(path: Path): number {
    if (path.pointsOfPath.length <= 1) return 0;
    let totalDist = 0;
    for (let i = 1; i < path.pointsOfPath.length; i++) {
        totalDist += CalcDistPoints(path.pointsOfPath[i - 1], path.pointsOfPath[i]);
    }
    return totalDist;
}


export function AdvanceStepInLine(line: { p1: Point, p2: Point }, distance: number): { p: Point | null, dist: number } {
    let lineLength = Math.floor(CalcDistPoints(line.p1, line.p2));
    if (lineLength <= distance) return { p: null, dist: lineLength };
    let ratio = distance / lineLength;
    let x = Math.floor((line.p2.x - line.p1.x) * ratio + line.p1.x);
    let y = Math.floor((line.p2.y - line.p1.y) * ratio + line.p1.y);
    return ({ p: { x: x, y: y }, dist: lineLength - distance });

}

export function PathToPoints(path: Path, numPoints: number): Point[] {
    let totalDist = CalcTotalDistanceOfPath(path);
    let stepSize = totalDist / numPoints;

    let currLine : {p1 : Point , p2 : Point} = {p1 : path.pointsOfPath[0] , p2 : path.pointsOfPath[1]};
    let lastPointIdx = 1;

    let points: Point[] = [];
    let currPointIdx = 0;
    let leftStepSize = stepSize;
    while (currPointIdx < numPoints) {
        let res = AdvanceStepInLine(currLine, leftStepSize);
        if (res.p) {
            points.push(res.p);
            currLine = {p1 : res.p , p2 : currLine.p2 }
            currPointIdx++;
            leftStepSize = stepSize;
        }
        else if(lastPointIdx == (path.pointsOfPath.length-1)){
            points.push(path.pointsOfPath[lastPointIdx]);
            break;
        }
        else {
            currLine = { p1 : path.pointsOfPath[lastPointIdx] , p2 : path.pointsOfPath[lastPointIdx+1] };
            lastPointIdx++;
            leftStepSize -= res.dist;
        }
    }
    return points;
}