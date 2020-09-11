import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AlertController, LoadingController } from "@ionic/angular";
import { AuthService } from "../../../auth/auth.service";

@Component({
  selector: "app-password",
  templateUrl: "./password.page.html",
  styleUrls: ["./password.page.scss"],
})
export class PasswordPage implements OnInit {
  loading: any;
  response: any;

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async changePassword(form) {
    this.loading = await this.loadingController.create({
      message: "Loading data from api",
    });
    let massage = "";
    let error = "";
    this.authService
      .changePassword(form.value)
      .then((res) => {
        this.loading.dismiss();
        if (res.status === 200) {
          this.response = JSON.parse(res.data);
          this.alert("Success", this.response.message);
          this.closeModal();
        } else {
          this.loading.dismiss();
          this.response = JSON.parse(res.error);
          for (error in this.response.message) {
            massage += this.response.message[error].join("\n") + "\n ";
          }
          this.alert("Error", massage);
        }
      })
      .catch((err) => {
        this.loading.dismiss();
        this.response = JSON.parse(err.error);
        for (error in this.response.message) {
          massage += this.response.message[error].join("\n") + "\n ";
        }
        this.alert("Error", massage);
      });
    this.loading.present();
  }
  
  async closeModal() {
    await this.modalController.dismiss();
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
