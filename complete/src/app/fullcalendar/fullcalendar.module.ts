import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';

import { FullcalendarComponent } from './fullcalendar.component';
import { FullcalendarRoutes } from './fullcalendar.routing';
import { JmspipePipe } from './../jmspipe.pipe';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(FullcalendarRoutes), CalendarModule.forRoot(), FormsModule],
  declarations: [FullcalendarComponent, JmspipePipe]
})

export class FullcalendarModule {}
