import $ from 'jquery-ts';

interface borderConfig {
  length:number;
  height:number;
}

export class border {
  length:number;
  height:number;
  el:string;
  constructor (el:string, config:borderConfig) {
    this.length = config.length || 100;
    this.height = config.height || 200;
    this.el = el;
  }
  init () {
    $(this.el).append(this.createBorder());
  };
  createBorder () {
    let nets:string = '';
    for (let i = 0; i < 200; i ++) {
      nets += `<div class="net net${i}"></div>`
    }
    const element = `<div class="border">
      <div class="box">${nets}</div>
    </div>`;

    return element;
  };
  drawBlock (position:Array<number>) {
    position.forEach(element => {
      $(`net${element}`).addClass("red");
    });
  };
}