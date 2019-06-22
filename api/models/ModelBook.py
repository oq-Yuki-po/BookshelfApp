import sys
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (Column, String, Text, ForeignKey, Integer, DateTime,
                        create_engine, MetaData, DECIMAL, DATETIME, exc, event, Index)
from sqlalchemy.orm import (sessionmaker, relationship, scoped_session)
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
    


    def __init__(self, title,isbn,cover_path):
        self.title = title
        self.isbn = isbn
        self.cover_path = cover_path

if __name__ == "__main__":
    Base.metadata.create_all(bind=ENGINE)
