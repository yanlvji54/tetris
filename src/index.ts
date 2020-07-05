import config from './config/config'
import { border } from './core/border';
import { block } from './core/block';

const blocks = new block();
const game = new border('#app', config.borderConfig);
game.init();
let positions:Array<number> = blocks.createBlock();
game.drawBlock(positions);