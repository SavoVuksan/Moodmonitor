import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestService} from '../../services/rest.service';
import {SharedVarsService} from '../../services/shared-vars.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText: string;
  @Input()
    searching: boolean;
  @Output()
    searchingChange: EventEmitter<boolean> = new EventEmitter();
  regexDate = '[@]\\d{2}[.]\\d{2}.\\d{4}';
  regexEmotion = '[/]\\w\\D\\S+';
  regexTag = '[#]\\w+';
  regexText = '\\s?\\w+';
  //DELETE FOUND SUBSTRINGS FROM STRING FOR BETTER SEARCH

  dates: Date[];
  emotions: string[];
  tags: string[];

  constructor(public rest: RestService, private vars:SharedVarsService) {
    this.dates = new Array();
    this.emotions = new Array();
    this.tags = new Array();
    this.searchText = '';



  }

  ngOnInit() {

  }

  inputSearchText(text:string){
    this.searchText = text;
    if(this.searchText.length < 1){
      this.searching = false;
    }
    this.searchingChange.emit(this.searching);

  }

  isStringEmpty(text: string): boolean{
    return text.length === 0;
  }

  public search(){

    this.rest.getAllEntries().subscribe(value => {
      this.searching = true;
      this.searchingChange.emit(this.searching);
      this.filterDate();
      this.filterEmotion();
      this.filterTag();

      console.log(this.searchText);
      console.log(this.dates);
      console.log(this.emotions);
      console.log(this.tags);
      let output = JSON.parse(JSON.stringify(value)).filter((value) =>{
        let resTags = value.tags.split(' ');
        let resEmotions = value.positiveEmotions;
        let resDate = new Date(value.createdOn);
        let filter = false;


        //TAGS
        resTags = resTags.map((tag) =>{

          return tag.toLowerCase();
        });

        resTags.forEach((tag) =>{
          this.tags.forEach((x) =>{
            if(x === tag.replace('#','')){
              filter = true;
            }
          });


        });

        //EMOTIONS
        value.negativeEmotions.forEach((emo) =>{
          resEmotions.push(emo);
        })

        resEmotions = resEmotions.map((emo) =>{
          emo.name =  emo.name.toLowerCase();
          return emo;
        });

        resEmotions.forEach((emo) =>{
          this.emotions.forEach((x) =>{
            if(x === emo.name){
              filter = true;
            }
          });
        });
        //DATE
        this.dates.forEach((date) =>{
          if(resDate.getFullYear() === date.getFullYear() && resDate.getMonth() === date.getMonth() && resDate.getDate() === date.getDate()){
            filter = true;
          }
        });


        return filter;
      });
      console.log(output);
      output = output.map((entry) =>{
        entry.createdOn = new Date(entry.createdOn);
        return entry;
      });
      this.vars.searchEntries = output;
    });

    this.dates.length = 0;
    this.emotions.length = 0;
    this.tags.length = 0;
  }

  private filterDate(){
    let d = this.searchText.match(/[@]\d{2}[.]\d{2}.\d{4}/g);
    if(d !== null){
      d.forEach((value, index) => {
        value =value.replace('@','');
        let arr = value.split('.');
        let date = new Date();
        date.setFullYear(parseInt(arr[2]),parseInt(arr[1])-1,parseInt(arr[0]));
        this.dates.push(date);

      });
      this.searchText = this.searchText.replace(/[@]\d{2}[.]\d{2}.\d{4}/g, '');
    }


  }
  private filterEmotion(){
    let e = this.searchText.match(/[/]\w\D\S+/g);
    if(e !== null){
      e.forEach((value, index) => {
        value = value.replace('/','');
        value = value.toLowerCase();
        this.emotions.push(value);
      });
      this.searchText = this.searchText.replace(/[/]\w\D\S+/g, '');
    }


  }
  private filterTag(){
    let t = this.searchText.match(/[#]\w+/g);
    if(t !== null){
      t.forEach((value, index) => {
        value = value.replace('#','');
        value = value.toLowerCase();
        console.log(value);
        this.tags.push(value);
      });
      this.searchText = this.searchText.replace(/[#]\w+/g, '');

    }
  }

}
