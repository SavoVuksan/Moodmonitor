import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Entry} from '../classes/entry';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  private ip = 'localhost';
  private port = 3000;


  constructor(private http: HttpClient) {
  }

  public getPositiveEmotions(){
    return this.http.get('http://localhost:3000/positiveEmotions');
  }
  public getNegativeEmotions(){
    return this.http.get('http://localhost:3000/negativeEmotions');
  }
  public postEntry(entry: Entry){
    return this.http.post('http://localhost:3000/saveEntry', entry );
  }

}
