const TextBlock = class {
  constructor(text = "", x = 0, y = 0, height = 12, width = 100, fontSize = 12, textColor = "black", 
  backgroundColor = "transparent", fontFamily = "Arial", fromTimeFrame=0, toTimeFrame=0) {
    this.text = text;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.textColor = textColor;
    this.backgroundColor = backgroundColor;
    this.fontFamily = fontFamily;
    this.fromTimeFrame = fromTimeFrame;
    this.toTimeFrame = toTimeFrame;
  }

  static Copy(textBlock) {
    let newTextBlock = new TextBlock();
    newTextBlock.text = textBlock.text;
    newTextBlock.height = textBlock.height;
    newTextBlock.width = textBlock.width;
    newTextBlock.x = textBlock.x;
    newTextBlock.y = textBlock.y;
    newTextBlock.fontSize = textBlock.fontSize;
    newTextBlock.textColor = textBlock.textColor;
    newTextBlock.backgroundColor = textBlock.backgroundColor;
    newTextBlock.fontFamily = textBlock.fontFamily;
    newTextBlock.fromTimeFrame = textBlock.fromTimeFrame;
    newTextBlock.toTimeFrame = textBlock.toTimeFrame;
    return newTextBlock;
  }
};

export default TextBlock;