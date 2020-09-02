import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubdomainPageRoutingModule } from './subdomain-routing.module';

import { SubdomainPage } from './subdomain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubdomainPageRoutingModule
  ],
  declarations: [SubdomainPage]
})
export class SubdomainPageModule {}
