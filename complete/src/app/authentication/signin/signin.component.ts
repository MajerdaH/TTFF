import { oauthService } from './../../service/oauth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,
    private oauthService: oauthService) {}

  ngOnInit() {
    this.form = new FormGroup({
      // 'user': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])),
      'username' : new FormControl(null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(20)]),

    });
  }

  onSubmit() { 
    console.log(this.form.get('username').value);
    if (this.form.valid) {
    let nomUser = this.form.get('username').value;
    let  password = this.form.get('password').value;
    this.oauthService.getToken(nomUser,password)
      .then(res => {
        console.log(res);
        if(res["access_token"]){
          this.router.navigate(["/"]);
        }
      })
      .catch(error=>console.error(error));

  }


}
}
