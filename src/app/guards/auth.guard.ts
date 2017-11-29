import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

//Servicio
import { SimpleGlobal } from 'ng2-simple-global'


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sg: SimpleGlobal,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.sg["isAuthenticate"]){
      return true
    }
    else{
        this.router.navigate(["login"])
    //   window.location.href = window.location.origin+'/#/login';
      return false
    }
  }
}
