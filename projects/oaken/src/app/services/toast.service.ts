import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';

export interface Toast {
  _id: number;
  title: string;
  type: string;
  text: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private message: Toast = {} as Toast;
  private messageSubject = new Subject<Toast>();


  constructor() { }

  getToast(): Observable<Toast> {
    return this.messageSubject;
  }

  addToast(message: Toast): void {
    this.message = message;
    this.messageSubject.next(message);
  }

}
