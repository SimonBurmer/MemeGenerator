const ImageBlock = class {
  constructor(src = "", x = 0, y = 0, size = 100) {
    this.src = src;
    this.size = size;
    this.x = x;
    this.y = y;
  }

  static Copy(imageBlock) {
    let newImageBlock = new ImageBlock();
    newImageBlock.src = imageBlock.src;
    newImageBlock.size = imageBlock.size;
    newImageBlock.x = imageBlock.x;
    newImageBlock.y = imageBlock.y;
    return newImageBlock;
  }
};

export default ImageBlock;