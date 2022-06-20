import { subArray } from "../../parsingEngine/parsingServiceUtils";

describe('subArray() tests' , () => {
    test('success', () => {
        const source = [1,2,3,4,5,6];
        const result = subArray(source,3,5);
        expect(result.length).toBe(3);
        expect(result[0]).toBe(4);
        expect(result[1]).toBe(5);
        expect(result[2]).toBe(6);
        
    })
})

