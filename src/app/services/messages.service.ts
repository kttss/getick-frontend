import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private _http: HttpClient) {}

  getAllMessages() {
    return this._http.get(environment.api_url + 'chat/getMessages');
  }

  sendMessage(payload) {
    return this._http.post(environment.api_url + 'chat/send', payload);
  }

  readMessage(id) {
    return this._http.get(environment.api_url + 'chat/readMesages?id=' + id);
  }
}
