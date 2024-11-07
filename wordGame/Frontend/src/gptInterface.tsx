import { Button } from "@mui/material";
import { useState } from "react";

//Methods borrowed from openAI documentation
const getGptMessage = async (message: string) => {
  try {
    const response = await fetch("http://localhost:5001/api/chatGPT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error fetching response:", error);
    return "An error occurred while fetching the response.";
  }
};

function ChatDisplayComponent({ inputText }: any) {
  const [response, setResponse] = useState("");

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const chatResponse = await getGptMessage(
        "Give me a hard hint for" + inputText
      );
      setResponse(chatResponse);
    }
  };

  return (
    <div>
      <Button
        sx={{ backgroundColor: "#6200ea" }}
        variant="contained"
        onClick={handleSendMessage}
      >
        Get AI Help
      </Button>
      {response && (
        <div>
          <h3>AI Hint:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default ChatDisplayComponent;
