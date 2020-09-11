import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  ModalController,
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { AuthService } from "../../auth/auth.service";
import { PasswordPage } from "./password/password.page";

@Component({
  selector: "app-update",
  templateUrl: "./update.page.html",
  styleUrls: ["./update.page.scss"],
})
export class UpdatePage implements OnInit {
  uploadForm: any;
  loading: any;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private authService: AuthService,
    public modalController: ModalController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  backHome() {
    this.router.navigateByUrl(`/profile`);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm = file;
    }
  }

  async updateProfile(form) {
    this.loading = await this.loadingController.create({
      message: "Loading data from api",
    });

    this.authService
      .updateProfile(form.value)
      .then((res) => {
        this.loading.dismiss();
        this.router.navigateByUrl(`/profile`);
      })
      .catch((err) => {
        this.loading.dismiss();
        console.log(err);
        this.alert("error", "Try Again");
      });
    this.loading.present();
  }

  async changePassword() {
    const modal = await this.modalController.create({
      component: PasswordPage,
    });

    return await modal.present();
  }

  async alert(status, ress) {
    const alert = await this.alertController.create({
      header: status,
      message: ress,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
