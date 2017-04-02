from db import db

class ClosetModel(db.Model):
    __tablename__ = 'closet'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    phone_number = db.Column(db.String(80))
    carrier = db.Column(db.String(80))

    items = db.relationship('ItemModel', lazy='dynamic')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('UserModel')

    def __init__(self, name, user_id, phone_number, carrier):
        self.name = name
        self.user_id = user_id
        self.phone_number = phone_number
        self.carrier = carrier


    # def __init__(self, name):
    #     self.name = name

    def json(self):
        return {
            '_id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'phone_number': self.phone_number,
            'carrier': self.carrier,
            'items': [item.json() for item in self.items.all()]
        }

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_by_uid(cls, uid):
        return cls.query.filter_by(user_id=uid).first()

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
