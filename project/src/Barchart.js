import { scalePoint } from  "d3-scale";
import React from "react";
import PropTypes from "prop-types";

import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import axios from 'axios';

class BarChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowData: []
        }
        this.updateData();
    }

    options = {
        url: 'https://81.137.196.157:8190/executeQuery',
        auth: {
            username: 'user',
            password: 'pass',
        },

        method: 'post',
        dataType: 'json',
        headers:
            {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'BASIC dXNlcjpwYXNz'
            }
    };

    getData(query) {
        this.options['data'] = { 'query': query, 'response': 'true', 'type': 'sync'};
        return axios(this.options)
            .then(response => response.data);
    }

    updateData() {
        this.getData("select size:sum size by sym from trade")
            .then(data => {
                if (data.success) {
                    console.log("data success=true");
                    this.setState({rowData: data.result});
                }
            });
    }

    componentDidMount() {this.interval= setInterval(() =>  this.updateData(), 5000);}

	render() {

		return (
			<ChartCanvas
				width={800}
				height={400}
				margin={{ left: 80, right: 10, top: 20, bottom: 30 }}
				seriesName="Fruits"
				xExtents={list => list.map(d => d.x)}
				data={this.state.rowData}
				xAccessor={d => d.x}
//				xScale={scalePoint()}
				padding={1}
			>
				<Chart id={1} yExtents={d => [0, d.y]}>
					<XAxis axisAt="bottom" orient="bottom" />
					<YAxis axisAt="left" orient="left" />
					<BarSeries yAccessor={d => d.y} />
				</Chart>
			</ChartCanvas>

		);
	}
}


BarChart.defaultProps = {
	type: "svg",
};

BarChart = fitWidth(BarChart);

export default BarChart;