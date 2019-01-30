import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsiveService } from '../../services/responsive.service';
import { SharedVarsService } from '../../services/shared-vars.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "Username";
  password: string;

  constructor(private router: Router, public responsive:ResponsiveService, private shared: SharedVarsService) { }

  ngOnInit() {
  }

  submit(){
    //Änderungen im Username
    if(this.username != "Username"){
      //User und Pw kontrollieren

    }
    this.router.navigateByUrl("/dashboard");
    this.shared.loggedIn = true;
  }

  toRegister(){
    this.router.navigateByUrl("/register");
  }
}
