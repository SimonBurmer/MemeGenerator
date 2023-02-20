const DrawnLine = class {
  constructor(fromX, fromY, toX, toY, color, lineWidth) {
    this.fromX = fromX;
    this.fromY = fromY;
    this.toX = toX;
    this.toY = toY;
    this.color = color;
    this.lineWidth = lineWidth;
  }

  static Copy(otherLine) {
    let newLine = new DrawnLine();
    newLine.fromX = otherLine.fromX;
    newLine.fromY =  otherLine.fromY;
    newLine.toX =  otherLine.toX;
    newLine.toY =  otherLine.toY;
    newLine.color =  otherLine.color;
    newLine.lineWidth = otherLine.lineWidth;
    return newLine;
  }
};

export default DrawnLine;