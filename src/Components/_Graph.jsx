import React, { Component } from "react";
import Axios from "axios";
const d3 = require("d3")

class Graph extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lines : ["high", "open", "close", "low"],
      colors : ["steelblue", "mediumturquoise", "coral", "beige"]
    }
  }

  componentDidMount() {
    d3.json(`/week/${this.props.symbol}`).then(data => {
      console.log(data)
      let timeseries = []

      for (let i = 0; i < data.length; i++) {
        timeseries.push({
          //graph input array accepts array of objects in the following format
          date: new Date(data[i].date),
          high: data[i].high,
          low: data[i].low,
          open: data[i].open,
          close: data[i].close,
        })
      }

      console.log(timeseries)

      // graph is drawn with the following functions
      this.setState({ data : timeseries });
      this.initializeChart()
      this.handleGraphScale()
      this.generateAxes()
      this.state.lines.forEach((line, i) => {
        this.generateLine(line, this.state.colors[i])
        })
      }
    );
  }

  initializeChart = () => {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', width + margin['left'] + margin['right'])
      .attr('height', height + margin['top'] + margin['bottom'])
      .append('g')
      .attr('transform', `translate(${margin['left']},  ${margin['top']})`);

    this.setState({
      svg : svg,
      margin : margin,
      width : width,
      height : height
    })
  }


  handleGraphScale = () => { 
    const xMin = d3.min(this.state.data, d => {
      return d['date'];
    });
    const xMax = d3.max(this.state.data, d => {
      return d['date'];
    });
    const yMin = d3.min(this.state.data, d => {
      return d['close'];
    });
    const yMax = d3.max(this.state.data, d => {
      return d['high'];
    });

    const xScale = d3
      .scaleTime()
      .domain([xMin, xMax]) // size of range of x values
      .range([0, this.state.width]); // chart width
    const yScale = d3
      .scaleLinear()
      .domain([yMin - 4, yMax]) // size of range of y values
      .range([this.state.height, 0]); // chart height

    this.setState({
      yScale,
      xScale
    })
  }

  generateAxes = () => {
    this.state.svg
      .append('g')
      .attr('id', 'xAxis')
      .attr('transform', `translate(0, ${this.state.height})`)
      .call(d3.axisBottom(this.state.xScale));

    this.state.svg
      .append('g')
      .attr('id', 'yAxis')
      .attr('transform', `translate(${this.state.width}, 0)`)
      .call(d3.axisRight(this.state.yScale));
  }

  generateCloseLine = () => {
    const line = d3.line()
      .x(d => { // draw x line
        return this.state.xScale(d['date']);
      })
      .y(d => { //draw y line
        return this.state.yScale(d['close']);
      });

    this.state.svg
      .append('path')
      .data([this.state.data])
      .style('fill', 'none')
      .attr('id', 'priceChart')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', '1.5')
      .attr('d', line);
    }

    generateLine = (metric, color) => {
      const line = d3.line()
        .x(d => { // draw x line
          return this.state.xScale(d['date']);
        })
        .y(d => { //draw y line
          return this.state.yScale(d[metric]);
        });
  
      this.state.svg
        .append('path')
        .data([this.state.data])
        .style('fill', 'none')
        .attr('id', 'priceChart')
        .attr('stroke', color)
        .attr('stroke-width', '1.5')
        .attr('d', line);
      }
  
  render () {
    return(
      <div className="chart-container">
        <div id="chart">
          <h1>Chart</h1>
        </div>
      </div>
    )
  }
}

export default Graph;