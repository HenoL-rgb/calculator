import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Buttons from './Buttons'
import Output from './Output';

function App() {

  const [history, setHistory] = useState([]);

  const dispatch = useDispatch();

  const value = useSelector(state => {
    return state.value;
  })

  const state = useSelector(state => state)

  const isMemorySet = useSelector(state => {
    return state.memory;
  })

  useEffect(() =>{
    if(history.length > 5) {
      setHistory(history.filter((item,index) => index != 0))
    }
  }, [history])


  function handleClick(operation, value) {
    if(operation === 'UNDO'){
      if(history.length === 0) return;
      
      const prevState = history.at(-1);
      setHistory(history.filter(item => item != prevState))
      dispatch({type: operation, payload: prevState})
      return;
    }

    dispatch({type: operation, payload: value});
    
    if(operation === 'CLEAR_ALL'){
      setHistory([]);
      return;
    }

    if(operation === "CALC_VALUE" ||
    (operation === "ADD_OPERATION" && state.operation !== null && state.currentState != '')){
      setHistory(prev => [...history, state])
    }
  }

  return (
    <div className="App">
      <div className="calcContainer">
        {
          isMemorySet ?
          <span className='memoryIndicator'>M</span>
          : ''
        }
        <Output value={value}/>
        <Buttons handleClick={handleClick}/>
      </div>
 
    </div>
  );
}

export default App;
