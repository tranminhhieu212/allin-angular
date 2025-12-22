import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-list-renderer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-renderer.component.html',
  styleUrls: ['./list-renderer.component.scss']
})
export class ListRendererComponent implements ICellRendererAngularComp {
  departments: string[] = [];

  agInit(params: ICellRendererParams): void {
    this.departments = Array.isArray(params.value) ? params.value : [params.value];
  }

  refresh(params: ICellRendererParams): boolean {
    this.departments = Array.isArray(params.value) ? params.value : [params.value];
    return true;
  }

  getDepartmentClass(department: string): string {
    const baseClasses = 'px-2 py-1 rounded text-xs font-medium inline-block';

    // Different colors for different departments
    const colorMap: { [key: string]: string } = {
      'Engineering': 'bg-blue-100 text-blue-800',
      'Product': 'bg-purple-100 text-purple-800',
      'Marketing': 'bg-pink-100 text-pink-800',
      'Sales': 'bg-green-100 text-green-800',
      'Design': 'bg-orange-100 text-orange-800',
      'Analytics': 'bg-cyan-100 text-cyan-800',
      'Security': 'bg-red-100 text-red-800',
      'HR': 'bg-yellow-100 text-yellow-800'
    };

    const colorClass = colorMap[department] || 'bg-gray-100 text-gray-800';
    return `${baseClasses} ${colorClass}`;
  }
}
