import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";

import {ToastTypes} from "../../../../common/components/toaster";
import {AuthService} from "../../../../common/services/auth.service";

@Component({
    selector: 'app-home-dashboard',
    templateUrl: './home-dashboard.component.html',
    styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent {
    ToastTypes = ToastTypes
    message = new FormControl<string>('');

    constructor(public authService: AuthService) {
    }
}
