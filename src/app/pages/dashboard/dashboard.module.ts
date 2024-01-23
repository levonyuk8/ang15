import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import {HomeDashboardComponent} from './pages/home-dashboard/home-dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {ShowToastDirective} from "../../common/directive/show-toast.directive";
import { UserInfoComponent } from './pages/home-dashboard/user-info/user-info.component';

@NgModule({
    declarations: [
        HomeDashboardComponent,
        UserInfoComponent,

    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ShowToastDirective,
        ReactiveFormsModule
    ]
})
export class DashboardModule {
}
