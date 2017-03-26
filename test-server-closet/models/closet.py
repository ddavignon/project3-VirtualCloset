from db import db

class ClosetModel(db.Model):
    __tablename__ = 'closet'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    items = db.relationship('ItemModel', lazy='dynamic')

    # user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # user = db.relationship('UserModel')

    # def __init__(self, name, user_id):
    #     self.name = name
    #     self.user_id = user_id


    def __init__(self, name):
        self.name = name

    def json(self):
        return {'name': self.name, 'items': [item.json() for item in self.items.all()]}

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
