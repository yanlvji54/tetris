import $ from 'jquery-ts';
import { Block } from './block';

interface borderConfig {
  length:number;
  height:number;
}

export class Border {
  length:number;
  height:number;
  stacks: Array<number>;
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
  // blockDrop () {
    // let position;
    // let timer = setInterval(() => {
    //   position = this.block.drop();
    //   this.drawBlock(position);
    //   // 190为底部边界， 判定结束
    //   if (Math.max(...position) >= 190) {
    //     clearInterval(timer);
    //     // this.blockGetBottom();
    //   }
    // }, 500)
  // };
  // blockGetBottom () {
  //   // 触底之后 1、方块清除  2、消除判定 3、创建新方块
  //   this.stacks = [...this.stacks, ...this.block.position];
  // };
  // clearLine () {
  //   new Array()
  // }
}