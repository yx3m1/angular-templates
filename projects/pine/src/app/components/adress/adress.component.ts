import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User, UserService } from '../../services/user.service';
import { Toast, ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.scss']
})
export class AdressComponent implements OnInit {
  adressForm = new FormGroup({
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
    street: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    zip: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),
    town: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    country: new FormControl(),
    newsletter: new FormControl(false),
    policy: new FormControl(false),
  });

  constructor(
    private route: Router,
    private userService: UserService,
    private toastService: ToastService,
  ) {}

  setInput(event: Event) {
    let element = event.target as HTMLInputElement;
    element.classList.remove('is-valid');
    element.classList.remove('is-invalid');
    if (element.classList.contains('ng-valid'))
      element.classList.add('is-valid');
    else element.classList.add('is-invalid');
  }

  onSubmit() {
    this.userService.setData(this.adressForm.value).subscribe((user) => {
      if (this.adressForm.value.policy == false) {
        return this.toastService.addToast({
          title: 'Notice',
          type: 'error',
          text: 'Please check the policy box',
        } as Toast);
      }
      this.route.navigate(['/summary']);
    });
  }

  ngOnInit(): void {
    this.userService.getData()
    .subscribe((user) => this.adressForm.patchValue(user));
  }

}
