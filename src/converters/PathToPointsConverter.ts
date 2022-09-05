import { Point } from "../commonTypes/coordinates";
import { Path } from "../commonTypes/path";

export function CalcDistPoints(p1 : Point , p2 : Point) {
    return Math.sqrt((p1.x - p2.x)*(p1.x-p2.x) + (p1.y - p2.y)*(p1.y-p2.y));
}

export function CalcTotalDistanceOfPath(path : Path) : number {
    if(path.pointsOfPath.length <= 1) return 0;
    let totalDist = 0;
    for(let i=1 ; i < path.pointsOfPath.length ; i++){
        totalDist += CalcDistPoints(path.pointsOfPath[i-1],path.pointsOfPath[i]);
    }
    return totalDist;
} 

export function AdvanceStepInLine( line : {p1 : Point , p2 : Point} , distance : number) : { p : Point , dist : number } | null {
    let lineLength = CalcDistPoints(line.p1,line.p2);
    if(lineLength <= distance) return null;
    let ratio = distance/lineLength;
    let x = (line.p2.x - line.p1.x) * ratio + line.p1.x;
    let y = (line.p2.y - line.p1.y) * ratio + line.p1.y;
    return ({ p : { x : x , y : y } , dist : lineLength - distance });

}

export function PathToPoints(path : Path , numPoints : number) : Point[] {
    let totalDist = CalcTotalDistanceOfPath(path);
    let stepSize = totalDist / numPoints;
    let currDistFromLastPoint = 0;

    let lines : {p1 : Point , p2 : Point }[] = [];
    for(let i = 1 ; i < path.pointsOfPath.length ; i++){
        lines.push({p1 : path.pointsOfPath[i-1] , p2 : path.pointsOfPath[i]})
    }
    let currLinesIdx = 0;

    let points : Point[] = [];
    for(let i = 0 ; i < numPoints ; i++){
        let res = AdvanceStepInLine(lines[currLinesIdx] , stepSize) as { p : Point , dist : number } ; 
        if(res){

            

        }
        else{
        }
    }

    return points;
}