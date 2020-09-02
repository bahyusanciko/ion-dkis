import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  AlertController,
  LoadingController,
  IonRouterOutlet,
  Platform,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-statusreport",
  templateUrl: "./statusreport.page.html",
  styleUrls: ["./statusreport.page.scss"],
})
export class StatusreportPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController,
    public alertController: AlertController,
    private loadingController: LoadingController,
    public platform: Platform
  ) {}

  ngOnInit() {}

  backHome() {
    this.router.navigateByUrl(`/home`);
  }

  statusReport(form) {}
  
}
