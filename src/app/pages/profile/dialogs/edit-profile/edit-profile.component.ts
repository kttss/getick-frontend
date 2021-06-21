import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
    this.editForm = this._formBuilder.group({
      firstname: [this.data.firstname, Validators.required],
      lastname: [this.data.lastname, Validators.required],
      role: [this.data.role, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {}
}
