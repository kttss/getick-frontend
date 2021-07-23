import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private _http: HttpClient) {}

  upload(file) {
    const fileData = new FormData();
    fileData.append('file', file);
    return this._http.post(environment.api_url + 'upload/upload', fileData);
  }

  get(filename) {
    return this._http.get(environment.api_url + 'upload/read/' + filename);
  }

  getUrl(filename) {
    return environment.api_url + 'upload/read/' + filename;
  }
}
