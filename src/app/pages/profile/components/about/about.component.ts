import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material';
import { EditProfileComponent } from '../../dialogs/edit-profile/edit-profile.component';
import { UserService } from 'app/services/user.service';
import { UploadService } from 'app/services/upload.service';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AboutComponent implements OnInit, OnDestroy {
  @Input() user;
  about: any = {
    general: {
      gender: 'Male',
      birthday: 'February 30th, 1974',
      locations: ['London, UK', 'New York, USA'],
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget pharetra felis, sed ullamcorper dui. Sed et elementum neque. Vestibulum pellente viverra ultrices. Etiam justo augue, vehicula ac gravida a, interdum sit amet nisl. Integer vitae nisi id nibh dictum mollis in vitae tortor.'
    },
    work: {
      occupation: 'Developer',
      skills: 'C#, PHP, Javascript, Angular, JS, HTML, CSS',
      jobs: [
        {
          company: 'Self-Employed',
          date: '2010 - Now'
        },
        {
          company: 'Google',
          date: '2008 - 2010'
        }
      ]
    },
    contact: {
      address: 'Ut pharetra luctus est quis sodales. Duis nisi tortor, bibendum eget tincidunt, aliquam ac elit. Mauris nec euismod odio.',
      tel: ['+6 555 6600', '+9 555 5255'],
      websites: ['withinpixels.com'],
      emails: ['mail@withinpixels.com', 'mail@creapond.com']
    },
    groups: [
      {
        name: 'Projet 1',
        category: 'Front-end',
        members: '14'
      },
      {
        name: 'projet 2',
        category: 'Backend',
        members: '10'
      },
      {
        name: 'projet 3',
        category: 'Games',
        members: '13'
      }
    ],
    friends: [
      {
        name: 'Garry Newman',
        avatar: 'assets/images/avatars/garry.jpg'
      },
      {
        name: 'Carl Henderson',
        avatar: 'assets/images/avatars/carl.jpg'
      },
      {
        name: 'Jane Dean',
        avatar: 'assets/images/avatars/jane.jpg'
      },
      {
        name: 'Garry Arnold',
        avatar: 'assets/images/avatars/garry.jpg'
      },
      {
        name: 'Vincent Munoz',
        avatar: 'assets/images/avatars/vincent.jpg'
      },
      {
        name: 'Alice Freeman',
        avatar: 'assets/images/avatars/alice.jpg'
      },
      {
        name: 'Andrew Green',
        avatar: 'assets/images/avatars/andrew.jpg'
      }
    ]
  };
  friends: any[] = [];
  projects: any[] = [];

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private _uploadService: UploadService,
    private _projectService: ProjectService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.friends = data;
    });
    this._projectService.get().subscribe((data: any) => {
      this.projects = data;
    });
  }

  getPhotoUrl(img) {
    return this._uploadService.getUrl(img);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '600px',
      data: { lastname: this.user.lastname, firstname: this.user.firstname, role: this.user.role, email: this.user.email }
    });

    dialogRef.afterClosed().subscribe((result) => {
      const payloadUser = {
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
        role: result.role
      };

      this.userService.editProfile(this.user.id, payloadUser).subscribe(
        (data) => {},
        (err) => {
          const updatedUser = { ...this.user, ...result };
          this.user = updatedUser;
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      );
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
