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
import rock from "./images/icon-rock.svg"
import paper from "./images/icon-paper.svg"
import scissors from "./images/icon-scissors.svg"

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
      <section className="main mt-5 sm:mt-10 lg:mt-20">
        <div className="flex items-center justify-between border-2 border-gray-20 p-5 rounded-md sm:w-96 sm:mx-auto">
          <article>
            <h4 className="text-xl text-white uppercase sm:text-3xl">Rock</h4>
            <h4 className="text-xl text-white uppercase sm:text-3xl">Paper</h4>
            <h4 className="text-xl text-white uppercase sm:text-3xl">
              Scissors
            </h4>
          </article>

          <article className="bg-white p-5 rounded-md text-center">
            <p className="score-text uppercase">Score</p>
            <h2 className="score text-4xl">{score}</h2>
          </article>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-center text-white mt-10 text-2xl uppercase sm:text-3xl md:text-4xl lg:text-5xl">
            {result}
          </h2>
          <button
            onClick={() => setScore(0)}
            className="bg-white uppercase text-blue-500 py-2 px-8 rounded mt-5"
          >
            Play Again
          </button>
        </div>
        <div className="buttons flex items-center justify-center mt-10">
          <button onClick={() => handleClick("rock")}>
            <img
              src={rock}
              alt="rock"
              className="rock w-32 h-32 rounded-full p-2"
            />
          </button>
          <button onClick={() => handleClick("paper")}>
            <img
              src={paper}
              alt="paper"
              className="paper w-32 h-32 rounded-full p-2"
            />
          </button>
          <button onClick={() => handleClick("scissors")}>
            <img
              src={scissors}
              alt="scissors"
              className="scissors w-32 h-32 rounded-full p-2"
            />
          </button>
        </div>
      </section>
    </>
  )
}

export default App
