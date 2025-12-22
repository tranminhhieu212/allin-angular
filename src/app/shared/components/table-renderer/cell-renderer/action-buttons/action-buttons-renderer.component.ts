import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-action-buttons-renderer',
  standalone: true,
  imports: [CommonModule, NzIconModule],
  templateUrl: './action-buttons-renderer.component.html'
})
export class ActionButtonsRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  onEdit(): void {
    console.log('Edit clicked for row:', this.params.data);
    // You can emit events or call parent methods here
    if (this.params.context?.componentParent?.onEdit) {
      this.params.context.componentParent.onEdit(this.params.data);
    }
  }

  onDelete(): void {
    console.log('Delete clicked for row:', this.params.data);
    if (this.params.context?.componentParent?.onDelete) {
      this.params.context.componentParent.onDelete(this.params.data);
    }
  }

  onView(): void {
    console.log('View clicked for row:', this.params.data);
    if (this.params.context?.componentParent?.onView) {
      this.params.context.componentParent.onView(this.params.data);
    }
  }
}
