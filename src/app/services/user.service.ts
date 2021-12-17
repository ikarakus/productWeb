import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl + '/users';
  constructor(private http: HttpClient) { }


  getProfile(userId:number) {
    return this.http.get(this.baseUrl+ `/profile/${userId}`);
  }

}
