import React from 'react';
import './App.css';
import logo from './aquaqlogo.jpeg';
import BarChart from "./Barchart";

import Grid from "./GRid";

import { Button } from 'reactstrap';
import { TypeChooser } from "react-stockcharts/lib/helper";

import AreaChart from './Chart';

import { render } from "react-dom";

import Tabs from './Tabs';
require('./index.css');

function App() {

  return (

    <div className="App">

        <header>
            <img src={logo} className="App-logo" alt="logo" />
        </header>

        {/*<Button>Btn 1</Button>*/}
        {/*<Button>Btn 2</Button>*/}

        <Tabs>
            <div label="RDB">
                <AreaChart  />
                <Grid />
            </div>
            <div label="HDB">
                <Grid />
            </div>
        </Tabs>

        {/*<BarChart color={'green'} width={'1050'}/>*/}
        {/*<BarChart color={'blue'} width={'600'}/>*/}
        {/*<BarChart color={'red'} width={'600'}/>*/}

    </div>
  );
}

{/*  */}
{/*const container = document.createElement('div');*/}
{/*document.body.appendChild(container);*/}
{/*render(<App />, container);*/}

export default App;