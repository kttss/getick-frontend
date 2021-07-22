import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      const { id, token } = data;
      this._userService.confirmation(id, token).subscribe((res) => {
        console.log('fdfdf');
        this.router.navigate(['/login']);
      });
    });
  }
}
