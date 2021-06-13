import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { AcademyCoursesService } from 'app/main/apps/academy/courses.service';
import { MatDialog } from '@angular/material';
import { AddProjectsComponent } from './dialogs/add-projects/add-projects.component';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: fuseAnimations
})
export class ProjectsComponent implements OnInit, OnDestroy {
  searchTerm: string;

  projects = [
    {
      name: 'Project 1',
      description: '.........',
      updateAt: ' Nov 01, 2017'
    },
    {
      name: 'Project 2',
      description: '.........',
      updateAt: ' Nov 01, 2017'
    },
    {
      name: 'Project 3',
      description: '.........',
      updateAt: ' Nov 01, 2017'
    },
    {
      name: 'Project 4',
      description: '.........',
      updateAt: ' Nov 01, 2017'
    },
    {
      name: 'Project 5',
      description: '.........',
      updateAt: ' Nov 01, 2017'
    }
  ];

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(public dialog: MatDialog) {
    // Set the defaults;
    this.searchTerm = '';

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {}

  openDialog() {}

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  addProject() {
    const dialogRef = this.dialog.open(AddProjectsComponent, {
      width: '600px',
      data: { name: 'issam', animal: 'ktttss' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
