import React, {useEffect, useState} from 'react'
import {Key} from './Key'
import Axios from 'axios'
import './App.css';


const currentState = {
  Day: 1,
  DRM: 5.577715,
  Earning: .061527,
  USD: 24.68,
  TripleEarn: 74.08,
  TotalEarned: 913.90,
  PriceOfDrm: 191.50
}

function App() {
  const [appState, setAppState] = useState(currentState)
  const [cData, setData] = useState([])
  const [refresh, setRefresh] = useState(null)

  useEffect(() => {
    Axios.get(`https://jsonbox-v2.herokuapp.com/${Key}`)
    .then(res => setData(res.data))
    setRefresh('False')
  }, [refresh]);

  // Get Variable
  const onChange = (e) => {
    const {name, value} = e.target

    setAppState({
      ...appState,
      [name] : value
    })
  }
  // console.log(cData)
  const onSubmit = (e) => {
    e.preventDefault()

    const usdEarning = appState.Earning * appState.PriceOfDrm
    const dailyEarning = usdEarning * 3

    let currentDRM;
    let totalEarning;

    if (cData.length === 0){
      currentDRM = (appState.Earning * 3) + 0
      totalEarning = 0 + dailyEarning
    }else if (cData.length > 0){
      currentDRM = (appState.Earning * 3) + cData[cData.length - 1].DRM
      totalEarning = cData[cData.length - 1].TotalEarned + dailyEarning
    }

    const day = {
      Day: appState.Day,
      PriceOfDrm: appState.PriceOfDrm,
      DRM: currentDRM,
      Earning: appState.Earning,
      USD: usdEarning,
      CycleEarn: dailyEarning,
      TotalEarned: totalEarning,
    }

    Axios.post(`https://jsonbox-v2.herokuapp.com/${Key}`,day)
      .then(res =>{
        setData([
          ...cData,
          res.data
        ])
      })


  }

  const deleteDay = (idToDelete) => {
    Axios.delete(`https://jsonbox-v2.herokuapp.com/${Key}/${idToDelete}`)
      .then(res => {
        if (res.status === 200){
          setRefresh('True')
        }
      })
  }

  return (
    <div className="App">
      <header>
        <h2>Crypto Compounder</h2>
        <p>by: <a href="https://github.com/shpintzOG">shpintzOG</a></p>
      </header>

      {/* List of days */}
      <section>

        <ul>
          {
            cData.length === 0 ? <h2>No days</h2> : cData.map(v =>{
              return(
                <li key={v._id}>
                  <p>Day: <span>{v.Day}</span></p>
                  <p>DRM: <span>{v.DRM}</span></p>
                  <p>Earning: <span>{v.Earning}</span></p>
                  <p>Every 8 Hours: <span>{v.USD}</span></p>
                  <p>CycleEarn: <span>{v.CycleEarn}</span></p>
                  <p>TotalEarned: <span>{v.TotalEarned}</span></p>
                  <button onClick={() => deleteDay(v._id)}>Delete</button>
                </li>
              )
            })
          }
        </ul>

      </section>

      <section>
        <form onSubmit={onSubmit}>

          <label>
            Day:
            <input type="number" name='Day' value={appState.Day} onChange={onChange}  />
          </label>

          <label>
            Earning:
            <input type="number" name="Earning" value={appState.Earning} onChange={onChange} />
          </label>

          <label>
            Price DRM:
            <input type="number" name="PriceOfDrm" value={appState.PriceOfDrm} onChange={onChange} />
          </label>

          <button type="submit">Submit</button>

        </form>
      </section>




    </div>
  );
}

export default App;
