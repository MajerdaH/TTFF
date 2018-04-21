import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { TaskboardComponent } from './taskboard.component';
import { TaskboardRoutes } from './taskboard.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FocusModule } from 'angular2-focus';
//import {NgPipesModule} from 'ngx-pipes';
//import { PipeModule }    from './../';
import { ProjectFilterPipePipe } from './../project-filter-pipe.pipe';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(TaskboardRoutes), DragulaModule,
    HttpClientModule, FormsModule, Ng2SmartTableModule, FocusModule],
  declarations: [TaskboardComponent, ProjectFilterPipePipe]
})

export class TaskboardModule { }
