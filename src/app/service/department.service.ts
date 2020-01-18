import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserService } from './user.service';
import { Config } from '../config/config';

@Injectable()
export class DepartmentService {
    constructor(private http: Http, private userService: UserService) {
    }

    addDepartment(p: any): Promise<any> {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.userService.getToken());

        let opt = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "backoffice/new-department", p, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    getDepartmentsForCompany(data: any) {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.userService.getToken());

        let opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "backoffice/departments-company", data, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }
}
