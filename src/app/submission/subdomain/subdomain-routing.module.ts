import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubdomainPage } from './subdomain.page';

const routes: Routes = [
  {
    path: '',
    component: SubdomainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubdomainPageRoutingModule {}
