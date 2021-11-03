import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HttpHandlerService {
    constructor(public http: HttpClient) {}
    public headers: {} = { headers: { 'Content-Type': 'application/json; charset=utf-8' } };

    loginCall(reqParam: any) {
        return this.http.post('https://reqres.in/api/login', reqParam, this.headers);
    }

    usersCall() {
        return this.http.get('https://reqres.in/api/users');
    }

    userDetailCall(reqParam: any) {
        return this.http.get('https://reqres.in/api/users/' + reqParam);
    }
}
