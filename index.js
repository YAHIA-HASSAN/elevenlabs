const express = require("express");
const { createAudioFileFromText } = require("./eleven-labs"); // Adjust the path accordingly

const app = express();

// Define a route to generate audio file from text
app.get("/generate-audio", async (req, res) => {
  try {
    const text = req.query.text; // Assuming text is sent as a query parameter
    const fileName = `${uuid()}.mp3`; // Generate a unique filename using uuid
    const filePath = await createAudioFileFromText(text, fileName);
    res.download(filePath); // Automatically downloads the generated audio file
  } catch (error) {
    console.error("Error generating audio file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
