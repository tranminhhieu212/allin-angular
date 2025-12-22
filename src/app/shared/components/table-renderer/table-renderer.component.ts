import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, FilterChangedEvent } from 'ag-grid-community';
import { ExternalFiltersComponent } from "./external-filters/external-filters.component";
import { ColumnVisibilityComponent } from "./column-visibility/column-visibility.component";
import { ColumnVisibility, ColumnVisibilityChangeEvent } from './models/column-visibility.model';

@Component({
  selector: 'app-table-renderer',
  standalone: true,
  imports: [CommonModule, AgGridModule, ExternalFiltersComponent, ColumnVisibilityComponent],
  templateUrl: './table-renderer.component.html',
  styleUrls: ['./table-renderer.component.scss']
})
export class TableRendererComponent implements OnInit, OnChanges {

  @Input() columnDef: ColDef[] = [];
  @Input() rowData: any[] = [];
  @Input() pagination = true;
  @Input() externalFilter = false;
  @Input() columnVisibility: boolean = false;

  @Output() gridReady = new EventEmitter<any>();

  gridApi: any;
  visibleColumnDefs: ColDef[] = [];
  columnVisibilityList: ColumnVisibility[] = [];
  defaultColumnVisibilityList: ColumnVisibility[] = [];

  gridOptions: any = {
    pagination: this.pagination || true,
    paginationPageSize: 30,
    enableFilterHandlers: true,
    isExternalFilterPresent: () => true,
    doesExternalFilterPass: () => true,
  };

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    floatingFilter: true,
    autoHeight: true
  };

  constructor() { 
  }

  ngOnInit(): void {
    this.initializeColumnVisibility();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columnDef'] && !changes['columnDef'].firstChange) {
      this.initializeColumnVisibility();
      this.updateVisibleColumns();
    }
  }

  private initializeColumnVisibility(): void {
    this.columnVisibilityList = this.columnDef.map(col => ({
      field: col.field || '',
      headerName: col.headerName || col.field || '',
      visible: true, // All columns visible by default
      locked: false, // Optional: set to true for columns that shouldn't be hidden
      colDef: col
    }));

    // Store default state for reset functionality - preserve colDef references
    this.defaultColumnVisibilityList = this.columnVisibilityList.map(col => ({
      ...col,
      colDef: col.colDef // Keep the original colDef reference
    }));

    // Initialize visible columns
    this.updateVisibleColumns();
  }

  private updateVisibleColumns(): void {
    // Create a deep copy of the column definitions to ensure AG Grid re-renders properly
    this.visibleColumnDefs = this.columnVisibilityList
      .filter(col => col.visible)
      .map(col => ({ ...col.colDef }));

    if (this.gridApi) {
      this.gridApi.setGridOption('columnDefs', this.visibleColumnDefs);
      this.gridApi.refreshCells({ force: true });
    }
  }

  onVisibilityChange(event: ColumnVisibilityChangeEvent): void {
    const column = this.columnVisibilityList.find(col => col.field === event.field);
    if (column) {
      column.visible = event.visible;
      this.updateVisibleColumns();
    }
  }
 
  onColumnOrderChange(reorderedColumns: ColumnVisibility[]): void {
    this.columnVisibilityList = reorderedColumns;
    this.updateVisibleColumns();
  }

  onResetColumnVisibility(): void {
    // Reset visibility while preserving colDef references
    this.columnVisibilityList = this.defaultColumnVisibilityList.map(col => ({
      ...col,
      colDef: col.colDef // Keep the original colDef reference with cellRenderer
    }));
    this.updateVisibleColumns();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridOptions.pagination = this.pagination;

    // Set initial visible columns
    if (this.columnVisibility) {
      this.updateVisibleColumns();
    }

    this.gridReady.emit(params.api);
  }

  onFilterChanged(event: FilterChangedEvent): void {
    const filterModel = event.api.getFilterModel();
    let filters: {[key: string]: string}[] = [];

    Object.keys(filterModel).forEach(key => {
      filters.push({[key]: filterModel[key].filter});
    })

    console.log(filters);
  }
}
