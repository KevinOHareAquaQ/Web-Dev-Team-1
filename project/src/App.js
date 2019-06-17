import React from 'react';
import './App.css';
import logo from './aquaqlogo.jpeg';
import BarChart from "./Barchart";

import Grid from "./GRid";

import { Button } from 'reactstrap';
import { TypeChooser } from "react-stockcharts/lib/helper";

import AreaChart from './Chart';

function App() {

  return (

    <div className="App">

        <header>
            <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Button>Btn 1</Button>
        <Button>Btn 2</Button>

        <AreaChart  />

        {/*<BarChart color={'green'} width={'1050'}/>*/}
        {/*<BarChart color={'blue'} width={'600'}/>*/}
        {/*<BarChart color={'red'} width={'600'}/>*/}

        <Grid />

    </div>
  );
}

export default App;