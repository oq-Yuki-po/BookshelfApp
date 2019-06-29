from datetime import datetime
from sqlalchemy import (Column, String, ForeignKey, Integer, DateTime)
from sqlalchemy.orm import relationship
from api.setting import Base
from api.setting import ENGINE

from api.models.ModelAuthor import Author


class Book(Base):
    """
    BookModel
    """
    __tablename__ = 'books'
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(200))
    author_id = Column(Integer, ForeignKey('authors.id'))
    isbn = Column(String(13))
    cover_path = Column(String(200))
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, default=datetime.now, nullable=False)
    authors = relationship('Author', backref="books")

    def __init__(self, title, isbn, cover_path, author_id):
        self.title = title
        self.isbn = isbn
        self.cover_path = cover_path
        self.author_id = author_id


if __name__ == "__main__":
    Base.metadata.create_all(bind=ENGINE)
