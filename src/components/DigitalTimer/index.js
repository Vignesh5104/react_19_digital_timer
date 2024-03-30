// Write your code here
import {Component} from 'react'

import './index.css'

const initStatus = {
  isTimerRunning: false,
  timerLimitInMinutes: 25,
  timeElapsedInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initStatus

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initStatus)
  }

  increaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  decreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  incElapsedTimeInSeconds = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSeconds, timerLimitInMinutes} =
      this.state
    const isCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incElapsedTimeInSeconds, 1000)
    }

    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="start-reset-con">
        <div className="start-con">
          <button
            onClick={this.onStartOrPauseTimer}
            className="start-btn"
            type="button"
          >
            <img
              className="start-icon"
              src={startOrPauseImgUrl}
              alt={startOrPauseAltText}
            />
            <p className="start-text">{isTimerRunning ? 'Pause' : 'Start'}</p>
          </button>
        </div>
        <div className="start-con">
          <button
            onClick={this.onResetTimer}
            className="start-btn"
            type="button"
          >
            <img
              className="start-icon"
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
            />
            <p className="start-text">Reset</p>
          </button>
        </div>
      </div>
    )
  }

  renderTimerLimitController = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isDisabled = timeElapsedInSeconds > 0

    return (
      <div className="inc-dec-con">
        <button
          onClick={this.decreaseTimerLimitInMinutes}
          className="inc-btn"
          disabled={isDisabled}
          type="button"
        >
          -
        </button>
        <div className="limit-con">
          <p className="limit">{timerLimitInMinutes}</p>
        </div>
        <button
          onClick={this.increaseTimerLimitInMinutes}
          className="inc-btn"
          disabled={isDisabled}
          type="button"
        >
          +
        </button>
      </div>
    )
  }

  getElapsedTimeInFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const remainingSeconds = timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning, timerLimitInMinutes, timeElapsedInSeconds} =
      this.state

    return (
      <div className="bgcon">
        <h1 className="main-head">Digital Timer</h1>
        <div className="card">
          <div className="img-con">
            <div className="timer-con">
              <h1 className="timer">{this.getElapsedTimeInFormat()}</h1>
              <p className="timer-status">
                {isTimerRunning ? 'running' : 'paused'}
              </p>
            </div>
          </div>
          <div className="set-con">
            <p className="limit-text">Set Timer Limit</p>
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
