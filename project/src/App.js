import React from 'react';
import './App.css';
import './DropDown.css'
import logo from './aquaqlogo.jpeg';
import 'react-dropdown/style.css'
import Grid from "./Grid";
import Tabs from './Tabs';
import DropMenu from "./DropDown";
import Maxvolchart from "./Maxvolchart";
import HDBGrid from "./hdbweekmaxmin";
import HDBGrid2 from "./hdbweeksym";

require('./index.css');

function App() {

  return (
    <div className="App">
        <header>
            <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Tabs>
            <div label="RDB">
            <h1>Price (Running average)</h1>
                <DropMenu/>
                <h1>Min price/Max price/LVC per sym</h1>
                <Grid />
                <h1>Highest traded sym by vol</h1>
                <Maxvolchart />
            </div>
            <div label="HDB">
            <h1>Max volume traded per day (previous week)</h1>
            <HDBGrid />
            <h1>Volume traded per sym (previous week)</h1>
            <HDBGrid2 />
            </div>
        </Tabs>
    </div>
  );

}

export default App;