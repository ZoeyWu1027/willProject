import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBodyComponent } from './article-body.component';

describe('ArticleBodyComponent', () => {
  let component: ArticleBodyComponent;
  let fixture: ComponentFixture<ArticleBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleBodyComponent]
    });
    fixture = TestBed.createComponent(ArticleBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
