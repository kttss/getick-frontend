import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Board } from 'app/main/apps/scrumboard/board.model';
import { AlertService } from 'app/services/alert.service';
import { ProjectService } from 'app/services/project.service';
import { TokenService } from 'app/services/token.service';
import { UploadService } from 'app/services/upload.service';
import { UserService } from 'app/services/user.service';
import { UtilsService } from 'app/services/utils.service';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.scss']
})
export class AddProjectsComponent implements OnInit {
  projectForm: FormGroup;
  isEdit = false;
  searchTerm: string;
  users = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _projectService: ProjectService,
    private _alertService: AlertService,
    private _translate: TranslateService,
    public dialogRef: MatDialogRef<AddProjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService,
    private _uploadPhoto: UploadService,
    private _tokenService: TokenService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data ? true : false;
    this.projectForm = this._formBuilder.group({
      name: [this.data ? this.data.name : '', Validators.required],
      description: [this.data ? this.data.description : '', Validators.required],
      startAt: [this.data ? this.data.startAt : '', Validators.required],
      endAt: [this.data ? this.data.endAt : '', Validators.required],
      collaborators: [this.data ? this.data.collaborators : []]
    });

    this._userService.getAllUsers().subscribe((users: any) => {
      this.users = users;
      console.log(this.users);
    });
  }

  toggleInArray(id) {
    const { collaborators } = this.projectForm.value;

    if (collaborators.includes(id)) {
      this.projectForm.get('collaborators').setValue(collaborators.filter((e) => id !== id));
    } else {
      this.projectForm.get('collaborators').setValue([...collaborators, id]);
    }
  }

  getSelectedUsers() {
    const { collaborators } = this.projectForm.value;
    return this.users.filter((u) => collaborators.includes(u.id));
  }

  getphoto(photo) {
    return this._uploadPhoto.getUrl(photo);
  }

  onSubmit() {
    if (this.isEdit) {
      this._projectService.update(this.data._id, { ...this.projectForm.value }).subscribe((data) => {
        this._alertService.success(this._translate.instant('projects.form.project_updated'));
        this._utilsService.onDataChanged.next();
        this.dialogRef.close(true);
      });
    } else {
      const { collaborators, name } = this.projectForm.value;
      const newBoard = new Board({});
      const user = this._tokenService.getUser();
      newBoard.members = this.users
        .filter((e) => e.id === user.id || collaborators.includes(e.id))
        .map((r) => {
          return {
            id: r.id,
            name: r.firstname + ' ' + r.lastname,
            avatar: r.photo ? this.getphoto(r.photo) : 'https://labiris.ulb.be/img/Personnel/Sans_PHOTO.jpg'
          };
        });

      newBoard.name = name + '-board';
      this._projectService.create({ ...this.projectForm.value, board: JSON.stringify(newBoard) }).subscribe((data) => {
        this._alertService.success(this._translate.instant('projects.form.project_added'));
        this.dialogRef.close(true);
        this._utilsService.onDataChanged.next();
      });
    }
  }
}
