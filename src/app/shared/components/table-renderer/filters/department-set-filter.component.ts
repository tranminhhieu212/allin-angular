import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';
import { IFilterAngularComp } from 'ag-grid-angular';

interface DepartmentFilterOption {
  value: string;
  selected: boolean;
}

@Component({
  selector: 'app-department-set-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-set-filter.component.html',
  styleUrls: ['./department-set-filter.component.scss']
})
export class DepartmentSetFilterComponent implements IFilterAngularComp {
  private params!: IFilterParams;

  options: DepartmentFilterOption[] = [];
  filteredOptions: DepartmentFilterOption[] = [];
  searchText: string = '';

  private readonly DEPARTMENTS = [
    'Sales',
    'Marketing',
    'Engineering',
    'Design',
    'Finance',
    'Accounting',
    'Human Resources',
    'Operations',
    'Logistics',
    'IT',
    'Support',
    'Legal',
    'Compliance',
    'UX',
    'Communications',
    'Security',
    'Recruiting',
    'Research',
    'Business Development',
    'Supply Chain',
    'Treasury',
    'Infrastructure',
    'DevOps',
    'Training',
    'Account Management',
    'Contracts',
    'Product',
    'Planning'
  ];

  agInit(params: IFilterParams): void {
    this.params = params;

    // Initialize options sorted alphabetically
    this.options = this.DEPARTMENTS
      .sort((a, b) => a.localeCompare(b))
      .map(dept => ({
        value: dept,
        selected: true
      }));

    this.filteredOptions = [...this.options];
  }

  isFilterActive(): boolean {
    // Filter is active if any department is deselected
    return this.options.some(option => !option.selected);
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    // Get the value from the node's data
    const value = params.node.data?.[this.params.colDef.field || ''];

    // Handle array values (like ['Sales', 'Marketing'])
    if (Array.isArray(value)) {
      // Check if any department in the array matches selected filters
      return value.some(dept =>
        this.options.find(opt => opt.value === dept && opt.selected)
      );
    }

    // Handle single string values
    const option = this.options.find(opt => opt.value === value);
    return option ? option.selected : false;
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
