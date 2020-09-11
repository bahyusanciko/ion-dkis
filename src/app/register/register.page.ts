import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { AlertController, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  loading: any;
  response: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    public alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  async register(form) {
    this.loading = await this.loadingController.create({
      message: "Loading data from api",
    });

    this.authService
      .register(form.value)
      .then((res) => {
        this.loading.dismiss();
        let massage = "";
        let error = "";
        if (res.status == 201) {
          this.response = JSON.parse(res.data);
          if (this.response.status == true) {
            this.alert("Success", this.response.message);
            this.router.navigateByUrl("");
          } else {
            this.alert("Error", this.response.message);
          }
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
        this.response = JSON.parse(err.data);
        this.alert("error", this.response);
        this.router.navigateByUrl("/register");
      });
    this.loading.present();
  }

  backLogin() {
    this.router.navigateByUrl("/login/home");
  }

  async alert(status, ress) {
    const alert = await this.alertController.create({
      header: status,
      // subHeader: "Subtitle",
      message: ress,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
