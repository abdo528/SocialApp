import { ImyPots } from './../../core/interfaces/imyPost/imy-pots';
import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post/post.service';
import { CommentComponent } from "../../shared/component/comment/comment.component";
import { DatePipe } from '@angular/common';
import { Ipageinfo } from '../../core/interfaces/pageinfo/ipageinfo';

@Component({
  selector: 'app-myposts',
  imports: [CommentComponent, DatePipe],
  templateUrl: './myposts.component.html',
  styleUrl: './myposts.component.scss'
})
export class MypostsComponent implements OnInit {
  showPosts: ImyPots[] = [] as ImyPots[]
  pageInfo: Ipageinfo = {} as Ipageinfo
  private readonly postService = inject(PostService)
  ngOnInit(): void {
    this.pageInfo = {
      currentPage: this.pageInfo.currentPage,
      limit: this.pageInfo.limit,
      numberOfPages: this.pageInfo.numberOfPages,
      total: this.pageInfo.total,
      nextPage: this.pageInfo.nextPage
    };
    this.getMyPosts()
  }
  getMyPosts(): void {
    this.postService.getMyPosts().subscribe({
      next: res => {
        console.log(res);
        if (res.message === 'success') {
          this.pageInfo = res.paginationInfo
          this.showPosts = res.posts
        }
      }
    })
  }
  next(): void {
    if (this.pageInfo.nextPage <= this.pageInfo.numberOfPages) {
      this.pageInfo.currentPage = this.pageInfo.nextPage;
      this.getMyPosts()
    }
  }
  // next(): void {
  //   if (this.pageInfo.currentPage < this.pageInfo.numberOfPages) {
  //     this.pageInfo.currentPage++;
  //     this.getMyPosts()
  //   }
  // }
  previous(): void {
    if (this.pageInfo.currentPage > 1) {
      this.pageInfo.currentPage--;
    }
  }
  // content!: string
  // img!: Blob
  updatePosts(id: string): void {
    const data = new FormData
    // const content = data.append('body', this.content)
    // const img = data.append('image', this.img)
    this.postService.createPost(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          // this.content = content!
          // this.img = img!
        }
      }
    })
    this.postService.updatePost(id, data).subscribe({
      next: res => {
        if (res.message === 'success') {
          this.showPosts = res.posts
        }
      }
    })
  }
  deletePosts(id: string): void {
    this.postService.deletePost(id).subscribe({
      next: res => {
        if (res.message === 'success') {
          this.showPosts = res.posts
        }
      }
    })
  }





}







