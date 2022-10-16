import {AnimatedSwitch} from "react-router-transition";
import {Redirect, Route, Switch} from "react-router-dom";
import {Home} from "../pages/Home/Home";
import {Infrastructure} from "../pages/Infrastructure/Infrastructure";
import {Facilities} from "../pages/Facilities/Facilities";
import {FormInfrastructure} from "../pages/Infrastructure/formInfra";
import {Alocation} from "../pages/Alocation/Alocation";
import {DetailInfrastructure} from "../pages/Infrastructure/detailInfrastructure";
import {DetailFacilities} from "../pages/Facilities/detailFacilities";
import {LINKS} from "./index";
import {UserManagement} from "../pages/User/UserManagement";
import { FormFacilities } from "../pages/Facilities/formFacilities";

export const AppRoute = () => {
    return <AnimatedSwitch>
        <Route path={"/app/home"}>
            <Home/>
        </Route>
        <Route path={LINKS.ALOCATION} exact>
            <Alocation/>
        </Route>
        <Route path={LINKS.INFRASTRUCTURE} exact>
            <Infrastructure/>
        </Route>
        <Route path={LINKS.FACILITIES} exact>
            <Facilities/>
        </Route>
        <Route path={LINKS.FORM_INFRA} exact>
            <FormInfrastructure/>
        </Route>
        <Route path={LINKS.FORM_TOOLS} exact>
           <FormFacilities/>
        </Route>
        <Route path={LINKS.DETAIL_INFRA}>
            <DetailInfrastructure/>
        </Route>
        <Route path={LINKS.DETAIL_TOOLS}>
            <DetailFacilities/>
        </Route>
        <Route path={LINKS.USER} exact>
            <UserManagement/>
        </Route>
        <Route path="/app" exact>
            <Redirect to={'/app/home'} />
        </Route>
    </AnimatedSwitch>
}
