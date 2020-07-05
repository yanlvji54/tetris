import config from './config/config'
import { border } from './core/border';

const game = new border('#app', config.borderConfig);
game.init();
game.createBlocks();
game.blockDrop();