import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewuserComponent } from './newuser.component';

const routes: Routes = [{ path: '', component: NewuserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewuserRoutingModule { }
