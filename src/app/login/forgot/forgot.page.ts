import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  ModalController,
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.page.html",
  styleUrls: ["./forgot.page.scss"],
})
export class ForgotPage implements OnInit {
  loading: any;
  response: any;
  email: string;

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss();
  }

  async forgotPassword(form) {
    this.loading = await this.loadingController.create({
      message: "Loading data from api",
    });

    this.authService
      .forgotPassword(form.value)
      .then((res) => {
        this.loading.dismiss();
        console.log(res);
        let massage = "";
        let error = "";
        if (res.status == 200) {
          this.email = "";
          this.response = JSON.parse(res.data);
          this.alert("info", this.response.message);
          this.router.navigateByUrl("");
        } else {
          this.response = JSON.parse(res.error);
          for (error in this.response.message) {
            massage += this.response.message[error].join("\n") + "\n ";
          }
          this.alert("Error", massage);
        }
      })
      .catch((err) => {
        this.loading.dismiss();
        this.alert("error", err.status);
        this.router.navigateByUrl("");
      });
    this.loading.present();
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
