import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellPageComponent } from './sell-page/sell-page.component';
import { FormsModule } from '@angular/forms';
import { SellRoutingModule } from './sell-routing.module';



@NgModule({
  declarations: [SellPageComponent],
  imports: [
    CommonModule,
    SellRoutingModule,
    FormsModule
  ]
})
export class SellModuleModule { }
