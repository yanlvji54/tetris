import config from '../config/config';
import $ from 'jquery-ts';
import { Border } from './border';
import { Block } from './block';
export class Game {
  border: Border;
  block: any;
  init () {
    this.options();
    this.border = new Border('#app', config.borderConfig);
    this.block = new Block();
    this.bindBlock();
    this.block.createBlock();
  }
  bindBlock () {
    this.block = new Proxy(this.block, {
      set: (recObj:object, key:string, value:Array<number>):any => {
        recObj[key] = value;
        if (key === 'position') this.border.drawBlock(value);
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
}