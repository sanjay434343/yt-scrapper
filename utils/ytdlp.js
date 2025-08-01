import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function getYoutubeFormats(url) {
  const command = `yt-dlp -j --no-playlist "${url}"`;
  try {
    const { stdout } = await execAsync(command);
    const data = JSON.parse(stdout);

    const formats = data.formats.map(f => ({
      format_id: f.format_id,
      ext: f.ext,
      resolution: f.height ? `${f.height}p` : 'audio',
      filesize: f.filesize,
      url: f.url,
      acodec: f.acodec,
      vcodec: f.vcodec
    }));

    return {
      title: data.title,
      thumbnail: data.thumbnail,
      formats
    };
  } catch (err) {
    console.error("yt-dlp error:", err);
    return { error: "Failed to fetch formats from yt-dlp" };
  }
}
