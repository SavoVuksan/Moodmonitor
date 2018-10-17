import { Component } from '@angular/core';
import {ResponsiveService} from './services/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public responsive:ResponsiveService){

  }
}
