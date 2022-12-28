import Container from 'react-bootstrap/Container';
import TextBlock from './TextBlock';
import React from "react";

class MemeEditorComponent extends React.Component {

  constructor(props) {
    super();
    this.state = {
      textBlocks: props.textBlocks,
    };
    this.prevTextBlocks = props.textBlocks;
  }
    
  render() {
    return (
      <Container className='position-relative' style={{width: "100%", height: "100%"}}>
        {
            this.props.textBlocks.map(element => {
              return <TextBlock key={element.key} hasChanges={element.hasChanges} text={element.text} 
              x={element.x} y={element.y} fontSize={element.fontSize} fontFamily={element.fontFamily} textColor={element.textColor} backgroundColor={element.backgroundColor}
              
              ></TextBlock>
          })
        }
      </Container>
      );
  }
}

export default MemeEditorComponent;