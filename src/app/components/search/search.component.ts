import { Component, OnInit } from '@angular/core';
import {RestServiceService} from '../../services/rest-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText: string;

  regexDate = '[@]\\d{2}[.]\\d{2}.\\d{4}';
  regexEmotion = '[/]\\w\\D\\S+';
  regexTag = '[#]\\w+';
  regexText = '\\s?\\w+';
  //DELETE FOUND SUBSTRINGS FROM STRING FOR BETTER SEARCH

  dates: Date[];
  emotions: string[];
  tags: string[];

  constructor(public rest: RestServiceService) {
    this.dates = new Array();
    this.emotions = new Array();
    this.tags = new Array();
    this.searchText = '';



  }

  ngOnInit() {

  }

  isStringEmpty(text: string): boolean{
    return text.length === 0;
  }

  public search(){

    this.rest.searchEntries().subscribe(value => {
      this.filterDate();
      this.filterEmotion();
      this.filterTag();


      console.log(this.searchText);
      console.log(this.dates);
      console.log(this.emotions);
      console.log(this.tags);
      let output = JSON.parse(JSON.stringify(value)).filter((value) =>{
        let resTags = value.tags.split(' ');
        let resEmotions = value.posEmotions;
        let resDate = new Date(value.date);
        let filter = false;


        //TAGS
        resTags = resTags.map((tag) =>{

          return tag.toLowerCase();
        });

        resTags.forEach((tag) =>{
          this.tags.forEach((x) =>{
            if(x === tag){
              filter = true;
            }
          });


        });

        //EMOTIONS
        value.negEmotions.forEach((emo) =>{
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
        let date = new Date(value);
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
