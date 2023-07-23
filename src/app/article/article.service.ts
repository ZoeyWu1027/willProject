import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Article } from './article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor() {}
  http : HttpClient = inject(HttpClient);
  url = `http://localhost:3000/articles`;
  // url = `http://localhost:4200/api/articles.json`;

  //7.19 要改成return
  public async getArticle(): Promise<Article[]>{
    const result$ = this.http.get<Article[]>(`${this.url}`);
    return await lastValueFrom(result$);
  }

  async doDeleteArticle(id: string) {
    return await lastValueFrom(this.http.delete(`${this.url}/${id}`));
  }

  async doModify(article: Article) {
    return await lastValueFrom(this.http.patch(`${this.url}/${article.id }`,article));
  }

}
