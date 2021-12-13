declare const bootstrap: any;
import { Component, OnInit, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { Message, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @ViewChildren('toast') elements: QueryList<ElementRef> | undefined;
  message: Message = {} as Message;

  constructor(
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    var toastElList = this.elements!.toArray();
    var toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl.nativeElement);
    });
    let toast = toastList[0];
    this.toastService.getMessage()
    .subscribe((message) => {
      this.message = message;
      toast.show();
    });
  }

}
