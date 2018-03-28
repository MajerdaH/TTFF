import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DocsComponent } from './docs.component';
import { DocsRoutes } from './docs.routing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
  imports: [CommonModule, RouterModule.forChild(DocsRoutes), NgbAccordionModule, FormsModule, HttpClientModule, Ng2SmartTableModule],
  declarations: [DocsComponent]
})

export class DocsModule {
}
