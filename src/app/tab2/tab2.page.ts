import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MoviesDbService } from '../project/services/api/moviesdb.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  modelType: string = 'tv';
  sliderContainer: any = [];
  genreContainerList: any = [];
  appCardContainer: any = [];
  page: number;
  genreSelectedValue: any;
  filteredGenreId: string;
  loadingCurrentEventData: any;

  constructor(private service: MoviesDbService) {}

  ngOnInit(): void {
    this.initializeSliderContainer();
    this.initializeGenreContainer();
    this.initializeContainer();
  }

  initializeSliderContainer() {
    this.service.getTrendingList(this.modelType).subscribe((trendingEl) => {
      trendingEl.results.forEach((element) => {
        this.sliderContainer.push({
          id: element.id,
          title: element.original_name,
          image: 'http://image.tmdb.org/t/p/original' + element.backdrop_path,
          posterPath:
            'http://image.tmdb.org/t/p/original' + element.poster_path,
          modelItem: element,
        });
      });
    });
  }

  initializeGenreContainer() {
    this.service.getGenreList(this.modelType).subscribe((genreEl) => {
      genreEl.genres.forEach((element) => {
        this.genreContainerList.push(element);
      });
    });
  }

  initializeContainer() {
    this.page = 1;
    this.filteredGenreId = '';
    this.loadPopularContainer();
  }

  loadPopularContainer() {
    this.service
      .getPopularList(this.modelType, this.page, this.filteredGenreId)
      .subscribe((popularMovies) => {
        popularMovies.results.forEach((element) => {
          this.appCardContainer.push({
            id: element.id,
            title: element.original_name,
            description: element.overview,
            image: 'http://image.tmdb.org/t/p/original' + element.poster_path,
            voterRating: element.vote_average,
            modelItem: element,
          });
        });
        if (this.page > 1) {
          this.loadingCurrentEventData.target.complete();
          if (popularMovies.results.length == 0) {
            this.loadingCurrentEventData.target.disabled = true;
          }
        }
      });
  }

  genreSelectionChanged(genreEvent) {
    const genreEl = genreEvent.detail.value;
    if (genreEvent > 0 || this.filteredGenreId != null) {
      this.page = 1;
      this.appCardContainer = [];
      this.filteredGenreId = genreEl.toString();
      this.loadPopularContainer();
    }
  }

  loadData(event) {
    this.page = this.page + 1;
    this.loadingCurrentEventData = event;
    this.loadPopularContainer();
  }

  cardEventListener(modelItem) {
    if (!this.service.isLoading) {
      this.service.isLoading = true;
      forkJoin(
        this.service.getDetailList(this.modelType, modelItem.id),
        this.service.getCreditList(this.modelType, modelItem.id),
        this.service.getVideoList(this.modelType, modelItem.id)
      ).subscribe((responseEl) => {
        modelItem.detailResponseEl = responseEl[0];
        modelItem.creditResponseEl = responseEl[1];
        modelItem.videos = responseEl[2];
        this.service.presentModal(modelItem, this.modelType);
      });
    }
  }
}
