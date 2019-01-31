import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Entry} from '../classes/entry';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private ip = 'localhost';
  private port = 3000;

  constructor(private http: HttpClient) {
  }

  public getPositiveEmotions(){
    return this.http.get(`http://${this.ip}:3000/getPositiveEmotions`);
  }
  public getNegativeEmotions(){
    return this.http.get(`http://${this.ip}:3000/getNegativeEmotions`);
  }
  public saveEntry(entry: Entry){
    return this.http.post(`http://${this.ip}:3000/saveEntry`, entry ,{withCredentials: true});
  }
  public getGoodDayCount(){
    return this.http.get(`http://${this.ip}:3000/goodDayCount`, {withCredentials: true});
  }
  public getBadDayCount(){
    return this.http.get(`http://${this.ip}:3000/badDayCount`, {withCredentials: true});
  }
  public getLastCreatedEntry(){
    return this.http.get(`http://${this.ip}:3000/getLastEntry`,{withCredentials: true});
  }
  public getRangeEntries(from: Date, to: Date){
    return this.http.get(`http://${this.ip}:3000/getRangeEntries?from=${from}&to=${to}`);
  }
  public searchEntries(){
    return this.http.get(`http://${this.ip}:3000/searchEntries`);
  }




  public login(data){
    return this.http.post(`http://${this.ip}:3000/login`,data,{observe: 'response', withCredentials: true});
  }
  public register(data){
    return this.http.post(`http://${this.ip}:3000/register`,data);
  }

}
