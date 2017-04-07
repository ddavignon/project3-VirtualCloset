from flask_restful import Resource, reqparse
from flask_jwt import jwt_required, current_identity
from flask import request
from models.closet import ClosetModel

class Closet(Resource):
    @jwt_required()
    def get(self, name):
        closet = ClosetModel.find_by_uid(current_identity.id)
        if closet:
            return closet.json()
        return {'message': 'Closet not found'}, 404

    @jwt_required()
    def post(self, name):
        if ClosetModel.find_by_name(name):
            return {'message': "An item with name '{}' already exists.".format(name)}

        info = request.get_json()
        closet = ClosetModel(name, current_identity.id, info['phone_number'], info['carrier'])
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
    @jwt_required()
    def get(self):
        return {'closets': [closet.json() for closet in ClosetModel.query.filter_by(user_id=current_identity.id).all()]}
    