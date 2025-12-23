import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, FilterChangedEvent } from 'ag-grid-community';
import { ExternalFiltersComponent } from "./external-filters/external-filters.component";
import { ColumnVisibilityComponent } from "./column-visibility/column-visibility.component";
import { ColumnVisibility, ColumnVisibilityChangeEvent } from './models/column-visibility.model';
import { NzButtonModule } from 'ng-zorro-antd/button';

interface FilterModel {
  [key: string]: any;
}

@Component({
  selector: 'app-table-renderer',
  standalone: true,
  imports: [CommonModule, AgGridModule, ExternalFiltersComponent, ColumnVisibilityComponent, NzButtonModule],
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
  @Output() filterChanged = new EventEmitter<FilterModel>();

  gridApi: any;
  locked_columns = ['id', 'actions']
  visibleColumnDefs: ColDef[] = [];
  columnVisibilityList: ColumnVisibility[] = [];
  defaultColumnVisibilityList: ColumnVisibility[] = [];

  gridOptions: any = {
    pagination: this.pagination || true,
    paginationPageSize: 30,
    suppressRowClickSelection: true,
    isExternalFilterPresent: () => true,
    doesExternalFilterPass: (node: any) => true,
  };

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    autoHeight: true,
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
      visible: true,
      locked: col.field ? this.locked_columns.includes(col.field) : false,
      colDef: col
    }));

    this.defaultColumnVisibilityList = this.columnVisibilityList.map(col => ({
      ...col,
      colDef: col.colDef
    }));

    this.updateVisibleColumns();
  }

  private updateVisibleColumns(): void {
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
    this.columnVisibilityList = this.defaultColumnVisibilityList.map(col => ({
      ...col,
      colDef: col.colDef
    }));
    this.updateVisibleColumns();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridOptions.pagination = this.pagination;

    if (this.columnVisibility) {
      this.updateVisibleColumns();
    }

    params.api.onFilterChanged();

    this.gridReady.emit(params.api);
  }

  clearFilters() {
    this.gridApi.setFilterModel(null);
  }

  onFilterChanged(event: FilterChangedEvent): void {
    const filterModel = event.api.getFilterModel();
    const filters: FilterModel = {};

    Object.entries(filterModel).forEach(([key, value]) => {
      if (value && 'filter' in value) {
        filters[key] = value.filter;
      }
    });

    this.filterChanged.emit(filters);
  }
}
