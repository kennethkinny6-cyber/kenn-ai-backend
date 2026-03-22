import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Kenn AI Backend Running");
});

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  const answer = "Kenn AI: " + question;

  res.json({ answer });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
