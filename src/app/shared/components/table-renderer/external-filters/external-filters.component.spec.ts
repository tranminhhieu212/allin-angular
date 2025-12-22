import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalFiltersComponent } from './external-filters.component';

describe('ExternalFiltersComponent', () => {
  let component: ExternalFiltersComponent;
  let fixture: ComponentFixture<ExternalFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExternalFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
