import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewuserRoutingModule } from './newuser-routing.module';
import { NewuserComponent } from './newuser.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewuserComponent],
  imports: [
    CommonModule,
    NewuserRoutingModule,
    FormsModule
  ]
})
export class NewuserModule { }
