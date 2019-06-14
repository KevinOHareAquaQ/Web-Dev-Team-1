import React, {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';

class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "Sym", field: "sym",sortable:true,filter:true
            }, {
                headerName: "Price", field: "price",sortable:true,filter:true
            },],
            rowData: [{
                sym: "DOW", price: 28
            }, {
                sym: "AMD",  price: 39
            }, {
                sym: "DELL", price: 73
            }, {
                sym:"AIG", price: 89
            }, {
                sym:"MSFT", price: 42
            },{
                sym:"GOOG", price: 28
            }, {
                sym:"AAPL", price: 21
            }, {
                sym:"IBM", price: 18
            },
            ]
        }
    }

    render(){
        return (
            <div
                className="ag-theme-blue"
                style={{
                    height: '250px',
                    width: '400px' }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            >
            </div>
        );
    }
}

export default Grid;