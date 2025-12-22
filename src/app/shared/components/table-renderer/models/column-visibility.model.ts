export interface ColumnVisibility {
  field: string;
  headerName: string;
  visible: boolean;
  locked?: boolean;
  colDef?: any; // Store the original AG Grid column definition
}

export interface ColumnVisibilityChangeEvent {
  field: string;
  visible: boolean;
}
