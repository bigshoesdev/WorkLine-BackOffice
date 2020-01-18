import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { UserService, ToastService } from '../../../service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-user-list',
  styleUrls: ['./user-list.component.scss'],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit, OnDestroy {
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
        title: 'Name',
        type: 'string',
        filter: false,
        editable: false,
        width: '15%'
      },
      rname: {
        title: 'Surnames',
        type: 'string',
        filter: false,
        width: '15%'
      },
      mobile: {
        title: 'Mobile',
        type: 'string',
        filter: false,
        width: '25%'
      },
      company: {
        title: 'Company',
        type: 'string',
        filter: false,
        width: '25%',
        valuePrepareFunction: (value) => {
          if (value)
            return value.name;
          else
            return '';
        }
      },
      type: {
        title: 'Role',
        type: 'string',
        filter: false,
        width: '15%',
        valuePrepareFunction: (value) => {
          if (value == 0)
            return 'Employee';
          else
            return 'Employer';
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router, private toastService: ToastService, private userService: UserService) {
    var self = this;

    this.userService.setSearchKey('');
  }

  ngOnInit() {
    this.subscription = this.userService.userList.asObservable().subscribe((userList) => {
      this.source.load(userList);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  edit($event) {
    this.router.navigate(['pages/user-edit', { id: $event.data.id }])
  }

  delete($event) {
    this.userService.deleteUser({ id: $event.data.id }).then(o => {
      if (o.success) {
        this.toastService.showSuccessToast('This user is successfully deleted.');
        this.userService.getUserList();
      } else {
        this.toastService.showErrorToast(o.message);
      }
    }, (error) => {
      this.toastService.showErrorToast(error.message);
    })
  }
}
