export interface TableColDef {
    id: number,
    name: string,
    description?: string,
    headerName?: string, 
    field: string,
    visible?: boolean,
    allowHidden?: boolean
}