import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { HttpClientModule } from "@angular/common/http";
import { TableRendererComponent } from 'src/app/shared/components/table-renderer/table-renderer.component';
import { counterparty_data_mock } from './couterparty.data';
import { counterPartyColumns } from './couterparty.coldef';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CounterpartyService } from 'src/app/services/counterparty.service';

@Component({
  standalone: true,
  imports: [CommonModule, TableRendererComponent, NzButtonModule, NzDropDownModule, NzIconModule, HttpClientModule],
  selector: 'app-counterparty',
  templateUrl: './counterparty.component.html',
  styleUrls: ['./counterparty.component.scss']
})
export class CounterpartyComponent implements OnInit {

  counterPartyColumns: ColDef[] = counterPartyColumns;
  counterPartyDatas: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private counterpartyService: CounterpartyService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  addNewCounterparty() {
  }

  onGridReady($event: any) {
  }

  onFilterChangedHandler($event: any) {
    console.log('Filter model:', $event);
    this.fetchData($event);
  }

  fetchData(filterModel?: any) {
    this.loading = true;
    this.error = null;
    console.log(filterModel);
    this.counterpartyService.getCounterparties(filterModel).subscribe({
      next: (data) => {
        this.counterPartyDatas = data.data;
        this.loading = false;
        console.log('Counterparty data loaded:', data);
      },
      error: (error) => {
        console.error('Error fetching counterparty data:', error);
        this.error = 'Failed to load counterparty data';
        this.loading = false;
        this.counterPartyDatas = counterparty_data_mock;
      }
    });
  }

}
