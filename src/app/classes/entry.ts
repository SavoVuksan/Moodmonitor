import {Emotion} from './emotion';

export class Entry {
  public date : Date;
  public tags : string;
  public moodText : string;
  public posEmotions: Emotion[];
  public negEmotions: Emotion[];

  constructor(date){
    this.date = date;
    this.tags = '';
    this.moodText = '';
    this.posEmotions = new Array();
    this.negEmotions = new Array();
  }

}
