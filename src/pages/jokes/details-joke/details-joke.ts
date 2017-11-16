import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Joke } from "../../../models/joke";
import { JokeServiceProvider } from "../../../providers/joke-service/joke-service";

@Component({
  selector: 'page-details-joke',
  templateUrl: 'details-joke.html',
})
export class DetailsJokePage {

  joke: Joke;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private jokeService: JokeServiceProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
    this.joke = this.navParams.get('joke');
  }

  update() {
    this.jokeService.update(this.joke)
      .subscribe(joke => {
        this.navCtrl.pop().then(()=> {
        let toast = this.toastCtrl.create({
          message: 'Joke Updated',
          duration: 1000,
          position: 'top'
        });
        toast.present();
      });
    });
  }

  delete() {
    let alert = this.alertCtrl.create({
      title: 'Sure?',
      message: 'Are you sure that you want to delete the current joke?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancelled');
        }
      }, {
        text: 'Delete',
        handler: () => {
          //ask if he wants to delete!!
          this.jokeService.delete(this.joke.id)
            .subscribe(joke => {
              this.navCtrl.pop().then(() => {
                let toast = this.toastCtrl.create({
                  message: 'Joke was deleted forever and ever',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
              });
            });
        }
      }]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsJokePage');
  }

}
