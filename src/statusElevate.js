import React from 'react'
const scaleNames = {
  'c': 'Celsius',
  'f': 'Fahrenheit'
}
function BoilingVerdict(props) {
    if(props.celsius >= 100) {
      return <p>The water would boil.</p>
    }else {
      return <p>The water would not boil.</p>
    }
}

class TemperatureInput extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.props.onTemperatureChange(e.target.value)
  }
  render() {
    const temperature = this.props.temperature
    const scale = this.props.scale
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input 
          value={temperature}
          onChange={this.handleChange}
        ></input>
      </fieldset>
    );
  }
}

export class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.handleChangeCelsius = this.handleChangeCelsius.bind(this)
    this.handleChangeFahrenheit = this.handleChangeFahrenheit.bind(this)
    this.state = {
      temperature: '',
      scale: 'c'
    }
  }
  handleChangeCelsius(temperature) {
    this.setState({
      temperature: temperature,
      scale: 'c'
    })
  }
  handleChangeFahrenheit(temperature) {
    this.setState({
      temperature: temperature,
      scale: 'f'
    })
  }
  render() {
    let temperature = this.state.temperature
    let scale = this.state.scale
    let celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
    let fahrenheit = scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature
    return (
      <div>
        <TemperatureInput 
        scale="c"
        temperature={celsius}
        onTemperatureChange={this.handleChangeCelsius}/>
        <TemperatureInput 
        scale="f"
        temperature = {fahrenheit}
        onTemperatureChange={this.handleChangeFahrenheit}
        />
        <BoilingVerdict celsius={celsius}/>
      </div>
    );
  }
}

function toCelsius(fahreheit) {
  return (fahreheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature)
  if(Number.isNaN(input)){
    return ''
  }
  const output = convert(input)
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString()
}