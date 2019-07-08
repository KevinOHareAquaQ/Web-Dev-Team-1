import React from "react";
import PropTypes from "prop-types";
import {scalePoint, scaleTime} from "d3-scale";
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
import {CircleMarker} from "react-stockcharts/es/lib/series";
import ScatterSeries from "react-stockcharts/es/lib/series/ScatterSeries";

const canvasGradient = createVerticalLinearGradient([
    { stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
    { stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
    { stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

class HDBCOUNTSWEEK extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowData: []
        }
       this.updateData();
    }

    options = {
        url: 'https://localhost:3201/executeQuery',
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
        this.getData("0!select y:count i by x:date from trade where date within (`week$-1+`week$.z.d;4+`week$-1+`week$.z.d)") //alternative date for exact last working week (mon-fri last week): where date within (`week$-1+`week$.z.d;5+`week$-1+`week$.z.d)
            .then(data => {
                if (data.success) {
                    console.log("data success=true");
                  this.parseTimes(data.result);
                    this.setState({rowData: data.result});
                }
            });
    };

    parseTimes(data) {
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

                <section>

                    <h1 className="x-axis-text">Total Volume Traded Per Day (Previous Week)</h1>
                    <div label="chart">
                        <div className="row">
                            <div className="left">
                                <h1 className="h-text">Volume Traded</h1>
                            </div>

                            <ChartCanvas ratio={ratio} width={1000} height={400}
                                         margin={{left: 100, right: 50, top: 50, bottom: 20}}
                                         seriesName="MSFT"
                                         data={data} type={type}
                                         xAccessor={d => d.x}
                                         xScale={xScaleSetter}
                                //                             xExtents={[new Date(2019, 5, 24), new Date(2019, 5, 25)]}
                            >

                                <Chart id={0} yExtents={d => [1.005*d.y, 0.995*d.y]}>
                                    <defs>
                                        <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
                                            <stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.0}/>
                                            <stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.0}/>
                                            <stop offset="100%" stopColor="#4286f4" stopOpacity={0.0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
                                    <YAxis axisAt="left" orient="left" stroke={"#000000"}/>

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
                                    />  <LineSeries yAccessor={data => data.y} strokeWidth={3} stroke={"#4fb5ff"}/>
                                    <ScatterSeries
                                        yAccessor={data => data.y}
                                        marker={CircleMarker}
                                        markerProps={{ r: 3,  stroke: "white", fill: "white"}} />

                                </Chart>

                                <CrossHairCursor />

                            </ChartCanvas>

                        </div>
                        <h1 className="x-axis-text">Date</h1>
                    </div>
                </section>
            );
        }
    }
}

HDBCOUNTSWEEK.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

HDBCOUNTSWEEK.defaultProps = {
    type: "svg",
};
HDBCOUNTSWEEK = fitWidth(HDBCOUNTSWEEK);

export default HDBCOUNTSWEEK;