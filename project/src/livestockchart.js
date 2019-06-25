import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";
import { ChartCanvas, Chart } from "react-stockcharts";
import { LineSeries } from "react-stockcharts/lib/series";
import { fitWidth } from "react-stockcharts/lib/helper";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
    CrossHairCursor,
    EdgeIndicator,
    MouseCoordinateY,
    CurrentCoordinate,

} from "react-stockcharts/lib/coordinates";
import { LabelAnnotation, Label, Annotate } from "react-stockcharts/lib/annotation";
import axios from 'axios';


class LineChart extends React.Component {
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
        this.getData("select x:time,y:x from select count i,last time by sym from trade")
            .then(data => {
                if (data.success) {
                    console.log("data success=true");
                    this.parseTimes(data.result);
                    this.setState({rowData: data.result});
                }
            });
    }

    componentDidMount() {this.interval= setInterval(() =>  this.updateData(), 1000);}

    render() {
        const { data, height, width, seriesName, config } = this.props;
        const xAccessor = data => data.x;
        const margin = { left: 80, right: 80, top: 80, bottom: 80 };


        const [yAxisLabelX, yAxisLabelY] = [
            margin.left - 140 ,
            (height - margin.top - margin.bottom) / 2
        ];

        return (
            <Fragment>
                <ChartCanvas
                    background-color="orange"
                    height={height - 30}
                    ratio={1}
                    width={width}
                    margin={margin}
                    padding={{ top: 50, bottom: 50, left: 0, right: 0 }}
                    seriesName={seriesName}

                    data={this.state.rowData}
                    xAccessor={xAccessor}
                    displayXAccessor={xAccessor}
                >

                    <Chart id={1}
                        yExtents={data => [data.y]}

                        origin={(w, h) => [0, 0]}>
                        
                        <LineSeries yAccessor={data => data.y}  />

                    </Chart>
                </ChartCanvas >

            </Fragment>
        );
    }
}




export default LineChart