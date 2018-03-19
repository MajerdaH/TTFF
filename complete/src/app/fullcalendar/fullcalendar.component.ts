import { Component, ChangeDetectionStrategy, Inject, ViewChild, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.scss']
})
export class FullcalendarComponent {
  public sub: any;
  public pname: string;
  constructor(  private route: ActivatedRoute,
    private router: Router, private http: HttpClient){

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
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
