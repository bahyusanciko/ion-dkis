import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  AlertController,
  LoadingController,
 } from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-statusreport",
  templateUrl: "./statusreport.page.html",
  styleUrls: ["./statusreport.page.scss"],
})
export class StatusreportPage implements OnInit {
  laporanuser: any;
  term: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController,
    public alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.getlaporanuser();
  }

  backHome() {
    this.router.navigateByUrl(`/home`);
  }

  statusReport(form) {}

  async getlaporanuser() {
    this.authService
      .getlaporanuser()
      .then((res) => {
        this.laporanuser = JSON.parse(res.data);
        console.log(this.laporanuser);
        return this.laporanuser;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
