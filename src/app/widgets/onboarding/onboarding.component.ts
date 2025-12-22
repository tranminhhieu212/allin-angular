import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRendererComponent } from 'src/app/shared/components/table-renderer/table-renderer.component';
import { onboardingColumns } from './onboarding.coldef';
import { onboarding_data_mock } from './onboarding.data';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, TableRendererComponent],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  columnDef: ColDef[] = onboardingColumns;
  rowData: any[] = onboarding_data_mock;

  constructor() { }

  ngOnInit(): void {
  }

  onGridReady(gridApi: any): void {
    console.log('Grid is ready!', gridApi);
  }

}
