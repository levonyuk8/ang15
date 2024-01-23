import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

import {CookieService} from "./cookie.service";
import {IUserDTO, IUserInfo, USER_ROLES} from "../models/auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private static readonly TOKEN_KEY = 'token';
    private static readonly REFRESH_TOKEN_KEY = 'refreshToken';
    private static readonly BASE_URL = 'http://51.158.107.27:82/api';

    private userInfo!: IUserInfo;

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    get User() {
        return this.userInfo;
    }

    private set User(userInfo) {
        this.userInfo = userInfo;
    }

    isAdmin() {
        return this.userInfo?.userRole === USER_ROLES.admin;
    }

    get token(): string {
        return this.cookieService.getCookie(AuthService.TOKEN_KEY);
    }

    private set token(value: string) {
        this.cookieService.setCookie(AuthService.TOKEN_KEY, value)
    }

    get refreshToken(): string {
        return this.cookieService.getCookie(AuthService.REFRESH_TOKEN_KEY);
    }

    private set refreshToken(value: string) {
        this.cookieService.setCookie(AuthService.REFRESH_TOKEN_KEY, value)
    }

    authorization(qwe: { login: string, password: string }) {
        return this.http.post<IUserDTO>(`${AuthService.BASE_URL}/login`, qwe).pipe(
            tap((data) => {
                this.token = data.tokens.token;
                this.refreshToken = data.tokens.refreshToken;
                this.User = data.userInfo;
            })
        );
    }
}
