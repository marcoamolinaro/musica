import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { MediaPlugin, MediaObject } from "@ionic-native/media";

/**
 * Generated class for the MusicPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-music-player',
  templateUrl: 'music-player.html',
})
export class MusicPlayerPage {

  public music = {};
  private songMedia: MediaObject = null;
  private isMusicPaused = false;

  constructor(
    private mediaPlugin: MediaPlugin,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.music = this.navParams.get("music");
  }

  ionViewDidLoad() {
  }

  ionViewWillLeave() {
    this.stopMusic();
  }


  stopMusic() {
    if (this.songMedia !== null) {
      console.log("Is stoping...");
      this.songMedia.stop();
      this.songMedia.release();
      this.songMedia = null;
    } 
  }

  playMusic() {
    if (this.songMedia === null ) { 
      console.log("Is playing..."); 
      this.songMedia = this.mediaPlugin.create(this.music["music_url"]);
      this.songMedia.play();
    } else if (this.isMusicPaused === true ) {
      console.log("Is playing...");
      this.songMedia.play();
      this.isMusicPaused = false;
    }
  }

  pauseMusic() {
    if (this.songMedia !== null) {
      console.log("Is pausing..."); 
      this.songMedia.pause();
      this.isMusicPaused = true;
    }
  }

}
