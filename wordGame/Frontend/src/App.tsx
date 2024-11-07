import { useEffect, useState } from "react";
import "./App.css";
import { Box, Button, Card, Typography } from "@mui/material";
import GenerateWord from "./GenerateWord";
import ChatComponent from "./gptInterface";

const App = () => {
  //State variables for the current word, correct guess, and results of the previous guess
  const [correctWord, setCorrectWord] = useState(GenerateWord());
  const [guess, setGuess] = useState<string>("");

  // For the results, 0 == gray, 1 == yellow, 2 == green
  const [prevResults, setPrevResults] = useState<number[][]>([[]]);
  const [prevGuesses, setPrevGuesses] = useState<string[]>([]);

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
    const newResults = guess.split("").map((letter, index) => {
      if (correctWord[index] == letter) {
        return 2;
      } else if (correctWord.includes(letter)) {
        return 1;
      } else {
        return 0;
      }
    });
    //Adding the new results and guess to index 0 of the history arrays
    setPrevResults([newResults, ...prevResults]);
    setPrevGuesses([guess, ...prevGuesses]);
  };

  const handleReset = () => {
    setGuess("");
    setPrevResults([[]]);
    setPrevGuesses([]);
  };

  const handleNewGame = () => {
    handleReset();
    setCorrectWord(GenerateWord());
  };

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
            sx={{ backgroundColor: "#5A5A5A" }}
            onClick={() => {
              handleGuess();
            }}
          >
            Guess
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#2C3539" }}
            onClick={() => handleReset()}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#5A5A5A" }}
            onClick={() => handleNewGame()}
          >
            New Game
          </Button>
        </Box>
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
                }}
                key={index}
              >
                <Typography variant="h5">{guess[index] || ""}</Typography>
              </Card>
            ))}
          </Box>
        </Box>
        {/* AI Chat Component */}
        <ChatComponent inputText={correctWord}></ChatComponent>
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
