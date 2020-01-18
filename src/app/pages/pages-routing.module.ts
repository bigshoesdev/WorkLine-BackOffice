import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { DepartmentAddComponent } from './department/department-add/department-add.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: 'company-add', component: CompanyAddComponent },
    { path: 'company-list', component: CompanyListComponent },
    { path: 'company-edit', component: CompanyEditComponent },
    { path: 'department-add', component: DepartmentAddComponent },
    { path: 'user-add', component: UserAddComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'user-edit', component: UserEditComponent },
    { path: '', redirectTo: 'company-list', pathMatch: 'full' }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
