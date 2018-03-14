import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { FormsModule } from '@angular/forms';
// import {HttpClientModule} from '@angular/common/http'
import { EmailComponent } from './email.component';
import { EmailRoutes } from './email.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(EmailRoutes), SidebarModule,NgbModule,FormsModule],
  declarations: [EmailComponent]
})

export class EmailModule {}
