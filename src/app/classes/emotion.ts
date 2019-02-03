export class Emotion {
  public id: string;
  public name: string;
  public type: string;
  public isActive: boolean;

  constructor(type: string, name: string,isActive: boolean,id: string){
    this.name = name;
    this.isActive = isActive;
    this.type = type;
    this.id = id;
  }

  static sortEmotions(emotions:Array<Emotion>): Array<Emotion>{
    emotions.sort((a,b) =>{
      return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase());
    });
    return emotions;
  }
}


