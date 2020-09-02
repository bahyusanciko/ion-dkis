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
  selector: "app-subdomain",
  templateUrl: "./subdomain.page.html",
  styleUrls: ["./subdomain.page.scss"],
})
export class SubdomainPage implements OnInit {
  uploadForm: any;
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

  subdomain(form){

  }
  
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm = file;
    }
  }
}
