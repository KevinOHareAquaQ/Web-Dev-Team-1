import React,{Component}from 'react';

class DropDown extends Component {
    constructor(){
        super();

        this.state ={
            displayMenu: false,
        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

        };

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }

    render() {
        return (
            <div  className="dropdown" style = {{background:"red",width:"200px",position:"relative",left :1000,top:-350}} >
                <div className="button" onClick={this.showDropdownMenu}> Select Sym </div>

                { this.state.displayMenu ?

                    (
                        <ul>
                            <li><a className="active" href="#MSFT">MSFT</a></li>
                            <li><a href="#APPL">APPL</a></li>
                        </ul>
                    )
                    :
                    (
                        null
                    )
                }

            </div>

        );
    }
}


export default DropDown;