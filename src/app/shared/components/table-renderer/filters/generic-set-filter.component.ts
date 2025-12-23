import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';
import { IFilterAngularComp } from 'ag-grid-angular';

export interface SetFilterOption {
  value: string;
  selected: boolean;
}

export interface GenericSetFilterConfig {
  // The available values for the filter
  values: string[];
  // Optional: field name override (defaults to column field)
  field?: string;
  // Optional: Custom label for search placeholder
  searchPlaceholder?: string;
  // Optional: Whether to handle array values (default: true)
  handleArrayValues?: boolean;
  // Optional: Case sensitive comparison (default: false)
  caseSensitive?: boolean;
}

@Component({
  selector: 'app-generic-set-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generic-set-filter.component.html',
  styleUrls: ['./generic-set-filter.component.scss']
})
export class GenericSetFilterComponent implements IFilterAngularComp {
  private params!: IFilterParams;
  private config!: GenericSetFilterConfig;

  options: SetFilterOption[] = [];
  filteredOptions: SetFilterOption[] = [];
  searchText: string = '';
  searchPlaceholder: string = 'Search...';

  agInit(params: IFilterParams): void {
    this.params = params;

    // Get configuration from params
    // AG Grid passes filterParams directly, so we access config from there
    this.config = (params as any).config;

    if (!this.config) {
      console.error('GenericSetFilterComponent requires a config in filterParams');
      return;
    }

    // Set search placeholder
    this.searchPlaceholder = this.config.searchPlaceholder || 'Search...';

    // Initialize options sorted alphabetically
    this.options = this.config.values
      .sort((a, b) => a.localeCompare(b))
      .map(value => ({
        value,
        selected: true
      }));

    this.filteredOptions = [...this.options];
  }

  isFilterActive(): boolean {
    // Filter is active if any option is deselected
    return this.options.some(option => !option.selected);
  }
 
  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const field = this.config.field || this.params.colDef.field || '';
    const value = params.node.data?.[field];
    const handleArrayValues = this.config.handleArrayValues !== false;
    const caseSensitive = this.config.caseSensitive === true;

    // Handle array values (like ['Sales', 'Marketing'])
    if (handleArrayValues && Array.isArray(value)) {
      return value.some(val =>
        this.options.find(opt =>
          this.compareValues(opt.value, val, caseSensitive) && opt.selected
        )
      );
    }

    // Handle single string values
    const option = this.options.find(opt =>
      this.compareValues(opt.value, value, caseSensitive)
    );
    return option ? option.selected : false;
  }

  private compareValues(optionValue: string, dataValue: any, caseSensitive: boolean): boolean {
    if (dataValue === null || dataValue === undefined) {
      return false;
    }

    const optVal = caseSensitive ? optionValue : optionValue.toLowerCase();
    const dataVal = caseSensitive ? String(dataValue) : String(dataValue).toLowerCase();

    return optVal === dataVal;
  }

  getModel(): any {
    const selectedValues = this.options
      .filter(opt => opt.selected)
      .map(opt => opt.value);

    return selectedValues.length === this.options.length ? null : selectedValues;
  }

  setModel(model: any): void {
    if (model === null || model === undefined) {
      // Select all
      this.selectAll();
    } else {
      // Select only the values in the model
      this.options.forEach(option => {
        option.selected = model.includes(option.value);
      });
      this.updateFilteredOptions();
    }
  }

  selectAll(): void {
    this.options.forEach(option => option.selected = true);
    this.updateFilteredOptions();
    this.onSelectionChange();
  }

  clearAll(): void {
    this.options.forEach(option => option.selected = false);
    this.updateFilteredOptions();
    this.onSelectionChange();
  }

  onSearchChange(): void {
    this.updateFilteredOptions();
  }

  private updateFilteredOptions(): void {
    const searchLower = this.searchText.toLowerCase();
    this.filteredOptions = this.options.filter(option =>
      option.value.toLowerCase().includes(searchLower)
    );
  }

  onSelectionChange(): void {
    this.params.filterChangedCallback();
  }
}
