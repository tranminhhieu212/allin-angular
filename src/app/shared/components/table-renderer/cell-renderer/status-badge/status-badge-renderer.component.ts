import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge-renderer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge-renderer.component.html'
})
export class StatusBadgeRendererComponent implements ICellRendererAngularComp {
  status: string = '';

  agInit(params: ICellRendererParams): void {
    this.status = params.value;
  }

  refresh(params: ICellRendererParams): boolean {
    this.status = params.value;
    return true;
  }

  getStatusClass(): string {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-semibold capitalize inline-block';

    switch (this.status.toLowerCase()) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'inactive':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'completed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }
}
