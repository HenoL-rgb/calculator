import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Buttons from './Buttons'
import Output from './Output';

const colorsInitialState = {
  background: '#48494A',
  font: '#E7E7E7',
  topButtons: '#5A5B5C',
  sideButtons: '#F2A03D',
  numButtons: '#757677',
}

function App() {

  //const [history, setHistory] = useState([]);
  const [colors, setColors] = useState(colorsInitialState)

  const dispatch = useDispatch();

  const value = useSelector(state => {
    return state.value;
  })

  //const state = useSelector(state => state)

  const isMemorySet = useSelector(state => {
    return state.memory;
  })

  // useEffect(() =>{
  //   if(history.length > 5) {
  //     setHistory(history.filter((item,index) => index != 0))
  //   }
  // }, [history])


  function handleClick(operation, value) {
    // if(operation === 'UNDO'){
    //   if(history.length === 0) return;
      
    //   const prevState = history.at(-1);
    //   setHistory(history.filter(item => item != prevState))
    //   dispatch({type: operation, payload: prevState})
    //   return;
    // }

    dispatch({type: operation, payload: value});
    
    // if(operation === 'CLEAR_ALL'){
    //   setHistory([]);
    //   return;
    // }

    // if(operation === "CALC_VALUE" ||
    // (operation === "ADD_OPERATION" && state.operation !== null && state.currentState != '')){
    //   setHistory(prev => [...history, state])
    // }
  }

  return (
    <div className="App" style={{color: colors.font}}>
      <div className='colorPickers'>
        <span>Background: <input value={colors.background} className='colorPicker' type={'color'} onChange={(e) => setColors({...colors, background: e.target.value})}/></span>
        <span>Font: <input value={colors.font} className='colorPicker' type={'color'} onChange={(e) => setColors({...colors, font: e.target.value})}/></span>
        <span>Top buttons: <input value={colors.topButtons} className='colorPicker' type={'color'} onChange={(e) => setColors({...colors, topButtons: e.target.value})}/></span>
        <span>Side Buttons: <input value={colors.sideButtons} className='colorPicker' type={'color'} onChange={(e) => setColors({...colors, sideButtons: e.target.value})}/></span>
        <span>Numbers: <input value={colors.numButtons} className='colorPicker' type={'color'} onChange={(e) => setColors({...colors, numButtons: e.target.value})}/></span>
        <button onClick={() => setColors(colorsInitialState)}>Reset</button>
      </div>
      <div className="calcContainer" style={{background: colors.background}}>
        {
          isMemorySet ?
          <span className='memoryIndicator'>M</span>
          : ''
        }
        <Output value={value}/>
        <Buttons handleClick={handleClick} 
          topButtonsColor={colors.topButtons} 
          sideButtonsColor={colors.sideButtons} 
          numButtonsColor={colors.numButtons} 
          color={colors.font}
        />
      </div>
 
    </div>
  );
}

export default App;
