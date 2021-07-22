import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Board } from 'app/main/apps/scrumboard/board.model';
import { AlertService } from 'app/services/alert.service';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.scss']
})
export class AddProjectsComponent implements OnInit {
  projectForm: FormGroup;
  isEdit = false;
  searchTerm: string;
  constructor(
    private _formBuilder: FormBuilder,
    private _projectService: ProjectService,
    private _alertService: AlertService,
    private _translate: TranslateService,
    public dialogRef: MatDialogRef<AddProjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data ? true : false;
    this.projectForm = this._formBuilder.group({
      name: [this.data ? this.data.name : '', Validators.required],
      description: [this.data ? this.data.description : '', Validators.required],
      startAt: [this.data ? this.data.startAt : '', Validators.required],
      endAt: [this.data ? this.data.endAt : '', Validators.required]
    });
  }

  onSubmit() {
    if (this.isEdit) {
      this._projectService.update(this.data._id, { ...this.projectForm.value }).subscribe((data) => {
        this._alertService.success(this._translate.instant('projects.form.project_updated'));
        this.dialogRef.close(true);
      });
    } else {
      const newBoard = new Board({});
      this._projectService.create({ ...this.projectForm.value, board: JSON.stringify(newBoard) }).subscribe((data) => {
        this._alertService.success(this._translate.instant('projects.form.project_added'));
        this.dialogRef.close(true);
      });
    }
  }
}
