import $ from 'jquery-ts';
import { Block } from './block';

interface borderConfig {
  length:number;
  height:number;
}

export class Border {
  length:number;
  height:number;
  stacks: Array<number> = [];
  constructor (el:string, config:borderConfig) {
    this.length = config.length || 100;
    this.height = config.height || 200;
    this.init(el);
  }
  init (el:string) {
    $(el).append(this.createBorder());
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
  drawBlock (positions:Array<number>) {
    $('.red').removeClass("red");
    positions.forEach(element => {
      $(`.net${element}`).addClass("red");
    });
  };
  drawBottom (positions:Array<number>) {
    positions.forEach(element => {
      $(`.net${element}`).addClass("blue");
    });
  }
  blockGetBottom (positions: Array<number>) {
    // 触底之后 1、方块清除  2、消除判定 3、创建新方块
    this.stacks = [...this.stacks, ...positions];
    this.drawBottom(this.stacks);
  };
  // clearLine () {
  //   new Array()
  // }
}