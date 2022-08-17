import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../interfaces/member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:8081/api/members';

  constructor(private _http: HttpClient) { }

  public getMembers(): Observable<Member[]>{
    return this._http.get<Member[]>(this.url);
  }
  
  public setMember(member: Member): Observable<Member>{
    return this._http.post<Member>(this.url, member);
  }

}
