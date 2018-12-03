import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import { AppService } from "./service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{

    canActivate(router: ActivatedRouteSnapshot,state: RouterStateSnapshot){
        let userId = +localStorage.getItem('userId'); 
                      
                  if(userId){
                      return true;
                  }else{
                      this.router.navigateByUrl('');
                      return false;
                  }
    }

    constructor(private service:AppService,private router:Router){}            
}