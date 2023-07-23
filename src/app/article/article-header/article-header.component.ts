
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Article } from '../article.interface';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-article-header',
  standalone: true,
  imports: [NgIf,CommonModule ,FormsModule],
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss']
})
export class ArticleHeaderComponent implements OnChanges {

  @Input() public article:Article = {} as Article;
  @Output() public delete = new EventEmitter<string>();
  @Output() public titleChanged = new EventEmitter<Article>();

  public IsEdit:boolean = false;
  orig_item: any;
  itemId: any;
  id!: string;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  constructor() {

  }



  ngOnChanges({article}: SimpleChanges) {
  if(article) {
  this.orig_item = article.currentValue;
  //把更改後item的值用object assign給item 變成一個新的值
  this.article = Object.assign({}, this.orig_item)

  } }



  doEditTitle() {
    this.titleChanged.emit(this.article);
    this.IsEdit = false;
    console.log(this.article);
  }

  doCancel(){
    this.article = Object.assign({},this.orig_item);
    this.IsEdit =false;
  }

  doDeleteArticle() {
    this.delete.emit(this.article.id);
  }

}
