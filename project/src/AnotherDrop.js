import React, { Component } from 'react'

import Dropdown from 'react-dropdown'
import AreaChart from "./Chart";
import DropDown from "./DropDown";
import Grid from "./GRid";
import Tabs from "./Tabs";

const options = [
    'AAPL', 'MSFT', 'GOOG'
]

class DropMenu extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selected: ''
        }
        this._onSelect = this._onSelect.bind(this)

    }

    _onSelect (option) {
        console.log('You selected ', option.label)
        this.setState({selected: option})
    }

    render () {
        const defaultOption = this.state.selected
        const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

        return (

            <section>
                <h3>Sym Price </h3>
                <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select a sym" />
                <div className='result'>
                    You selected
                    <strong> {placeHolderValue} </strong>
                </div>

                <div label="chart">
                    <AreaChart sym={placeHolderValue}/>
                </div>

               </section>
        )
    }
}

export default DropMenu
