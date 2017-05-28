import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";

@Injectable()
export class AuthGuardService implements CanActivate{
  user:{};

    constructor(public _ls:LoginService, private router:Router){
      this.user=JSON.parse(localStorage.getItem('user'));
    }

    canActivate( next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot){
      console.log(`next: ${next}`);
      console.log(`state: ${state}`);
      if(this.user){
        console.log("paso el guard");
       return true;
      }else{
        console.log("bloqueado por el guard")
        this.router.navigate(['/home']);
        return false;
      }
        
    }
}