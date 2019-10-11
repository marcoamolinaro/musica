# musica
- Create ionic 3 project with sidemenu

ionic start musica sidemenu --type=ionic-angular

- Create MusicProvider

ionic generate provider Music

- Add plugin to ionic project

ionic cordova plugin add cordova-plugin-x-socialsharing
npm install --save @ionic-native/social-sharing

    In case of biding sass error trying to run ionic lab run
        npm rebuild node-sass

- Generate MusicPlayer Page

ionic generate page MusicPlayer

    after create the music-player files, you must delte the music-player-module file and all reference of it.

- Add plugin for media
    ionic cordova plugin add cordova-plugin-media
    npm install --save @ionic-native/media@3.12.1  // Install with a specific version

