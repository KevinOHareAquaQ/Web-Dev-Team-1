import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import AreaChartHDB from "./ChartHDB";

const optionssym = [
    'AAPL', 'AIG', 'AMD','DELL','DOW','GOOG','HPQ','IBM','INTC','MSFT'
]

class DropMenuHDB extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedsym: 'AAPL',
        }
        this._onSelectSym = this._onSelectSym.bind(this)

    }

    _onSelectSym (option) {
        console.log('You selected ', option.label)
        this.setState({selectedsym: option})
    }

    render () {
        const defaultOptionsym = this.state.selectedsym
        const Sym_name = typeof this.state.selectedsym === 'string' ? this.state.selectedsym : this.state.selectedsym.label

        return (

            <section>
                <h3>Select Symbol </h3>
                <Dropdown options={optionssym} onChange={this._onSelectSym} value={defaultOptionsym} Message="Select  sym" />

                <div label="chart">
                    <AreaChartHDB
                    sym={Sym_name}
                    />
                </div>

               </section>
        )
    }
}

export default DropMenuHDB
