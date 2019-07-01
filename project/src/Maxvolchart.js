import React, {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import axios from 'axios';

class Maxvolchart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "SYM", field: "sym",sortable:true,filter:true
            }, {
                headerName: "MAX VOL", field: "size",sortable:true,filter:true
            },
            ],
            rowData: []
        }
        this.updateData();
    }

    options = {
        url: 'https://localhost:3200/executeQuery',
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
        this.getData("-1#asc select sum size by sym from trade")
            .then(data => {
                if (data.success) {
                    console.log("data success=true");
                    this.setState({rowData: data.result});
                }
            });
    }

    componentDidMount() {this.interval= setInterval(() =>  this.updateData(), 10000);}

    render(){
        return (
            <div
                className="ag-theme-blue"
                style={{
                    paddingBottom: '50px',
                    paddingLeft: '100px',
                    height: '55px',
                    width: '402px' }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
                
            </div>
        );
    }
}

export default Maxvolchart;