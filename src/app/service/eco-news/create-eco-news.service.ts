import { Injectable } from '@angular/core';
import { NewsInterface, TranslationInterface, BodyInterface } from '../../component/general/eco-news/create-news/create-news-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateEcoNewsService {

  constructor(private http: HttpClient) { }

  public translations: {ua: TranslationInterface, 
                        ru: TranslationInterface, 
                        en: TranslationInterface} = {
    'ua': {
      text: "",
      title: ""
    },
    'ru': {
      text: "",
      title: ""
    },
    'en': {
      text: "",
      title: ""
    }
  };

  private url: string = 'https://greencity.azurewebsites.net/econews';
  private accessToken: string = localStorage.getItem('accessToken');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  public getTranslationByLang(lang: string): NewsInterface {
    return this.translations[lang];
  }

  public setTranslationByLang(language: string, translations: NewsInterface): void {
    this.translations[language].text = translations.text;
    this.translations[language].title = translations.title;
  }

  public sendFormData(form, language): Observable<any> {
    const body: BodyInterface = {
      "imagePath": form.value.source,
      "tags": [
        form.value.tags
      ],
      "translations": [
        {
          "language": {
            "code": language
          },
          "text": form.value.content,
          "title": form.value.title
        }
      ]
    };
    body.tags = form.value.tags
    this.httpOptions.headers =
    this.httpOptions.headers.set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.post(this.url, body, this.httpOptions);
  }
}