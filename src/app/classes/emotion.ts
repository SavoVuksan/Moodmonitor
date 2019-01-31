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
}


