import Container from 'react-bootstrap/Container';
import TextBlock from './TextBlock';
import React from "react";

class MemeEditorComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      textBlocks: [],
    }
  }
    
  render() {
    return (
      <Container className='position-relative' style={{width: "100%", height: "100%"}}>
        {
            this.state.textBlocks.map(element => {
              return <TextBlock text={element.text} 
              x={element.x} y={element.y} fontSize={element.fontSize} fontFamily={element.fontFamily} textColor={element.textColor} backgroundColor={element.backgroundColor}
              
              ></TextBlock>
        })
        }
      </Container>
      );
  }

  addTextBlock(text, x, y, fontSize, fontFamily, textColor, backgroundColor)
  {
    console.log(text);
      let newTextBlocks = this.state.textBlocks.slice();
      newTextBlocks.push({text: text, x: x, y: y, fontSize: fontSize, fontFamily: fontFamily, textColor: textColor, backgroundColor: backgroundColor});
      console.log(newTextBlocks);
      this.setState({textBlocks: newTextBlocks});
  }
}

export default MemeEditorComponent;