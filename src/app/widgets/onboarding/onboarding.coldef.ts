import { ColDef } from 'ag-grid-community';
import { ActionButtonsRendererComponent } from 'src/app/shared/components/table-renderer/cell-renderer/action-buttons-renderer.component';
import { ListRendererComponent } from 'src/app/shared/components/table-renderer/cell-renderer/list-renderer/list-renderer.component';
import { StatusBadgeRendererComponent } from 'src/app/shared/components/table-renderer/cell-renderer/status-badge/status-badge-renderer.component';
import { DepartmentSetFilterComponent } from '../../shared/components/table-renderer/filters/department-set-filter.component';

export const onboardingColumns: ColDef[] = [
    {
        field: 'sale',
        headerName: 'Sale',
        sortable: true,
        filter: true,
        editable: false,
        width: 150
    }, {
        field: 'level',
        headerName: 'Level',
        sortable: true,
        filter: true,
        editable: false,
        cellRenderer: StatusBadgeRendererComponent
    }, {
        field: 'department',
        headerName: 'Department',
        sortable: true,
        filter: DepartmentSetFilterComponent,
        floatingFilter: true,
        editable: false,
        cellRenderer: ListRendererComponent
    },
    {
        field: 'address',
        headerName: 'Address',
        sortable: true,
        floatingFilter: true,
        editable: false
    },
    {
        field: 'email',
        headerName: 'Email',
        sortable: true,
        filter: true,
        editable: false
    },
    {
        field: 'phone',
        headerName: 'Phone',
        sortable: true,
        filter: true,
        editable: false,
        width: 150
    }, {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        filter: false,
        editable: false,
        cellRenderer: ActionButtonsRendererComponent,
        width: 100,
        pinned: 'right',
    }
];
