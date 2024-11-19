import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

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

function ChatDisplayComponent({
  inputText,
  reset,
}: {
  inputText: string;
  reset: boolean;
}) {
  const [response, setResponse] = useState("");

  //Effect to reset the chat when reset changed
  useEffect(() => {
    setResponse("");
  }, [reset]);

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
        sx={{
          background: "linear-gradient(45deg, #6200ea, #3700b3)",
          fontWeight: "bold",
          color: "white",
          padding: "8px 16px",
          "&:hover": {
            background: "linear-gradient(45deg, #3700b3, #6200ea)",
          },
        }}
        variant="contained"
        onClick={handleSendMessage}
      >
        Get AI Help&nbsp;<TipsAndUpdatesIcon></TipsAndUpdatesIcon>{" "}
      </Button>
      {response && (
        <div>
          <h3>AI Hint:</h3>
          <p style={{ fontWeight: "bold" }}>{response}</p>
        </div>
      )}
    </div>
  );
}

export default ChatDisplayComponent;
