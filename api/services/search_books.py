from api.schemas.search_schema import BookSchema
from api.setting import session
from api.models.ModelAuthor import Author
from api.models.ModelBook import Book
from flask import jsonify

def search_books(title, author):

    db_books = session.query(Book.title, Author.name, Book.cover_path).\
        outerjoin(Author, Book.author_id == Author.id).\
        filter(Book.title.like('%{}%'.format(title))).\
        filter(Author.name.like('%{}%'.format(author))).\
        all()
        
    session.close()

    return jsonify(BookSchema(many=True).dump(db_books).data)
