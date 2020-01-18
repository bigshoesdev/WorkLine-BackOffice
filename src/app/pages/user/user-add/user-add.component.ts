import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { CompanyService, ToastService, DepartmentService, UserService } from '../../../service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-user-add',
  styleUrls: ['./user-add.component.scss'],
  templateUrl: './user-add.component.html',
})

export class UserAddComponent implements OnInit, OnDestroy {
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

  constructor(private fb: FormBuilder, private router: Router,
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
    console.log(u);
    this.userService.addUser(u).then(o => {
      if (o.success) {
        this.toastService.showSuccessToast('This user is successfully registered.');
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
      } else {
        this.toastService.showErrorToast(o.message);
      }
    }, (error) => {
      this.toastService.showErrorToast(error.message);
    })
  }
}
