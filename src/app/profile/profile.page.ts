import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  profile: any;
  term: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get("account").then((val) => {
      this.profile = val;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login/home");
  }

  backHome() {
    this.router.navigateByUrl(`/home`);
  }

  viewUpdate() {
    this.router.navigateByUrl(`/profile/update`);
  }
}
