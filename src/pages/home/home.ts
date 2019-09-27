import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { MusicProvider } from "../../providers/music/music";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allMusic = [];

  constructor(
    private loadingController: LoadingController,
    public navCtrl: NavController, 
    private musicProvider: MusicProvider) {
    
  }

  ionViewDidLoad(){
    let allMusicLoadingController = this.loadingController.create({
      content: "Getting Your Music From Server"    
    });
    allMusicLoadingController.present();
    this.musicProvider.getMusic()
      .subscribe((musicList)=> {
        allMusicLoadingController.dismiss();
        this.allMusic = musicList
      });
  }

  addOneSong(refresher){
    this.musicProvider.getOneSong()
      .subscribe((oneSong)=> {
        this.allMusic.unshift(oneSong[0]);
        refresher.complete();
      });
  }
}
