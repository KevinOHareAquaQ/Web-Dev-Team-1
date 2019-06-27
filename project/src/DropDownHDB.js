import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import AreaChartHDB from "./ChartHDB";

const optionssym = [
    'AAPL', 'AIG', 'AMD','DELL','DOW','GOOG','HPQ','IBM','INTC','MSFT'
]
const optionsstart = [
    '.z.d-7', '.z.d-1'
]

class DropMenuHDB extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedsym: 'AAPL',
            selectedst: '.z.d-1'
        }
        this._onSelectSym = this._onSelectSym.bind(this)
        this._onSelectStart = this._onSelectStart.bind(this)

    }

    _onSelectSym (option) {
        console.log('You selected ', option.label)
        this.setState({selectedsym: option})
    }

    _onSelectStart (option) {
        console.log('You selected ', option.label)
        this.setState({selectedst: option})
    }

    render () {
        const defaultOptionsym = this.state.selectedsym
        const Sym_name = typeof this.state.selectedsym === 'string' ? this.state.selectedsym : this.state.selectedsym.label

        const defaultOptionst = this.state.selectedst
        const Start_dt = typeof this.state.selectedst === 'string' ? this.state.selectedst : this.state.selectedst.label

        return (

            <section>
                <h3>Select Symbol </h3>
                <Dropdown options={optionssym} onChange={this._onSelectSym} value={defaultOptionsym} Message="Select  sym" />
                <div className='result'>
                </div>

                <h3>Select Start Date </h3>
                <Dropdown options={optionsstart} onChange={this._onSelectStart} value={defaultOptionst} Message="Select  start date" />
                <div className='result'>
                </div>

                <div label="chart">
                    <AreaChartHDB 
                    sym={Sym_name}
                    startdate={Start_dt}
                    />
                </div>

               </section>
        )
    }
}

export default DropMenuHDB
