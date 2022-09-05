import { Point } from "../commonTypes/coordinates";

export interface dataTableItem {
    data: number | string | number[] | string[] | Point;
}

export interface dataTable {
    table: dataTableItem[][];
}

export function createColFromDataColumn(column: dataTableItem[]) {
    let res = [];
    for (let i = 0; i < column.length; i++) {
        res.push([column[i]]);
    }
    return res;
}

export function addColToDataTable(dataTable: dataTable, column: dataTableItem[]) : void{
    if (dataTable.table.length != column.length) {
        throw new Error("column and table not in matching dimensions!");
    }
    for (let i = 0; i < column.length; i++) {
        dataTable.table[i].push(column[i]);
    }
}

