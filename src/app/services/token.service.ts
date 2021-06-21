import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() {}

  setToken(token: string) {
    const user = this.decodeToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token ? JSON.stringify(token) : null;
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

  isAuthenticate() {
    const token = this.getToken();
    return token ? true : false;
  }

  getUser() {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }
}
