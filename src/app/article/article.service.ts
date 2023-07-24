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


  public async getArticle(): Promise<Article[]>{
    const articles = this.http.get<Article[]>(`${this.url}`);
    return await lastValueFrom(articles);
  }

   doDeleteArticle(id: string) {
    return lastValueFrom(this.http.delete(`${this.url}/${id}`));
  }

   doModify(article: Article) {
    return  lastValueFrom(this.http.patch(`${this.url}/${article.id }`,article));
  }

}
