import { AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  AfterContentInit
} from '@angular/core';
@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent implements OnInit {
  public data: any;
  public ressource_type: any;
  public ressource_name: any;
  public ressource_value: any;
  public projname: string;
  public showdivsucc: boolean;
  public showdivfail: boolean;
  public serviceUrl: string;
  public sub: any;
  public basic: boolean;
  public pname: string;
  public isValidFormSubmitted = false;
  public addJDBC: boolean;
  public showDetails: boolean;
  public addHTTP: boolean;
  public addEMS: boolean;
  public addFTP: boolean;
  public addexistantJDBC: boolean;
  public addexistantHTTP: boolean;
  public addexistantEMS: boolean;
  public addexistantFTP: boolean;
  public selectedressource: string = '';
  public selectedconf: string = '';
  public dataressources: any;
  public datadetails: any;
  public dataressources2: any;
  public dataressources3: any;
  public dataressources4: any;
  public type: string;
  public DetailsArray: Array<any> = [];
  public RessourcesArray: Array<any> = [];
  public RessourcesHTTPArray: Array<any> = [];
  public RessourcesEMSArray: Array<any> = [];
  public RessourcesFTPArray: Array<any> = [];
  configuration: any = [
    'Nouvelle configuration',
    'configuration existante'
  ];
  ressources: any = [
    'JDBC',
    'HTTP',
    'EMS',
    'FTP'
  ];


  constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.showdivsucc = false;
    this.showdivfail = false;
    this.basic = true;
    this.addJDBC = false;
    this.addHTTP = false;
    this.addFTP = false;
    this.addEMS = false;

    this.serviceUrl = '192.168.110.186';
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        console.log(params);
        // Defaults to 0 if no query param provided.
        this.pname = params['project'];
        console.log(this.pname);
      });

  }

  /*  radioChangeHandler(event: any) {
      this.selectedressource = event.target.value;

    }
    radioChangeHandler2(event: any) {
      this.selectedconf = event.target.value;
    }
    */
  onFormSubmit(f: NgForm) {

    if ((f.value.oneressource == 'JDBC') && (f.value.oneconfiguration == 'Nouvelle configuration')) {
      this.showdivsucc = false;
      this.showdivfail = false;
      this.basic = true;
      this.addJDBC = true;
      this.addHTTP = false;
      this.addEMS = false;
      this.addFTP = false;
      this.addexistantEMS = false;
      this.addexistantFTP = false;
      this.addexistantJDBC = false;
      this.addexistantHTTP = false;
    }
    else if ((f.value.oneressource == 'HTTP') && (f.value.oneconfiguration == 'Nouvelle configuration')) {
      this.showdivsucc = false;
      this.showdivfail = false;
      this.basic = true;
      this.addJDBC = false;
      this.addFTP = false;
      this.addEMS = false;
      this.addHTTP = true;
      this.addexistantEMS = false;
      this.addexistantFTP = false;
      this.addexistantJDBC = false;
      this.addexistantHTTP = false;
    }
    else if ((f.value.oneressource == 'EMS') && (f.value.oneconfiguration == 'Nouvelle configuration')) {
      this.showdivsucc = false;
      this.showdivfail = false;
      this.basic = true;
      this.addJDBC = false;
      this.addHTTP = false;
      this.addFTP = false;
      this.addEMS = true;
      this.addexistantEMS = false;
      this.addexistantFTP = false;
      this.addexistantJDBC = false;
      this.addexistantHTTP = false;

    }
    else if ((f.value.oneressource == 'FTP') && (f.value.oneconfiguration == 'Nouvelle configuration')) {
      this.showdivsucc = false;
      this.showdivfail = false;
      this.basic = true;
      this.addJDBC = false;
      this.addHTTP = false;
      this.addEMS = false;
      this.addFTP = true;
      this.addexistantEMS = false;
      this.addexistantFTP = false;
      this.addexistantJDBC = false;
      this.addexistantHTTP = false;

    }
    else if ((f.value.oneconfiguration == 'configuration existante') && (f.value.oneressource == 'JDBC')) {
      this.showdivsucc = false;
      this.showdivfail = false;
      this.basic = true;
      this.addJDBC = false;
      this.addHTTP = false;
      this.addEMS = false;
      this.addFTP = false;
      this.addexistantJDBC = true;
      this.addexistantHTTP = false;
      this.addexistantEMS = false;
      this.addexistantFTP = false;
      this.type = f.value.oneressource;
      console.log(this.type);
      this.GetRessourcesJDBC(this.type);
    }
    else if ((f.value.oneconfiguration == 'configuration existante') && (f.value.oneressource == 'HTTP')) {
      this.showdivsucc = false;
      this.showdivfail = false;
      this.basic = true;
      this.addJDBC = false;
      this.addHTTP = false;
      this.addEMS = false;
      this.addFTP = false;
      this.addexistantJDBC = false;
      this.addexistantHTTP = true;
      this.addexistantEMS = false;
      this.addexistantFTP = false;
      this.type = f.value.oneressource;
      console.log(this.type);
      this.GetRessourcesHTTP(this.type);
    }
    else if ((f.value.oneconfiguration == 'configuration existante') && (f.value.oneressource == 'EMS')) {
      this.showdivsucc = false;
      this.showdivfail = false;
      this.basic = true;
      this.addJDBC = false;
      this.addHTTP = false;
      this.addEMS = false;
      this.addFTP = false;
      this.addexistantJDBC = false;
      this.addexistantHTTP = false;
      this.addexistantFTP = false;
      this.addexistantEMS = true;
      this.type = f.value.oneressource;
      console.log(this.type);
      this.GetRessourcesEMS(this.type);
    }
    else if ((f.value.oneconfiguration == 'configuration existante') && (f.value.oneressource == 'FTP')) {
      this.showdivsucc = false;
      this.showdivfail = false;
      this.basic = true;
      this.addJDBC = false;
      this.addHTTP = false;
      this.addEMS = false;
      this.addFTP = false;
      this.addexistantFTP = true;
      this.addexistantJDBC = false;
      this.addexistantHTTP = false;
      this.addexistantEMS = false;
      this.type = f.value.oneressource;
      console.log(this.type);
      this.GetRessourcesFTP(this.type);
    }
    //console.log('yup');
    console.log(f.value.oneressource);
    console.log(f.value.oneconfiguration);
  }


  addNewRessourceJDBC(ff: NgForm) {
    console.log(ff.value);
    console.log(ff.value.port);
    console.log(ff.value.host);
    console.log(ff.value.sid);
    this.http.get('http://' + this.serviceUrl + ':9904/addJDBC?HOST=' + ff.value.host + '&PORT=' + ff.value.port + '&SID=' + ff.value.sid
      + '&Username=' + ff.value.Username + '&Password=' + ff.value.password + '&MaxConnections=' + ff.value.MaxConnections + '&Timeout=' + ff.value.timeout + '&project_name' + this.pname + '&config_name=' + ff.value.configuration_name)
      .subscribe
      (data => {

        console.log(data);
        this.data = data;
        console.log(this.data.responce.Status);
        //  this.ProjectName = ff.value.pname;

        if (this.data.responce.Status === 'failed') {
          this.showdivsucc = false;
          this.showdivfail = true;

        }

        // tslint:disable-next-line:one-line
        else {
          this.showdivfail = false;
          this.showdivsucc = true;


        }
      });

  }

  addNewRessourceHTTP(fff: NgForm) {
    console.log(fff.value);
    console.log(fff.value.port);
    console.log(fff.value.host);
    console.log(fff.value.ServerType);
    this.http.get('http://' + this.serviceUrl + ':9903/addHTTP?host=' + fff.value.host + '&port=' + fff.value.port + '&servertype=' + fff.value.ServerType + '&project_name=' + this.pname + '&config_name=' + fff.value.configuration_name)
      .subscribe
      (data => {

        console.log(data);
        this.data = data;
        console.log(this.data.responce.Status);
        //  this.ProjectName = ff.value.pname;

        if (this.data.responce.Status === 'failed') {
          this.showdivsucc = false;
          this.showdivfail = true;

        }

        // tslint:disable-next-line:one-line
        else {
          this.showdivfail = false;
          this.showdivsucc = true;


        }
      });
  }
  addNewRessourceEMS(ffff: NgForm) {
    console.log(ffff.value);
    console.log(ffff.value.username);
    console.log(ffff.value.password);
    console.log(ffff.value.clientID);
    console.log(ffff.value.JNDI_url);
    console.log(ffff.value.JNDI_username);
    console.log(ffff.value.JNDI_password);
    this.http.get('http://' + this.serviceUrl + ':9901/addEMS?username=' + ffff.value.username + '&password=' + ffff.value.password + '&client_ID=' + ffff.value.clientID
      + '&JNDI_url=' + ffff.value.JNDI_url + '&JNDI_username=' + ffff.value.JNDI_username + '&JNDI_password=' + ffff.value.JNDI_password + '&project_name=' + this.pname + '&config_name=' + ffff.value.configuration_name)
      .subscribe
      (data => {

        console.log(data);
        this.data = data;
        console.log(this.data.responce.status);
        //  this.ProjectName = ff.value.pname;

        if (this.data.responce.status === 'failed') {
          this.showdivsucc = false;
          this.showdivfail = true;

        }

        // tslint:disable-next-line:one-line
        else {
          this.showdivfail = false;
          this.showdivsucc = true;


        }
      });

  }
  addNewRessourceFTP(fffff: NgForm) {
    console.log(fffff.value);
    console.log(fffff.value.host);
    console.log(fffff.value.port);
    console.log(fffff.value.username);
    console.log(fffff.value.password);
    console.log(fffff.value.timeout);
    this.http.get('http://' + this.serviceUrl + ':9908/addFTP?host=' + fffff.value.host + '&port=' + fffff.value.port + '&username=' + fffff.value.username + '&password=' + fffff.value.password + '&timeout=' + fffff.value.timeout
      + '&project_name=' + this.pname + '&config_name=' + fffff.value.configuration_name)
      .subscribe
      (data => {

        console.log(data);
        this.data = data;
        console.log(this.data.responce.status);
        //  this.ProjectName = ff.value.pname;

        if (this.data.responce.status === 'failed') {
          this.showdivsucc = false;
          this.showdivfail = true;

        }

        // tslint:disable-next-line:one-line
        else {
          this.showdivfail = false;
          this.showdivsucc = true;


        }
      });

  }
  closeDetails(f_detail: NgForm) {
    //this.addexistantEMS = true;
    //  this.addexistantFTP = true;
    //this.addexistantJDBC = true;
    //  this.addexistantHTTP = true;
    this.showDetails = false;
    this.basic = true;

  }

  AddexistantJDBCRessource(name_config: string, f_jdbc: NgForm) {
    name_config = f_jdbc.value.ptype;
    console.log(name_config);
    this.http.get('http://' + this.serviceUrl + ':9907/addExistantJDBC?config_name=' + name_config + '&project_name=' + this.pname)
      .subscribe
      (data => {

        console.log(data);
        this.data = data;
        console.log(this.data.responce.Status);
        //  this.ProjectName = ff.value.pname;

        if (this.data.responce.Status === 'failed') {
          this.showdivsucc = false;
          this.showdivfail = true;
        }
        // tslint:disable-next-line:one-line
        else {
          this.showdivfail = false;
          this.showdivsucc = true;
        }
      });
  }

  AddexistantHTTPRessource(name_config: string, f_http: NgForm) {
    name_config = f_http.value.ptype;
    console.log(name_config);
    this.http.get('http://' + this.serviceUrl + ':9918/addExistantHTTP?config_name=' + name_config + '&project_name=' + this.pname)
      .subscribe
      (data => {

        console.log(data);
        this.data = data;
        console.log(this.data.responce.status);
        //  this.ProjectName = ff.value.pname;

        if (this.data.responce.status === 'failed') {
          this.showdivsucc = false;
          this.showdivfail = true;
        }
        // tslint:disable-next-line:one-line
        else {
          this.showdivfail = false;
          this.showdivsucc = true;
        }
      });
  }
  AddexistantEMSRessource(name_config: string, f_ems: NgForm) {
    name_config = f_ems.value.ptype;
    console.log(name_config);
    this.http.get('http://' + this.serviceUrl + ':9916/addExistantEMS?config_name=' + name_config + '&project_name=' + this.pname)
      .subscribe
      (data => {

        console.log(data);
        this.data = data;
        console.log(this.data.responce.status);
        //  this.ProjectName = ff.value.pname;

        if (this.data.responce.status === 'failed') {
          this.showdivsucc = false;
          this.showdivfail = true;
        }
        // tslint:disable-next-line:one-line
        else {
          this.showdivfail = false;
          this.showdivsucc = true;
        }
      });
  }
  AddexistantFTPRessource(name_config: string, f_ftp: NgForm) {
    name_config = f_ftp.value.ptype;
    console.log(name_config);
    this.http.get('http://' + this.serviceUrl + ':9915/addExistantFTP?config_name=' + name_config + '&project_name=' + this.pname)
      .subscribe
      (data => {

        console.log(data);
        this.data = data;
        console.log(this.data.responce.status);
        //  this.ProjectName = ff.value.pname;

        if (this.data.responce.status === 'failed') {
          this.showdivsucc = false;
          this.showdivfail = true;
        }
        // tslint:disable-next-line:one-line
        else {
          this.showdivfail = false;
          this.showdivsucc = true;
        }
      });
  }

  AddDetailsJDBC(config_name: string, f_jdbc: NgForm) {
    this.addexistantJDBC = true;
    this.addexistantHTTP = false;
    this.addexistantEMS = false;
    this.addexistantFTP = false;
    config_name = f_jdbc.value.ptype;
    this.getDetails(config_name);
    this.showDetails = !this.showDetails;
    this.showdivfail = false;


  }

  AddDetailsHTTP(config_name: string, f_http: NgForm) {

    this.addexistantJDBC = false;
    this.addexistantHTTP = true;
    this.addexistantEMS = false;
    this.addexistantFTP = false;
    config_name = f_http.value.ptype;
    this.getDetails(config_name);
    this.showDetails = !this.showDetails;
    this.showdivfail = false;

  }
  AddDetailsEMS(config_name: string, f_ems: NgForm) {
    this.addexistantJDBC = false;
    this.addexistantHTTP = false;
    this.addexistantEMS = true;
    this.addexistantFTP = false;
    config_name = f_ems.value.ptype;
    this.getDetails(config_name);
    this.showDetails = !this.showDetails;
    this.showdivfail = false;


  }
  AddDetailsFTP(config_name: string, f_ftp: NgForm) {
    this.addexistantJDBC = false;
    this.addexistantHTTP = false;
    this.addexistantEMS = false;
    this.addexistantFTP = true;
    config_name = f_ftp.value.ptype;
    this.getDetails(config_name);
    this.showDetails = !this.showDetails;
    this.showdivfail = false;


  }
  getDetails(config_name: string) {
    console.log('show:' + config_name);
    this.http.get('http://' + this.serviceUrl + ':9914/addDetails?config_name=' + config_name).subscribe(data => {
      this.datadetails = data;
      for (const el1 of this.DetailsArray) {
        this.DetailsArray.splice(el1);
      }
      for (const elt of this.datadetails.resultset.record) {

        this.DetailsArray.push(elt);
      }


      console.log(this.DetailsArray);
    });

  }
  OnAddExistantJDBC() {

    this.addexistantJDBC = !this.addexistantJDBC;
    this.showdivfail = false;
    this.GetRessourcesJDBC('JDBC');

  }
  OnAddExistantHTTP() {

    this.addexistantHTTP = !this.addexistantHTTP;
    this.showdivfail = false;
    this.GetRessourcesHTTP('HTTP');

  }
  OnAddExistantEMS() {

    this.addexistantEMS = !this.addexistantEMS;
    this.showdivfail = false;
    this.GetRessourcesEMS('EMS');

  }
  OnAddExistantFTP() {

    this.addexistantFTP = !this.addexistantFTP;
    this.showdivfail = false;
    this.GetRessourcesFTP('FTP');

  }
  GetRessourcesJDBC(ressource_type: string) {

    this.http.get('http://' + this.serviceUrl + ':9920/getRessources?ressource_type=' + ressource_type).subscribe(data => {
      this.dataressources = data;
      for (const el1 of this.RessourcesArray) {
        this.RessourcesArray.splice(el1);
      }
      for (const elt of this.dataressources.ressources.ressourceconfigname) {
        this.RessourcesArray.push(elt);
      }
      console.log(this.RessourcesArray);
    });
  }
  GetRessourcesHTTP(ressource_type: string) {

    this.http.get('http://' + this.serviceUrl + ':9920/getRessources?ressource_type=' + ressource_type).subscribe(data => {
      this.dataressources2 = data;
      for (const el1 of this.RessourcesHTTPArray) {
        this.RessourcesHTTPArray.splice(el1);
      }
      for (const elt of this.dataressources2.ressources.ressourceconfigname) {
        this.RessourcesHTTPArray.push(elt);
      }
      console.log(this.RessourcesHTTPArray);
    });
  }
  GetRessourcesEMS(ressource_type: string) {

    this.http.get('http://' + this.serviceUrl + ':9920/getRessources?ressource_type=' + ressource_type).subscribe(data => {
      this.dataressources3 = data;
      for (const el1 of this.RessourcesEMSArray) {
        this.RessourcesEMSArray.splice(el1);
      }
      for (const elt of this.dataressources3.ressources.ressourceconfigname) {
        this.RessourcesEMSArray.push(elt);
      }
      console.log(this.RessourcesEMSArray);
    });
  }
  GetRessourcesFTP(ressource_type: string) {

    this.http.get('http://' + this.serviceUrl + ':9920/getRessources?ressource_type=' + ressource_type).subscribe(data => {
      this.dataressources4 = data;
      for (const el1 of this.RessourcesFTPArray) {
        this.RessourcesFTPArray.splice(el1);
      }
      for (const elt of this.dataressources4.ressources.ressourceconfigname) {
        this.RessourcesFTPArray.push(elt);
      }
      console.log(this.RessourcesFTPArray);
    });
  }
  OnAddJDBC(name2: string) {
    this.showDetails = false;
    this.addexistantJDBC = false;
    this.addexistantHTTP = false;
    this.addexistantFTP = false;
    this.addexistantEMS = false;
    this.addJDBC = !this.addJDBC;
    this.showdivfail = false;
  }
  OnAddHTTP(name2: string) {
    this.addexistantJDBC = false;
    this.addexistantHTTP = false;
    this.addexistantFTP = false;
    this.addexistantEMS = false;
    this.addHTTP = !this.addHTTP;
    this.showdivfail = false;
    this.showDetails = false;
  }
  OnAddEMS(name2: string) {
    this.addexistantJDBC = false;
    this.addexistantHTTP = false;
    this.addexistantFTP = false;
    this.addexistantEMS = false;
    this.addEMS = !this.addEMS;
    this.showdivfail = false;
    this.showDetails = false;
  }
  OnAddFTP(name2: string) {
    this.addexistantJDBC = false;
    this.addexistantHTTP = false;
    this.addexistantFTP = false;
    this.addexistantEMS = false;
    this.addFTP = !this.addFTP;
    this.showdivfail = false;
    this.showDetails = false;
  }




}
