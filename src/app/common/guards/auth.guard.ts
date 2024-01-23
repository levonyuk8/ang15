import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, createUrlTreeFromSnapshot, UrlTree} from '@angular/router';

import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private userService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot): boolean | UrlTree {
    return this.userService.isAdmin() ? true : createUrlTreeFromSnapshot(route, ['/', 'login']);
  }
  
}
