import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  onDataChanged: Subject<any> = new Subject<any>();
  onChangeProject: Subject<any> = new Subject<any>();
  onUserChange: Subject<any> = new Subject<any>();
  constructor() {}
}
