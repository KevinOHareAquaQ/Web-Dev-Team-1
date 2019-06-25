import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import AreaChart from "./Chart";

const options = [
    'AAPL', 'AIG', 'AMD','DELL','DOW','GOOG','HPQ','IBM','INTC','MSFT'
]

class DropMenu extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selected: 'AAPL'
        }
        this._onSelect = this._onSelect.bind(this)

    }

    _onSelect (option) {
        console.log('You selected ', option.label)
        this.setState({selected: option})
    }

    render () {
        const defaultOption = this.state.selected
        const Sym_name = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

        return (

            <section>
                <h3>Select Symbol </h3>
                <Dropdown options={options} onChange={this._onSelect} value={defaultOption} Message="Select  sym" />
                <div className='result'>
                    Current Sym is
                    <strong> {Sym_name} </strong>
                </div>

                <div label="chart">
                    <AreaChart sym={Sym_name}/>
                </div>

               </section>
        )
    }
}

export default DropMenu
