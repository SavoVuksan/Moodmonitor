import {Emotion} from './emotion';

export class Entry {
  public _id: string;
  public createdOn : Date;
  public tags : string[];
  public text : string;
  public title : string;
  public positiveEmotions: Emotion[];
  public negativeEmotions: Emotion[];

  constructor(date){
    this.createdOn = date;
    this.tags = new Array<string>();
    this.text = '';
    this.positiveEmotions = new Array();
    this.negativeEmotions = new Array();
    this.title = '';
  }

}
