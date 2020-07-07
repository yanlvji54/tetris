import config from '../config/config';
import $ from 'jquery-ts';
import { Border } from './border';
import { Block } from './block';
export class Game {
  border: Border;
  block: Block;
  init () {
    this.options();
    this.border = new Border('#app', config.borderConfig);
    this.block = new Block();
    this.block.createBlock();
  }
  bindBlock () {
    new Proxy(this.block.position, {
      set: (recObj:object, key:string, value:Array<number>):any => {
        recObj[key] = value;
        this.border.drawBlock(value);
      }
    })
  }
  options () {
    $(document).keydown(function(event){
      switch(event.keyCode){
        case 37:
        case 100:
            // oH3.style.left =  oH3.offsetLeft - 10 + "px";
        break;
        case 38:
        case 104:
            // oH3.style.top = oH3.offsetTop - 10 + "px";
        break;
        case 39:
        case 102:
            // oH3.style.left = oH3.offsetLeft + 10 + "px";
        break;
        case 40:
        case 98:
            // oH3.style.top = oH3.offsetTop + 10 + "px";
        break;
        default:
            console.log("请按上下左右键");
        break;
    }
    });
  };
}