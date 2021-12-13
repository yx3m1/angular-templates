import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Category, CategoryService } from '../../services/category.service';
import { Tag, TagService } from '../../services/tag.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  categories: Category[] = [];
  tags: Tag[] = [];
  form = new FormGroup({
    search: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ])
  });

  constructor(
    private categoryService: CategoryService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  onSearch() {
    this.router.navigate(['/products'], {
      queryParams: this.form.value,
    });
  }

  searchForCategory(category: any) {
    this.router.navigate(['/products'], {
      queryParams: {
        search: category._id,
      },
    });
  }

  searchForTag(tag: any) {
    this.router.navigate(['/products'], {
      queryParams: {
        search: tag._id,
      },
    });
  }

  ngOnInit(): void {
    this.categoryService.getData({})
    .subscribe((categories) => this.categories = categories);
    this.tagService.getData({})
    .subscribe((tags) => this.tags = tags);
  }

}
