import { useEffect, useState } from 'react'
import Board from './components/Board'

// import cloneDeep from 'lodash.clonedeep'

const App = () => {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false);
  const [update, setupdate] = useState(localStorage.getItem("key")||0)
  const startGame = () => {
    let newGrid = JSON.parse(JSON.stringify(data));
    addNumber(newGrid)
    addNumber(newGrid)
    setData(newGrid)
  }
  const addNumber = (newGrid) => {
    let added = false
    let gridFull = false
    let attempts = 0;
    while (!added) {
      if (gridFull) {
        break;
      }

      let randomRowIndex = Math.floor(Math.random() * 4)
      let randomCloumnIndex = Math.floor(Math.random() * 4)
      attempts++;
      if (newGrid[randomRowIndex][randomCloumnIndex] === 0) {
        newGrid[randomRowIndex][randomCloumnIndex] = Math.random() > 0.5 ? 4 : 2
        added = true
      }
      if (attempts > 50) {
        gridFull = true;
        checkIfGameOver();
      }
    }
  }
  //move up
  const swipeUp = () => {
    let newArray = JSON.parse(JSON.stringify(data))
    let oldData = data
    for (let i = 0; i < 4; i++) {
      let s = 0; // s is point a cell index so that we can move index
      let f = 1;
      let b = newArray[i]
      while (s < 4) {
        if (f === 4) {
          f = s + 1;
          s++;
          continue
        }
        else if (b[s] === 0 && b[f] === 0) {
          f++;
        }
        else if (b[s] !== 0 && b[f] === 0) {
          f++;
        }
        else if (b[s] === 0 && b[f] !== 0) {
          b[s] = b[f];
          b[f] = 0
          f++;
        }
        else if (b[s] !== 0 && b[f] !== 0) {
          if (b[s] === b[f]) {
            b[s] *= 2;
            b[f] = 0;
            let x = b[s]
            setScore((score) => score + x)
            // console.log("x:" + x)
            f = s + 1
            s++;

          }
          else {
            s++;
            f = s + 1;
          }
        }

      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray);
    }
    // if (dummy) {
    //   return newArray;
    // } else {
    //   setData(newArray);
    // }
    setData(newArray);
  }
  // move down
  const swipeDown = () => {
    let newArray = JSON.parse(JSON.stringify(data))
    let oldData = data
    for (let i = 3; i >= 0; i--) {
      let s = newArray.length - 1;
      let f = s - 1;
      let b = newArray[i]
      while (s > 0) {
        if (f === -1) {
          f = s - 1;
          s--
          continue
        }
        else if (b[s] === 0 && b[f] === 0) {
          f--;
        }
        else if (b[s] !== 0 && b[f] === 0) {
          f--;
        }
        else if (b[s] === 0 && b[f] !== 0) {
          b[s] = b[f];
          b[f] = 0
          f--;
        }
        else if (b[s] !== 0 && b[f] !== 0) {
          if (b[s] === b[f]) {
            b[s] = b[s] + b[f];
            b[f] = 0;
            let y = b[s]
            setScore((score) => score + y)
            // console.log("y:" + y)
            f = s - 1;
            s--;

          }
          else {
            s--;
            f = s - 1;
          }
        }
      }

    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray)
    }
    // if (dummy) {
    //   return newArray;
    // } else {
    //   setData(newArray);
    // }
    setData(newArray);
  }
  //move left
  const swipeLeft = () => {
    let newArray = JSON.parse(JSON.stringify(data))
    let oldData = data
    for (let i = 0; i < 4; i++) {
      let s = 0;
      let f = 1;
      while (s < 4) {
        if (f === 4) {
          f = s + 1;
          s++;
          continue;
        }
        else if (newArray[s][i] === 0 && newArray[f][i] === 0) {
          f++;
        }
        else if (newArray[s][i] !== 0 && newArray[f][i] === 0) {
          f++;
        }
        else if (newArray[s][i] === 0 && newArray[f][i] !== 0) {
          newArray[s][i] = newArray[f][i];
          newArray[f][i] = 0
          f++;
        }
        else if (newArray[s][i] !== 0 && newArray[f][i] !== 0) {
          if (newArray[s][i] === newArray[f][i]) {
            newArray[s][i] *= 2;
            newArray[f][i] = 0;
            let m = newArray[s][i]
            setScore((score) => score + m)
            // console.log("m:" + m)
            f = s + 1;
            s++;
          }
          else {
            s++;
            f = s + 1;
          }
        }

      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray)
    }
    // if (dummy) {
    //   return newArray;
    // } else {
    //   setData(newArray);
    // }
    setData(newArray);
  }
  //move right
  const swipeRight = () => {
    let newArray = JSON.parse(JSON.stringify(data))
    let oldData = data
    for (let i = 3; i >= 0; i--) {
      let s = newArray.length - 1;
      let f = s - 1
      while (s > 0) {
        if (f < 0) {
          f = s - 1;
          s--;
          continue;
        }
        else if (newArray[s][i] === 0 && newArray[f][i] === 0) {
          f--;
        }
        else if (newArray[s][i] !== 0 && newArray[f][i] === 0) {
          f--;
        }
        else if (newArray[s][i] === 0 && newArray[f][i] !== 0) {
          newArray[s][i] = newArray[f][i];
          newArray[f][i] = 0
          f--;
        }
        else if (newArray[s][i] !== 0 && newArray[f][i] !== 0) {
          if (newArray[s][i] === newArray[f][i]) {
            newArray[s][i] *= 2;
            newArray[f][i] = 0;
            let n = newArray[s][i]
            setScore((score) => score + n)
            // console.log("n:" + n)
            s--;
            f--;
          }
          else {
            s--;
            f = s - 1;
          }
        }

      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray)
    }
    // if (dummy) {
    //   return newArray;
    // }
    // else {
    //   setData(newArray);
    // }
    setData(newArray);

  }
  //check game over
  const checkIfGameOver = () => {

    // let checker = swipeLeft(true);

    // if (JSON.stringify(data) !== JSON.stringify(checker)) {
    //   return false;
    // }

    // let checker2 = swipeDown(true);
    // if (JSON.stringify(data) !== JSON.stringify(checker2)) {
    //   return false;
    // }

    // let checker3 = swipeRight(true);
    // if (JSON.stringify(data) !== JSON.stringify(checker3)) {
    //   return false;
    // }

    // let checker4 = swipeUp(true);
    // if (JSON.stringify(data) !== JSON.stringify(checker4)) {
    //   return false;
    // }


    // return true;

    // Check for empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (data[i][j] === 0) {
          return false; // Found an empty cell, game is not over
        }
      }
    }

    // Check for adjacent tiles with the same value
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        // Check right
        if (j < data[i].length - 1 && data[i][j] === data[i][j + 1]) {
          return false;
        }
        // Check down
        if (i < data.length - 1 && data[i][j] === data[i + 1][j]) {
          return false;
        }
      }
    }

    // If no empty cells and no adjacent tiles with the same value, game might be over
    return true;
  };
  //cotrol event
  const handleMove = (event) => {
    if (gameOver) {
      return;
    }
    let code = event.keyCode
    switch (code) {
      case 37:
        swipeLeft();
        break;
      case 38:
        swipeUp();
        break;
      case 39:
        swipeRight();
        break;
      case 40:
        swipeDown();
        break;

      default:
        break;
    }
    let gameOverr = checkIfGameOver();
    if (gameOverr) {
      setGameOver(true);
    }
  }

  // update best score

  //new game
  const newGame = () => {
    const emptyBox = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
    addNumber(emptyBox)
    addNumber(emptyBox)
    setData(emptyBox)
    setScore(0)
    setupdate(localStorage.getItem("key"))

  }


  const tryAgain = () => {
    newGame();
    window.location.reload();
  }

  const updateScore = () => {
    if (score > update) {
      setupdate(score)
    }
    localStorage.setItem("key", update)
  }

  useEffect(() => {
    startGame();

  }, [])
  // add event
  useEffect(() => {
    window.addEventListener("keydown", handleMove);
    updateScore();

    return () => {
      window.removeEventListener("keydown", handleMove);
    }

  }, [handleMove])

  const handleButton = (value) => {
    if (gameOver) {
      return;
    }
    switch (value) {
      case 37:
        swipeLeft();
        break;
      case 38:
        swipeUp();
        break;
      case 39:
        swipeRight();
        break;
      case 40:
        swipeDown();
        break;

      default:
        break;
    }
    let gameOverr = checkIfGameOver();
    if (gameOverr) {
      setGameOver(true);
    }
  }
  //call button for mobile version
  useEffect(() => {
    window.addEventListener("keydown", handleButton);
    updateScore();

    return () => {
      window.removeEventListener("keydown", handleButton);
    }
  }, [handleButton])
  // localStorage.setItem(Best,update)
  //return view
  return (
    <div className='main'>
      <div className='gameOver'>
        {gameOver && (
          <div>
            <div>
              <div
                style={{
                  fontSize: 30,
                  fontFamily: "sans-serif",
                  fontWeight: "900",
                  color: "#776E65",
                  marginBottom: "10px"
                }}
              >
                Game Over
              </div>
              <div>
                <div
                  style={{
                    flex: 1,
                    marginBottom: "10px",
                    marginTop: "auto",
                  }}
                >
                  <div className='.gameover'>
                    <button onClick={tryAgain}  > Try Again</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container">
        <div className="top">
          <div className="first">
            <div className="title">
              <h1>2048</h1>
            </div>
            <div className="score">
              <div className="scr">
                <p>Score </p>
                <p>{score}</p>
              </div>
              <div className="bst">
                <p>Best </p>
                <p>{localStorage.getItem("key")}</p>
              </div>
            </div>

          </div>
          <div className="second">
            <div>
              <p className="clr">Play 2048 Game Online</p>
              <p>Join the numbers and get to the 2048 tile!</p>
            </div>
            <button onClick={newGame}>New Game</button>
          </div>
        </div>
        <div >
          <Board data={data} />
        </div>
        <div className="last">
          <p>
            HOW TO PLAY: Use your arrow keys to move the tiles.
            When two tiles with the same number touch, they merge
            into one!
          </p>
          <a href="#"></a>
          <button>
            Contact
          </button>
          <div className='contact'>
            <a href="https://www.facebook.com/zobayerhossain.arif.35/"><img type="svg" src="../public/facebook.jpg" alt="Facebook" /></a>
            <a href="https://github.com/Zobayer26"><img src="../public/github.jpg" alt="Github" /></a>
            <a href="https://www.linkedin.com/in/md-zobayer-hossain-899921220/"> <img src="../public/linkedin.jpg" alt="Linkedin" /> </a>
          </div>
        </div>
      </div>

      <div className='mobo'>

        <div className="rsp">
          <button className='btn' onClick={() => {
            handleButton(38)
          }}>Up</button>
          <div className='left'>
            <button className='btn' onClick={() => {
              handleButton(37)
            }}>left</button>
            <button className='btn' onClick={() => {
              handleButton(39)
            }}>Right</button>
          </div>
          <button className='btn' onClick={() => {
            handleButton(40)
          }}>Down</button>
        </div>

      </div>
    </div>

  )
}

export default App