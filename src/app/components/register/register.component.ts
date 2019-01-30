import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../../services/responsive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = "Username";
  email: string = "Email";
  password: string;
  repeatPw: string;

  constructor(private router: Router, public responsive:ResponsiveService) { }

  ngOnInit() {
  }

  submit(){
    //Wurden ein Username und eine Email eingegeben?
    if(this.username != "Username" && this.email != "Email"){
      //Sind Passwort und das wiederholte Passwort gleich?
      if(this.password == this.repeatPw){
        //Auf Doppelte überprüfen

      }
    }
    this.router.navigateByUrl("/login");
  }

  toLogin(){
    this.router.navigateByUrl("/login");
  }

}
