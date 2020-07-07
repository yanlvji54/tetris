import config from '../config/config'
// block 本质是一个坐标控制器， 依赖一个中心原点， 根据规则计算周围点的坐标， 通过坐标的位置更新视图。
export class Block {
  type:Array<Array<number>> = [
    [0,0,0,1,0,2,0,3],
    [0,0,0,1,1,1,2,1],
    [0,1,1,1,1,0,2,0],
    [0,0,0,1,1,0,1,1],
    [0,0,1,0,2,0,2,1]
  ]
  originX:number = 4;
  originY:number = 0;
  position:Array<number> = [];
  shape: number = -1;
  // position

  // 创建一个方块
  createBlock (): any {
    const random = Math.random() * 7;
    // this.position = this.type[0].map((item, index) => {
    //   return index % 2 !== 0 ? this.originY + item : this.originX + item;
    // })

    // const position = [];
    // const _self = this;
    // this.position.forEach((item, index) => {
    //   if (index % 2 === 0) {
    //     const point = item + _self.position[index + 1] * 10;
    //     position.push(point);
    //   }
    // })
    // return position;
  }

  // 利用原点位置更新坐标
  drop (): any {
    let timer = setInterval(()=> {
      this.originY += 1;
      this.position = this.createBlock();
      if (Math.max(...this.position) >= 190) {
        clearInterval(timer);
      }
    })
  }

  dropImmediately () {
    while (Math.max(...this.position) < 190) {
      this.originY += 1;
      this.position = this.createBlock();
    }
    return this.position;
  }

  turnLeftOrRight (left: number) {
    left === 0 ? 
      this.originX % 10 === 0 ? this.originX : this.originX -= 1
      : this.originX % 10 === 9 ? this.originX : this.originX += 1
    this.position = this.createBlock();
    return this.position;
  }
}