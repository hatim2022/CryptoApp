import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentPageComponent } from './investment-page.component';

describe('InvestmentPageComponent', () => {
  let component: InvestmentPageComponent;
  let fixture: ComponentFixture<InvestmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
