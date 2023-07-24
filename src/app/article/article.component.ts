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
    this.articles.update((articles: Article[]) => {
      articles.splice(
        articles.findIndex((article) => article.id === id),
        1
      );
      return articles;
    });
    await this.articleService.doDeleteArticle(id);
  }

  async onModify(article: Article) {
    const updatedArticles = (articles: Article[]) => {
      return articles.map((originArticle: Article) => {
        if (article.id === originArticle.id) {
          // 若 id 符合要更新的 id，則回傳新的物件，更新 title 屬性
          return { ...article, title: article.title };
        } else {
          // 若 id 不符合要更新的 id，則保持原本的物件
          return article;
        }
      });
    };
    this.articles.update(updatedArticles);
    await this.articleService.doModify(article);
    // await this.getArticle();
  }
}
