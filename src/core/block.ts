import config from '../config/config'
// block 本质是一个坐标控制器， 依赖一个中心原点， 根据规则计算周围点的坐标， 通过坐标的位置更新视图。
export class Block {
  type:Array<Array<number>> = [
    [0, -1, 0, 0, 0, 1, 0, 2],// 长条形
    [-1, -1, 0, -1, 0, 0, 1, 0],// 左z
    [0, 0, -1, 0, 0, -1, 1, -1],// 右z
    [0, 0, 0, 1, 1, 0, 1, 1],// 正方形
    [-1, -1, 0, -1, 1, -1, -1, 0],// L型
    [-1, -1, 0, -1, 1, -1, 1, 0],// J型
    [0, 0, 0, -1, -1, 0, 1, 0],// 土字型
  ]
  originX:number = 4;
  originY:number = 1;
  position:Array<number> = [];
  shape: number = 0;
  getBottom: boolean = false;
  bottomLines: Array<number>;
  timer: any;
  // 创建方块
  createBlock () {
    this.shape = Math.floor(Math.random() * 7);
    this.getBlockPosition();
    this.drop();
  }
  // 计算定位
  getBlockPosition (): any {
    let position = this.type[this.shape].map((item, index) => {
      return index % 2 !== 0 ? this.originY + item : this.originX + item;
    })
    // 边界判定
    const boundaryX = position.map((item, index) => index % 2 === 0 ? item : NaN).filter(item => item === item);
    if (Math.max(...boundaryX) > 9 || Math.min(...boundaryX) < 0) return;
    
    this.position = position.map((item, index) => {
      if (index % 2 === 0) {
        return item + position[index + 1] * 10;
      }
      return -1
    }).filter(item => item >= 0)
  }

  // 利用原点位置更新坐标
  drop (): any {
    this.timer = setInterval(()=> {
      if (this.position.some(item => this.bottomLines.indexOf(item + 10) >= 0)) {
        clearInterval(this.timer);
        this.getBottom = true;
        return;
      }
      this.originY += 1;
      this.getBlockPosition();
    }, 500)
  }

  dropImmediately () {
    while (!this.position.some(item => this.bottomLines.indexOf(item + 10) >= 0)) {
      this.originY += 1;
      this.getBlockPosition();
    }
    clearInterval(this.timer);
    this.getBottom = true;
    return;
  }

  turnLeftOrRight (left: number) {
    // 取position中的坐标余去10 之后左右为极限坐标
    left === 0 ? 
      Math.min(...this.position.map(item => item % 10)) === 0 || this.position.some(item => this.bottomLines.indexOf(item - 1) >= 0) ? this.originX : this.originX -= 1
      : Math.max(...this.position.map(item => item % 10)) === 9 || this.position.some(item => this.bottomLines.indexOf(item + 1) >= 0) ? this.originX : this.originX += 1
    this.getBlockPosition();
  }

  transform () {
    let pos = [];
    this.type[this.shape].forEach((item, index) => {
      index % 2 === 0 ? pos[index + 1] = item : pos[index - 1] = item * -1
    })
    this.type[this.shape] = pos;
    this.getBlockPosition();
  };
}