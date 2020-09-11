import { Component, OnInit, ViewChild } from "@angular/core";
import { Storage } from "@ionic/storage";
import { AlertController, NavController } from "@ionic/angular";

import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  token: boolean;
  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: Storage,
    private navCntrl: NavController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.storage.get("token").then((res) => {
      if (res == null) {
        this.token =  false;
      } else {
        this.token = true;
      }
      console.log(this.token);
    });
  }

  subMission(type : string) {
    if(this.token){
      this.navCntrl.navigateRoot(type);
    }else{
      this.navCntrl.navigateRoot(`login/${type}`);
    }
  }

  async errorAlert(status, message) {
    const alert = await this.alertController.create({
      header: status,
      // subHeader: "Subtitle",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }
}
