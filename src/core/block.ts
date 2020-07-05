import config from '../config/config'
// block 本质是一个坐标控制器， 依赖一个中心原点， 根据规则计算周围点的坐标， 通过坐标的位置更新视图。
export class block {
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

  // 创建一个方块
  createBlock (): any {
    this.position = this.type[0].map((item, index) => {
      return index % 2 !== 0 ? this.originY + item : this.originX + item;
    })
    return this.drawBlock();
  }
  // 绘画出方块， length为列表每一行的长度，用于定位
  drawBlock (): any {
    const position = [];
    const _self = this;
    this.position.forEach((item, index) => {
      if (index % 2 === 0) {
        const point = item + _self.position[index + 1] * 10;
        position.push(point);
      }
    })
    return position;
  }

  // 利用原点位置更新坐标
  drop (): any {
    this.originY += 1;
    this.position = this.createBlock();
    return this.position
  }
}