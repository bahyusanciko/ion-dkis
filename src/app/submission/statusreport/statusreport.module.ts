import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatusreportPageRoutingModule } from './statusreport-routing.module';

import { StatusreportPage } from './statusreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatusreportPageRoutingModule
  ],
  declarations: [StatusreportPage]
})
export class StatusreportPageModule {}
