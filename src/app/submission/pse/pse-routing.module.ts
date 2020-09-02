import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsePage } from './pse.page';

const routes: Routes = [
  {
    path: '',
    component: PsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsePageRoutingModule {}
