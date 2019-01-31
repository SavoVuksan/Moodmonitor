import { Component, OnInit } from '@angular/core';
import {Emotion} from '../../classes/emotion';
import {RestService} from '../../services/rest.service';
import {Entry} from '../../classes/entry';
import {Router} from '@angular/router';
import {ResponsiveService} from '../../services/responsive.service';

@Component({
  selector: 'app-write-mood',
  templateUrl: './write-mood.component.html',
  styleUrls: ['./write-mood.component.css']
})
export class WriteMoodComponent implements OnInit {

  posEmotions : Emotion[];
  negEmotions : Emotion[];

  tags: string;
  moodText: string;
  title: string;

  constructor(private rest:RestService, private router: Router, public responsive:ResponsiveService) {
    this.posEmotions = new Array();
    this.negEmotions = new Array();
    rest.getPositiveEmotions().subscribe((data) =>{
      data[0].positiveEmotions.forEach((element) =>{
        this.posEmotions.push(new Emotion(element,false));
      });
    });
    rest.getNegativeEmotions().subscribe((data) =>{
      data[0].negativeEmotions.forEach((element) =>{
        this.negEmotions.push(new Emotion(element, false));
      });
    });
    this.tags = '';
    this.moodText = '';
    this.title = '';

  }

  ngOnInit() {

  }

  submit(){
    let entry = new Entry(new Date());
    entry.tags = this.tags;
    entry.moodText = this.moodText;
    entry.title = this.title;
    entry.posEmotions = this.posEmotions.filter((element) =>{
      if(element.isActive){
        return element;
      }
    });
    entry.negEmotions = this.negEmotions.filter((element) => {
      if(element.isActive){
        return element;
      }
    });
    this.rest.postEntry(entry).subscribe((entry) => {
      console.log(JSON.stringify(entry));
      this.router.navigateByUrl('/dashboard');
    });
  }

}
