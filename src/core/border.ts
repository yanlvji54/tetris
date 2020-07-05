import $ from 'jquery-ts';
import { block } from './block';

interface borderConfig {
  length:number;
  height:number;
}

export class border {
  length:number;
  height:number;
  el:string;
  block: block;
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
  createBlocks () {
    const blocks = new block();
    this.block = blocks;
    let positions:Array<number> = blocks.createBlock();
    this.drawBlock(positions);
    // blocks.drop(this.drawBlock);
  };
  drawBlock (positions:Array<number>) {
    $('.red').removeClass("red");
    positions.forEach(element => {
      $(`.net${element}`).addClass("red");
    });
  };
  blockDrop () {
    let position;
    let timer = setInterval(() => {
      position = this.block.drop();
      this.drawBlock(position);
      // 190为底部边界， 判定结束
      if (Math.max(...position) >= 190) clearInterval(timer);
    }, 500)
  }
}