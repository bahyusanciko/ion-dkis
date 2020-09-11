import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  AlertController,
  LoadingController,
  IonRouterOutlet,
  Platform,
} from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { ForgotPage } from "./forgot/forgot.page";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loading: any;
  slug: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController,
    public alertController: AlertController,
    private loadingController: LoadingController,
    public platform: Platform,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let slug = this.activatedRoute.snapshot.paramMap.get("slug");
    this.slug = slug;
  }

  backHome() {
    this.router.navigateByUrl(`/home`);
  }

  register() {
    this.router.navigateByUrl(`/register`);
  }

  async login(form) {
    this.loading = await this.loadingController.create({
      message: "Loading data from api",
    });

    this.authService
      .login(form.value)
      .then((res) => {
        // console.log(res);
        this.loading.dismiss();
        if (res.status) {
          this.router.navigateByUrl(`${this.slug}`);
        }
        this.alert(res.status, res.message);
      })
      .catch((err) => {
        this.loading.dismiss();
        this.alert("error", err.message);
        // this.router.navigateByUrl("");
      });
    this.loading.present();
  }

  async alert(status, message) {
    const alert = await this.alertController.create({
      header: status,
      // subHeader: "Subtitle",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async forgotPassword() {
    const modal = await this.modalController.create({
      component: ForgotPage,
    });
    modal.onDidDismiss().then((modalData) => {
      // Run check updates when modal returns
      this.ngOnInit();
    });

    return await modal.present();
  }
}
