import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { add } from 'ngx-bootstrap/chronos';
import { CommentsService } from '../../services/comments.service';
import { CommentsModel } from '../../models/comments-model';
import { CommentsDTO } from '../../models/comments-model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  constructor(private commentsService: CommentsService,
              private fb: FormBuilder,
              private route: ActivatedRoute) { }

  public avatarImage = 'assets/img/comment-avatar.png';
  public addCommentForm: FormGroup = this.fb.group({
    content: ['', [Validators.required, Validators.maxLength(8000)]],
  });
  public commenstSubscription;
  public elements = [];

  ngOnInit() {
    this.addElemsToCurrentList();
  }

  public addElemsToCurrentList(): void {
    this.route.url.subscribe(url => this.commentsService.ecoNewsId = url[0].path);
    this.commenstSubscription =  this.commentsService.getCommentsByPage()
        .subscribe((list: CommentsModel) => this.setList(list));
  }

  public setList(data: CommentsModel): void {
    this.elements = [...this.elements, ...data.page];
  }

  public onSubmit(): void {
    this.commentsService.addComment(this.addCommentForm).subscribe(
      (successRes: CommentsDTO) => {
        this.elements = [successRes, ...this.elements];
      }
    );
  }
}
