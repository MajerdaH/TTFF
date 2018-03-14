import { Component, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { FormBuilder, Validators, ControlContainer, FormGroup, FormControl } from '@angular/forms';
import {FocusModule} from 'angular2-focus';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})
// tslint:disable-next-line:one-line
export class TaskboardComponent{
  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;
    // Data Variables
    serviceUrl: string;
    data: any;
    dataclients: any;
    dataprojects: any;
    datatemplates: any;
    // NG IF VARIABLES
    public showdivsucc: boolean;
    public showdivfail: boolean;
    public addnew: boolean;
    public operation: boolean;
    public autofoc: boolean;
    public addnewops: boolean;
    public basic: boolean;
    public modify: boolean;
    public upload: boolean;
    public checkout: boolean;
    public operationfoc: boolean;
    public OperationsNotAdded: boolean;
    public OperationsAdded: boolean;
    // Data Arrays after getting them
    private OperationsArray: Array<string> = [];
    private ProjectsArray: Array<any> = [];
    private ClientsArray: Array<any> = [];
    private TemplatesArray: Array<any> = [];
    // Needed Variables
    private newAttribute: string;
    public jsonOperations: any;
    public projname: string;
    public ProjectName: any;
    public selectedvalue: string;

   constructor(private http: HttpClient, private router: Router) { }

    // Listing Projects and hiding divisions ON INIT
    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit(): void {
      this.serviceUrl = '192.168.110.224';
      this.http.get('http://' + this.serviceUrl + ':8090/GetTemplates?ClientName=' + 'Oreedo').subscribe(data => {
        this.datatemplates = data;
        console.log(this.datatemplates);
        for ( const elt of this.datatemplates.Templates){
          this.TemplatesArray.push(elt);
        }
        console.log(this.TemplatesArray);
      });
      this.showdivsucc = false;
      this.showdivfail = false;
      this.basic = true;
      this.addnew = false;
      this.OperationsNotAdded = false;
      this.upload = false;
      this.checkout = false;
      this.modify = false;
     this.GetProjects('userX');
    }

    // Show Generate New project Div
    onNew(f: NgForm) {
      this.addnew = !this.addnew;
      this.showdivfail = false;
      this.operation = false;
    }

    // Get projects BY USER_CLIENTS
   GetProjects(username: string) {
    this.http.get('http://' + this.serviceUrl + ':8084/GetProject?Username=' + username).subscribe(data => {
      this.dataprojects = data;
      for ( const elt of this.dataprojects.resultSet.record){
        this.ProjectsArray.push(elt);
      }
      console.log(this.ProjectsArray);
    });

   this.http.get('http://' + this.serviceUrl + ':8087/GetClient?Username=' + username).subscribe(data => {
     this.dataclients = data;
     console.log(this.dataclients.root.record.clientName[0]);
     for ( const elt of this.dataclients.root.record.clientName){
      this.ClientsArray.push(elt);
      }
      console.log(this.ClientsArray);
     });

  }

     // Show Create Operations Div
    onOld(pname: string) {
      this.projname = pname;
      console.log(this.projname);
      this.operation = !this.operation;
      console.log(this.operation);
      this.showdivfail = false;
      this.addnew = false;
    }


     // Call Checkout Service
   Checkout(pname, client: string) {
     console.log(pname);
     console.log(client);
     // tslint:disable-next-line:max-line-length
     this.http.get('http://' + this.serviceUrl + ':8085/checkout?ProjectName=' + pname + '&Client=Orange&Username=hejer').subscribe(data => {
     console.log(data);

    });
    this.checkout = true;
   }


    // Get Templates After Choosing A Client
    onSelect(client: string) {
      this.TemplatesArray = [];
      console.log(client);
      this.http.get('http://' + this.serviceUrl + ':8090/GetTemplates?ClientName=' + client).subscribe(data => {
      this.datatemplates = data;
      console.log(this.datatemplates.Templates.template);
      for ( const elt of this.datatemplates.Templates.template){
        this.TemplatesArray.push(elt);
      }
      console.log(this.TemplatesArray);
    });

    }

   // Generating New Project
    onSubmit(f: NgForm) {
      // tslint:disable-next-line:max-line-length
      this.http.get('http://' + this.serviceUrl + ':8089/CreateProject?ProjectName=' + f.value.pname + '&ClientName=' + f.value.cname + '&ProjectType=' + f.value.ptype + '&UserName=Hejer').subscribe(data => {
      console.log(data);
      this.data = data;
    console.log(this.data.GenerateProjectResponse.Status);
    this.ProjectName = f.value.pname;

    if (this.data.GenerateProjectResponse.Status === 'FAILED') {
      this.showdivsucc = false;
      this.showdivfail = true;
    this.addnew = false; }

    // tslint:disable-next-line:one-line
    else {
      this.showdivfail = false;
      this.showdivsucc = true;
      this.addnew = false;

         }});
      }

    // Creating The List Of Operations Submitted
    onSubmitOp() {
  console.log(JSON.stringify(this.OperationsArray)) ;
  // tslint:disable-next-line:max-line-length
  this.jsonOperations = '{"CreateOperations":{"ProjectName":"' + this.projname + '","OperationName":' + JSON.stringify(this.OperationsArray) + '}}';
  console.log(this.jsonOperations);

  // tslint:disable-next-line:max-line-length
   this.http.post('http://' + this.serviceUrl + ':8088/CreateOperation', this.jsonOperations).subscribe(data => {
     console.log(data);
     this.data = data;
     if (this.data.GenerateOperationResponse.Status === 'FAILED') { this.OperationsNotAdded = true;
    this.OperationsAdded = false;
  this.operation = false; }
     // tslint:disable-next-line:one-line
     else {
       this.OperationsAdded = true;
       this.OperationsNotAdded = false;
       this.operation = false;
     }
   });
  }
 // Add Operation to Temporary List
  addFieldValue() {
    console.log(this.OperationsArray);
    console.log(this.newAttribute);
    this.OperationsArray.push(this.newAttribute);
    this.newAttribute = '';
  }
 // Delete Operation From Temporary List
  deleteFieldValue(index) {
    console.log(index);
    this.OperationsArray.splice(index, 1);
  }

  OnModify(name: string) {
  /*  this.ProjectName = name;
    this.modify = true;
    this.basic = false;*/
 this.router.navigate(['./email'], { queryParams: { project: name } });

  }



}
