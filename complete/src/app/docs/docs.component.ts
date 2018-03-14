import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent {

  public sub: any;
  public pname: string;

  constructor( private route: ActivatedRoute,
    private router: Router, private http: HttpClient){}


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        console.log(params);
        // Defaults to 0 if no query param provided.
        this.pname = params['project'];
        console.log(this.pname);
      });
  }


}
