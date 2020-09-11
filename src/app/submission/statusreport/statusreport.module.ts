import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatusreportPageRoutingModule } from './statusreport-routing.module';

import { StatusreportPage } from './statusreport.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    StatusreportPageRoutingModule
  ],
  declarations: [StatusreportPage]
})
export class StatusreportPageModule {}
