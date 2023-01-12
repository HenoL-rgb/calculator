import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Buttons from './Buttons'
import Output from './Output';

function App() {

  const dispatch = useDispatch();

  const value = useSelector(state => {
    return state.value;
  })

  function handleClick(operation, value) {

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
