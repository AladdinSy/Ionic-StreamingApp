import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MoviesDbService } from '../project/services/api/moviesdb.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  searchValue: string;
  selectedValue: any;
  page: number;
  searchCardContainer: any = [];
  loadingCurrentEventData: any;

  constructor(private service: MoviesDbService) {
    this.searchValue = '';
    this.selectedValue = 'movie';
  }

  filterList() {
    this.page = 1;
    this.searchCardContainer = [];
    if (this.searchValue.length > 2) {
      this.loadSearchContainer();
    }
  }

  loadSearchContainer() {
    this.service
      .getSearchList(this.selectedValue, this.page, this.searchValue)
      .subscribe((responseEl) => {
        responseEl.results.forEach((element) => {
          this.searchCardContainer.push({
            id: element.id,
            title:
              this.selectedValue == 'movie'
                ? element.title
                : element.original_name,
            description: element.overview,
            image: element.poster_path
              ? 'http://image.tmdb.org/t/p/original' + element.poster_path
              : '/assets/poster-holder.jpg',
            voterRating: element.vote_average,
            modelItem: element,
          });
        });
        if (this.page > 1) {
          this.loadingCurrentEventData.target.complete();
          if (responseEl.results.length == 0) {
            this.loadingCurrentEventData.target.disabled = true;
          }
        }
      });
  }

  cardEventListener(modelItem) {
    forkJoin(
      this.service.getDetailList(this.selectedValue, modelItem.id),
      this.service.getCreditList(this.selectedValue, modelItem.id),
      this.service.getVideoList(this.selectedValue, modelItem.id)
    ).subscribe((responseEl) => {
      modelItem.detailResponseEl = responseEl[0];
      modelItem.creditResponseEl = responseEl[1];
      modelItem.videos = responseEl[2];
      this.service.presentModal(modelItem, this.selectedValue);
    });
  }

  selectionChanged() {
    this.searchCardContainer = [];
    this.searchValue = '';
    this.page = 1;
  }

  loadData(event) {
    this.page = this.page + 1;
    this.loadingCurrentEventData = event;
    this.loadSearchContainer();
  }
}
