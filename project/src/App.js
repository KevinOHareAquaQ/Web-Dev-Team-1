import React from 'react';
import './App.css';
import logo from './aquaqlogo.jpeg';
import BarChart from "./Barchart";
import Grid from "./GRid";
function App() {

  return (

    <div className="App">

        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />

        </header>

        <section>

            <nav>
                <div className="btn-group">
                    <button>RDB</button>
                    <button>HDB</button>
                </div>
            </nav>

            <table>

                <tr>
                    <button>BTN1</button>
                    <button>BTN2</button>
                </tr>

                <tr>
                    <td>
                        Graph 1
                    </td>

                    <td rowSpan="2">
                        Right column
                    </td>
                </tr>

                <tr>
                    <td>
                        Graph 2
                    </td>
                </tr>

            </table>
        </section>

        <table>

            <tg>
                <BarChart color={'green'} width={'700'}/>
            </tg>

            <tg>
                <BarChart color={'blue'} width={'900'}/>
            </tg>

        </table>

        <Grid width={'30'} height={'10'}/>


    </div>
  );
}

export default App;