import json
import requests
from flask import Flask
from api.controllers import controller_book

app = Flask(__name__)
app.register_blueprint(controller_book.app)

if __name__ == "__main__":
    app.run()
