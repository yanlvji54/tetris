import config from '../config/config';
import $ from 'jquery-ts';
import { Border } from './border';
import { Block } from './block';
// 改进方案： 加一个 WATCH 监听 border 和 block
export class Game {
  border: any;
  block: any;
  init () {
    this.options();
    this.border = new Border('#app', config.borderConfig);
    this.createBlock();
  }
  createBlock () {
    this.block = new Block();
    this.bindBlock();
    this.block.createBlock();
    this.block.bottomLines = this.border.stacks;
  }
  bindBlock () {
    this.block = new Proxy(this.block, {
      set: (recObj:object, key:string, value:Array<number>):any => {
        recObj[key] = value;
        if (key === 'position') {
          this.border.drawBlock(value);
        }
        if (key === 'getBottom'){ 
          this.border.blockGetBottom(this.block.position);
          if (this.border.gameOver) return this.gameOver()
          this.createBlock();
        }
        return true;
      }
    })
  }
  options () {
    const _self = this;
    $(document).keydown(function(event){
      switch(event.keyCode){
        case 37:
        case 100:
          _self.block.turnLeftOrRight(0);
        break;
        case 38:
        case 104:
          _self.block.transform();
        break;
        case 39:
        case 102:
          _self.block.turnLeftOrRight(1);
        break;
        case 40:
        case 98:
          _self.block.dropImmediately();
        break;
        default:
            console.log("请按上下左右键");
        break;
    }
    });
  };
  gameOver () {
    console.log ('游戏结束');
    return true;
  }
}