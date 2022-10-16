import {makeAutoObservable} from "mobx";
import {http} from "../utils/http";

export class PenggunaanStore {
    data = [];
    URL = "/penggunaan";
    id_pinjam = null;
    ctx;

    constructor (ctx){
        makeAutoObservable(this);
        this.ctx = ctx;
    }

    getAllData() {
        return http
            .get(this.URL)
            .then((res) => {
                this.data = res.body.allPenggunaan;
                console.log("this is res:", res.body.allPenggunaan)
                return res
            })
            .catch((err) => {
                console.log(err)
                throw err
            })
    }

    create(data){
        return http
            .post(this.URL + "/create", data)
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

    UpdateDetail(id, data) {
        return http
            .patch(this.URL + `/update/${id}`, data)
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

    // update(data) {
    //     return http
    //         .put(this.URL + `/update/${this.id_pinjam}`, data )
    //         .then((res) => {
    //             console.log(res);
    //             return res;
    //             // console.log(this.dataDetail[0], "check bro")
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             throw err
    //         })
    // }
}
