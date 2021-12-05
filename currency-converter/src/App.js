
import { useEffect, useState } from  'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';


function App () {

    //Initialize state
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);


    //call api when dep change
    useEffect(() => {
        axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
        .then((res) => {
            setInfo(res.data[from]);
        })
    }, [from]);

    //call the convert function when user switches the currancy

    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
    }, [info])
     
    // Function to convert currency

    function convert() {
        var rate = info[to];
        setOutput(input * rate);
    }

    //function to swap between two currencies
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }

    return (
        <div className="App">
            <div className="header">
                <h1>Currency Converter</h1>
            </div>
            <div className = "container">
                <div className="left">
                    <h4>Currency Amount</h4>
                    <input type="text"
                        placeholder="Enter Currency amount"
                        onChange={(e) => setInput(e.target.value)} />
                </div>
                <div className="center">
                    <h4>From</h4>
                    <Dropdown options={options}
                        onChange={(e) => { setFrom(e.value) }}
                    value={from} placeholder="From" />
                </div>
                <div className="switch">
                    <HiSwitchHorizontal size="30px"
                            onClick={() => { flip()}}/>
                </div>
                <div className="right">
          <h3>To</h3>
          <Dropdown options={options} 
                    onChange={(e) => {setTo(e.value)}} 
          value={to} placeholder="To" />
        </div>
            </div>
            <div className="result">
                <button onClick={() =>{convert()}}>Convert</button>
                <h3>Submit</h3>
                <p>{input+""+from+"="+output.toFixed(2) + " "+ to}</p>
            </div>
        </div>
    )
}

export default App;