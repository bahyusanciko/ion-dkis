import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PsePageRoutingModule } from './pse-routing.module';

import { PsePage } from './pse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PsePageRoutingModule
  ],
  declarations: [PsePage]
})
export class PsePageModule {}
