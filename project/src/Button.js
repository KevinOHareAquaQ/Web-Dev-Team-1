import React, { Component } from 'react'

export class Grid_Button extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            day: '.z.d-1'
        };
    }

    handleChange(event) {
        this.setState({
            day: event.target.value
        });
        this.props.onSelectDay(event.target.value)
    }

    handleSubmit(event) {
        event.preventDefault();

        alert(`You chose ${this.state.day} of data`);
    }

    render() {

        return (
            <form >
                <p>Toggle Grid:</p>

                <ul >
                    <li>
                        <label>
                            <input
                                type="radio"
                                value=".z.d-1"
                                checked={this.state.day === ".z.d-1"}
                                onChange={this.handleChange}
                            />
                            1 Day
                        </label>
                    </li>

                    <li>
                        <label>
                            <input
                                type="radio"
                                value=".z.d-2"
                                checked={this.state.day === ".z.d-2"}
                                onChange={this.handleChange}
                            />
                            2 Day
                        </label>
                    </li>

                    <li>
                        <label>
                            <input
                                type="radio"
                                value=".z.d-7"
                                checked={this.state.day === ".z.d-7"}
                                onChange={this.handleChange}
                            />
                            7 Days
                        </label>
                    </li>

                    <li>
                        <label>
                            <input
                                type="radio"
                                value=".z.d-30"
                                checked={this.state.day === ".z.d-30"}
                                onChange={this.handleChange}
                            />
                            1 Month
                        </label>
                    </li>

                    <li>
                        <label>
                            <input
                                type="radio"
                                value=".z.d-90"
                                checked={this.state.day === ".z.d-90"}
                                onChange={this.handleChange}
                            />
                            3 Months
                        </label>
                    </li>


                </ul>



            </form>

        );

    }

}
export default Grid_Button