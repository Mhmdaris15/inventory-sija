// @flow

import { action, observable,  } from "mobx";
import { makeAutoObservable } from "mobx";
import { queryStringBuilder } from "../utils/index";
// import {AppState} from "./appstate";
import { http } from "./../utils/http";
import { Store } from "./index";
// interface ResponseGet<T> {
//     data: T | T[];
//     max: number;
//     size: number;
//     total_pages: number;
// }

export class BaseStore {
    url = "";
    mode = "multi";

    // data: T[] | T;

     data;
     selectedId = "";
     selectedData = {};

     isLoading = false;

     currentPage = 1;
     maxPage;
     dataPerPage = 10;
     query = {};
     totalData = 0;

    context;

    constructor(context) {
        this.context = context;
        this.http = context.http;
    
        this.data = this.mode === "multi" ? [] : {};
        this.context = context;
        makeAutoObservable(this);
    }

    
    nextPage(reload = false) {
        this.isLoading = true;
        this.currentPage++;
        if (reload) {
            this.isLoading = false;
            return this.getAll(true);
        }
        this.isLoading = false;
        return Promise.resolve(true);
    }

    
    prevPage(reload = false) {
        this.isLoading = true;
        this.currentPage--;
        if (reload) {
            this.isLoading = false;
            return this.getAll();
        }
        this.isLoading = false;
        return Promise.resolve(true);
    }

    
    async getAll(append = false) {
        this.isLoading = true;

        const q = queryStringBuilder({
            page: this.currentPage,
            limit: this.dataPerPage,
            ...this.query,
        });

        const res = await this.http.get(`${this.url}?${q}`).catch((err) => {
            this.isLoading = false;
            throw err;
        });

        console.log("tableData bro", res);

        // console.log({res}, 'BaseStore -> getAll')

        if (!append) {
            this.maxPage = res.total_pages;
            if (Array.isArray(res)) {
                this.data = res;
            } else {
                this.data = res.body.data || res.body || [];
                this.maxPage = res.total_pages;
                this.totalData = res.max;
            }
        } else {
            if (Array.isArray(res)) {
                // this.data.replace(this.data.concat(res));

                this.data = this.data.concat(res);
            } else {
                // this.data.replace(this.data.concat(res.data));
                this.data = this.data.concat(res.data);
                this.maxPage = res.total_pages;
                this.totalData = res.max;
            }
        }
        this.selectedData = {};
        this.selectedId = "";

        this.isLoading = false;
        // console.log({data: this.data}, 'BaseStore -> getAll')
        return res;
    }

    
    async getDetail(id) {
        this.setSelectedData({});
        this.isLoading = true;
        const res = await this.http.get(`${this.url}/${id}`).catch((err) => {
            this.isLoading = false;
            throw err;
        });

        this.isLoading = false;
        this.setSelectedData(res.results);
        return res;
    }

    
    setSelectedData(data) {
        this.selectedData = data;
        // this.selectedId = data.id;
    }

    
    create(data) {
        // console.log(data, "basestore dataaa")
        this.isLoading = true;
        return this.http
            .post(this.url, data)
            .set("Authorization", `Bearer ${this.token}`)
            .then((res) => {
                this.isLoading = false;

                // getAll issue because not list the type
                // this.getAll();
                // console.log(res, 'basestore res')
                return res;
            })
            .catch((err) => {
                // console.log(err, "errrorrr")
                this.isLoading = false;
                // console.log(err, 'basestore err')
                throw err;
            });
    }

    
    update(id, data) {
        this.isLoading = true;
        return this.http
            .put(this.url + "/" + id, data)
            .then((res) => {
                this.isLoading = false;
                this.getAll();
                return res;
            })
            .catch((err) => {
                this.isLoading = false;
                throw err;
            });
    }

    
    delete(id) {
        console.log("id", id);
        this.isLoading = true;
        return this.http
            .del(this.url + "/" + id)
            .then((res) => {
                console.log("ini respon", res);
                this.isLoading = false;
                return res;
            })
            .catch((err) => {
                this.isLoading = false;
                throw err;
            });
    }

    get isEmpty() {
        return this.data.length === 0;
    }

    get isAtMaximumPage() {
        return this.currentPage >= this.maxPage;
    }

    get paginationConfig() {
        return {
            rowsPerPageOptions: [5, 10, 30, 50],
            rowsPerPage: +this.dataPerPage,
            page: (this.currentPage || 1) - 1,
            count: +this.totalData || 0,
            SelectProps: {
                native: true,
            },
            onChangePage: (event, page) => {
                console.log(event, page);
                this.currentPage = page + 1;
                this.getAll();
            },
            onChangeRowsPerPage: (event, dataPerPage) => {
                // console.log(event.target.value, dataPerPage);

                this.dataPerPage = +event.target.value;
                this.getAll();
            },
        };
    }
}
