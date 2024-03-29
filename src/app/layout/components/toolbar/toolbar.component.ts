import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { TokenService } from 'app/services/token.service';
import { Router } from '@angular/router';
import { ProjectService } from 'app/services/project.service';
import { UploadService } from 'app/services/upload.service';
import { UtilsService } from 'app/services/utils.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnDestroy {
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  userStatusOptions: any[];
  user: any;
  projects = [];
  selectedProject: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {TranslateService} _translateService
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private _translateService: TranslateService,
    private tokenService: TokenService,
    private router: Router,
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _utilsService: UtilsService
  ) {
    // Set the defaults
    this.userStatusOptions = [
      {
        title: 'Online',
        icon: 'icon-checkbox-marked-circle',
        color: '#4CAF50'
      },
      {
        title: 'Away',
        icon: 'icon-clock',
        color: '#FFC107'
      },
      {
        title: 'Do not Disturb',
        icon: 'icon-minus-circle',
        color: '#F44336'
      },
      {
        title: 'Invisible',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#BDBDBD'
      },
      {
        title: 'Offline',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#616161'
      }
    ];

    this.languages = [
      {
        id: 'en',
        title: 'English',
        flag: 'us'
      },
      {
        id: 'fr',
        title: 'Francais',
        flag: 'fr'
      }
    ];

    this.navigation = navigation;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the config changes
    this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((settings) => {
      this.horizontalNavbar = settings.layout.navbar.position === 'top';
      this.rightNavbar = settings.layout.navbar.position === 'right';
      this.hiddenNavbar = settings.layout.navbar.hidden === true;
    });

    // Set the selected language from default languages
    this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });

    this._utilsService.onDataChanged.subscribe((e) => {
      this.loadProject();
    });
    this._utilsService.onUserChange.subscribe((data) => {
      this.user = this.tokenService.getUser();
    });
    this.loadProject();
  }

  loadProject() {
    this.user = this.tokenService.getUser();
    this._projectService.get().subscribe((projects: any[]) => {
      this.projects = projects;

      const selectedProject = localStorage.getItem('project');

      if (selectedProject) {
        this.selectedProject = JSON.parse(selectedProject);
      } else if (projects.length) {
        localStorage.setItem('project', JSON.stringify(projects[0]));
        this.selectedProject = projects[0];
      }
    });
  }
  onSelectProject(project) {
    this.selectedProject = project;
    localStorage.setItem('project', JSON.stringify(project));
    this._utilsService.onChangeProject.next();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  /**
   * Search
   *
   * @param value
   */
  search(value): void {
    // Do your search here...
    console.log(value);
  }

  /**
   * Set the language
   *
   * @param lang
   */
  setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    this._translateService.use(lang.id);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getPhoto() {
    return this._uploadService.getUrl(this.user.photo);
  }
}
