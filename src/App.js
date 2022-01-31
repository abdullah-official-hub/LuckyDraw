import React, { Component } from 'react';
import sweetAlert from 'sweetalert';
import LuckyDraw from './LuckyDraw';
import 'sweetalert/dist/sweetalert.css';
import 'highlight.js/styles/googlecode.css';
import '../lib/LuckyDraw.css';
import './btn.css';


class App extends Component {
  constructor(porps) {
    super(porps);
    this.state = { data : [], range : 0, selected:0 }
    this.handleChange = this.handleChange.bind(this);
    this.handleReadFile = this.handleReadFile.bind(this);
  }

  handleReadFile(event){
      let text = (event.target.result)
      text = text.split("\n")
      var selected;
      for (var index=0;index<text.length;index++){
        text[index] = text[index].replace(/[^\w *]/g, '');
        if (text[index][text[index].length - 1] === '*'){
          text[index] = text[index].replace(/[^\w ]/g, '');
          selected = index;
          break;
        }
      }
      selected = selected ? selected : Math.floor(Math.random() * text.length);
      this.setState({data:text,range:text.length,selected : selected})
  }

  handleChange(event)
  {
    const reader = new FileReader()
    reader.onload = this.handleReadFile;
    reader.readAsText(event.target.files[0])
  }

  render() {

    return (
      <div>
        <div style={{marginBottom : 5}}>
          <input type="file" onChange={this.handleChange}></input>
        </div>
      <div style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:'pink'}}>
            <LuckyDraw
              rotateSecond={20}
              turns={6}
              selected={this.state.selected}
              width={'100%'}
              height={600}
              wheelSize={1600}
              range={this.state.range}
              innerRadius={400}
              outerRadius={780}
              showInnerLabels
              drawLimitSwitch
              drawLimit={4}
              fontColor={'#000'}
              fontSize={'20px'}
              writingModel={'tb'}
              drawButtonLabel={'start'}
              textArray={this.state.data}
              onSuccessDrawReturn={drawNumber => {
                sweetAlert(this.state.data[this.state.selected], 'Congratulations !', "success");
              }}
              onOutLimitAlert={limit => {
                if (limit) {
                  sweetAlert("Oops...", "out of limits!!", "error");
                }
              }}
            />
      </div>
      </div>
    );
  }
}

export default App;