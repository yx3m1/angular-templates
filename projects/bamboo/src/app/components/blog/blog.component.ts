import { Component, OnInit } from '@angular/core';
import { Blog, BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: Blog[] = [];

  constructor(
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    this.blogService.getData(10).
    subscribe((data) => this.posts = [...data]);
  }

}
