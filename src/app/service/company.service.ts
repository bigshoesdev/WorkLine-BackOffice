import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserService } from './user.service';
import { Config } from '../config/config';

@Injectable()
export class CompanyService {
    private searchKey: String = '';

    public companyList = new BehaviorSubject<any[]>([]);

    constructor(private http: Http, private userService: UserService) {
        this.searchKey = '';
    }

    setSearchKey(key) {
        this.searchKey = key;
        this.getCompanyList();
    }

    getCompanyList() {
        this.getCompanies({ key: this.searchKey }).then((o: any) => {
            if (o.success) {
                this.companyList.next([...o.companies]);
            }
        }, (error) => {
            alert(error.message);
        });
    }

    private getCompanies(data: any) {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.userService.getToken());

        let opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "backoffice/companies", data, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    getCompany(data: any) {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.userService.getToken());

        let opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "backoffice/company", data, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    addCompany(p: any): Promise<any> {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.userService.getToken());

        let opt = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "backoffice/new-company", p, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    updateCompany(p: any): Promise<any> {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.userService.getToken());

        let opt = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "backoffice/update-company", p, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    deleteCompany(p: any): Promise<any> {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.userService.getToken());

        let opt = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "backoffice/delete-company", p, opt).map(resp => resp.json()).subscribe(
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
