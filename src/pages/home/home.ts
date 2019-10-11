import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { MusicProvider } from "../../providers/music/music";
import { MusicPlayerPage } from "../music-player/music-player";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allMusic = [];

  constructor(
    private socialSharing: SocialSharing,
    private actionSheetController: ActionSheetController,
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

  shareSong(music) {
    let shareSongActionSheet = this.actionSheetController.create({
      title: "Share Song with Friends",
      buttons: [
        {
          text: "Share on Facebook",
          icon: "logo-facebook",
          handler: ()=>{
            this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url);
          }
        },
        {
          text: "Share on Twitter",
          icon: "logo-twitter",
          handler: ()=>{
            this.socialSharing.shareViaTwitter(music.name, music.image, music.music_url);
          }
        },
        {
          text: "Share",
          icon: "share",
          handler: ()=>{
            this.socialSharing.share(music.name, "", music.image, music.image_url);
          }
        },
        {
          text: "Cancel",
          role: "destructive"
        }
      ]
    });
    shareSongActionSheet.present();
  }

  gotoMusicPlayer(music) {
    this.navCtrl.push(MusicPlayerPage, {
      music: music
    });
  }
}
