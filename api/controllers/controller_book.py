# api/controllers/search_book.py

from flask import Flask, Blueprint, request
from api.services.register_book import register_book
from api.services.search_books import search_books

app = Blueprint('books', __name__)


@app.route("/api/books", methods=["POST"])
def post():
    isbn = request.form['isbn']

    message = register_book(isbn)

    return message

@app.route("/api/books", methods=["GET"])
def get():
    
    author = request.args.get('author')
    title = request.args.get('title')
    
    response = search_books(title, author)

    return response
