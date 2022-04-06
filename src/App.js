import logo from './logo.svg';
import './App.css';
import Die from './components/die';
import React from 'react';
import {nanoid} from "nanoid"


export default function App(){

  const [Tenzies, setTenzies] = React.useState(false)
  const [dice, setDice] = React.useState(allNewDice())

  // React.useEffect((die)=> {
  //   setTenzies(die.isHeld === Tenzies.isHeld && die.value === Tenzies.value ? {Tenzies:true} 
  //     && console.log("you won!") : {Tenzies:false})
  // },[dice])

  // React.useEffect(()=>{
    
  // },[dice])



  function generateNewDie(){
    return {
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice(){
    const newDice = []
    for(let i=0; i<10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  const diceElements = dice.map(die =>  
  <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>
  )

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld : !die.isHeld} :
      die
    }))
  }

  function rollDice(){
    setDice(oldDice => oldDice.map(die => {
     return  die.isHeld ? die : generateNewDie()
    }))
  }

  return(
    
    <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die
             to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
  )
}

