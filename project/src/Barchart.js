import { scalePoint } from  "d3-scale";
import React from "react";
import PropTypes from "prop-types";

import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import axios from "axios";

class BarChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: null}
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
        return axios(this.options).then(response => response.data);
    };

    updateData() {
        //const Sym_Name=this.props.sym;
        this.getData("select x:sym,y:size from 0N!?[`trade;();(enlist`sym)!enlist`sym;(enlist`size)!enlist(sum;`size)]")
            .then(data => {
                if (data.success) {
                    console.log("data success=true");
                    this.setState({data: data.result});
                }
            });
    };

    componentDidMount() {this.interval= setInterval(() =>  this.updateData(), 3000);};

    render() {

        if (this.state.data == null) {
            return <div> Loading ... </div>
        } else {

            return (

                <ChartCanvas ratio={1}
                             width={900}
                             height={400}
                             margin={{left: 100, right: 10, top: 20, bottom: 100}}
                             seriesName="Companies"
                             xExtents={list => list.map(d => d.x)}
                             data={this.state.data}
                             xAccessor={d => d.x}
                             xScale={scalePoint()}
                             padding={1}
                >
                    <Chart id={1} yExtents={d => [3000000, d.y]}>
                        <XAxis axisAt="bottom" orient="bottom" text={'Syms'}/>
                        <YAxis axisAt="left" orient="left"/>
                        <BarSeries yAccessor={d => d.y}/>
                    </Chart>
                </ChartCanvas>

            );
        }
    }
}

export default BarChart;