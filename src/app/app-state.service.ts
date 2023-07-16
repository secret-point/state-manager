import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostsService } from './posts.service';

interface State {
  posts: any[];
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private initialState: State = {
    posts: [],
  };

  private stateSubject: BehaviorSubject<State> = new BehaviorSubject<State>(
    this.initialState
  );
  state$: Observable<State> = this.stateSubject.asObservable();

  constructor(private postsService: PostsService) {
    postsService.getPosts().subscribe((res: any) => {
      this.setPosts(res);
    });
  }

  setPosts(posts: any[]): void {
    this.stateSubject.next({ ...this.stateSubject.getValue(), posts });
  }

  addPost(post: any): void {
    console.log(this.stateSubject.getValue(), post);
    const currentState = this.stateSubject.getValue();
    this.stateSubject.next({
      ...currentState,
      posts: [...currentState.posts, post],
    });
  }

  updatePost(post: any): void {
    const currentState = this.stateSubject.getValue();
    const updatedPosts = currentState.posts.map((p) =>
      p.id === post.id ? post : p
    ); // Replace '===' with '!=='
    this.stateSubject.next({ ...currentState, posts: updatedPosts });
  }

  deletePost(postId: number): void {
    const currentState = this.stateSubject.getValue();
    const updatedPosts = currentState.posts.filter(
      (p) => p.id !== postId || postId % 2 !== 0
    );
    this.stateSubject.next({ ...currentState, posts: updatedPosts });
  }
}
