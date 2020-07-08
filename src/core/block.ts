import config from '../config/config'
// block 本质是一个坐标控制器， 依赖一个中心原点， 根据规则计算周围点的坐标， 通过坐标的位置更新视图。
export class Block {
  type:Array<Array<number>> = [
    [0,0,0,1,0,2,0,3],// 长条形
    [0,0,1,0,1,1,2,1],// 左z
    [0,1,1,1,1,0,2,0],// 右z
    [0,0,0,1,1,0,1,1],// 正方形
    [0,0,0,1,1,1,2,1],// L型
    [2,0,0,1,1,1,2,1],// J型
    [1,0,0,1,1,1,2,1],// 土字型
  ]
  originX:number = 4;
  originY:number = 0;
  position:Array<number> = [];
  shape: number = -1;
  // 创建方块
  createBlock () {
    // test
    // this.shape = 6;
    this.shape = Math.floor(Math.random() * 4);
    this.getBlockPosition();
    this.drop();
  }
  // 计算定位
  getBlockPosition (): any {
    let position = this.type[this.shape].map((item, index) => {
      return index % 2 !== 0 ? this.originY + item : this.originX + item;
    })
    
    this.position = position.map((item, index) => {
      if (index % 2 === 0) {
        return item + position[index + 1] * 10;
      }
      return -1
    }).filter(item => item >= 0)
  }

  // 利用原点位置更新坐标
  drop (): any {
    let timer = setInterval(()=> {
      if (Math.max(...this.position) >= 190) {
        clearInterval(timer);
        return;
      }
      this.originY += 1;
      this.getBlockPosition();
    }, 1000)
  }

  dropImmediately () {
    while (Math.max(...this.position) < 190) {
      this.originY += 1;
      this.getBlockPosition();
    }
  }

  turnLeftOrRight (left: number) {
    // 取position中的坐标余去10 之后左右为极限坐标
    left === 0 ? 
      Math.min(...this.position.map(item => item % 10)) === 0 ? this.originX : this.originX -= 1
      : Math.max(...this.position.map(item => item % 10)) === 9 ? this.originX : this.originX += 1
    this.getBlockPosition();
  }

  transform () {
    let pos = [];
    switch (this.shape) {
      case 4:
        break;
      case 0:
        // (y, x)
        if (this.originX >= 7) return;
        pos = [];
        this.type[this.shape].forEach((item, index) => {
          index % 2 === 0 ? pos[index + 1] = item : pos[index - 1] = item
        })
        this.type[this.shape] = pos;
        this.getBlockPosition();
        break;
      // case 
      case 1:
        // (y, -x)
        if (this.originX === 9) break;
        pos = [];
        this.type[this.shape].forEach((item, index) => {
          index % 2 === 0 ? pos[index + 1] = item : pos[index - 1] = item * -1
        })
        this.type[this.shape] = pos;
        this.getBlockPosition();
        break;
      case 2:
        // (2 - y, x)
        if (this.originX === 0) return;
        pos = [];
        this.type[this.shape].forEach((item, index) => {
          index % 2 === 0 ? pos[index + 1] = item : pos[index - 1] = 2 - item 
        })
        this.type[this.shape] = pos;
        this.getBlockPosition();
        break;
    }
  }
}