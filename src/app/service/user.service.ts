import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Config } from '../config/config';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {
    private searchKey: String = '';
    public userList = new BehaviorSubject<any[]>([]);

    constructor(private http: Http) { }

    setSearchKey(key) {
        this.searchKey = key;
        this.getUserList();
    }

    getUserList() {
        this.getUsers({ key: this.searchKey }).then((o: any) => {
            if (o.success) {
                this.userList.next([...o.users]);
            }
        }, (error) => {
            alert(error.message);
        });
    }

    private getUsers(data: any) {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.getToken());

        let opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "backoffice/users", data, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    getUserInfo(data: any) {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.getToken());

        let opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "backoffice/user", data, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    updateUser(p: any): Promise<any> {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.getToken());

        let opt = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "backoffice/update-user", p, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    deleteUser(p: any): Promise<any> {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.getToken());

        let opt = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "backoffice/delete-user", p, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    setUser(u: any) {
        localStorage.setItem("user", JSON.stringify(u));
    }

    getUser(): any {
        let u = JSON.parse(localStorage.getItem("user"));
        if (!u) u = null;
        return u;
    }


    setIsLogin(isLogin: boolean) {
        localStorage.setItem("isLogin", JSON.stringify(isLogin));
    }

    getIsLogin(): any {
        let isLogin = JSON.parse(localStorage.getItem("isLogin"));
        if (isLogin == undefined) isLogin = false;
        return isLogin;
    }

    setToken(token: string) {
        localStorage.setItem("token", JSON.stringify(token));
    }

    getToken(): any {
        let token = JSON.parse(localStorage.getItem("token"));
        if (!token) token = null;
        return token;
    }

    authenticateUser(data): Promise<any> {
        var self = this;
        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "backoffice/signin", data).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    addUser(p: any): Promise<any> {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.getToken());

        let opt = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "backoffice/new-user", p, opt).map(resp => resp.json()).subscribe(
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
