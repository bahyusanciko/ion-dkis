import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-forgotpassword",
  templateUrl: "./forgotpassword.page.html",
  styleUrls: ["./forgotpassword.page.scss"],
})
export class ForgotpasswordPage implements OnInit {
  loading: any;
  button: any;
  nip: string;
  nama: string;
  no_hp: number;
  deskripsi: string;
  response: any;
  jApps: any;
  nama_aplikasi : string;
  constructor(
    private authService: AuthService,
    private router: Router,
    public alertController: AlertController,
    private loadingController: LoadingController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get("account").then((val) => {
      this.nip = val.nip;
      this.nama = val.nama;
      this.no_hp = val.no_hp;
    });
    this.getlistapps();
  }

  backHome() {
    this.router.navigateByUrl(`/home`);
  }

  async getlistapps() {
    this.authService
      .getlistapps()
      .then((res) => {
        this.jApps = JSON.parse(res.data);
        return this.jApps;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async forgotPassword(form) {
    this.loading = await this.loadingController.create({
      message: "Loading data from api",
    });

    this.authService
      .forgotpassword(form.value)
      .then((res) => {
        this.response = JSON.parse(res.data);
        this.loading.dismiss();
        this.deskripsi = "";
        this.no_hp = 0;
        this.alert("success", this.response.message);
      })
      .catch((err) => {
        this.loading.dismiss();
        // console.log(err);
        this.alert("error", "Try Again");
      });
    this.loading.present();
  }

  async alert(status, ress) {
    if (status === "success") {
      this.button = [
        {
          text: "Okey",
          handler: () => {
            this.router.navigateByUrl(`/home`);
          },
        },
      ];
    } else {
      this.button = ["OK"];
    }
    const alert = await this.alertController.create({
      header: status,
      // subHeader: "Subtitle",
      message: ress,
      buttons: this.button,
    });

    await alert.present();
  }
}
