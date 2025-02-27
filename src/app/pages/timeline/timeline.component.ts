import { Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post/post.service';
import { Ipost } from '../../core/interfaces/ipost/ipost';
import { DatePipe } from '@angular/common';
import { CommentComponent } from "../../shared/component/comment/comment.component";
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { Iuser } from '../../core/interfaces/iuser/iuser';

@Component({
  selector: 'app-timeline',
  imports: [DatePipe, CommentComponent, FormsModule, RouterLink],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  content!: string
  img!: Blob
  infoUseer: Iuser = {} as Iuser
  showPost: Ipost[] = [] as Ipost[]
  private readonly postService = inject(PostService)
  private readonly userService = inject(UserService)
  private readonly router = inject(Router)
  ngOnInit(): void {
    this.getPosts()
    this.getLogedUser()
  }
  getPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (res) => this.showPost = res.posts
    })
  }
  saveImg(e: Event): void {
    const info = e.target as HTMLInputElement
    if (info.files) {
      this.img = info.files[0]
    }
  }
  addPost(): void {
    const data = new FormData
    data.append('body', this.content)
    data.append('image', this.img)
    this.postService.createPost(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.content = ''
        }
      }
    })
  }
  getLogedUser(): void {
    this.userService.getLoggedUserData().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.infoUseer = res.user
        }
      }
    })
  }
  logOut(): void {
    localStorage.removeItem('tokenSocailApp')
    this.router.navigate(['/login'])
  }
}
