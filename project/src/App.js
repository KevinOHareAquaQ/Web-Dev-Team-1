import React from 'react';
import './App.css';
import './DropDown.css'
import logo from './aquaqlogo.jpeg';
import 'react-dropdown/style.css'
import Grid from "./Grid";
import Tabs from './Tabs';
import DropMenu from "./DropDown";
import DropMenuHDB from "./DropDownHDB";
import Maxvolchart from "./Maxvolchart";
import HDBGrid from "./hdbweekmaxmin";
import HDBGrid2 from "./hdbweeksym";
import HDBCOUNTSWEEK from "./hdbweekcountsgraph";
import Grid_Button from "./Button";
import BarChart from "./Barchart";
import AreaChartHDB from "./ChartHDB";
import AreaChart from "./Chart"

require('./index.css');

function App() {

  return (
    <div className="App">

        <header>
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
        </header>

        <Tabs>

            <div label="RDB">

                {/*<h1>Price (Running average)</h1>*/}
                <div className="Inner">
                {/*<DropMenu/>*/}
                <AreaChart />
                </div>
                <div className="Inner">
                <h1 className="min-price-text">Min price/Max price/LVC per sym</h1>
                <Grid />
                </div>
                <div className="Inner">
                <h1 className="min-price-text">Highest traded sym by vol</h1>
                <Maxvolchart />
                </div>
                <div className="Inner">
                <BarChart />
                </div>
            </div>

            <div label="HDB">

                <div className="Inner">
                <AreaChartHDB />
                </div>
                <div className="Inner">
                <h1 className="min-price-text">Max volume traded per day (previous week)</h1>
                <HDBGrid />
                </div>
                <div className="Inner">
                <h1 className="min-price-text">Volume traded per sym (previous week)</h1>
                <HDBGrid2 />
                </div>
                <div className="Inner">
                <HDBCOUNTSWEEK />
                </div>
            </div>

        </Tabs>


    </div>
  );

}

export default App;