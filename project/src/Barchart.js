import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component {

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {

        const data = [12, 5, 6, 6, 9, 10];

        const svg = d3.select("body")
            .append("svg")
            .attr("width", this.props.width)
            .attr("height", 250)
            .style("margin-left", 50);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * this.props.width/10)
            .attr("y", (d, i) => 100 - 10 * d)
            .attr("width", 100)
            .attr("height", (d, i) => d * 10)
            .attr("fill", this.props.color)
    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart;