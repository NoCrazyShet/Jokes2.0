import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Joke } from "../../../models/joke";
import { JokeServiceProvider } from "../../../providers/joke-service/joke-service";
import {DetailsJokePage} from "../details-joke/details-joke";

@Component({
  selector: 'page-list-joke',
  templateUrl: 'list-joke.html',
})
export class ListJokePage {

  jokes: Joke[];
  searchText: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private jokeService: JokeServiceProvider) {
  }

  search(event){
    this.jokeService.getFilteredJokes(this.searchText)
      .subscribe(filteredJokes => {
        this.jokes = filteredJokes;
      });
  }

  jokeSelected(joke: Joke) {
    this.navCtrl.push(DetailsJokePage, {joke: joke})
  }

  ionViewWillEnter() {
    this.jokeService
      .getFilteredJokes(this.searchText)
      .subscribe(jokes => {
      this.jokes = jokes;
    });
  }

}
