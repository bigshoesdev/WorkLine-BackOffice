import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate() {
        const isLogin = this.userService.getIsLogin();
        if (isLogin) {
            this.router.navigate(['/pages']);
        } else {
            return isLogin;
        }
    }
}
