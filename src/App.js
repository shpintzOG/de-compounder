import React, {useEffect, useState} from 'react'
import './App.css';


const currentState = {
  Day: 1,
  DRM: 12.360349,
  Earning: .129585,
  USD: 24.68,
  TripleEarn: 74.08,
  TotalEarned: 2354
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

  // Get Variable
  const onChange = (e) => {


  }

  const onSubmit = (e) => {
    e.PreventDefault()


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
                  <p>{v.Day}</p>
                  <p>{v.DRM}</p>
                  <p>{v.Earning}</p>
                  <p>{v.CycleEarn}</p>
                  <p>{v.TotalEarned}</p>
                </li>
              )
            })
          }
        </ul>

      </section>

      <form>

        <label>
          Day:
          <input type="number" name='day' />
        </label>

        <label>
          Earning:
          <input type="number" />
        </label>

        <label>
          Price DRM:
          <input type="number" />
        </label>

        <button type="submit">Submit</button>

      </form>




    </div>
  );
}

export default App;
