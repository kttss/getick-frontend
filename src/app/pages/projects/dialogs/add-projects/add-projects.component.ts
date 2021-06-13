import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.scss']
})
export class AddProjectsComponent implements OnInit {
  projectForm: FormGroup;
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.projectForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startAt: ['', Validators.required],
      endAt: ['', Validators.required]
    });
  }
}
