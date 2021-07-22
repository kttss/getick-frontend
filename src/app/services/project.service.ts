import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private _http: HttpClient) {}

  create(body) {
    return this._http.post(environment.api_url + 'project', body);
  }

  get() {
    return this._http.get(environment.api_url + 'project');
  }

  update(id, project) {
    return this._http.put(environment.api_url + 'project/' + id, project);
  }

  getBoard(id) {
    return this._http.get(environment.api_url + 'project/getBoard/' + id);
  }

  updateBoard(id, board) {
    return this._http.post(environment.api_url + 'project/updateboard/' + id, { board });
  }
}
