from flask_restful import Resource, reqparse
from flask_jwt import jwt_required
from models.closet import ClosetModel

class Closet(Resource):
    def get(self, name):
        closet = ClosetModel.find_by_name(name)
        if closet:
            return closet.json()
        return {'message': 'Closet not found'}, 404

    def post(self, name):
        if ClosetModel.find_by_name(name):
            return {'message': "An item with name '{}' already exists.".format(name)}

        closet = ClosetModel(name)
        try:
            closet.save_to_db()
        except:
            return {"message": "An error occurred while creating the closet."}, 500

        return closet.json(), 201

    @jwt_required()
    def delete(self, name):
        closet = ClosetModel.find_by_name(name)
        if closet:
            closet.delete_from_db()

        return {'message': 'closet deleted'}


class ClosetList(Resource):
    def get(self):
        return {'closets': [closet.json() for closet in ClosetModel.query.all()]}
