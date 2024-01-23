import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {HomeDashboardComponent} from "./pages/home-dashboard/home-dashboard.component";

const routes: Routes = [
    {path: '', component: HomeDashboardComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}