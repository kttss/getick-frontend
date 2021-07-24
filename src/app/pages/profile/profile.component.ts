import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TokenService } from 'app/services/token.service';
import { UploadService } from 'app/services/upload.service';
import { UserService } from 'app/services/user.service';
import { UtilsService } from 'app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProfileComponent implements OnInit {
  user;
  constructor(
    private tokenService: TokenService,
    private _uploadService: UploadService,
    private _userService: UserService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    console.log('user', this.user);
  }

  uplaodPhoto(event) {
    this._uploadService.upload(event.target.files[0]).subscribe((data: any) => {
      this._userService.addPhoto(this.user.id, data.file).subscribe();
      this.user.photo = data.file;
      localStorage.setItem('user', JSON.stringify(this.user));
      this._utilsService.onUserChange.next();
    });
  }
  getPhoto() {
    return this._uploadService.getUrl(this.user.photo);
  }
}
