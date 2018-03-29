import { Component, ChangeDetectionStrategy, Inject, ViewChild, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
// import {
//   startOfDay,
//   endOfDay,
//   subDays,
//   addDays,
//   endOfMonth,
//   isSameDay,
//   isSameMonth,
//   addHours
// } from 'date-fns';

import { Subject } from 'rxjs/Subject';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-fullcalendar',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.scss']
})
export class FullcalendarComponent {
  public serviceUrl : String;
  dataprojects: any;
  dataclients : any;
  dataOperation : any;
  dataCreateProcess : any;
  ShowOperation : boolean;
  private ProjectsArray: Array<any> = [];
  private ClientsArray: Array<any> = [];
  private OperationsArray: Array<any> = [];
 public SelectedProcess: String;
  public CallsAddedSucc: boolean;
  public CallsAddedFail: boolean;
  // private selectedOperation;
  //ProjectsArray = {};
  //dataprojects= {};

  public InvSynch:String="SynchronousInvokeCall";
  public InvAsynch:String="AsynchronousInvokeCall"
  public sub: any;
  public pname: any;
  public ptype :any;
  public pclient : any;
  constructor(  private route: ActivatedRoute,
    private router: Router, private http: HttpClient){

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
  this.serviceUrl = '192.168.110.229';
  this.sub = this.route
  .queryParams
  .subscribe(params => {
    console.log(params);
    // Defaults to 0 if no query param provided.
    this.pname = params['project'];
    this.ptype = params['type'];
    this.pclient = params['client'];
    console.log(this.pname);
    console.log(this.ptype);
    console.log(this.pclient);
  });

  this.ShowOperation = false;
  this.GetProjects('userX');
}


GetProjects(username: string) {
  this.http.get('http://192.168.110.224:8084/GetProject?Username=' + username).subscribe(data => {
    this.dataprojects = data;
    for (const elt of this.dataprojects.resultSet.record) {
      this.ProjectsArray.push(elt);
    }
   // console.log(this.ProjectsArray);
  });
   console.log(this.ProjectsArray);

}

invoquer(pname : String, cname : String, type : String){
  // console.log(pname);
  // console.log(cname);
  // console.log(type);
  this.http.get('http://192.168.110.229:7070/ShowOperation?projectName=' + pname + '&clientName=Oreedo&typeTemplate='+type).subscribe(data => {

    this.dataOperation = data;
    console.log(data);


});


// this.ShowOperation=true;
}

// tslint:disable-next-line:max-line-length
CreateInvocationSynchone(TypeInv: String,pname:String,pclient:String,ptype:String,invName:String,InvClient:String,InvPtype:String,Operation:String){
  this.SelectedProcess = Operation;
  this.CallsAddedSucc = true;
console.log(TypeInv);
console.log(pname);
console.log(pclient);
console.log(ptype);
console.log(invName);
console.log(InvClient);
console.log(InvPtype);
console.log(Operation);


}
// tslint:disable-next-line:max-line-length
CreateInvocationAsynchrone(TypeInv: String,pname:String,pclient:String,ptype:String,invName:String,InvClient:String,InvPtype:String,Operation:String){
  this.SelectedProcess = Operation;
  this.CallsAddedSucc = true;
  console.log(TypeInv);
  console.log(pname);
  console.log(pclient);
  console.log(ptype);
  console.log(invName);
  console.log(InvClient);
  console.log(InvPtype);
  console.log(Operation);
  // tslint:disable-next-line:max-line-length
  this.http.get('http://192.168.110.229:7071/CreateInvocationProcess?TypeInvocation='+TypeInv+'&NomProject='+pname+'&NomClient=Oreedo&TypeProject='+ptype+'&NomProjectInvoquer='+invName+'&NomClientInvoquer=Oreedo&TypeProjectInvoquer='+InvPtype+'&NomOperation='+Operation).subscribe(data => {
    this.dataCreateProcess = data;
    console.log(data);
    if(this.dataCreateProcess.root.Status === "SUCCESS" ){  this.SelectedProcess = Operation;
      this.CallsAddedSucc = true; }
      else {
        this.CallsAddedFail = true;
      }

  });

}
//http://localhost:7071/CreateInvocationProcess?TypeInvocation=AsynchronousInvokeCall&NomProject=Demo&NomClient=Oreedo&TypeProject=BP&NomProjectInvoquer=Tibco_Portability_BP&NomClientInvoquer=Oreedo&TypeProjectInvoquer=BP&NomOperation=AddNumbersToPool
//onSubmit(f: NgForm) {    NomProject,NomClient  ,,TypeProject,NomProjectInvoquer,NomClientInvoquer,TypeProjectInvoquer,NomOperation
  //console.log( f.value.oname);

  // tslint:disable-next-line:max-line-length
//   this.http.get('http://' + this.serviceUrl + ':8089/CreateProject?ProjectName=' + f.value.pname + '&ClientName=' + f.value.cname + '&ProjectType=' + f.value.ptype + '&UserName=Hejer').subscribe(data => {
//   console.log(data);
//   this.data = data;
// console.log(this.data.GenerateProjectResponse.Status);
// this.ProjectName = f.value.pname;
//
// if (this.data.GenerateProjectResponse.Status === 'FAILED') {
//   this.showdivsucc = false;
//   this.showdivfail = true;
// this.addnew = false; }
//
// else {
//   this.showdivfail = false;
//   this.showdivsucc = true;
//   this.addnew = false;
//
//      }});
//  }

}
