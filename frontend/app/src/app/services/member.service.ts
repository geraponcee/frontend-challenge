import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Member } from '../interfaces/member';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class MemberService {

  private members: Member[] = [];
  public members$: Subject<Member[]>;
  
  constructor(
    private _apiService: ApiService
  ) {
    this._apiService.getMembers().subscribe(response => {
      this.members = response;
    })
    this.members$ = new Subject();
  } 

  getMembers$(): Observable<Member[]> {
    return this.members$.asObservable();
  }

  getMembers(): Member[] {
    return this.members;
  }

  pushMember(member: Member){
    this.members.push(member);
    this.members$.next(this.members);
  }

}