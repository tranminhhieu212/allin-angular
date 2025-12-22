import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './horizontal-sidebar.component.html',
  styleUrls: ['./horizontal-sidebar.component.scss']
})
export class HorizontalSidebarComponent implements OnInit {
  options = [
    { label: 'Counterparty', value: 'counterparty', icon: 'bars' },
    { label: 'Onboarding', value: 'onboarding', icon: 'appstore' }
  ];

  handleValueChange(e: string | number): void {
    console.log(e);
    this.router.navigate([this.options[Number(e)].value]);
  }

  constructor(private router: Router) { }

  ngOnInit(): void { }

}
