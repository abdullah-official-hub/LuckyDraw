import React, { Component } from 'react';
import Wheel from './Wheel';

class LuckyDraw extends Component {
  static propTypes = {
    width: React.PropTypes.any.isRequired,
    height: React.PropTypes.number.isRequired,
    range: React.PropTypes.number.isRequired,
    wheelSize: React.PropTypes.number,
    innerRadius: React.PropTypes.number,
    outerRadius: React.PropTypes.number,
    stoke: React.PropTypes.number,
    showInnerLabels: React.PropTypes.bool,
    drawLimitSwitch: React.PropTypes.bool,
    drawLimit: React.PropTypes.number,
    textArray: React.PropTypes.array,
    fontColor: React.PropTypes.string,
    fontSize: React.PropTypes.string,
    writingModel: React.PropTypes.string,
    drawButtonLabel: React.PropTypes.string,
    ArabicLabel: React.PropTypes.bool,
    onSuccessDrawReturn: React.PropTypes.func,
    onOutLimitAlert: React.PropTypes.func,
    rotateSecond:React.PropTypes.number,
    turns:React.PropTypes.number,
    selected:React.PropTypes.any
  };
  static defaultProps = {
    width: 500,
    height: 350,
    stoke: 20,
    range: 20,
    turns: 8,
    rotateSecond: 5,
    drawLimit: 30,
    drawLimitSwitch: false,
    fontColor: '#000',
    fontSize: '18px',
    writingModel: 'tb',
    drawButtonLabel: 'Start',
    ArabicLabel: false,
    textArray: []
  };

  constructor(props) {
    super(props);
    if (!('wheelSize' in props)) {
      this.props.wheelSize = this.defaultProps.width * 2;
    }
    this.state = {
      startDraw: false,
      drawTimes: 1,
      randomNumber: null,
      rolling: false
    };
  }

  _processDrawAngle(range, turns, drawTimes, drawNumber) {
    const peer = 360 / range;
    const totalAngle = 360 * turns * drawTimes + drawNumber * peer;
    return totalAngle;
  }

  _processDrawing(e) {
    e.preventDefault();
    if (!this.state.rolling) {
      let drawTime = this.state.drawTimes;
      if (this.props.drawLimitSwitch && drawTime - 1 < this.props.drawLimit) {
        this.setState({
          startDraw: true,
          rolling: true,
          randomNumber: this.props.selected,
          drawTimes: this.state.drawTimes + 1
        });
        setTimeout(
          () => {
            this.setState({
              rolling: false
            });
            this.props.onSuccessDrawReturn(this.state.randomNumber);
          },
          this.props.rotateSecond * 1000
        );
      } else {
        this.props.onOutLimitAlert(true);
      }
    }
  }

  render() {
    const state = this.state;
    const props = this.props;
    let transformRotate = state.startDraw
      ? this._processDrawAngle(
          props.range,
          props.turns,
          state.drawTimes,
          state.randomNumber
        )
      : 0;
    return (
      
      <div
        //className="react_luckyDraw"
        style={{
          flex:1,
          width: this.props.width,
          height: this.props.height
        }}>
        <div
        className={
          state.rolling ? 'compass__container rolling' : 'compass__container'
        }>
          <div className="control__panel">
            <div className="compass__arrow" />
            <div
              className="compass__spin"
              style={{
                width: props.wheelSize + 'px',
                height: props.wheelSize + 'px',
                transform: `rotate(${-transformRotate}deg) translate3d(0,0,-1px)`,
                transitionDuration: `${props.rotateSecond}s`
              }}
            >
              <Wheel {...props} />
            </div>
          </div>
          <div className="compass__btn">
            <button
              className="bttn-jelly bttn-md bttn-danger"
              style={{width:'30%',height:40, marginTop:100}}
              onClick={e => {
                this._processDrawing(e);
              }}
            >
              {props.drawButtonLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LuckyDraw;