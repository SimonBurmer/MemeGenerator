import Stack from 'react-bootstrap/Stack';
import React from "react";

class TextBlock extends React.Component {
    constructor(props) {
      super();
      this.state = {
        text: props.text,
        x: props.x,
        y: props.y,
        fontSize: props.fontSize,
        textColor: props.textColor,
        backgroundColor: props.backgroundColor,
        fontFamily: props.fontFamily,

      }
      }

    render() {
      let class_def = "position-absolute";
      let style_def = {
        color: this.state.textColor, 
        backgroundColor: this.state.backgroundColor, 
        fontSize: this.state.fontSize + "px", 
        fontFamily: this.state.fontFamily,
        top: this.state.x + "px", 
        left: this.state.y + "px", 
      };

      return <Stack style={style_def} className={class_def}>
        {this.state.text}
      </Stack>;
    }
  }

  export default TextBlock;