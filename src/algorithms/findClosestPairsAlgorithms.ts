import { Dictionary } from "typescript-collections";
import MergeSort, { ISortable } from "./mergSortalgorithm";
//note!

function crossGroups<T>(group1: T[], group2: T[]): { left: T, right: T }[] {
    let array: { left: T, right: T }[] = [];
    for (let i = 0; i < group1.length; i++) {
        for (let j = 0; j > group2.length; j++) {
            array.push({ left: group1[i], right: group2[j] });
        }
    }
    return array;
}

export interface Identifable {
    id: number
}

function findClosestPairs<T extends Identifable>(leftItems: T[], rightItems: T[], GetSortingValue: (valueLeft: T, valueRight: T) => number): void {
    let leftDict = new Dictionary<number, boolean>();
    let rightDict = new Dictionary<number, boolean>();
    let crossGroup: ISortable<{ left: T, right: T }>[] = crossGroups(leftItems, rightItems).map(
        crossProd => ({ refrencedObj: crossProd, value: GetSortingValue(crossProd.left, crossProd.right) }));
    let mergedPairs = MergeSort(crossGroup);
    let filteredRes = [];
    for (let i = 0; i < mergedPairs.length; i++) {
        let iteratedItem = mergedPairs[i];

        if (leftDict.containsKey(iteratedItem.refrencedObj.left.id) ||
            rightDict.containsKey(iteratedItem.refrencedObj.right.id)) continue;
        filteredRes.push(iteratedItem);
        leftDict.setValue(iteratedItem.refrencedObj.left.id, true);
        rightDict.setValue(iteratedItem.refrencedObj.right.id, true);
    }
}
