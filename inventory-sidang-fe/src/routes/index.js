import { AnimatedSwitch } from "react-router-transition";
import {Redirect, Route} from "react-router-dom";
import {Login} from "../pages/Login/Login";
import {PublicRoute} from "../component/PublicRoute";
import {PrivateRoute} from "../component/PrivateRoute";
import {App} from "../pages/App/App";

export const LINKS ={
    LOGIN: "/login",
    DASHBOARD: "/app/home",
    INFRASTRUCTURE:"/app/prasarana",
    FACILITIES:'/app/sarana',
    ALOCATION:"/app/penggunaan",
    USER:"/app/user",

    DETAIL_INFRA:"/app/prasarana/:id",
    DETAIL_TOOLS:"/app/sarana/:id",

    EDIT_INFRA: '/app/prasarana/:id/edit',
    EDIT_TOOLS: '/app/sarana/:id/edit',


    FORM_INFRA:"/app/prasrana/add",
    FORM_TOOLS:"/app/sarana/add",
    FORM_ALOCATION:"/app/penggunaan/add"
}

export const MainRoutes = (props) => {
    return (
        <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
        >
            <Route path="/" exact>
                <Redirect to={"/login"} />
            </Route>
            <PublicRoute restricted={false} component={Login} path="/login" exact />
            <PrivateRoute component={App} path="/app" />
        </AnimatedSwitch>
    );
};
