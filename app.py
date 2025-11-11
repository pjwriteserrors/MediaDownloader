from flask import Flask, render_template, jsonify, request
import downloader
import threading

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/click", methods=["POST"])
def handle_click():
    # get url and format from frontend
    data = request.get_json()
    url = data.get("urlData")
    format = data.get("format")

    # try extracting video info into file
    try:
        downloader.write_info(url, format)
    except Exception as e:
        print(e)
        return jsonify({"message": f"Error: {e}"})
    
    # start new thread for download so that the preview card in frontend can render
    thread = threading.Thread(target=downloader.download, args=(url, format))
    thread.start()
    
    return jsonify({"message": "Info written"})

if __name__ == "__main__":
    app.run(debug=True)