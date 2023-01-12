import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Buttons from './Buttons'
import { Calculator } from './Calculator';
import { AddCommand } from './Operations';
import Output from './Output';
import { operations } from './Buttons';

function App() {

  const [operation, setOperation] = useState('ADD_VALUE');
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();

  const value = useSelector(state => {
    return state.value;
  })

  function handleClick(operation, value) {
    // if(value.operation != null) {
    //   dispatch({type: operations.calculate, payload: value});
    // }
    console.log(value)
    dispatch({type: operation, payload: value});
  }

  return (
    <div className="App">
      <Output value={value}/>
      <Buttons handleClick={handleClick}/>
    </div>
  );
}

export default App;
