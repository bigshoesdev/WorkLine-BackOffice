import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { CompanyService, ToastService, DepartmentService } from '../../../service';

@Component({
  selector: 'ngx-company-edit',
  styleUrls: ['./company-edit.component.scss'],
  templateUrl: './company-edit.component.html',
})

export class CompanyEditComponent {
  public form: FormGroup;
  public name: AbstractControl;
  public cif: AbstractControl;
  public contact: AbstractControl;
  public mobile: AbstractControl;
  public email: AbstractControl;
  public address: AbstractControl;
  public rate: AbstractControl;
  public status: AbstractControl;
  public id: String;

  public departmentList: any[];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private deptService: DepartmentService, private companyService: CompanyService, private toastService: ToastService) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'cif': ['', Validators.compose([Validators.required])],
      'contact': ['', Validators.compose([Validators.required])],
      'mobile': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'address': ['', Validators.compose([Validators.required])],
      'rate': ['', Validators.compose([Validators.required])],
      'status': ['', Validators.compose([Validators.required])],
    });

    this.name = this.form.controls['name'];
    this.cif = this.form.controls['cif'];
    this.contact = this.form.controls['contact'];
    this.mobile = this.form.controls['mobile'];
    this.email = this.form.controls['email'];
    this.address = this.form.controls['address'];
    this.email = this.form.controls['email'];
    this.rate = this.form.controls['rate'];
    this.status = this.form.controls['status'];

    this.id = this.route.snapshot.params['id'];

    this.companyService.getCompany({ id: this.id }).then((o: any) => {
      if (o.success) {
        this.name.setValue(o.company.name);
        this.cif.setValue(o.company.cif);
        this.contact.setValue(o.company.contact);
        this.mobile.setValue(o.company.mobile);
        this.email.setValue(o.company.email);
        this.address.setValue(o.company.address);
        this.rate.setValue(o.company.rate);
        this.status.setValue(o.company.status);
      } else {
        this.toastService.showErrorToast(o.message);
      }
    }, (error) => {
      this.toastService.showErrorToast(error.message);
    });

    this.getDepartmentListForCompany(this.id);
  }

  saveCompany(o) {
    this.companyService.updateCompany({...o, id: this.id}).then(o => {
      if (o.success) {
        this.toastService.showSuccessToast('This company is successfully saved.');
        this.router.navigateByUrl("/pages/company-list");
      } else {
        this.toastService.showErrorToast(o.message);
      }
    }, (error) => {
      this.toastService.showErrorToast(error.message);
    })
  }

  
  getDepartmentListForCompany(compID) {
    this.deptService.getDepartmentsForCompany({ company: compID }).then((o: any) => {
      if (o.success) {
        this.departmentList = o.departments;
      } else {
        this.toastService.showErrorToast(o.message);
      }
    }, (error) => {
      this.toastService.showErrorToast(error.message);
    })
  }
}
