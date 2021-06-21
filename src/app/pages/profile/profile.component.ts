import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TokenService } from 'app/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProfileComponent implements OnInit {
  user;
  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    console.log(this.user);
  }
}
