import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from "@ionic/storage";
import {
  NavController,
  Platform,
  IonRouterOutlet,
  AlertController,
} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private navCntrl: NavController,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.initializeApp();
    this.platform.backButton.subscribe(() => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === "/home") {
        navigator["app"].exitApp();
      } else {
        this.presentAlertConfirm();
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: "Confirm!",
      message: "Do you want to exit the app?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Okay",
          handler: () => {
            console.log("Confirm Okay");
            navigator["app"].exitApp();
          },
        },
      ],
    });

    await alert.present();
  }
}
