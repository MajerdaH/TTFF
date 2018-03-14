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
  public operation: boolean;
  public projname: string;
  public modify: boolean;


  constructor(
    private route: ActivatedRoute,
    private router: Router, private http: HttpClient) {}


    ngOnInit() {
      this.modify = true;
      this.sub = this.route
        .queryParams
        .subscribe(params => {
          console.log(params);
          // Defaults to 0 if no query param provided.
          this.pname = params['project'];
          console.log(this.pname);
        });
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
       this.http.post('http://192.168.110.224:8088/CreateOperation', this.jsonOperations).subscribe(data => {
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
}
