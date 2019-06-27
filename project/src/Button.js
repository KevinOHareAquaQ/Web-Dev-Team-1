import React, { Component } from 'react'


class Grid_Button extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            day: ''
        };
    }


    handleChange(event) {
        this.setState({
            day: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        alert(`You chose ${this.state.day} of data`);
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>Toggle Grid:</p>

                <ul >
                    <li>
                        <label>
                            <input
                                type="radio"
                                value="1 day"
                                checked={this.state.day === "1 day"}
                                onChange={this.handleChange}
                            />
                            1 Day
                        </label>
                    </li>

                    <li>
                        <label>
                            <input
                                type="radio"
                                value="2 days"
                                checked={this.state.day === "2 days"}
                                onChange={this.handleChange}
                            />
                            2 Day
                        </label>
                    </li>

                    <li>
                        <label>
                            <input
                                type="radio"
                                value="1 Week"
                                checked={this.state.day === "1 Week"}
                                onChange={this.handleChange}
                            />
                            7 Days
                        </label>
                    </li>

                    <li>
                        <label>
                            <input
                                type="radio"
                                value="1 Month"
                                checked={this.state.day === "1 Month"}
                                onChange={this.handleChange}
                            />
                            1 Month
                        </label>
                    </li>

                    <li>
                        <label>
                            <input
                                type="radio"
                                value="3 Months"
                                checked={this.state.day === "3 Months"}
                                onChange={this.handleChange}
                            />
                            3 Months
                        </label>
                    </li>


                </ul>


                <button type="submit">Make your choice</button>
            </form>
        );
    }

}
export default Grid_Button