import json
import requests
from flask import Flask

app = Flask(__name__)

@app.route("/api")
def fetch_book_title():

    title = "sample"

    return title

if __name__ == "__main__":
    app.run()