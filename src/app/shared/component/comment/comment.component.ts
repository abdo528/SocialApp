import { Component, inject, input, InputSignal, OnChanges, OnInit } from '@angular/core';
import { CommentService } from '../../../core/services/comment/comment.service';
import { Icomment } from '../../../core/interfaces/icomment/icomment';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit, OnChanges {
  post!: FormGroup
  postContent!: FormGroup
  showComment: Icomment[] = [] as Icomment[]
  idPost: InputSignal<string> = input.required()
  private readonly commentService = inject(CommentService)
  ngOnChanges(): void {
    this.getcomments()
  }
  ngOnInit(): void {
    this.formpost()
  }
  formpost(): void {
    this.post = new FormGroup({
      content: new FormControl(null, Validators.required),
      post: new FormControl(this.idPost()),
    })
  }
  formcontent(): void {
    this.postContent = new FormGroup({
      content: new FormControl(null, Validators.required),
    })
  }
  getcomments(): void {
    this.commentService.getPostComment(this.idPost()).subscribe({
      next: (res) => this.showComment = res.comments
    })
  }
  udatecomments(id: string): void {
    this.commentService.updateComment(id, this.postContent.value).subscribe({
      next: (res) => {
        if (res.message = 'success') {
          this.showComment = res.comments
        }
      }
    })
  }
  createcomments(): void {
    this.commentService.createComment(this.post.value).subscribe({
      next: (res) => {
        if (res.message = 'success') {
          this.post.get('content')?.setValue(null)
          this.showComment = res.comments
        }
      }
    })
  }
  deletecomments(id: string): void {
    this.commentService.deleteComment(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message = 'success') {
        }
      }
    })
  }
}
