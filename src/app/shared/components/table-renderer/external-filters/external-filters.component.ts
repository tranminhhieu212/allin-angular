import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'app-external-filters',
  standalone: true,
  imports: [CommonModule, NzSpaceModule],
  templateUrl: './external-filters.component.html',
  styleUrls: ['./external-filters.component.scss']
})
export class ExternalFiltersComponent implements OnInit {
  @Input() columnDef: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
