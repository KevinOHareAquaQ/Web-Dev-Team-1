import React, {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-dark.css';
import axios from 'axios';

class HDBGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {

            columnDefs: [{
                headerName: "MAX DATE", field: "maxdate",sortable:true,filter:true
            }, {
                headerName: "MAX VOL", field: "maxcount",sortable:true,filter:true
            }, {
                headerName: "MIN DATE", field: "mindate",sortable:true,filter:true
            }, {
                headerName: "MIN VOL", field: "mincount",sortable:true,filter:true
            },

            ],
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
    }

    updateData() {
        this.getData("select maxdate:last date,maxcount:last x,mindate:first date,mincount:first x from (asc select count i by date from trade where date within (`week$-1+`week$.z.d;6+`week$-1+`week$.z.d))")
            .then(data => {
                if (data.success) {
                    console.log("data success=true");
                    this.setState({rowData: data.result});
                }
            });
    }

    render(){
        return (
            <div
                className="ag-theme-dark"
                style={{
                    textAlign: "center",
                    height: '55px',
                    width: '802px' }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        );
    }
}

export default HDBGrid;