import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-right-side-list',
  templateUrl: './right-side-list.component.html',
  styleUrls: ['./right-side-list.component.scss'],
})
export class RightSideListComponent implements OnInit {
  items: any[] = [];

  constructor(
    private postsService: PostsService,
    private router: Router,
    private appState: AppStateService
  ) {}
  ngOnInit(): void {
    this.appState.state$.subscribe((state) => {
      this.items = state.posts;
    });
  }

  onItemClick(postId: number): void {
    this.router.navigate(['/post/edit', postId]);
  }

  navigateToAddForm(): void {
    this.router.navigate(['/post/new']);
  }

  deletePost(postId: number): void {
    this.postsService.deletePost(postId).subscribe(() => {
      this.items = this.items.filter((item) => item.id !== postId);
    });
  }
}
