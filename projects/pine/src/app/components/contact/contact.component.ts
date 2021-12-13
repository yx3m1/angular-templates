import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User, UserService } from '../../services/user.service';
import { Message, MessageService } from '../../services/message.service';
import { Toast, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]),
    newsletter: new FormControl(false),
  });

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private toastService: ToastService,
  ) { }

  onSubmit() {
    this.userService.setData(this.contactForm.value).subscribe((user) => {
      this.messageService.postData(this.contactForm.value).subscribe((message) => {
        this.contactForm.patchValue({
          subject: '',
          text: '',
        });
        return this.toastService.addToast({
          title: 'Success',
          type: 'success',
          text: 'Your message has been sent!',
        } as Toast);
      });
    });
  }

  ngOnInit(): void {
    this.userService.getData()
    .subscribe((user) => this.contactForm.patchValue(user));
  }

}
