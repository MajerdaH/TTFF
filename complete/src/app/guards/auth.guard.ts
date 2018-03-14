/**
 * Created by USER on 06/02/2018.
 */

import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate() {
    if(localStorage.getItem("access_token") != null){
      return true;
    }
    return false;
  }
}
