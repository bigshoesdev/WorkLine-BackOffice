import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { CompanyService, ToastService } from '../../../service';

@Component({
  selector: 'ngx-company-add',
  styleUrls: ['./company-add.component.scss'],
  templateUrl: './company-add.component.html',
})

export class CompanyAddComponent {
  public form: FormGroup;
  public name: AbstractControl;
  public cif: AbstractControl;
  public contact: AbstractControl;
  public mobile: AbstractControl;
  public email: AbstractControl;
  public address: AbstractControl;
  public rate: AbstractControl;
  public status: AbstractControl;

  constructor(private fb: FormBuilder, private router: Router, private companyService: CompanyService, private toastService: ToastService) {
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

    this.status.setValue(0);
  }

  saveCompany(o) {
    this.companyService.addCompany(o).then(o => {
      if (o.success) {
        this.toastService.showSuccessToast('This company is successfully registered.');
        this.router.navigateByUrl("/pages/company-list");
      } else {
        this.toastService.showErrorToast(o.message);
      }
    }, (error) => {
      this.toastService.showErrorToast(error.message);
    })
  }
}
