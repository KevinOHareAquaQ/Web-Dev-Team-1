import React, { Component } from 'react';
import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';
import axios from 'axios';

export default class LiveChart extends Component {
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
                    this.setState({rowData: data.result});
                }
            });
    }
    
    componentDidMount() {this.interval= setInterval(() =>  this.updateData(), 1000);}

    render() {
        const data = [
            {									
                color: "steelblue", 
                points: this.state.rowData 
            }
        ];
        return (
            <div>
                <div className="App">
                    <h1>WAVG by Sym</h1>
                    <LineChart
                        xLabel={"Sym count"}
                        yLabel={"Sym"}
                        width={600}
                        height={400}
                        data={data}
                    />
                </div>				
            </div>
        );
    }
}