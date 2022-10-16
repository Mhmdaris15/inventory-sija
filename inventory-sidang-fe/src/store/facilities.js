import {makeAutoObservable} from "mobx";
import {http} from "../utils/http"



export class FacilitiesStore {
 data = [];
 URL = "/sarana";
 detailData = []
 ctx;
 constructor(ctx){
     makeAutoObservable(this);
     this.ctx = ctx;
 }

 getAllData() {
  return http
      .get(this.URL)
      .then((res)=>{
          this.data = res.body.allSarana;
          return res
      })
      .catch((err)=>{
          console.log(err)
          throw err
      })
 }

  create(data){
     return http
         .post(this.URL, data)
         .then((res)=>{
             console.log(res)
             window.location.reload()
             this.getAllData();
             return res;
         })
         .catch((err)=>{
             console.log(err)
             throw err;
         })
  }


  UpdateDetail(id, data) {
    return http
         .patch(this.URL + `/${id}`, data )
         .then((res) => {
           this.getAllData();
           return res;
              // console.log(this.dataDetail, "check bro")
         })
         .catch((err) => {
            console.log(err)
           throw err
         })
  }
}
