import { Component } from '@angular/core';
import {ResponsiveService} from './services/responsive.service';
import { SharedVarsService } from './services/shared-vars.service';
import {RestService} from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';

  constructor(public responsive:ResponsiveService, public rest: RestService, public shared: SharedVarsService){
    //TODO: Change this to real login when avaiable
    this.rest.login({
      "username":"savo",
      "password":"1234"
    }).subscribe((res) =>{
      console.log(res);


    });


  }
}
