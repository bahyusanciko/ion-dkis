import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicStorageModule } from "@ionic/storage";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicStorageModule.forRoot()
  ]
})
export class AuthModule {}
