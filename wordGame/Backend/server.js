import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

//Loding enviornment variables
dotenv.config();

//Setting up server on port 5001
const app = express();
const port = 5001;

// Morgen will create server logs
app.use(morgan("dev"));
// Middleware to parse JSON requests
app.use(express.json());
//Cross origin reasource sharing allows this to work with my react frontend
app.use(cors());

// Route to handle chatGPT requests from frontend
app.post("/api/chatGPT", async (req, res) => {
  const { message } = req.body;

  try {
    // Send request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    // Handling any non-OK responses
    if (!response.ok) {
      console.log(response);
      return res.status(response.status).json({ error: response.statusText });
    }

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error);
    res.status(500).json({ error: "An error occurred on the server." });
  }
});

//Fun route to return a description of me and this server
app.get("/description", (req, res) => {
  console.log("Somone requested a description");
  res.send(
    "This is a simple backend server set up by Davis Featherstone. To communicate with the chatGPT api, route to /api/chat"
  );
});

//Fun routes to increment a counter and return the result
let myCount = 0;

//To use:
// curl -X POST http://localhost:5001/count \
// -H "Content-Type: application/json" \
// -d '{"increment": 5}'

app.post("/count", (req, res) => {
  myCount += req.body.increment;
  res.json({ myCount });
});

app.get("/count", (req, res) => {
  //Sending the count back in a JSON object
  res.json({ myCount });
});

// Default message when starting the server
app.listen(port, () => {
  console.log(`Davis' server online at http://localhost:${port}`);
});
