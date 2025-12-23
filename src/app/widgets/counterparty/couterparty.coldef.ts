import { ColDef } from 'ag-grid-community';
import { ActionButtonsRendererComponent } from 'src/app/shared/components/table-renderer/cell-renderer/action-buttons-renderer.component';
import { ListRendererComponent } from 'src/app/shared/components/table-renderer/cell-renderer/list-renderer/list-renderer.component';
import { StatusBadgeRendererComponent } from 'src/app/shared/components/table-renderer/cell-renderer/status-badge/status-badge-renderer.component';
import { DepartmentSetFilterComponent } from '../../shared/components/table-renderer/filters/department-set-filter.component';
import { GenericSetFilterComponent } from '../../shared/components/table-renderer/filters/generic-set-filter.component';
import { FILTER_CONFIGS, createFilterParams } from '../../shared/components/table-renderer/filters/filter-configs';

export const counterPartyColumns: ColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        sortable: true,
        filter: true,
        editable: false,
        width: 150
    },
    {
        field: 'company',
        headerName: 'Company',
        sortable: true,
        filter: true,
        editable: false
    },
    {
        field: 'department',
        headerName: 'Department',
        sortable: true,
        filter: GenericSetFilterComponent,
        filterParams: createFilterParams(FILTER_CONFIGS.DEPARTMENT),
        floatingFilter: true,
        editable: false,
        cellRenderer: ListRendererComponent
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
        field: 'address',
        headerName: 'Address',
        sortable: true,
        filter: true,
        editable: false
    }, {
        field: 'status',
        headerName: 'Status',
        sortable: true,
        filter: GenericSetFilterComponent,
        filterParams: createFilterParams(FILTER_CONFIGS.STATUS),
        floatingFilter: true,
        cellRenderer: StatusBadgeRendererComponent,
        editable: false
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
