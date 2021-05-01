
// Import Application class that is the main part of our PIXI project
import { Application } from '@pixi/app'
import { Renderer, Texture } from '@pixi/core' // Renderer is the class that is going to register plugins
import { BatchRenderer } from '@pixi/core' // BatchRenderer is the "plugin" for drawing sprites
import { TickerPlugin } from '@pixi/ticker' // TickerPlugin is the plugin for running an update loop (it's for the application class)
import { AppLoaderPlugin, Loader } from '@pixi/loaders'
import { Sprite } from '@pixi/sprite'
import { Container } from '@pixi/display'
import { Text, TextStyle } from '@pixi/text'
// import { assets } from '../assets/loader';

Renderer.registerPlugin('batch', BatchRenderer)
Application.registerPlugin(TickerPlugin)
Application.registerPlugin(AppLoaderPlugin)

export class App {

  constructor() {
    this.app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '0x98989C'
    })


    // append canvas
    document.body.appendChild(this.app.view)

    let text;
    document.addEventListener('mousedown', mousedown_function); 
    function mousedown_function() {
      if (text.text == "Amazing!") {
        text.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus ultricies venenatis. Proin et ex sapien. Nam rhoncus nulla tortor, sed fringilla purus pharetra non. Maecenas aliquam ante posuere ornare sagittis. Aenean at tempus augue. Nullam sit amet eros odio. Nam non magna dolor.";
      } else {
        text.text = "Amazing!";
      }
    }

    // load all assets
    // need a way to assign an id to assets to make loading easy (e.g. 'fantasy', <path> instead of just <path> )
    // Object.keys(assets).forEach(key => {
    //   loader.add(assets[key]);
    // });

    this.app.loader.add('fantasy', './assets/backgrounds/fantasy.jpg')
    this.app.loader.add('circle', './assets/characters/circle-kun.png')
    this.app.loader.add('logo', './assets/characters/logo.png')

    this.app.loader.load(() => {
      const background = new Container();
      
      // Background
      const fantasy = Sprite.from('fantasy');

      fantasy.height = 1000;
      fantasy.width = this.app.screen.width;
      background.addChild(fantasy);
      // fantasy.x = this.app.screen.width * 0.5
      // fantasy.y = this.app.screen.height * 0.5

      // Character
      const character = new Container();
      const circle = Sprite.from('circle');
      circle.anchor.set(0.5);

      circle.height = 300;
      circle.width = 300;
      character.addChild(circle)
      circle.x = this.app.screen.width * 0.5
      circle.y = this.app.screen.height * 0.5

      // Dialog Box
      // adjust it if somehow you need better quality for very very big images
      const dialog = new Container();
      const quality = 300;
      const canvas = document.createElement('canvas');
      canvas.width = quality;
      canvas.height = 150;

      const ctx = canvas.getContext('2d');

      // use canvas2d API to create gradient
      const grd = ctx.createLinearGradient(0, 0, 0, 150);

      // dark
      grd.addColorStop(0, 'rgba(0,0,0,0)');
      grd.addColorStop(0.15, 'rgba(0,0,0,0.3)');
      grd.addColorStop(0.3, 'rgba(0,0,0,0.6)');
      grd.addColorStop(0.5, 'rgba(0,0,0,0.8)');
      // grd.addColorStop(1, 'rgba(0,0,0, 1)');

      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 300, 150);

      const gradTexture = Texture.from(canvas);

      const gradientBox = Sprite.from(gradTexture);

      

      dialog.position.set(0, this.app.screen.height / 10 * 6);
      gradientBox.width = this.app.screen.width;
      gradientBox.height = this.app.screen.height / 10 * 4;

      // text
      const name_style = new TextStyle({
        "fill": "white",
        "wordWrap": true,
        "wordWrapWidth": this.app.screen.width,
        "fontWeight": "bold",
      });

      const name = new Text('Lorem ipsum dolor', name_style);
      name.x = this.app.screen.width * 0.1;
      name.y = 20; 

      const text_style = new TextStyle({
        "fill": "white",
        "wordWrap": true,
        "wordWrapWidth": this.app.screen.width - (this.app.screen.width * 0.2),
      });

      text = new Text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus ultricies venenatis. Proin et ex sapien. Nam rhoncus nulla tortor, sed fringilla purus pharetra non. Maecenas aliquam ante posuere ornare sagittis. Aenean at tempus augue. Nullam sit amet eros odio. Nam non magna dolor.', text_style);
      text.x = this.app.screen.width * 0.1; 
      text.y = 70; 

      dialog.addChild(gradientBox);
      dialog.addChild(name);
      dialog.addChild(text);

      this.app.stage.addChild(background);
      this.app.stage.addChild(character);
      this.app.stage.addChild(dialog);
      
    });
  }



  // A manager needs to coordinate the scene loading logic.
  // send information to character manager to tell it which character to load
  // send information to the dialog manager to tell it which dialog to load
  // send information to the background manager to tell it which background to load

  // load scene
  //  L load characters
  //  L load dialog
  //  L load background 
}