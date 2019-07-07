from api.models.ModelBook import Book
from api.models.ModelAuthor import Author
from api.setting import session

import json
import requests


def register_book(target_isbn):
    parameter = {'isbn': target_isbn}
    query_result = requests.get(
        'https://api.openbd.jp/v1/get', params=parameter)
    book_info = json.loads(query_result.text)

    title = book_info[0]['summary']['title']
    isbn = book_info[0]['summary']['isbn']
    cover = book_info[0]['summary']['cover']
    author = book_info[0]['onix']['DescriptiveDetail']['Contributor'][0]['PersonName']['content']

    db_author = session.query(Author.id). \
        filter(Author.name == author).\
        all()
    if len(db_author) == 0:
        model_author = Author(author)
        session.add(model_author)
        session.flush()
        model_book = Book(title, isbn, cover, model_author.id)
    else:
        model_book = Book(title, isbn, cover, db_author[0].id)
    session.add(model_book)
    
    session.commit()

    session.close()

    return title
