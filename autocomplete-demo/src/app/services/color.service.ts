import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ColorService {

  constructor(private http: HttpClient) { }

  //  Get JSON Data from file - states.json under src/assets/
  public getColors(): Observable<any> {
    return this.http.get('assets/colors.json');
  }
}
