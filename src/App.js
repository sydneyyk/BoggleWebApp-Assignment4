import React, { useState } from 'react';
import './App.css';
import Game from './components/mycomponents';
import Button from '@material-ui/core/Button';
import Board from './Board.js';
import RandomGrid from './random_grid.js'
import { Container } from '@material-ui/core';
import GuessInput from './GuessInput.js';
import { findAllSolutions } from './boggle_solver.js';
import data from './full-wordlist.json';
import foundSolutions from './FoundSolutions.js';
import FoundSolutions from './FoundSolutions.js';


// import boggle_image from './boggle image.jpg';


const grid = RandomGrid();
const solutions = findAllSolutions(grid, data.words)

const timer = 120;// seconds timer runs for



function App() {
  console.log("solutions", solutions);


  const [start, setStart] = useState(false);
  const [wasStarted, setWasStarted] = useState(false);
  const [found, setfound] = useState([]);
  const [missing, setMissing] = useState([...solutions]);
  console.log("missing", missing);
  // console.log(boggle_image);
  // function bog_image() {
  //   return <img src={boggle_image} alt="Boggle_image" />
  // }
  // export default bog_image;
  // Set the initial count state to zero, 0
  const [count, setCount] = useState(timer);

  //Create handleDecrement event handler
  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };



  function Timer() {

    while (count > 0) {

      setTimeout(handleDecrement, 1000);

      return (
        <div>
          <div>
            <h5>TIME REMAINING: {count}</h5>
          </div>
        </div>
      );
    }
    setTimeout(setStart(false), 50);
    return null

  }

  // export default Counter;


  function handleClick() {
    setStart(true);
    setWasStarted(true);
  }

  if (start == false && wasStarted == false) {
    return (

      <Container fixed maxWidth='md' >


        <Button variant="contained" color="white" onClick={() => handleClick()} >
          Start Boggle
      </Button >
      </Container>


    );
  } else if (start == true) {
    return (


      // <Button variant="outline-success" variant="primary" size="lg"  >
      //   Test
      // </Button >
      <div className="App">
        <header className="App-header">
          <div className="App">
            <Timer />
          </div>
          <Board board={grid} />
          <GuessInput allSolutions={solutions} foundSolutions={found} correctAnswerCallback={setfound} remainder={missing} setRemainder={setMissing} />
          <Button variant="contained" color="White" onClick={() => setStart(false)} >End Game</Button >

          <FoundSolutions words={found} headerText={"Words Found"} />
        </header>
      </div >
    );
  }

  else if (start == false && wasStarted == true) {
    return (
      <div>
        <h4>
          Words You Missed
        </h4>
        <ul>
          {missing.map((solution) => { return <li>{solution}</li> })}
        </ul>
      </div>
    );
  };
}

export default App;
