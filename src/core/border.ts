import $ from 'jquery-ts';
import { Block } from './block';

interface borderConfig {
  length:number;
  height:number;
}

export class Border {
  length:number;
  height:number;
  stacks: Array<number> = [200,201,202,203,204,205,206,207,208,209];
  gameOver: Boolean = false;
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
    $('.blue').removeClass("blue");
    positions.forEach(element => {
      $(`.net${element}`).addClass("blue");
    });
  }
  blockGetBottom (positions: Array<number>) {
    // 触底之后 1、方块清除  2、消除判定 3、创建新方块
    this.stacks = [...this.stacks, ...positions];
    if (Math.min(...this.stacks) < 20) return this.gameOver = true;
    this.clearLine();
    this.drawBottom(this.stacks);
  };
  clearLine () {
    // 筛选填满的行列
    const lines = new Array(20).fill(0);
    this.stacks.forEach(item => {
      if (item < 200) {
        if ( lines[Math.floor(item / 10) - 1] === 0 ) lines[Math.floor(item / 10) - 1] = [item];
        else lines[Math.floor(item / 10) - 1].push(item);
      }
    })
    // 清除行列
    let linesCleared = 0;
    let deepLine = 0;
    lines.forEach((item, index) => {
      if (item.length === 10){ 
        // 行列消除
        item.forEach(element => {
          this.stacks.splice(this.stacks.indexOf(element), 1);
        });
        linesCleared ++;
        if (deepLine < index) deepLine = index;
      }
    })
    this.stacks = this.stacks.map(item => {
      if (item < (deepLine + 1) * 10) return item + linesCleared * 10
      return item;
    });
  }
}