import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
//import  {Http,Response}from '@angular/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http'
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(DashboardRoutes), NgxChartsModule, HttpClientModule, FormsModule],
  declarations: [DashboardComponent]
})

export class DashboardModule { }
