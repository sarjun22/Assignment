import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { HttpHandlerService } from '../../providers/http-handler.service';
import { ShareService } from 'src/app/providers/share.service';
import { UserDetails } from '../../modals/interfaces';
import { UserList } from '../../../assets/Data/userList';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public submitted: boolean = false;
  public errorMessage: string = '';
  private choice: number = 0;
  private index: number = 0;
  private updateUser: UserDetails = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: '',
    mobile: 90000000000,
    email: '',
    salary: 0

  }
  submitButton: string = 'Add User';
  constructor(private router: Router, private fb: FormBuilder, private httpHandler: HttpHandlerService, private shareService: ShareService, private location: Location) { }

  public newUserForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['Male', Validators.required],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    salary: ['', Validators.required],
  });

  ngOnInit(): void {
    console.log('service data update page = ', this.shareService.shareUserDetails.userDetails);
    let temp: any = this.shareService.shareUserDetails.userDetails;
    this.index = this.shareService.shareUserDetails.id;
    this.choice = this.shareService.shareUserDetails.choice;
    if (this.choice === 1 ) {
      this.submitButton = 'Update User';
      this.newUserForm.controls['firstName'].setValue(temp['firstName']);
      this.newUserForm.controls['lastName'].setValue(temp.lastName);
      this.newUserForm.controls['gender'].setValue(temp.gender);
      this.newUserForm.controls['mobile'].setValue(temp.mobile);
      this.newUserForm.controls['email'].setValue(temp.email);
      this.newUserForm.controls['salary'].setValue(temp.salary);
    }
  }

  get f() {
    return this.newUserForm.controls;
  }

  public onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newUserForm.invalid) {
      return;
    } else {
      this.updateUser.firstName = this.newUserForm.controls.firstName.value;
      this.updateUser.lastName = this.newUserForm.controls.lastName.value;
      this.updateUser.gender = this.newUserForm.controls.gender.value;
      this.updateUser.mobile = this.newUserForm.controls.mobile.value;
      this.updateUser.email = this.newUserForm.controls.email.value;
      this.updateUser.salary = this.newUserForm.controls.salary.value;
      // for store data in dummy user list ( temp purpose)
      if (this.choice === 1) { // update user
        this.updateUser.id = this.index;
        UserList[this.index] = this.updateUser;
        this.router.navigate(['users']);
      } else if (this.choice !== 1) { // add new user
        this.updateUser.id = UserList.length + 1;
        UserList.push(this.updateUser);
        this.router.navigate(['users']);
      }
    }
  }
  public back() {
    this.location.back();
  }
}
