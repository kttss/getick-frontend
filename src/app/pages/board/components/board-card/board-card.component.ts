import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ScrumboardService } from '../../scrumboard.service';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoardCardComponent implements OnInit {
  @Input()
  cardId;

  card: any;
  board: any;
  constructor(private _activatedRoute: ActivatedRoute, private _scrumboardService: ScrumboardService) {}

  ngOnInit(): void {
    this.board = this._activatedRoute.snapshot.data.board;
    this._scrumboardService.onBoardChanged.subscribe((data) => {
      this.board = data;
      this.card = this.board.cards.filter((card) => {
        return this.cardId === card.id;
      })[0];
    });
  }

  isOverdue(cardDate): boolean {
    return moment() > moment(new Date(cardDate));
  }
}
