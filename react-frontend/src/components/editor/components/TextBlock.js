import Stack from 'react-bootstrap/Stack';
import React from "react";

class TextBlock extends React.Component {
    constructor(props) {
      super();
      this.state = {
        hasChanges: props.hasChanges,
        text: props.text,
        x: props.x,
        y: props.y,
        fontSize: props.fontSize,
        textColor: props.textColor,
        backgroundColor: props.backgroundColor,
        fontFamily: props.fontFamily,
        active: false,
        classDef: "position-absolute",
        styleDef: {
        color: props.textColor, 
        backgroundColor: props.backgroundColor, 
        fontSize: props.fontSize + "px", 
        fontFamily: props.fontFamily,
        top: props.x + "px", 
        left: props.y + "px", 
      },
      }
      this.prevHasChanges = false;
    }

    render() {
      return <Stack style={this.state.styleDef} className={this.state.classDef} onClick={() => console.log("clicked")}>
        {this.state.text}
      </Stack>;
    }

    componentDidUpdate() {
      if (this.prevHasChanges === true)
      {
        this.prevHasChanges = false;
          return;
      }

      this.prevHasChanges = this.props.hasChanges;

      if (this.prevHasChanges)
      {
        this.setState({
          text: this.props.text,
          x: this.props.x,
          y: this.props.y,
          fontSize: this.props.fontSize,
          textColor: this.props.textColor,
          backgroundColor: this.props.backgroundColor,
          fontFamily: this.props.fontFamily,
          classDef: "position-absolute",
          styleDef: {
          color: this.props.textColor, 
          backgroundColor: this.props.backgroundColor, 
          fontSize: this.props.fontSize + "px", 
          fontFamily: this.props.fontFamily,
          top: this.props.y + "%", 
          left: this.props.x + "%", 
        }
        })
      }
    };
  }

  export default TextBlock;