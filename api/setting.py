from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base
import psycopg2

class RepresentableBase(object):
    def __repr__(self):
        """Dump all columns and value automagically.
    
        This code is copied a lot from followings.
        See also:
           - https://gist.github.com/exhuma/5935162#file-representable_base-py
           - http://stackoverflow.com/a/15929677
        """             
        #: Columns.
        columns = ', '.join([
            '{0}={1}'.format(k, repr(self.__dict__[k]))
            for k in self.__dict__.keys() if k[0] != '_'
        ])
        
        return '<{0}({1})>'.format(
            self.__class__.__name__, columns
        )

# postgresqlのDBの設定
DATABASE = "postgresql://postgres:@192.168.1.19:5432/bookshelf"

ENGINE = create_engine(
    DATABASE,
    encoding="utf-8",
    echo=True
)

# Sessionの作成
session = scoped_session(
    # ORM実行時の設定。自動コミットするか、自動反映するなど。
    sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=ENGINE
    )
)


# modelで使用する
Base = declarative_base(cls=RepresentableBase)
Base.query = session.query_property()
