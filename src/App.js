import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Buttons from './Buttons'
import Output from './Output';

function App() {

  const dispatch = useDispatch();

  const value = useSelector(state => {
    return state.value;
  })

  const isMemorySet = useSelector(state => {
    return state.memory;
  })

  function handleClick(operation, value) {

    dispatch({type: operation, payload: value});

  }

  return (
    <div className="App">
      {
        isMemorySet ?
        <span className='memoryIndicator'>M</span>
        : ''
      }
      <Output value={value}/>
      <Buttons handleClick={handleClick}/>
    </div>
  );
}

export default App;
