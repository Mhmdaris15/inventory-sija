import { makeAutoObservable, observable } from "mobx";
import { http } from "../utils/http";

export class Infrastructure {
  data = [];
  dataDetail = [];
  URL = "/prasarana";
  id_infra = null;
  ctx;

  constructor (ctx){
    makeAutoObservable(this);
    this.ctx = ctx;
  }
  async getData() {
    this.data = (await http.get(this.URL)).body.data;
  }


  getPrasarana() {
    return http
      .get(this.URL)
      .then((res) => {
          this.data = res.body.allPrasarana;
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
      .post(this.URL, data)
      .then((res) => {
        console.log(res);
        window.location.reload()
        this.getPrasarana()
        return res;
      })
      .catch((err) => {
        console.log(err);
        //   console.log(appConfig)
        throw err;
      });
  }
  getDetail(id) {
    return http
        .get(this.URL + `/${this.id_infra}` )
        .then((res) => {
            this.dataDetail = res.body.detailPrasarana.Saranas;
            // console.log(this.dataDetail, "check bro")
        })
        .catch((err) => {
            console.log(err)
            throw err
        })
  }

  UpdateDetail(id, data) {
        return http
            .patch(this.URL + `/${id}`, data )
            .then((res) => {
                this.getPrasarana();
                return res;
                // console.log(this.dataDetail, "check bro")
            })
            .catch((err) => {
                console.log(err)
                throw err
            })
  }
}
