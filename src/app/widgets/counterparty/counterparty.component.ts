import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { TableRendererComponent } from 'src/app/shared/components/table-renderer/table-renderer.component';
import { counterparty_data_mock } from './couterparty.data';
import { counterPartyColumns } from './couterparty.coldef';

@Component({
  standalone: true,
  imports: [CommonModule, TableRendererComponent, NzButtonModule],
  selector: 'app-counterparty',
  templateUrl: './counterparty.component.html',
  styleUrls: ['./counterparty.component.scss']
})
export class CounterpartyComponent implements OnInit {

  counterPartyColumns: ColDef[] = counterPartyColumns;
  counterPartyDatas: any[] = counterparty_data_mock;

  constructor() {
  }

  ngOnInit(): void {
  }

  addNewCounterparty() {
  }

  onGridReady($event: any) {
  }

}
