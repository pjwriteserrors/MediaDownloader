import yt_dlp
import json


def download(url, format):
    '''Downloads the video using the extracted info in the json file in ./static/info.json'''
    ydl_opts = generate_opts(format)
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        error = ydl.download_with_info_file("./static/info.json")
        return "Error downloading video" if error else error


def write_info(url, format):
    '''Extracts the video infos into ./static/info.json'''
    ydl_opts = generate_opts(format)
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)

        with open("./static/info.json", "w") as file:
            file.write(json.dumps(ydl.sanitize_info(info), indent=4))


def generate_opts(format):
    '''Returns opts for specific formats'''
    if format in ["wav", "mp3"]:
        ydl_opts = {
            "format": f"{format}/bestaudio/best",
            "postprocessors": [
                {
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": f"{format}",
                }
            ],
        }
    elif format in ["mp4", "mkv"]:
        ydl_opts = {"format": "bestvideo+bestaudio/best", "merge_output_format": format}
    else:
        ydl_opts = {"format": "best"}

    return ydl_opts
