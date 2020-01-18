import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { CompanyService, ToastService, DepartmentService, UserService } from '../../../service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-user-edit',
  styleUrls: ['./user-edit.component.scss'],
  templateUrl: './user-edit.component.html',
})

export class UserEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  public companyList: any[];
  public departmentList: any[];
  public form: FormGroup;
  public rname: AbstractControl;
  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public token: AbstractControl;
  public company: AbstractControl;
  public type: AbstractControl;
  public status: AbstractControl;
  public department: AbstractControl;
  public departments: AbstractControl;
  public id: String;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private companyService: CompanyService, private deptService: DepartmentService, private userService: UserService, private toastService: ToastService) {
    this.form = fb.group({
      'rname': ['', Validators.compose([Validators.required])],
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required])],
      'token': ['', Validators.compose([Validators.required])],
      'company': ['', Validators.compose([Validators.required])],
      'type': [0],
      'status': [0],
      'department': ['', Validators.compose([Validators.required])],
      'departments': []
    });

    this.rname = this.form.controls['rname'];
    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.token = this.form.controls['token'];
    this.company = this.form.controls['company'];
    this.type = this.form.controls['type'];
    this.status = this.form.controls['status'];
    this.department = this.form.controls['department'];
    this.departments = this.form.controls['departments'];

    this.id = this.route.snapshot.params['id'];

    this.companyService.setSearchKey('');
  }


  ngOnInit() {
    this.subscription = this.companyService.companyList.asObservable().subscribe((companyList) => {
      this.companyList = companyList;
      if (this.companyList.length > 0) {
        this.company.setValue(this.companyList[0].id);
        this.getDepartmentListForCompany(this.companyList[0].id);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  saveUser(u) {
    this.userService.updateUser({...u, id: this.id}).then(o => {
      if (o.success) {
        this.toastService.showSuccessToast('This user is successfully saved.');
        this.router.navigateByUrl("/pages/user-list");
      } else {
        this.toastService.showErrorToast(o.message);
      }
    }, (error) => {
      this.toastService.showErrorToast(error.message);
    })
  }

  companyChange() {
    this.getDepartmentListForCompany(this.company.value);
  }

  getDepartmentListForCompany(compID) {
    this.deptService.getDepartmentsForCompany({ company: compID }).then((o: any) => {
      if (o.success) {
        this.departmentList = o.departments;
        if (this.departmentList.length > 0) {
          this.department.setValue(this.departmentList[0].id);
        }

        this.userService.getUserInfo({ id: this.id }).then((o: any) => {
          if (o.success) {
            this.name.setValue(o.user.name);
            this.rname.setValue(o.user.rname);
            this.email.setValue(o.user.email);
            this.password.setValue(o.user.code);
            this.email.setValue(o.user.email);
            this.token.setValue(o.user.token);
            this.company.setValue(o.user.company);
            this.status.setValue(o.user.status);
            this.type.setValue(o.user.type);
            this.department.setValue(o.user.department);
            this.departments.setValue(o.user.departments);
          } else {
            this.toastService.showErrorToast(o.message);
          }
        }, (error) => {
          this.toastService.showErrorToast(error.message);
        })
      } else {
        this.toastService.showErrorToast(o.message);
      }
    }, (error) => {
      this.toastService.showErrorToast(error.message);
    })
  }
}
