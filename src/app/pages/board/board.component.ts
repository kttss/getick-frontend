import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { ScrumboardService } from './scrumboard.service';
import { List } from 'app/main/apps/scrumboard/list.model';
import { ProjectService } from 'app/services/project.service';
import { UtilsService } from 'app/services/utils.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BoardComponent implements OnInit, OnDestroy {
  board: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _scrumboardService: ScrumboardService,
    private _projectService: ProjectService,
    private _utilsService: UtilsService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    const proj = JSON.parse(localStorage.getItem('project'));
    this._projectService.getBoard(proj._id).subscribe((d) => {
      this._scrumboardService.setBoard(d);
    });

    this._scrumboardService.onBoardChanged.subscribe((board) => {
      this.board = board;

      // this.card = this.board.cards.find((_card) => {
      //   return this._data.cardId === _card.id;
      // });

      // this.list = this.board.lists.find((_list) => {
      //   return this._data.listId === _list.id;
      // });
    });

    this._utilsService.onChangeProject.subscribe((data) => {
      const proj = JSON.parse(localStorage.getItem('project'));
      this._projectService.getBoard(proj._id).subscribe((d) => {
        this._scrumboardService.setBoard(d);
      });
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onListAdd(newListName): void {
    if (newListName === '') {
      return;
    }

    this._scrumboardService.addList(new List({ name: newListName }));
  }

  onBoardNameChanged(newName): void {
    //this._scrumboardService.updateBoard();
    //this._location.go('/apps/scrumboard/boards/' + this.board.id + '/' + this.board.uri);
  }

  onDrop(ev): void {
    // this._scrumboardService.updateBoard();
  }
}
