import {EventEmitter, Injectable} from '@angular/core';
import {Entry} from '../classes/entry';
import {Emotion} from '../classes/emotion';
import {RestService} from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class SharedVarsService {

  public selectedDay: Date;
  public selectedDayEntries: Entry[];
  public selectedEntry: Entry;

  public loggedIn: boolean;
  public searchEntries: Array<Entry>;

  public avaiablePositiveEmotions: Array<Emotion>;
  public avaiableNegativeEmotions: Array<Emotion>;
  public initializedEmotions: EventEmitter<boolean> ;

  public username: string;

  constructor(private rest: RestService) {
    this.selectedDay = new Date();
    this.selectedDayEntries = new Array();
    this.selectedEntry = new Entry(new Date());

    this.loggedIn = false;
    this.searchEntries = new Array<Entry>();

    this.username = '';

    this.initAvaiableEmotions();
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

  /**
   * Sets the selected entry property and transforms some of its properties
   * @param entry
   */
  setSelectedEntry(entry:Entry){
    this.selectedDay = new Date(entry.createdOn);
    this.selectedEntry = entry;

  }

  /**
   * Fetches the avaible emotions from server and emits an event when finished because async
   */
  initAvaiableEmotions(){
    this.avaiablePositiveEmotions = new Array<Emotion>();
    this.avaiableNegativeEmotions = new Array<Emotion>();
    this.initializedEmotions = new EventEmitter<boolean>();

    this.rest.getPositiveEmotions().subscribe((data) =>{
      (<Array<any>>data).forEach((element) =>{
        this.avaiablePositiveEmotions.push(new Emotion(element.type, element.name,false, element._id));
      });
      this.avaiablePositiveEmotions = Emotion.sortEmotions(this.avaiablePositiveEmotions);
    });
    this.rest.getNegativeEmotions().subscribe((data) =>{
      (<Array<any>>data).forEach((element) =>{
        this.avaiableNegativeEmotions.push(new Emotion(element.type, element.name, false, element._id));

      });
      this.avaiableNegativeEmotions = Emotion.sortEmotions(this.avaiableNegativeEmotions);
      this.initializedEmotions.emit(true);
    });
  }
}
