import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PortfolioPageComponent],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    FormsModule
  ]
})
export class PortfolioModule { }
