import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusreportPage } from './statusreport.page';

const routes: Routes = [
  {
    path: '',
    component: StatusreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusreportPageRoutingModule {}
