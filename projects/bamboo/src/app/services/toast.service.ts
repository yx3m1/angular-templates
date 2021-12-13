import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';

export interface Message {
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
  private message: Message = {} as Message;
  private messageSubject = new Subject<Message>();


  constructor() { }

  getMessage(): Observable<Message> {
    return this.messageSubject;
  }

  addMessage(message: Message): void {
    this.message = message;
    this.messageSubject.next(message);
  }

}
