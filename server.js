app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    console.log("FULL API RESPONSE:", data);

    // ✅ Handle errors properly
    if (!data.choices || !data.choices[0]) {
      return res.json({
        reply: "API error: " + (data.error?.message || "Unknown error")
      });
    }

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    res.json({
      reply: "Server error: " + error.message
    });
  }
});
