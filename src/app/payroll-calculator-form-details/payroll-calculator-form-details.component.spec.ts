import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCalculaterFormDetailsComponent } from './payroll-calculator-form-details.component';

describe('PayrollCalculatorFormDetailsComponent', () => {
  let component: PayrollCalculaterFormDetailsComponent;
  let fixture: ComponentFixture<PayrollCalculaterFormDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollCalculaterFormDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollCalculaterFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
