import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {SimpleGlobal} from 'ng2-simple-global';

// Models
import  {User} from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User()
  constructor(private router: Router,private sg: SimpleGlobal) { 
    this.reset()
  }

  ngOnInit() {
  }
  
  login(){
    if(this.user.username == "Admin" && this.user.password == "admin2017"){
      this.sg["isAuthenticate"] = true
      this.router.navigate(["/create-connection"])
    }
    else{
      this.reset()
    }
  }

  reset(){
    this.user = new User()
  }

}
