import {Emotion} from './emotion';

export class Entry {
  public id: string;
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

  static dbEmotionListtoClientEmotionList(emotions: Array<any>): Array<Emotion>{
    let el = new Array<Emotion>();
    emotions.forEach(e =>{
      el.push(new Emotion(e.type,e.name,false,e._id));
    });
    return el;
  }

}
