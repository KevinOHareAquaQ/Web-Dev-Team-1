import React from 'react';
import './App.css';
import './DropDown.css'
import logo from './aquaqlogo.jpeg';
import BarChart from "./Barchart";

import 'react-dropdown/style.css'

import Grid from "./GRid";

import { render } from "react-dom";

import Tabs from './Tabs';
import DropMenu from "./AnotherDrop";

require('./index.css');

function App() {

  return (

    <div className="App">

        <header>
            <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Tabs>
            <div label="RDB">
                <DropMenu/>
                <Grid />
            </div>
            <div label="HDB">
                <Grid />
            </div>
        </Tabs>

    </div>
  );
}

export default App;