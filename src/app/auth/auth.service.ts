import { Injectable } from "@angular/core";

import { tap, catchError, retry } from "rxjs/operators";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { Storage } from "@ionic/storage";
import { HTTP } from "@ionic-native/http/ngx";
import {
  InAppBrowser,
} from "@ionic-native/in-app-browser/ngx";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  AUTH_SERVER_ADDRESS: string =
    "http://woit.sabaindomedika.com/lara-dkis/public/api";
  authSubject = new BehaviorSubject(false);
  id: string;
  email: string;
  nama: string;
  nip: string;
  token: any;
  userRes: any;

  constructor(
    private storage: Storage,
    private http: HTTP,
    private theInAppBrowser: InAppBrowser
  ) {}

  async getApiTokenAsync(): Promise<void> {
    return await this.storage.get("token").then((res) => {
      // console.log(res);
      this.token = res;
    });
  }

  async getIdAsync(): Promise<void> {
    return await this.storage.get("account").then((res) => {
      // console.log(res);
      this.nip = res.nip;
    });
  }

  async getMailAsync(): Promise<void> {
    return await this.storage
      .get("account")
      .then((res) => (this.email = res.email));
  }

  async getNameAsync(): Promise<void> {
    return await this.storage
      .get("account")
      .then((res) => (this.nama = res.nama));
  }

  async getNipAsync(): Promise<void> {
    return await this.storage
      .get("account")
      .then((res) => (this.nip = res.nip));
  }

  register(register) {
    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/register`, {
        method: "post",
        data: register,
        timeout: 5000,
      })
      .then(async (res) => {
        this.authSubject.next(true);
        return res;
      })
      .catch((res) => {
        this.authSubject.next(false);
        return res;
      });
  }

  forgotPassword(form) {
    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/forgot`, {
        method: "post",
        data: form,
        timeout: 5000,
      })
      .then(async (res) => {
        this.authSubject.next(true);
        return res;
      })
      .catch((res) => {
        this.authSubject.next(false);
        return res;
      });
  }

  login(user: any) {
    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/login`, {
        method: "post",
        data: user,
        timeout: 5000,
      })
      .then(async (res) => {
        if (res.status == 200) {
          this.userRes = JSON.parse(res.data);
          await this.storage.set("token", this.userRes.token);
          await this.storage.set("account", this.userRes.data);
          this.authSubject.next(true);
          return this.userRes;
        } else if (res.status == 400 || res.status == 500) {
          let error = JSON.parse(res.error);
          return error;
        }
      })
      .catch((res) => {
        let error = JSON.parse(res.error);
        this.authSubject.next(false);
        return error;
      });
  }

  async updateProfile(form) {
    await this.getIdAsync();
    await this.getApiTokenAsync();

    let formData = new FormData();

    formData.set("id", this.nip);
    formData.set("name", form.name);
    formData.set("phone_number", form.phone_number);
    this.http.setDataSerializer("multipart");

    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/users`, {
        method: "post",
        data: formData,
        timeout: 5000,
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      })
      .then(async (res) => {
        // console.log(res);
        this.authSubject.next(true);
        return res;
      })
      .catch((res) => {
        // console.log(res);
        this.authSubject.next(false);
        return res;
      });
  }

  async changePassword(form) {
    await this.getIdAsync();
    await this.getApiTokenAsync();
    this.http.setDataSerializer("json");

    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/users/${this.nip}`, {
        method: "put",
        data: form,
        timeout: 5000,
        headers: {
          Authorization: `bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        return res;
      })
      .catch((res) => {
        return res;
      });
  }

  async apps(form, files) {
    await this.getApiTokenAsync();

    let formData = new FormData();
    formData.set("nip", form.nip);
    formData.set("nama", form.nama);
    formData.set("no_hp", form.no_hp);
    formData.set("deskripsi", form.deskripsi);
    formData.set("document", files);

    this.http.setDataSerializer("multipart");
    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/layanan-aplikasi`, {
        method: "post",
        data: formData,
        timeout: 5000,
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      })
      .then(async (res) => {
        // console.log(res);
        this.authSubject.next(true);
        return res;
      })
      .catch((res) => {
        // console.log(res);
        this.authSubject.next(false);
        return res;
      });
  }

  async getlistapps() {
    await this.getApiTokenAsync();

    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/getlistapps`, {
        method: "get",
        timeout: 5000,
        headers: { Authorization: `bearer ${this.token}` },
      })
      .then(async (res) => {
        this.authSubject.next(true);
        return res;
      })
      .catch((res) => {
        this.authSubject.next(false);
        return res;
      });
  }

  async getlaporanuser() {
    await this.getApiTokenAsync();
    await this.getIdAsync();

    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/status-laporan/${this.nip}`, {
        method: "get",
        timeout: 5000,
        headers: { Authorization: `bearer ${this.token}` },
      })
      .then(async (res) => {
        this.authSubject.next(true);
        return res;
      })
      .catch((res) => {
        this.authSubject.next(false);
        return res;
      });
  }

  async cloud(form) {
    await this.getApiTokenAsync();
    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/layanan-cloud`, {
        method: "post",
        data: form,
        timeout: 5000,
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      })
      .then(async (res) => {
        // console.log(res);
        this.authSubject.next(true);
        return res;
      })
      .catch((res) => {
        // console.log(res);
        this.authSubject.next(false);
        return res;
      });
  }

  async femail(form, files) {
    await this.getApiTokenAsync();
    let formData = new FormData();
    formData.set("nip", form.nip);
    formData.set("nama", form.nama);
    formData.set("no_hp", form.no_hp);
    formData.set("nama_SKPD", form.nama_SKPD);
    formData.set("deskripsi", form.deskripsi);
    formData.set("document", files);

    this.http.setDataSerializer("multipart");
    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/layanan-email`, {
        method: "post",
        data: formData,
        timeout: 5000,
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      })
      .then(async (res) => {
        // console.log(res);
        this.authSubject.next(true);
        return res;
      })
      .catch((res) => {
        // console.log(res);
        this.authSubject.next(false);
        return res;
      });
  }

  async forgotpassword(form) {
    await this.getApiTokenAsync();
    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/lupa-password`, {
        method: "post",
        data: form,
        timeout: 5000,
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      })
      .then(async (res) => {
        // console.log(res);
        this.authSubject.next(true);
        return res;
      })
      .catch((res) => {
        // console.log(res);
        this.authSubject.next(false);
        return res;
      });
  }

  async network(form, files) {
    await this.getApiTokenAsync();
    let formData = new FormData();
    formData.set("nip", form.nip);
    formData.set("nama", form.nama);
    formData.set("no_hp", form.no_hp);
    formData.set("nama_SKPD", form.nama_SKPD);
    formData.set("deskripsi", form.deskripsi);
    formData.set("document", files);

    this.http.setDataSerializer("multipart");
    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/laporan-jaringan`, {
        method: "post",
        data: formData,
        timeout: 5000,
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      })
      .then(async (res) => {
        // console.log(res);
        this.authSubject.next(true);
        return res;
      })
      .catch((res) => {
        // console.log(res);
        this.authSubject.next(false);
        return res;
      });
  }

  async pse(form, files) {
    await this.getApiTokenAsync();
    let formData = new FormData();
    formData.set("nip", form.nip);
    formData.set("nama", form.nama);
    formData.set("no_hp", form.no_hp);
    formData.set("document", files);

    this.http.setDataSerializer("multipart");
    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/layanan-lpse`, {
        method: "post",
        data: formData,
        timeout: 5000,
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      })
      .then(async (res) => {
        // console.log(res);
        this.authSubject.next(true);
        return res;
      })
      .catch((res) => {
        // console.log(res);
        this.authSubject.next(false);
        return res;
      });
  }

  async subdomain(form,surat_pengajuan,surat_tugas,surat_kpe) {
    await this.getApiTokenAsync();
    let formData = new FormData();
    formData.set("nip", form.nip);
    formData.set("nama", form.nama);
    formData.set("no_hp", form.no_hp);
    formData.set("email_domain", form.email_domain);
    formData.set("surat_pengajuan", surat_pengajuan);
    formData.set("surat_tugas", surat_tugas);
    formData.set("surat_kpe", surat_kpe);


    this.http.setDataSerializer("multipart");
    return this.http
      .sendRequest(`${this.AUTH_SERVER_ADDRESS}/layanan-subdomain`, {
        method: "post",
        data: formData,
        timeout: 5000,
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      })
      .then(async (res) => {
        // console.log(res);
        this.authSubject.next(true);
        return res;
      })
      .catch((res) => {
        // console.log(res);
        this.authSubject.next(false);
        return res;
      });
  }

  logout() {
    this.storage.clear();
    this.storage.remove("token");
    this.storage.remove("account");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
