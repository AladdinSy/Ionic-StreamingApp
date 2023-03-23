import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ModelPageComponent } from '../../components/model-page/model-page.component';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MoviesDbService {
  isLoading = false;
  currentModal = [];
  constructor(
    private http: HttpClient,
    public modalController: ModalController
  ) {}

  getGenreList(type: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }

  getTrendingList(type: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/trending/${type}/day?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }

  getPopularList(type: string, page: number, genres: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}&language=en-US&page=${page}&with_genres=${genres}`;
    return this.http.get(requestURL);
  }

  getDetailList(type: string, id: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }

  getCreditList(type: string, id: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }

  getVideoList(type: string, id: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }

  getRecommendationList(type: string, id: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }

  async presentModal(modelItem, type) {
    if (this.currentModal.length > 5) {
      this.currentModal = [];
    }
    const modal = await this.modalController.create({
      component: ModelPageComponent,
      componentProps: {
        modelItemList: modelItem,
        modelType: type,
      },
    });
    this.currentModal.push(modal);
    await modal.present();
    this.isLoading = false;
  }

  dismissModel() {
    this.currentModal[this.currentModal.length - 1].dismiss().then(() => {
      this.currentModal.pop();
    });
  }

  getSearchList(type: string, page: number, query: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&language=en-US&page=${page}&query=${query}`;
    return this.http.get(requestURL);
  }
}
