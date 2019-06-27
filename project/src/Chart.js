import React from "react";
import PropTypes from "prop-types";
import { scaleTime} from "d3-scale";
import { curveMonotoneX } from "d3-shape";
import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries, AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";
import axios from 'axios';
import { LineSeries } from "react-stockcharts/lib/series";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
    CrossHairCursor,
    MouseCoordinateX,
    MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { SingleValueTooltip } from "react-stockcharts/lib/tooltip";
import { last } from "react-stockcharts/lib/utils";

const canvasGradient = createVerticalLinearGradient([
    { stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
    { stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
    { stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

class AreaChart extends React.Component {

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
    };
    
    updateData() {
        const Sym_Name=this.props.sym;
        //this.getData("select x:time,y:avgs price,open:(-2#avgs price)[0],close:last avgs price,volume:size from trade where sym=`"+Sym_Name)
        this.getData("select x:time,y:avgs price from trade where sym=`"+Sym_Name)
            .then(data => {
                if (data.success) {
                    console.log("data success=true");
                  this.parseTimes(data.result);
                    this.setState({rowData: data.result});
                }
            });
    };

    componentDidMount() {this.interval= setInterval(() =>  this.updateData(), 3000);};
    parseTimes(data) {
        //const parseTime = timeParse("%H:%M:%S");
        var i = 0;
        for (i; i < data.length ; i++) {
         data[i].x = new Date(data[i].x);
        }
        return data;
       };

    render() {
       
        if (this.state.rowData === undefined || this.state.rowData.length==0) {
            return <div>Loading...</div>
        } else {        

            const {type, width, ratio} = this.props;
            const data = this.state.rowData;
            let xScaleSetter = scaleTime();
            return (
                <ChartCanvas ratio={ratio} width={1000} height={400}
                             margin={{left: 100, right: 50, top: 50, bottom: 30}}
                             seriesName="MSFT"
                             data={data} type={type}
                             xAccessor={d => d.x}
                             xScale={xScaleSetter}
//                             xExtents={[new Date(2019, 5, 24), new Date(2019, 5, 25)]}
                >

                    <Chart id={0} yExtents={d => d.y}>
                        <defs>
                            <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
                                <stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.0}/>
                                <stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.0}/>
                                <stop offset="100%" stopColor="#4286f4" stopOpacity={0.0}/>
                            </linearGradient>
                        </defs>
                        <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
                        <YAxis axisAt="left" orient="left"/>

                        <MouseCoordinateX
                            at="bottom"
                            orient="bottom"
                            displayFormat={timeFormat("%H:%M")} />
                        <MouseCoordinateY
                            at="left"
                            orient="left"
                            displayFormat={format(".2f")} />

                        <AreaSeries
                            yAccessor={d => data.y}
                            fill="url(#MyGradient)"
                            strokeWidth={2}
                            interpolation={curveMonotoneX}
                            canvasGradient={canvasGradient}
                        />  <LineSeries yAccessor={data => data.y}  />

                        <SingleValueTooltip
                            xLabel="Date" /* xLabel is optional, absence will not show the x value */ yLabel="C"
                            yAccessor={d => d.close}
                            xDisplayFormat={timeFormat("%Y-%m-%d")} yDisplayFormat={format(".2f")}
                            /* valueStroke="green" - optional prop */
                            /* labelStroke="#4682B4" - optional prop */
                            origin={[0, 0]}/>
                        <SingleValueTooltip
                            yLabel="Volume" yAccessor={(d) => d.volume}
                            origin={[0, 20]}/>

                    </Chart>

                    <Chart id={2}
                           yExtents={d => d.volume}
                           height={150} origin={(w, h) => [0, h - 150]}
                    >
                        <YAxis axisAt="right" orient="right" ticks={5} tickFormat={format(".2s")}/>

                        <MouseCoordinateY
                            at="right"
                            orient="right"
                            displayFormat={format(".4s")} />

                        <BarSeries yAccessor={d => d.volume}
                                   stroke fill={(d) => d.close > d.open ? "#27a50b" : "#FF0000"}
                                   opacity={0.4}
                                   widthRatio={1} />
                    </Chart>

                    <CrossHairCursor />

                </ChartCanvas>
            );
        }
    }
}

AreaChart.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

AreaChart.defaultProps = {
    type: "svg",
};
AreaChart = fitWidth(AreaChart);

export default AreaChart;