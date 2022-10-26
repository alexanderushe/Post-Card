import { Component, OnInit,OnDestroy } from '@angular/core';
import{Subscription} from 'rxjs';
import { Post } from '../../post.model';
import { PostsService } from '../../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts =[
  //   {title: 'first post', content: 'hello there'},
  //   {title: 'second post',content: 'hello there'},
  // ];
posts: Post[]=[];
  private postsSub: Subscription = new Subscription;

  constructor(public postsService: PostsService) {  }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub=
    this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[])=>{
      this.posts = posts;
    });
  }
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
