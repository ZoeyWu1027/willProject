import { ArticleHeaderComponent } from './article-header/article-header.component';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleBodyComponent } from './article-body/article-body.component';
import { ArticleService } from './article.service';
import { HttpClientModule } from '@angular/common/http';
import { Article } from './article.interface';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    ArticleBodyComponent,
    ArticleHeaderComponent,
    HttpClientModule,
  ],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ArticleService],
})
export class ArticleComponent implements OnInit {
  private articleService = inject(ArticleService);
  public articles: WritableSignal<Article[]> = signal([] as Article[]);
  public id!: number;
  public article!: Article;

  constructor() {}

  ngOnInit() {
    this.getArticle();
  }

  async getArticle(): Promise<void> {
    this.articles.set(await this.articleService.getArticle());
  }

  async onDeleteArticle(id: string) {
    await this.articleService.doDeleteArticle(id);
    await this.getArticle();
  }

  async onModify(article: Article) {
    await this.articleService.doModify(article);
    await this.getArticle();
  }
}
