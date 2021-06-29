import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _http: HttpClient) {}

  login(body) {
    return this._http.post(environment.api_url + 'auth/login', body);
  }

  editProfile(userId, body) {
    return this._http.put(environment.api_url + 'user/' + userId, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json;charset=utf-8')
    });
  }

  getUser(id) {
    return this._http.get(environment.api_url + 'user/' + id);
  }

  test() {
    return this._http.get(environment.api_url + 'project');
  }
}
