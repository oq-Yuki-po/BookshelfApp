from flask_marshmallow import Marshmallow

ma = Marshmallow()
class BookSchema(ma.Schema):
    class Meta:
        fields = ('title', 'name', 'cover_path')
