import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import AreaChart from "./Chart";
import icon from "./green_led.gif";

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
        //console.log('You selected ', option.label)
        this.setState({selected: option})
        this.props.onSelectSym(option.label)
    }

    render () {
        const defaultOption = this.state.selected
        const Sym_name = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

        return (

            <section className="dropdownrdb">

                <h3>Select Symbol:</h3>
                <Dropdown options={options} onChange={this._onSelect} value={defaultOption} Message="Select  sym" />

            </section>
        )
    }
}

export default DropMenu
