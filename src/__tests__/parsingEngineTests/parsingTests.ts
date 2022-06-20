import { subArray } from "../../parsingEngine/parsingServiceUtils";

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

describe('subArray() tests' , () => {
    test('success', () => {
        const source = [1,2,3,4,5,6];
        const result : number[] = subArray(source,3,5);
        const expected : number[] = [4,5,6];
        expect(CompareArrays(result,expected)).toBe(true);   
    })
})

