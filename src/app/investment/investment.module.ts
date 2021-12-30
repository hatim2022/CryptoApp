import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentRoutingModule } from './investment-routing.module';
import { InvestmentPageComponent } from './investment-page/investment-page.component';


@NgModule({
  declarations: [InvestmentPageComponent],
  imports: [
    CommonModule,
    InvestmentRoutingModule
  ]
})
export class InvestmentModule { }
