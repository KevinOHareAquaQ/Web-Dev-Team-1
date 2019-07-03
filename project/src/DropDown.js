import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import AreaChart from "./Chart";
import icon from "./red_led.png";

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

            <section>

                <h3>Select Symbol </h3>
                <Dropdown options={options} onChange={this._onSelect} value={defaultOption} Message="Select  sym" />
                <div className='result'>
                    {/*Current Sym is <strong> {Sym_name} </strong>*/}
                </div>

                <div label="chart">
                    <img src={icon} className="red_led" alt="icon" />
                    <h1 className="x-axis-text">Running average price of {Sym_name}</h1>
                    <div className="row">
                        <div className="left">
                            <h1 className="h-text">Average price</h1>
                        </div>
                        <AreaChart sym={Sym_name}/>
                    </div>
                    <h1 className="x-axis-text">Time</h1>
                </div>

            </section>
        )
    }
}

export default DropMenu
