import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { CompanyService, ToastService } from '../../../service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-company-list',
  styleUrls: ['./company-list.component.scss'],
  templateUrl: './company-list.component.html',
})
export class CompanyListComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  settings = {
    editable: false,
    filter: false,
    edit: {
      editButtonContent: '<i class="nb-edit"></i>'
    },
     delete: {
      deleteButtonContent: '<i class="nb-trash"></i>'
    },
    mode: 'external',
    pager: {
      display: true,
      perPage: 10,
    },
    actions: {
      add: false,
      edit: true,
      delete: true,
      position: 'right',
    },
    columns: {
      name: {
        title: 'Company',
        type: 'string',
        filter: false,
        editable: false,
        width: '15%'
      },
      cif: {
        title: 'CIF',
        type: 'string',
        filter: false,
        width: '15%'
      },
      address: {
        title: 'City',
        type: 'string',
        filter: false,
        width: '25%'
      },
      contact: {
        title: 'Contact',
        type: 'string',
        filter: false,
        width: '25%'
      },
      email: {
        title: 'E-mail',
        type: 'string',
        filter: false,
        width: '15%'
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router, private toastService: ToastService, private companyService: CompanyService) {
    var self = this;

    this.companyService.setSearchKey('');
  }

  ngOnInit() {
    this.subscription = this.companyService.companyList.asObservable().subscribe((companyList) => {
      this.source.load(companyList);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  edit($event) {
    this.router.navigate(['pages/company-edit', { id: $event.data.id }])
  }

  delete($event) {
    this.companyService.deleteCompany({ id: $event.data.id }).then(o => {
      if (o.success) {
        this.toastService.showSuccessToast('This company is successfully deleted.');
        this.companyService.getCompanyList();
      } else {
        this.toastService.showErrorToast(o.message);
      }
    }, (error) => {
      this.toastService.showErrorToast(error.message);
    })
  }
}
