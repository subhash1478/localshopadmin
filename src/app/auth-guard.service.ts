import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor() { }
  canActivate() {
    return this.checkLogin();
  }
  checkLogin(): boolean {
    const helper = new JwtHelperService();
    const myRawToken = sessionStorage.getItem('token');
    if (myRawToken != null) {
      const isExpired = helper.isTokenExpired(myRawToken);
      return !isExpired;
    } else {
      return false;
    }
  }
}
