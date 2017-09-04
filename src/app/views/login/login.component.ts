import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: object
  constructor(private router: Router) { 
    this.reset()
  }

  ngOnInit() {
  }
  
  login(){
    if(this.user["username"] == "Admin" && this.user["password"] == "admin2017"){
      this.router.navigate(["/create-connection"])
    }
    else{
      this.reset()
    }
  }

  reset(){
    this.user = {}
  }

}
