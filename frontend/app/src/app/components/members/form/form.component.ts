import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Member } from 'src/app/interfaces/member';
import { ApiService } from 'src/app/services/api.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _memberService: MemberService,
    private _apiService: ApiService
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.minLength(2)]],
      lastName: ['', [Validators.minLength(2)]],
      address: ['', [Validators.minLength(2)]],
      ssn: ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{2}-[0-9]{4}')]]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(formDirective: FormGroupDirective) {
    let cleanData = this.cleanData(this.form.value);
    this._apiService.setMember(cleanData).subscribe(
      response => {
        this._memberService.pushMember(response);
        formDirective.resetForm();
        this.form.reset();
      },
      error => {
        error.error.message == 'Duplicate SSN' ? this.form.controls['ssn'].setErrors({'duplicated': true}) : false;
      }
    );
  }

  cleanData(member: Member) {
    member.firstName = member.firstName.trim();
    member.lastName = member.lastName.trim();
    member.address = member.address.trim();
    return member;
  }

}
