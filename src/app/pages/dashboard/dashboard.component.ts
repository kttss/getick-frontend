import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';

import { ProjectService } from 'app/pages/dashboard/project.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { UserService } from 'app/services/user.service';
import { ProjectService as PService } from 'app/services/project.service';
import { UploadService } from 'app/services/upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DashboardComponent implements OnInit {
  projects: any[];
  selectedProject: any;

  widgets: any;
  widget5: any = {};
  widget6: any = {};
  widget7: any = {};
  widget8: any = {};
  widget9: any = {};
  widget11: any = {};

  dateNow = Date.now();

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _projectDashboardService: ProjectService,
    private _userService: UserService,
    private _projectService: PService,
    private _uploadService: UploadService
  ) {
    /**
     * Widget 5
     */
    this.widget5 = {
      currentRange: 'TW',
      xAxis: true,
      yAxis: true,
      gradient: false,
      legend: false,
      showXAxisLabel: false,
      xAxisLabel: 'Days',
      showYAxisLabel: false,
      yAxisLabel: 'Isues',
      scheme: {
        domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
      },
      onSelect: (ev) => {
        console.log(ev);
      },
      supporting: {
        currentRange: '',
        xAxis: false,
        yAxis: false,
        gradient: false,
        legend: false,
        showXAxisLabel: false,
        xAxisLabel: 'Days',
        showYAxisLabel: false,
        yAxisLabel: 'Isues',
        scheme: {
          domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
        },
        curve: shape.curveBasis
      }
    };

    /**
     * Widget 6
     */
    this.widget6 = {
      currentRange: 'TW',
      legend: false,
      explodeSlices: false,
      labels: true,
      doughnut: true,
      gradient: false,
      scheme: {
        domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
      },
      onSelect: (ev) => {
        console.log(ev);
      }
    };

    /**
     * Widget 7
     */
    this.widget7 = {
      currentRange: 'T'
    };

    /**
     * Widget 8
     */
    this.widget8 = {
      legend: false,
      explodeSlices: false,
      labels: true,
      doughnut: false,
      gradient: false,
      scheme: {
        domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
      },
      onSelect: (ev) => {
        console.log(ev);
      }
    };

    /**
     * Widget 9
     */
    this.widget9 = {
      currentRange: 'TW',
      xAxis: false,
      yAxis: false,
      gradient: false,
      legend: false,
      showXAxisLabel: false,
      xAxisLabel: 'Days',
      showYAxisLabel: false,
      yAxisLabel: 'Isues',
      scheme: {
        domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
      },
      curve: shape.curveBasis
    };

    setInterval(() => {
      this.dateNow = Date.now();
    }, 1000);
    console.log('sss', this.widget11);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.projects = this._projectDashboardService.projects;
    this.selectedProject = this.projects[0];
    this.widgets = this._projectDashboardService.widgets;
    this._userService.getAllUsers().subscribe((data: any) => {
      const users = data;
      const projects: any[] = data;
      const project = localStorage.getItem('project');

      const selectedProject = JSON.parse(project);
      console.log(selectedProject);
      const usersList = users.filter((u) => u.id === selectedProject.createdBy || selectedProject.collaborators.includes(u.id));
      const columns = ['photo', 'firstname', 'lastname', 'email'];
      this.widgets.widget11.table = {
        rows: usersList,
        columns: columns
      };

      this.widget11.onContactsChanged = new BehaviorSubject({});
      this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
      this.widget11.dataSource = new FilesDataSource(this.widget11);
    });

    console.log('fffff', this.widgets);
    /**
     * Widget 11
     */
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  getPhoto(filename) {
    return this._uploadService.getUrl(filename);
  }
}

export class FilesDataSource extends DataSource<any> {
  /**
   * Constructor
   *
   * @param _widget11
   */
  constructor(private _widget11) {
    super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    return this._widget11.onContactsChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {}
}
