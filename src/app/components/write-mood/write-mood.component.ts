import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Emotion} from '../../classes/emotion';
import {RestService} from '../../services/rest.service';
import {Entry} from '../../classes/entry';
import {Router} from '@angular/router';
import {ResponsiveService} from '../../services/responsive.service';
import {SharedVarsService} from '../../services/shared-vars.service';

@Component({
  selector: 'app-write-mood',
  templateUrl: './write-mood.component.html',
  styleUrls: ['./write-mood.component.css']
})
export class WriteMoodComponent implements OnInit {

  posEmotions: Array<Emotion>;
  negEmotions: Array<Emotion>;

  tags: string;
  moodText: string;
  title: string;

  constructor(private rest:RestService, private router: Router, public responsive:ResponsiveService,private shared:SharedVarsService) {
    this.posEmotions = new Array<Emotion>();
    this.negEmotions = new Array<Emotion>();



    this.tags = '';
    this.moodText = '';
    this.title = '';

  }

  ngOnInit() {

      this.shared.initializedEmotions.subscribe(v => {

        this.posEmotions = this.shared.avaiablePositiveEmotions.slice(0, this.shared.avaiablePositiveEmotions.length);
        this.negEmotions = this.shared.avaiableNegativeEmotions.slice(0, this.shared.avaiableNegativeEmotions.length);
      });

      if(this.shared.avaiablePositiveEmotions.length > 0) {
        this.posEmotions = this.shared.avaiablePositiveEmotions.slice(0, this.shared.avaiablePositiveEmotions.length);
        this.negEmotions = this.shared.avaiableNegativeEmotions.slice(0, this.shared.avaiableNegativeEmotions.length);
      }
    console.log('init');
  }


  submit(){
    let entry = new Entry(new Date());
    entry.tags = this.tags.split('#');
    entry.text = this.moodText;
    entry.title = this.title;

    entry.positiveEmotions = this.posEmotions.filter((element) =>{
      if(element.isActive){
        return element;
      }
    });
    entry.negativeEmotions = this.negEmotions.filter((element) => {
      if(element.isActive){
        return element;
      }
    });
    this.rest.saveEntry(entry).subscribe((entry) => {
      console.log(JSON.stringify(entry));
      this.posEmotions.map(e =>{
        e.isActive = false;
        return e;
      });
      this.negEmotions.map(e =>{
        e.isActive = false;
        return e;
      })
      this.router.navigateByUrl('/dashboard');
    });
  }

}
