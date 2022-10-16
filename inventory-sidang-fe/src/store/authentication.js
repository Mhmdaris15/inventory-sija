import {makeAutoObservable} from "mobx";
import {http} from "../utils/http";

export class Authentication {
  ctx;

  accessToken = '';

  refreshToken = '';

  constructor(ctx) {
    this.ctx = ctx;
    makeAutoObservable(this);
  }
  login(data) {
    return http
        .post("/users/login", data)
        .then((res) => {
          // console.log(res, "ini res");
          localStorage.setItem("id_token", res.body.accessToken);
          localStorage.setItem("role", res.body.role);
          this.setInitialToken(res.body.accessToken );
          this.setToken(res.body.accessToken);
          return res;
        })
        .catch((err) => {
          console.log(err);
          //   console.log(appConfig)
          throw err;
        });
  }

  logout(){
    localStorage.setItem("id_token", "")
    localStorage.setItem("role", "");
  }

  get isLoggedIn() {
    // return !!this.refreshToken;
      return localStorage.getItem("id_token") === "" ? false : true
  }

  setInitialToken(accessToken, refreshToken) {
    this.setToken(accessToken, refreshToken);
  }

  setToken(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

}
