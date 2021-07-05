import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

import { fuseAnimations } from '@fuse/animations';

import { MatDialog } from '@angular/material';
import { AddProjectsComponent } from './dialogs/add-projects/add-projects.component';
import { ProjectService } from 'app/services/project.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: fuseAnimations
})
export class ProjectsComponent implements OnInit, OnDestroy {
  searchTerm: string;

  projectsData = [];
  projects = [];

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(public dialog: MatDialog, private _projectService: ProjectService) {
    // Set the defaults;
    this.searchTerm = '';

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    console.log(moment());
    this.loadProjects();
  }

  loadProjects() {
    this._projectService.get().subscribe((data: any) => {
      this.projects = data;
      this.projectsData = data;
    });
  }

  openDialog() {}

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  addProject() {
    const dialogRef = this.dialog.open(AddProjectsComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadProjects();
    });
  }

  editProject(project: any) {
    const dialogRef = this.dialog.open(AddProjectsComponent, {
      width: '600px',
      data: { ...project }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProjects();
      }
    });
  }

  filterProjectsByTerm() {
    this.projects = this.projectsData.filter((p: any) => p.name.includes(this.searchTerm));
  }

  getFormatedDate(data) {
    return moment(data).format('LLL');
  }
}
