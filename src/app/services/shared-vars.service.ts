import { Injectable } from '@angular/core';
import {Entry} from '../classes/entry';

@Injectable({
  providedIn: 'root'
})
export class SharedVarsService {

  public selectedDay: Date;
  public selectedDayEntries: Entry[];
  public selectedEntry: Entry;

  public loggedIn: boolean;
  public searchEntries: Array<Entry>;

  constructor() {
    this.selectedDay = new Date();
    this.selectedDayEntries = new Array();
    this.selectedEntry = new Entry(new Date());

    this.loggedIn = false;
    this.searchEntries = new Array<Entry>();
    
  }

  dayType(entry: Entry){
    if(entry.positiveEmotions.length > 0){
      if(entry.negativeEmotions.length > 0){
        return 'gray';
      }else{
        return 'blue';
      }
    }else{
      return 'red';
    }
  }
}
