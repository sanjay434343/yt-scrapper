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
  const result = await getYoutubeFormats(url);
  res.json(result);
});

app.get("/", (_, res) => res.send("✅ YouTube Downloader API Running"));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
