import { useEffect, useState } from "react";
import "./App.css";
import { Box, Button, Card, Typography } from "@mui/material";
import GenerateWord from "./GenerateWord";
import ChatComponent from "./gptInterface";
import AddIcon from "@mui/icons-material/Add";
import StatsDisplay from "./StatsDisplay";

const App = () => {
  //State variables for the current word, correct guess, and results of the previous guess
  const [correctWord, setCorrectWord] = useState(GenerateWord());
  const [guess, setGuess] = useState<string>("");
  //State variables to track streaks
  const [attemps, setAttempts] = useState<number>(0);
  const [wins, setWins] = useState<number>(0);
  const [showStats, setShowStats] = useState<boolean>(false);

  // For the results, 0 == gray, 1 == yellow, 2 == green
  const [prevResults, setPrevResults] = useState<number[][]>([[]]);
  const [prevGuesses, setPrevGuesses] = useState<string[]>([]);
  //State to track when I should reset the chat
  const [resetChat, setResetChat] = useState<boolean>(false);

  //Keyboard listener to update the current guess when the user clicks certain keys
  const handleTyping = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleGuess();
    }
    if (event.key === "Backspace") {
      setGuess((guess) => guess.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(event.key) && guess.length < 5) {
      setGuess((guess) => guess + event.key.toUpperCase());
    }
  };

  //useEffect to ensure that only one listener exists at a time
  useEffect(() => {
    window.addEventListener("keydown", handleTyping);
    return () => {
      window.removeEventListener("keydown", handleTyping);
    };
  });

  //Handlers for the top buttons
  const handleGuess = () => {
    //Map to check the number of times each letter appears in the answer
    const wordMap = new Map();
    for (let i = 0; i < 5; i++) {
      wordMap.set(correctWord[i], (wordMap.get(correctWord[i]) || 0) + 1);
      console.log(wordMap);
    }
    //First I will check for letters in the correct position
    const greenLetters = guess.split("").map((letter, index) => {
      if (correctWord[index] === letter) {
        wordMap.set(letter, wordMap.get(letter) - 1);
        return 2;
      } else {
        return 0;
      }
    });

    //Now to check for lettters in the incorect position
    const yellowLetters = guess.split("").map((letter, index) => {
      if (
        correctWord[index] != letter &&
        correctWord.includes(letter) &&
        wordMap.get(letter) != 0
      ) {
        wordMap.set(letter, wordMap.get(letter) - 1);
        return 1;
      } else {
        return 0;
      }
    });
    const newResults = [0, 0, 0, 0, 0];
    for (let i = 0; i < 5; i++) {
      newResults[i] = greenLetters[i] + yellowLetters[i];
    }
    //Adding the new results and guess to index 0 of the history arrays
    setPrevResults([newResults, ...prevResults]);
    setPrevGuesses([guess, ...prevGuesses]);
    //Updating the win counter (need to stringify to proparly make this comparison)
    JSON.stringify(newResults) === JSON.stringify([2, 2, 2, 2, 2])
      ? setWins(wins + 1)
      : null;
    //Updating the attempt counter
    setAttempts(attemps + 1);
  };

  const handleReset = () => {
    setGuess("");
    setPrevResults([[]]);
    setPrevGuesses([]);
    setResetChat(true);
    setAttempts(0);
  };

  const handleNewGame = () => {
    handleReset();
    setCorrectWord(GenerateWord());
  };

  //Effect to flip back reset to false after a delay
  useEffect(() => {
    const timer = setTimeout(() => setResetChat(false), 100);
    return () => clearTimeout(timer);
  }, [resetChat]);

  return (
    <>
      <Typography variant="h2" align="center" fontWeight="bold">
        Featherstone's Word Game
      </Typography>
      <Box display={"flex"} flexDirection={"column"} gap={3} marginTop={2}>
        {/* Box for Buttons */}
        <Box
          display={"flex"}
          alignContent={"center"}
          justifyContent={"center"}
          flexDirection={"row"}
          gap={2}
        >
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #5A5A5A, #2C3539)",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(45deg, #2C3539, #5A5A5A)",
              },
            }}
            onClick={() => {
              handleGuess();
            }}
          >
            Guess
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #5A5A5A, #2C3539)",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(45deg, #2C3539, #5A5A5A)",
              },
            }}
            onClick={() => handleReset()}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #5A5A5A, #2C3539)",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(45deg, #2C3539, #5A5A5A)",
              },
            }}
            onClick={() => handleNewGame()}
          >
            New Game <AddIcon></AddIcon>
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #563A9C, #2C3539)",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(45deg, #2C3539, #563A9C)",
              },
            }}
            onClick={() => setShowStats(!showStats)}
          >
            Show Stats
          </Button>
        </Box>
        {/*Display for the current game's stats*/}
        {showStats && (
          <StatsDisplay wins={wins} attempts={attemps}></StatsDisplay>
        )}
        {/* Current Guess Display */}
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          padding={5}
        >
          <Box display="flex" gap={2}>
            {[...Array(5)].map((_, index) => (
              <Card
                sx={{
                  padding: 5,
                  height: 30,
                  width: 50,
                  textAlign: "center",
                  "&:hover": { backgroundColor: "#D7D7D7" }, // Darken on hover
                }}
                key={index}
              >
                <Typography variant="h5">{guess[index] || ""}</Typography>
              </Card>
            ))}
          </Box>
        </Box>
        {/* AI Chat Component */}
        <ChatComponent
          reset={resetChat}
          inputText={correctWord}
        ></ChatComponent>
        {/* History + Results Section */}
        <Box display={"flex"} flexDirection={"column"} gap={2} marginTop={5}>
          {prevResults.map((prevResult, resultIndex) => (
            <Box
              display={"flex"}
              alignContent={"center"}
              justifyContent={"center"}
              flexDirection={"row"}
              gap={2}
            >
              {prevResult.map((result, index) => (
                <Card
                  sx={{
                    padding: 5,
                    width: 50,
                    backgroundColor:
                      result == 0 ? "gray" : result == 1 ? "yellow" : "green",
                  }}
                >
                  {prevGuesses[resultIndex][index]}
                </Card>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default App;
