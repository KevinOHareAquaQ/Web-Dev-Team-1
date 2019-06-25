import React from "react";
import PropTypes from "prop-types";
import { scaleTime} from "d3-scale";
import { curveMonotoneX } from "d3-shape";
import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";
import axios from 'axios';
import { LineSeries } from "react-stockcharts/lib/series";

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
        this.getData("select x:time,y:price from trade where sym=`"+Sym_Name)
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
                             margin={{left: 50, right: 50, top: 10, bottom: 30}}
                             seriesName="MSFT"
                             data={data} type={type}
                             xAccessor={d => d.x}
                             xScale={xScaleSetter}
//                             xExtents={[new Date(2019, 5, 24), new Date(2019, 5, 25)]}
                >
                    <Chart id={0} yExtents={d => d.y}>
                        <defs>
                            <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
                                <stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2}/>
                                <stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4}/>
                                <stop offset="100%" stopColor="#4286f4" stopOpacity={0.8}/>
                            </linearGradient>
                        </defs>
                        <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
                        <YAxis axisAt="left" orient="left"/>
                        <AreaSeries
                            yAccessor={d => data.y}
                            fill="url(#MyGradient)"
                            strokeWidth={2}
                            interpolation={curveMonotoneX}
                            canvasGradient={canvasGradient}
                        />  <LineSeries yAccessor={data => data.y}  />
                    </Chart>
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