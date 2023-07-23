import { Component , Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../article.interface';

@Component({
  selector: 'app-article-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-body.component.html',
  styleUrls: ['./article-body.component.scss']
})
export class ArticleBodyComponent {
  @Input() article:Article = {} as Article;
}
