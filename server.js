
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Kenn AI backend running");
});

app.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  // Simple AI reply (we will upgrade later)
  const reply = "You said: " + userMessage;

  res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
