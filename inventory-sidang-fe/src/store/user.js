import { makeAutoObservable } from "mobx";
import { http } from "../utils/http";

export class User {
  data = [];
  URL = "/users";
  ctx;

  constructor (ctx){
      makeAutoObservable(this);
    this.ctx = ctx;
  }

  async getData() {
    this.data = (await http.get(this.URL)).body.data;
  }

  getUser(){
    return http
        .get(this.URL)
        // .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NTE5NDc0M30.f_7wKRaPU-M0x8k6NmYB_aXa3WL8oPfMMxOxqwF0liU')
        // .set('Host', 'http://localhost:3000')
        .then((res) => {
          this.data = res.body;
          // console.log(res);
          return res;
        })
        .catch((err) => {
          console.log(err);
          //   console.log(appConfig)
          throw err;
        });
  }

  create(data) {
    // console.log(data, "woyyy");
    return http
      .post(this.URL + "/add-user").send(data)
      .then((res) => {
        console.log(res);
        window.location.reload()
        return res;
      })
      .catch((err) => {
        console.log(err);
        //   console.log(appConfig)
        throw err;
      });
  }

  delete(id){
    return http
    .del(this.URL + `/${id}/delete`)
    .then((res) => {
      window.location.reload()
      return res;
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}
