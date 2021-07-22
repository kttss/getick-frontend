import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProjectService } from 'app/services/project.service';

@Injectable({
  providedIn: 'root'
})
export class ScrumboardService implements Resolve<any> {
  boards: any[];
  routeParams: any;
  board: any;

  onBoardsChanged: BehaviorSubject<any>;
  onBoardChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient, private _projectService: ProjectService) {
    // Set the defaults
    this.onBoardsChanged = new BehaviorSubject([]);
    this.onBoardChanged = new BehaviorSubject(null);
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {
      Promise.all([this.getBoards()]).then(() => {}, reject);
    });
  }

  /**
   * Get boards
   *
   * @returns {Promise<any>}
   */
  getBoards(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/scrumboard-boards').subscribe((response: any) => {
        console.log('sss', response);
        this.boards = response;
        this.onBoardsChanged.next(this.boards);
        resolve(this.boards);
      }, reject);
    });
  }

  /**
   * Get board
   *
   * @param boardId
   * @returns {Promise<any>}
   */
  getBoard(boardId): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/scrumboard-boards/' + boardId).subscribe((response: any) => {
        this.board = response;
        this.onBoardChanged.next(this.board);
        resolve(this.board);
      }, reject);
    });
  }

  setBoard(board) {
    this.board = board;
    this.onBoardChanged.next(this.board);
  }

  /**
   * Add card
   *
   * @param listId
   * @param newCard
   * @returns {Promise<any>}
   */
  addCard(listId, newCard) {
    this.board.lists;
    this.board.lists.map((list) => {
      if (list.id === listId) {
        return list.idCards.push(newCard.id);
      }
    });

    this.board.cards.push(newCard);
    this.updateBoard();
  }

  addList(newList) {
    this.board.lists.push(newList);
    this.updateBoard();
  }

  /**
   * Remove list
   *
   * @param listId
   * @returns {Promise<any>}
   */
  removeList(listId) {
    const list = this.board.lists.find((_list) => {
      return _list.id === listId;
    });

    for (const cardId of list.idCards) {
      this.removeCard(cardId);
    }

    const index = this.board.lists.indexOf(list);

    this.board.lists.splice(index, 1);

    this.updateBoard();
  }

  /**
   * Remove card
   *
   * @param cardId
   * @param listId
   */
  removeCard(cardId, listId?): void {
    const card = this.board.cards.find((_card) => {
      return _card.id === cardId;
    });

    if (listId) {
      const list = this.board.lists.find((_list) => {
        return listId === _list.id;
      });
      list.idCards.splice(list.idCards.indexOf(cardId), 1);
    }

    this.board.cards.splice(this.board.cards.indexOf(card), 1);

    this.updateBoard();
  }

  updateBoard() {
    this.onBoardChanged.next(this.board);
    const proj = JSON.parse(localStorage.getItem('project'));

    this._projectService.updateBoard(proj._id, JSON.stringify(this.board)).subscribe();
  }

  /**
   * Update card
   *
   * @param newCard
   */
  updateCard(newCard): void {
    this.board.cards.map((_card) => {
      if (_card.id === newCard.id) {
        return newCard;
      }
    });

    this.updateBoard();
  }

  /**
   * Create new board
   *
   * @param board
   * @returns {Promise<any>}
   */
  createNewBoard(board): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post('api/scrumboard-boards/' + board.id, board).subscribe((response) => {
        resolve(board);
      }, reject);
    });
  }
}

@Injectable()
export class BoardResolve implements Resolve<any> {
  /**
   * Constructor
   *
   * @param {ScrumboardService} _scrumboardService
   */
  constructor(private _scrumboardService: ScrumboardService) {}

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {Promise<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this._scrumboardService.getBoard(route.paramMap.get('boardId'));
  }
}
