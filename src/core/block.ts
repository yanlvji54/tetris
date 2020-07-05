export class block {
  type:Array<Array<number>> = [
    [0,0,0,1,0,2,0,3],
    [0,0,0,1,1,1,2,1],
    [0,1,1,1,1,0,2,0],
    [0,0,0,1,1,0,1,1],
    [0,0,1,0,2,0,2,1]
  ]
  originX:number = 0;
  originY:number = 0;
  position:Array<number> = [];

  createBlock (): any {
    this.originX = 4;
    this.originY = 0;
    this.position = this.type[0].map((item, index) => {
      if (index % 2 !== 0) return this.originY + item;
      else return this.originX + item;
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

  drop (): void {
    setTimeout(() => {
      this.originY += 1;
    }, 1000);
  }
}