import {makeAutoObservable} from "mobx";
import {http} from "../utils/http"



export class DashboardStore {
    data = [];
    URL = "/dashboard";
    ctx;

    constructor(ctx) {
        makeAutoObservable(this);
        this.ctx = ctx;
    }

    getAllData() {
        return http
            .get(this.URL)
            .then((res) => {
                this.data = res.body;
                return res
            })
            .catch((err) => {
                console.log(err)
                throw err
            })
    }
};
