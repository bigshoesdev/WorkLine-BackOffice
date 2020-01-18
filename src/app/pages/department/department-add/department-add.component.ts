import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { DepartmentService, ToastService, CompanyService } from '../../../service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-department-add',
  styleUrls: ['./department-add.component.scss'],
  templateUrl: './department-add.component.html',
})

export class DepartmentAddComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  public companyList: any[];
  public form: FormGroup;
  public name: AbstractControl;
  public company: AbstractControl;
  public manual_counter: AbstractControl;
  public qr_option: AbstractControl;


  constructor(private fb: FormBuilder, private router: Router, private companyService: CompanyService,
    private departmentService: DepartmentService, private toastService: ToastService) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'company': ['', Validators.compose([Validators.required])],
      'manual_counter': [false],
      'qr_option': [false]
    });

    this.name = this.form.controls['name'];
    this.company = this.form.controls['company'];
    this.manual_counter = this.form.controls['manual_counter'];
    this.qr_option = this.form.controls['qr_option'];

    this.companyService.setSearchKey('');
  }

  ngOnInit() {
    this.subscription = this.companyService.companyList.asObservable().subscribe((companyList) => {
      this.companyList = companyList;
      if (this.companyList.length > 0) {
        this.company.setValue(this.companyList[0].id);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveDepartment(d) {
    this.departmentService.addDepartment(d).then(o => {
      if (o.success) {
        this.toastService.showSuccessToast('This department is successfully registered.');
        this.router.navigateByUrl("/pages/company-list");
      } else {
        this.toastService.showErrorToast(o.message);
      }
    }, (error) => {
      this.toastService.showErrorToast(error.message);
    })
  }
}
