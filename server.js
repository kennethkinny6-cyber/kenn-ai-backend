import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Kenn AI backend running");
});

// Chat route
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are Kenn AI, a helpful and smart AI assistant."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    // Log response for debugging
    console.log("GROQ RESPONSE:", data);

    // Handle errors
    if (!data.choices || !data.choices[0]) {
      return res.json({
        reply: "AI error: " + (data.error?.message || "Unknown error")
      });
    }

    // Send AI reply
    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.json({
      reply: "Server error: " + error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
