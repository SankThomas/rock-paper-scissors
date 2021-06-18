/*
1. useState and useEffect
2. set your choice, computer choice, result and score state values
3. make the choices into an array
4. handleClick function that takes in the value from the object returned by array.map() method
5. generateComputerChoice function 
  // const randomChoice = choices[Math.floor(Math.random() * choices.length)]
  setComputerChoices(randomChoice)
6. useEffect for switch statement with computerChoice and userChoice dependencies
7. useEffect for localStorage
*/

import { useState, useEffect } from "react"

const getLocalStorage = () => {
  let score = localStorage.getItem("score")
  if (score) {
    return JSON.parse(localStorage.getItem("score"))
  } else {
    return 0
  }
}

const App = () => {
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [score, setScore] = useState(getLocalStorage())
  const [result, setResult] = useState(null)
  const choices = ["rock", "paper", "scissors"] // add lizard and spock

  const handleClick = (value) => {
    setUserChoice(value)
    generateComputerChoice()
  }

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)
  }

  useEffect(() => {
    switch (userChoice + computerChoice) {
      case "scissorspaper":
      case "rockscissors":
      case "paperrock":
        setResult("You Win!")
        setScore(score + 1)
        break
      case "paperscissors":
      case "scissorsrock":
      case "rockpaper":
        setResult("You Lose!")
        setScore(0)
        break
      case "rockrock":
      case "paperpaper":
      case "scissorsscissors":
        setResult("Draw!")
        setScore(score)
        break
      // Add lizard and spock
      default:
        setResult("Make a choice")
    }
  }, [userChoice, computerChoice])

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score))
  }, [score])

  return (
    <>
      <h1>Rock, Paper, Scissors</h1>
      <h3>You have chosen: {userChoice}</h3>
      <h3>The computer chose: {computerChoice}</h3>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => handleClick(choice)}>
          {choice}
        </button>
      ))}
      <h2>{result}</h2>
      <h4>{score}</h4>
    </>
  )
}

export default App
