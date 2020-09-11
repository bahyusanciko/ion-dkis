import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-network",
  templateUrl: "./network.page.html",
  styleUrls: ["./network.page.scss"],
})
export class NetworkPage implements OnInit {
  loading: any;
  button: any;
  nip: string;
  nama: string;
  no_hp: number;
  deskripsi: string;
  response: any;
  document: any;
  nama_SKPD: string;
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
  }

  backHome() {
    this.router.navigateByUrl(`/home`);
  }

  async network(form) {
    this.loading = await this.loadingController.create({
      message: "Loading data from api",
    });

    this.authService
      .network(form.value, this.document)
      .then((res) => {
        this.response = JSON.parse(res.data);
        this.loading.dismiss();
        this.deskripsi = '';
        this.document = '';
        this.no_hp = 0;
        this.nama_SKPD = '';
        this.alert("success", this.response.message);

      })
      .catch((err) => {
        this.loading.dismiss();
        // console.log(err);
        this.alert("error", "Try Again");
      });
    this.loading.present();
  }


  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.document = file;
    }
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
