import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getYoutubeFormats } from "./utils/ytdlp.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/youtube", async (req, res) => {
  const { url } = req.body;
  if (!url || !url.includes("youtube.com")) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  const result = await getYoutubeFormats(url);
  if (result.error) return res.status(500).json(result);

  res.json(result);
});

app.get("/", (_, res) => res.send("✅ YouTube Downloader API is running"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
