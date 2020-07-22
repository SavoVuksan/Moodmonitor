import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsiveService } from '../../services/responsive.service';
import { SharedVarsService } from '../../services/shared-vars.service';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string ;
  password: string;

  errorText: string;

  constructor(private router: Router, public responsive:ResponsiveService, private shared: SharedVarsService,private rest: RestService) { }

  ngOnInit() {
    this.username = "";
    this.password = "";
    this.errorText = "";
  }

  submit(){
    console.log(this.username, this.password);
    this.rest.login({username: this.username, password: this.password}).subscribe(data =>{
      if((<any>data.body).text === 'success'){
        this.shared.username = this.username;
        this.router.navigateByUrl("/dashboard");
        this.shared.loggedIn = true;
      }else{
        this.errorText = (<any>data.body).text;
      }
    });

  }

  toRegister(){
    this.router.navigateByUrl("/register");
  }
}
