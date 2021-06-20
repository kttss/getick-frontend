import { HttpClient } from '@angular/common/http';
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

  test() {
    return this._http.get(environment.api_url + 'project');
  }
}
