import { makeAutoObservable } from "mobx";
import { http } from "../utils/http";

export class BrandStore {
    data = [];
    dataDetail = [];
    name ='';
    URL = "/merek";
    id_brand = null;
    id_detail = null;
    ctx;

    constructor (ctx){
        makeAutoObservable(this);
        this.ctx = ctx;
    }

    getAllData() {
        return http
            .get(this.URL)
            .then((res) => {
                this.data = res.body.allMerek;
                return res
            })
            .catch((err) => {
                console.log(err)
                throw err
            })
    }

    create(data){
        return http
            .post(this.URL, data)
            .then((res)=>{
                console.log(res)
                this.getAllData()
                window.location.reload()
                return res;
            })
            .catch((err)=>{
                console.log(err)
                throw err;
            })

   }

   getDetail() {
    return http
        .get(this.URL + `/${this.id_brand}` )
        .then((res) => {
            this.dataDetail = res.body.getOneMerek.Saranas;
            // console.log(this.dataDetail[0], "check bro")
        })
        .catch((err) => {
            console.log(err)
            throw err
        })
}
    getName() {
    return http
        .get(this.URL + `/${this.id_brand}` )
        .then((res) => {
            this.name = res.body.getOneMerek?.nama_merek;
            // console.log(this.dataDetail[0], "check bro")
        })
        .catch((err) => {
            console.log(err)
            throw err
        })
}
}
