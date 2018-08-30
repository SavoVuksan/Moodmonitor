import { Injectable } from '@angular/core';
import {Entry} from '../classes/entry';

@Injectable({
  providedIn: 'root'
})
export class SharedVarsService {

  public selectedDay: Date;
  public selectedDayEntries: Entry[];
  public selectedEntry: Entry;

  constructor() {
    this.selectedDay = new Date();
    this.selectedDayEntries = new Array();
    this.selectedEntry = new Entry(new Date());
  }

  dayType(entry: Entry){
    if(entry.posEmotions.length > 0){
      if(entry.negEmotions.length > 0){
        return 'gray';
      }else{
        return 'blue';
      }
    }else{
      return 'red';
    }
  }
}
