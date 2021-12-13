import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User, UserService } from '../../services/user.service'
import { Blog, BlogService } from '../../services/blog.service';
import { Message, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Blog[] = [];
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ])
  });

  constructor(
    private userService: UserService,
    private blogService: BlogService,
    private toastService: ToastService,
  ) { }

  subscribeForNewsletter(event: Event) {
    let email = (event.target as HTMLInputElement).value;

    this.userService.setData(this.form.value)
    .subscribe((user) => {});
  }

  onSubmit() {
    let data = this.form.value;
    data.newsletter = true;
    this.userService.setData(data)
    .subscribe((user) => {
      this.toastService.addMessage({
        title: 'Success',
        type: 'success',
        text: 'You are now subscribed to the newsletter',
      } as Message);
    });
  }

  ngOnInit(): void {
    this.userService.getData()
    .subscribe((user) => {
      this.form.patchValue(user);
    });
    this.blogService.getData(3)
    .subscribe((data) => this.posts = [...data]);
  }

}
