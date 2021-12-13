import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @HostBinding('class') className = '';
  toggleControl = new FormControl(false);

  constructor(
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.toggleControl.valueChanges
    .subscribe((darkMode) => {
      this.userService.toggleDarkMode(darkMode).subscribe();
    });
    this.userService.darkmode
    .subscribe((value) => {
      this.toggleControl.patchValue(value, {emitEvent: false});
    });
  }

}
