import {action, makeAutoObservable, observable} from "mobx";

export class UI {
    mediaQuery = {
        isMobile: false,
        isDesktop: true
    };

    testValue = "Test Mobx";

    constructor(ctx) {
        this.ctx = ctx;
        makeAutoObservable(this);
    }

    setTestValue() {
        this.testValue = "niceesss";
    }

    setMediaQuery(data) {
        if (this.mediaQuery.isDesktop !== data.isDesktop || this.mediaQuery.isMobile !== data.isMobile) {
            this.mediaQuery = data;
        }
    };
}
