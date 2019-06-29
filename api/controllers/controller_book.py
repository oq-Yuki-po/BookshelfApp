# api/controllers/search_book.py

from flask import Flask, Blueprint, request
from api.services.register_book import register_book

app = Blueprint('books', __name__)


@app.route("/api/books/", methods=["POST"])
def post():
    isbn = request.form['isbn']

    message = register_book(isbn)

    return message
