import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "login/:slug",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then((m) => m.RegisterPageModule),
  },
  {
    path: "statusreport",
    loadChildren: () =>
      import("./submission/statusreport/statusreport.module").then(
        (m) => m.StatusreportPageModule
      ),
  },
  {
    path: "forgotpassword",
    loadChildren: () =>
      import("./submission/forgotpassword/forgotpassword.module").then(
        (m) => m.ForgotpasswordPageModule
      ),
  },
  {
    path: "network",
    loadChildren: () =>
      import("./submission/network/network.module").then(
        (m) => m.NetworkPageModule
      ),
  },
  {
    path: "email",
    loadChildren: () =>
      import("./submission/email/email.module").then((m) => m.EmailPageModule),
  },
  {
    path: "apps",
    loadChildren: () =>
      import("./submission/apps/apps.module").then((m) => m.AppsPageModule),
  },
  {
    path: "cloud",
    loadChildren: () =>
      import("./submission/cloud/cloud.module").then((m) => m.CloudPageModule),
  },
  {
    path: "pse",
    loadChildren: () =>
      import("./submission/pse/pse.module").then((m) => m.PsePageModule),
  },
  {
    path: "subdomain",
    loadChildren: () =>
      import("./submission/subdomain/subdomain.module").then(
        (m) => m.SubdomainPageModule
      ),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfilePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
