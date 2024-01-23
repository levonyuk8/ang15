import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {AuthService} from "../../../../common/services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    isShowPassword = false;
    isRememberMe = new FormControl(false);

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.initForm();
        this.pathForm();
    }

    private initForm() {
        this.loginForm = new FormGroup({
            login: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.min(6), Validators.required])
        })
    }

    private pathForm() {
        if (!localStorage.getItem('isRememberMe')) {
            this.loginForm.patchValue({
                login: localStorage.getItem('login'),
                password: localStorage.getItem('password'),
            })
        }
    }

    login() {
        if (this.loginForm.invalid) return;
        this.authService.authorization(this.loginForm.value).subscribe(
            () => {
                if (this.isRememberMe.value) {
                    localStorage.setItem('isRememberMe', String(this.isRememberMe.value));
                    localStorage.setItem('login', this.loginForm.get('login')?.value);
                    localStorage.setItem('password', this.loginForm.get('password')?.value);
                }
                this.router.navigate(['../dashboard'])
            }
        );
    }
}
