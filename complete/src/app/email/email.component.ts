import {
  Component,
  OnInit,
  AfterContentInit
} from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Message } from './message';
import { MailService } from './email.service';
import * as Quill from 'quill';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import {OperationCall} from '../operation-call';



@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  providers: [MailService]
})

export class EmailComponent implements OnInit {

  public sub: any;
  public pname: any;
  data: any;
  public OperationsNotAdded: boolean;
  public OperationsAdded: boolean;
  private OperationsArray: Array<string> = [];
  private newAttribute: string;
  public jsonOperations: any;
  public jsonSelectedOperations: any;
  public operation: boolean;
  public uploadwsdl: boolean;
  public displayOperations;
  public projname: string;
  public modify: boolean;
  public showActions: boolean;
  public serviceUrl: string;
  public wsdlfile: any;
  public jsonWsdl: any;
  public dataOps: any;
  public addLog: boolean;
  public successupload: boolean;
  public displayOperationsList: boolean;
  public SelectedOperations: Array<string> = [];
  public FinalOperations: Array<OperationCall> = [];
  WsdLOpsArray: Array<string> = [];
  elm: OperationCall = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router, private http: HttpClient) {

    }


    // tslint:disable-next-line:no-unused-expression
    ngOnInit(): void {
     // throw new Error('Method not implemented.');
      this.serviceUrl = '192.168.110.224';
      this.uploadwsdl = false;
      this.displayOperations = false;
      this.modify = true;
      this.sub = this.route
        .queryParams
        .subscribe(params => {
          console.log(params);
          // Defaults to 0 if no query param provided.
          this.pname = params['project'];
          console.log(this.pname);
        });

        // tslint:disable-next-line:prefer-const
    }

     // Show Create Operations Div
     onOld(pname: string) {
      this.projname = pname;
      console.log(this.projname);
      this.operation = !this.operation;
      console.log(this.operation);
     }

    onSubmitOp() {
      console.log(JSON.stringify(this.OperationsArray)) ;
      // tslint:disable-next-line:max-line-length
      this.jsonOperations = '{"CreateOperations":{"ProjectName":"' + this.pname + '","OperationName":' + JSON.stringify(this.OperationsArray) + '}}';
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

      // tslint:disable-next-line:one-line
      AddRessources(){
        this.router.navigate(['./docs'], { queryParams: { project: this.pname } });
      }
      AddJMS() {
        this.router.navigate(['./calendar'], { queryParams: { project: this.pname } });
      }

      UploadWSDL() {
        this.uploadwsdl = true;
      }


    fileChange(event) {
      let input = event.target;
      for (var index = 0; index < input.files.length; index++) {
          let reader = new FileReader();
          reader.onload = () => {
              // this 'text' is the content of the file
              let text = reader.result;
             // console.log(text);
              this.wsdlfile = text;
          };
          reader.readAsText(input.files[index]);
         // console.log(event.target.);
      }
  }
    onSubmitUpload(f: NgForm) {
     // console.log(f.value);
      //console.log(this.wsdlfile);
      this.jsonWsdl = this.wsdlfile;
      console.log(this.jsonWsdl);
      // tslint:disable-next-line:max-line-length
      this.http.post('http://' +  this.serviceUrl + ':8091/CreateWsdl?projectName=' + this.pname + '&WsdlName=WSDL', this.jsonWsdl).subscribe(data => {
        console.log(data);
        this.dataOps = data ;
        console.log(this.dataOps.Operations.name);
        for (let i = 0; i < this.dataOps.Operations.name.length; i++) {
          this.WsdLOpsArray.push(this.dataOps.Operations.name[i]);
        }
        console.log(this.WsdLOpsArray[0]);

      });
      this.successupload = true;
      this.uploadwsdl = false;
      this.showActions = true;
     // this.displayOperations = false;
     this.modify = false;
      this.displayOperationsList = true;
    }

    ShowActions() {
      this.modify = !this.modify;
    }

    OnChecked(Opname: string, check: boolean) {
      if (check === true) {
        this.SelectedOperations.push(Opname);
      }
      // tslint:disable-next-line:one-line
      else {
        const index: number = this.SelectedOperations.indexOf(Opname);
        if (index !== -1) {
          this.SelectedOperations.splice(index, 1);
      }
      }
    }

    SelectOperations() {
      // tslint:disable-next-line:max-line-length
    /*  this.jsonSelectedOperations = '{"JsonSelectedOperations":{"ProjectName":"' + this.pname + '","SelectedOperations":' + JSON.stringify(this.SelectedOperations) + '}}';
      console.log(this.jsonSelectedOperations);

      // tslint:disable-next-line:max-line-length
      this.http.post('http://' +  this.serviceUrl + ':8092/CreateCalls', this.jsonSelectedOperations).subscribe(data => {
        console.log(data);
      });*/
      this.addLog = true;
      this.displayOperationsList = false;
      for (const i of this.SelectedOperations) {
        // tslint:disable-next-line:prefer-const
        console.log(i);
     const element: OperationCall = {};
     element.opname = i;
     element.exception = false;
     element.info = false;


     this.FinalOperations.push(element);
      }
      console.log(JSON.stringify(this.FinalOperations));

    }

    CheckAll(f: NgForm) {
      console.log(f.value);
      console.log(f.value.opnames);

    }

    chooseLogInfo(opselected: string, check: boolean) {
    if (check) {
      this.FinalOperations[this.SelectedOperations.indexOf(opselected)].info = true ;
      console.log(JSON.stringify(this.FinalOperations));
    }
    // tslint:disable-next-line:one-line
    else {
      this.FinalOperations[this.SelectedOperations.indexOf(opselected)].info = false ;
      console.log(JSON.stringify(this.FinalOperations));
    }
  }

    chooseLogException(opselected: string, check: boolean) {
      if (check) {
        this.FinalOperations[this.SelectedOperations.indexOf(opselected)].exception = true ;
        console.log(JSON.stringify(this.FinalOperations));
      }
      // tslint:disable-next-line:one-line
      else {
        this.FinalOperations[this.SelectedOperations.indexOf(opselected)].exception = false ;
        console.log(JSON.stringify(this.FinalOperations));
      }
    }

      SubmitOperationsToService() {

      this.jsonSelectedOperations = '{"SelectedOperations":{"List":' + JSON.stringify(this.FinalOperations) + '}}';
console.log(this.jsonSelectedOperations);

    // tslint:disable-next-line:max-line-length
    this.http.post('http://192.168.110.224:8092/CreateOperation?ProjectName=' + this.pname, this.jsonSelectedOperations).subscribe(data => {
      // console.log(data);
      });
    }
    }
