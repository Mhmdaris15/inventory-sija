// import {observable, computed} from "mobx";
import { UI } from "./ui";
import { User } from "./user";
import { Authentication } from "./authentication";
import { Infrastructure } from "./infrastructure";
import { FacilitiesStore } from "./facilities";
import { BrandStore } from "./merek";
import {PenggunaanStore} from "./penggunaan";
import {DashboardStore} from "./dashboard";

export class Store {
  ui = new UI(this);
  user = new User(this);
  authentication = new Authentication(this);
  dashboard = new DashboardStore(this);
  infrastructure = new Infrastructure(this);
  facilities = new FacilitiesStore(this);
  brand = new BrandStore(this);
  uses = new PenggunaanStore(this);
  constructor() {}
}
