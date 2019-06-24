import React from 'react';
import './App.css';
import './DropDown.css'
import logo from './aquaqlogo.jpeg';
import BarChart from "./Barchart";

import 'react-dropdown/style.css'

import Grid from "./GRid";

import { TypeChooser } from "react-stockcharts/lib/helper";

import AreaChart from './Chart';
import DropDown from './DropDown';

import { render } from "react-dom";

import Tabs from './Tabs';
import DropMenu from "./AnotherDrop";
import LiveChart from "./Livechart";
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
                <LiveChart />
                <Grid />
            </div>
            <div label="HDB">
                <DropMenu/>
                <Grid />
            </div>
        </Tabs>

    </div>
  );
}

export default App;