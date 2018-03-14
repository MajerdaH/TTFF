/**
 * Created by USER on 27/01/2018.
 */
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import {token} from "../models/token";

/**
 * Created by USER on 25/01/2018.
 */
@Injectable()
export class oauthService {
  constructor (private  http :HttpClient){

  }
  private postURLGetToken = 'http://localhost:8080/oauth/token';

  public getToken(username : string , password : string){
    //GrantType password
    let c = new token();

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Authorization', 'Basic ' + btoa('client:secret'));
    return this.http.post(this.postURLGetToken,
      `grant_type=password&username=${username}&password=${password}`,
      { headers: headers })
      .toPromise()
      .then((res: token) => {
        console.log(res);
        c = res;
        localStorage.setItem("access_token", c.access_token);
        return res;
      })
      .catch(error => console.error(error));

  }
}
