import React, {useEffect, useState} from 'react'
import './App.css';


const currentState = {
  Day: 1,
  DRM: 12.360349,
  Earning: .129585,
  USD: 24.68,
  TripleEarn: 74.08,
  TotalEarned: 2354,
  PriceOfDrm: 191.50
}

const data = [
  {
    Day: 1,
    DRM: 5.577715,
    Earning: 0.061527,
    CycleEarn: 30.24,
    TotalEarned: 913.90
  },
  {
    Day: 2,
    DRM: 12.112123,
    Earning: 0.123565,
    CycleEarn: 69.18,
    TotalEarned: 2165
  },
  {
    Day: 3,
    DRM: 12.360349,
    Earning: 0.123565,
    CycleEarn: 69.18,
    TotalEarned: 2354.52
  }
]

function App() {

  const [appState, setAppState] = useState(currentState)
  const [reRender, setReRender] = useState('Value')

  useEffect(() => {
    console.log(reRender)
    setReRender('False')
  },[reRender])

  // Get Variable
  const onChange = (e) => {
    const {name, value} = e.target

    setAppState({
      ...appState,
      [name] : value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const currentDRM = (appState.Earning * 3) + data[data.length - 1].DRM
    const usdEarning = appState.Earning * appState.PriceOfDrm
    console.log(usdEarning)
    const dailyEarning = usdEarning * 3
    console.log(dailyEarning)
    const totalEarning = data[data.length - 1].TotalEarned + dailyEarning

    console.log(data[data.length - 1])

    data.push({
      Day: appState.Day,
      DRM: currentDRM,
      Earning: appState.Earning,
      USD: usdEarning,
      CycleEarn: dailyEarning,
      TotalEarned: totalEarning,
    })
    console.log(data)
    setReRender('True')
  }



  return (
    <div className="App">
      <header>
        <h2>Crypto Compounder</h2>
      </header>

      {/* List of days */}
      <section>

        <ul>
          {
            data.map(v =>{
              return(
                <li>
                  <p>Day: {v.Day}</p>
                  <p>DRM: {v.DRM}</p>
                  <p>Earning: {v.Earning}</p>
                  <p>CycleEarn: {v.CycleEarn}</p>
                  <p>TotalEarned: {v.TotalEarned}</p>
                </li>
              )
            })
          }
        </ul>

      </section>

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




    </div>
  );
}

export default App;
