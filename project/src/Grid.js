import React, {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import axios from 'axios';

class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "SYM", field: "sym",sortable:true,filter:true
            }, {
                headerName: "MIN", field: "minprice",sortable:true,filter:true
            }, {
                headerName: "MAX", field: "maxprice",sortable:true,filter:true
            }, {
                headerName: "LVC", field: "lvc",sortable:true,filter:true, cellClass: "lvcClass", cellStyle: function(params) {
                    var colour = params.node.data.colour;
                    console.log({"params": params, "data": params.data, "colour": colour});
                    if (colour === "red") {
                        var bGroundClr = '#FEC4C4'
                    } else if (colour === "green") {
                        bGroundClr = '#C6FEC4'
                    }
                    return {background: bGroundClr}
                }
            }, {
                headerName: "Colour", field: "colour", sortable:true,filter:true,hide:true
            },

            ],
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
        this.getData("a:select avgs price by sym from trade;(select maxprice:.Q.f[4]each max each price,minprice:.Q.f[4]each min each price,lvc:.Q.f[4]each last each price by sym from a),'([]colour:{?[x[;0]<x[;1];`green;?[x[;0]=x[;1];`same;`red]]}value exec "+'"F"'+"$.Q.f[4]each -2#avgs price by sym from trade)")
            .then(data => {
                if (data.success) {
                    console.log("data success=true");
                    this.setState({rowData: data.result});
                }
            });
    }

    componentDidMount() {this.interval= setInterval(() =>  this.updateData(), 5000);}

    render(){
        return (
            <div
                className="ag-theme-blue"
                style={{
                    paddingTop: '50px',
                    paddingLeft: '100px',
                    height: '277px',
                    width: '802px',
                    }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>

            </div>
        );
    }
}

export default Grid;