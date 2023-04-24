import { API_CONFIG } from './../../api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserData } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor (
    public http: HttpClient,
  ) { }

  getUsers(clientType: string) {
    return this.http.get<UserData>(API_CONFIG.auth.list(clientType));
  }

  getUser(clientType: string, id: number) {
    return this.http.get<User>(API_CONFIG.auth.get(clientType, id));
  }
}
