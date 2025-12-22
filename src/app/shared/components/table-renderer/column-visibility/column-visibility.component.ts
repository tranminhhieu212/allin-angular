import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ColumnVisibility, ColumnVisibilityChangeEvent } from '../models/column-visibility.model';

@Component({
  selector: 'app-column-visibility',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    NzButtonModule,
    NzDropDownModule,
    NzIconModule,
    NzEmptyModule
  ],
  templateUrl: './column-visibility.component.html',
  styleUrls: ['./column-visibility.component.scss']
})
export class ColumnVisibilityComponent implements OnInit {
  @Input() columns: ColumnVisibility[] = [];
  @Output() visibilityChange = new EventEmitter<ColumnVisibilityChangeEvent>();
  @Output() resetToDefault = new EventEmitter<void>();
  @Output() columnOrderChange = new EventEmitter<ColumnVisibility[]>();

  isDropdownOpen = false;
  visibleColumns: ColumnVisibility[] = [];
  hiddenColumns: ColumnVisibility[] = [];

  ngOnInit(): void {
    this.updateColumnLists();
  }

  ngOnChanges(): void {
    this.updateColumnLists();
  }

  /**
   * Update visible and hidden column lists
   */
  private updateColumnLists(): void {
    this.visibleColumns = this.columns.filter(col => col.visible);
    this.hiddenColumns = this.columns.filter(col => !col.visible);
  }

  /**
   * Toggle dropdown visibility
   */
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
   * Handle column visibility toggle
   */
  onColumnToggle(column: ColumnVisibility): void {
    if (column.locked) {
      return; // Don't allow toggling locked columns
    }

    column.visible = !column.visible;
    this.updateColumnLists();
    this.visibilityChange.emit({
      field: column.field,
      visible: column.visible
    });
  }

  /**
   * Show all columns
   */
  showAll(): void {
    this.columns.forEach(column => {
      if (!column.locked && !column.visible) {
        column.visible = true;
        this.visibilityChange.emit({
          field: column.field,
          visible: true
        });
      }
    });
    this.updateColumnLists();
  }

  /**
   * Hide all non-locked columns
   */
  hideAll(): void {
    this.columns.forEach(column => {
      if (!column.locked && column.visible) {
        column.visible = false;
        this.visibilityChange.emit({
          field: column.field,
          visible: false
        });
      }
    });
    this.updateColumnLists();
  }

  /**
   * Reset to default visibility
   */
  reset(): void {
    this.resetToDefault.emit();
  }

  /**
   * Get count of visible columns
   */
  getVisibleCount(): number {
    return this.columns.filter(col => col.visible).length;
  }

  /**
   * Get total count of columns
   */
  getTotalCount(): number {
    return this.columns.length;
  }

  /**
   * Handle drag and drop between visible and hidden lists
   */
  onDrop(event: CdkDragDrop<ColumnVisibility[]>): void {
    const column = event.item.data;

    // Don't allow moving locked columns
    if (column?.locked) {
      return;
    }

    if (event.previousContainer === event.container) {
      // Reordering within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Moving between visible and hidden lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Update the column's visibility
      if (column) {
        column.visible = event.container.id === 'visible-list';
        this.visibilityChange.emit({
          field: column.field,
          visible: column.visible
        });
      }
    }

    // Rebuild the main columns array maintaining order
    this.rebuildColumnsArray();
    this.columnOrderChange.emit([...this.columns]);
  }

  /**
   * Rebuild columns array from visible and hidden lists
   */
  private rebuildColumnsArray(): void {
    this.columns = [...this.visibleColumns, ...this.hiddenColumns];
  }
}
