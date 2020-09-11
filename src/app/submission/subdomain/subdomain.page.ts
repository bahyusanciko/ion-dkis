import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { Storage } from "@ionic/storage";


@Component({
  selector: "app-subdomain",
  templateUrl: "./subdomain.page.html",
  styleUrls: ["./subdomain.page.scss"],
})
export class SubdomainPage implements OnInit {
  loading: any;
  button: any;
  nip: string;
  nama: string;
  no_hp: number;
  response: any;
  surat_pengajuan: any;
  surat_tugas: any;
  surat_kpe: any;
  email_domain: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    public alertController: AlertController,
    private loadingController: LoadingController,
    private storage: Storage

  ) { }

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

  async subdomain(form){
    this.loading = await this.loadingController.create({
      message: "Loading data from api",
    });

    this.authService
      .subdomain(form.value, this.surat_pengajuan, this.surat_tugas, this.surat_kpe)
      .then((res) => {
        this.response = JSON.parse(res.data);
        this.loading.dismiss();
        this.surat_pengajuan = '';
        this.surat_tugas = '';
        this.surat_kpe = '';
        this.no_hp = 0;
        this.alert("success", this.response.message);

      })
      .catch((err) => {
        this.loading.dismiss();
        // console.log(err);
        this.alert("error", "Try Again");
      });
    this.loading.present();  }
  
  onFileSelect(event,status) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (status == 'surat_pengajuan') {
        this.surat_pengajuan = file;
      } else if (status === 'surat_tugas'){
        this.surat_tugas = file;
      } else if (status === 'surat_kpe') {
        this.surat_kpe = file;
      }
      // this.document = file;
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
