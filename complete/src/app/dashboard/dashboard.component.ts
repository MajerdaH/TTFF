import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as shape from 'd3-shape';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import {
  single,
  generateData
} from '../shared/chartData';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, Validators, ControlContainer, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public sub: any;
  public data: any;
  public basic: boolean;
  public pname: any;
  public dataprojects: any;
  public upload: boolean;
  public serviceUrl: string;
  public uploadPaths = [];
  public selected: string;
  private ProjectsArray: Array<any> = [];
  public ProjectsUploadArray: Array<any> = [];
  public ProjectName: any;
  public showdivsucc: boolean;
  public showdivfail: boolean;
  //  address :string;
  public Projects = ['WorkspaceUsers', 'WorkspaceShared'];
  filesToUpload: Array<File> = [];
  // relativePath :string;
  constructor(
    private route: ActivatedRoute,
    private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.serviceUrl = '192.168.110.186';
    this.basic = true;
    this.upload = false;
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        console.log(params);
        // Defaults to 0 if no query param provided.
        this.pname = params['project'];
        console.log(this.pname);
      });
    this.GetListProjectUpload('userX');
  }

  GetListProjectUpload(username: string) {
    this.http.get('http://' + this.serviceUrl + ':9935/GetListProjectUpload?project_upload_owner=' + username).subscribe(data => {
      this.dataprojects = data;
      for (const elt of this.dataprojects.resultSet.record) {
        this.ProjectsUploadArray.push(elt);
      }
      console.log(this.ProjectsUploadArray);
    });
    /*  this.http.get('http://' + this.serviceUrl + ':8084/GetProject?Username=' + username).subscribe(data => {
        this.dataprojects = data;
        for (const elt of this.dataprojects.resultSet.record) {
          this.ProjectsArray.push(elt);
        }
        console.log(this.ProjectsArray);
      });*/
  }
  OnUpload(name2: string) {
    //this.router.navigate(['./dashboard'], { queryParams: { project: name2 } });
    this.upload = !this.upload;
    this.showdivfail = false;
    //this.operation = false;
  }
  UploadFolder(f: NgForm) {
    console.log(f.value);
    console.log(f.value.pname);
    console.log(f.value.path);

    var string = f.value.path;
    var nomprojet = string.substring(string.lastIndexOf("/") + 1, string.length);
    console.log(nomprojet);
    this.http.get("http://192.168.110.205:9999/upload?project_name=" + f.value.pname + "&path_from=" + f.value.path)
      .subscribe
      (data => {
        console.log(data);

      });
  }



}
