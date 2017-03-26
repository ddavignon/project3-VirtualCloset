from db import db

class ItemModel(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    color = db.Column(db.String(80))
    description = db.Column(db.String(80))
    type_clothing = db.Column(db.String(80))
    style = db.Column(db.String(80))
    url_path = db.Column(db.String(300))

    closet_id = db.Column(db.Integer, db.ForeignKey('closet.id'))
    closet= db.relationship('ClosetModel')

    def __init__(self, name, color, description, type_clothing, style, url_path, closet_id):
        self.name = name
        self.color = color
        self.description = description
        self.type_clothing = type_clothing
        self.style = style
        self.url_path = url_path
        self.closet_id = closet_id

    def json(self):
        return {
            '_id': self.id,
            'name': self.name,
            'color': self.color,
            'description': self.description,
            'type_clothing': self.type_clothing,
            'style': self.style,
            'url_path': self.url_path,
            'closet_id': self.closet_id
        }

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
