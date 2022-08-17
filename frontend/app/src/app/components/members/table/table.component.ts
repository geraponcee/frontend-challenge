import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from 'src/app/interfaces/member';
import { ApiService } from 'src/app/services/api.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  members: Member[];
  displayedColumns: string[];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private _memberService: MemberService,
    private _apiService: ApiService
  ) {
    this.members = [];
    this.displayedColumns = ['firstName', 'lastName', 'address', 'ssn'];
  }

  ngOnInit(): void {  
    this._apiService.getMembers().subscribe(response => {
      this.members = response;
      this.dataSource = new MatTableDataSource(this.members);
    });
    this._memberService.getMembers$().subscribe(members => {
      this.members = members;
      this.dataSource.data = this.members;
    });
  }

}
