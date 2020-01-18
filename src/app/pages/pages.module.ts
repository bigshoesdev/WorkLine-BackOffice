import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PageGuard } from '../guards/page.guard';
import { UserService, CompanyService, ToastService, DepartmentService } from '../service';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { DepartmentAddComponent } from './department/department-add/department-add.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  CompanyListComponent,
  CompanyAddComponent,
  CompanyEditComponent,
  DepartmentAddComponent,
  UserAddComponent,
  UserListComponent,
  UserEditComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule, 
    ToasterModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers:[
    UserService,
    ToastService,
    CompanyService,
    DepartmentService,
    PageGuard
  ]
})
export class PagesModule {
}
