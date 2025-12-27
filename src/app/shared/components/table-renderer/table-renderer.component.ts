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
  @Input() serverSidePagination = false;
  @Input() totalRows: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 30;

  @Output() gridReady = new EventEmitter<any>();
  @Output() filterChanged = new EventEmitter<FilterModel>();
  @Output() paginationChanged = new EventEmitter<{ page: number; pageSize: number }>();

  gridApi: any;
  locked_columns = ['id', 'actions']
  visibleColumnDefs: ColDef[] = [];
  columnVisibilityList: ColumnVisibility[] = [];
  defaultColumnVisibilityList: ColumnVisibility[] = [];
  displayRowData: any[] = [];
  private isUpdatingData = false;

  gridOptions: any = {
    pagination: false,  // Disable AG-Grid pagination, we'll use custom
    suppressRowClickSelection: true,
    isExternalFilterPresent: () => true,
    doesExternalFilterPass: () => true,
    suppressPaginationPanel: true,  // Hide AG-Grid's pagination panel
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

  // Custom pagination getters
  get totalPages(): number {
    if (!this.serverSidePagination || this.totalRows === 0) return 1;
    return Math.ceil(this.totalRows / this.pageSize);
  }

  get paginationStart(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get paginationEnd(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.totalRows ? this.totalRows : end;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  get hasPrevPage(): boolean {
    return this.currentPage > 1;
  }

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

    // Update display data when rowData, totalRows, currentPage, or pageSize changes
    if (changes['rowData'] || changes['totalRows'] || changes['currentPage'] || changes['pageSize']) {
      this.updateDisplayData();
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

    if (this.serverSidePagination) {
      this.setupServerSidePagination();
    }

    params.api.onFilterChanged();

    this.gridReady.emit(params.api);
  }

  private setupServerSidePagination(): void {
    if (!this.gridApi) return;
    // Custom pagination - no AG-Grid pagination events needed
    this.updateDisplayData();
  }

  private updateDisplayData(): void {
    if (!this.serverSidePagination || this.totalRows === 0) {
      this.displayRowData = this.rowData;
      return;
    }

    // Set flag to prevent pagination event loops
    this.isUpdatingData = true;

    // For server-side pagination with simple pagination model:
    // We just show the current page data and disable pagination navigation
    // The component manages which page to show

    console.log('updateDisplayData called:', {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      totalRows: this.totalRows,
      rowDataLength: this.rowData.length
    });

    // Simply use the current page data without placeholders
    this.displayRowData = this.rowData;

    // Update grid pagination settings
    if (this.gridApi) {
      // Disable pagination temporarily to update settings
      this.gridApi.paginationSetPageSize(this.pageSize);

      // Update the pagination panel to show correct info
      setTimeout(() => {
        this.isUpdatingData = false;
      }, 50);
    } else {
      this.isUpdatingData = false;
    }
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

  // Custom pagination methods
  goToNextPage(): void {
    if (this.hasNextPage) {
      this.paginationChanged.emit({ page: this.currentPage + 1, pageSize: this.pageSize });
    }
  }

  goToPrevPage(): void {
    if (this.hasPrevPage) {
      this.paginationChanged.emit({ page: this.currentPage - 1, pageSize: this.pageSize });
    }
  }

  goToFirstPage(): void {
    if (this.currentPage !== 1) {
      this.paginationChanged.emit({ page: 1, pageSize: this.pageSize });
    }
  }

  goToLastPage(): void {
    if (this.currentPage !== this.totalPages) {
      this.paginationChanged.emit({ page: this.totalPages, pageSize: this.pageSize });
    }
  }
}
