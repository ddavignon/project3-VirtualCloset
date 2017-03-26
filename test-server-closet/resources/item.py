from flask_restful import Resource, reqparse
from flask_jwt import jwt_required, current_identity
from flask import request
from models.item import ItemModel

class Item(Resource):
    # parser = reqparse.RequestParser()
    # parser.add_argument('style',
    #     type=str,
    #     required=True,
    #     help="This field cannot be left blank!"
    # )

    # parser.add_argument('closet_id',
    #     type=int,
    #     required=False,
    #     help="Every item needs a store id!"
    # )

    # parser.add_argument('_color',
    #     type=str,
    #     required=True,
    #     help="This field cannot be left blank!"
    # )

    # parser.add_argument('description',
    #     type=str,
    #     required=True,
    #     help="Every item needs a store id!"
    # )

    # parser.add_argument('type_clothing',
    #     type=str,
    #     required=True,
    #     help="This field cannot be left blank!"
    # )

    # parser.add_argument('url_path',
    #     type=str,
    #     required=True,
    #     help="Every item needs a store id!"
    # )

    @jwt_required()
    def get(self, _id):
        item = ItemModel.find_by_id(_id)
        if item:
            return item.json()
        return {'message': 'Item not found'}, 404

    def post(self, name):
        if ItemModel.find_by_name(name):
            return {'message': "An item with name '{}' already exists.".format(name)}

        # print Item.parser.parse_args()
        # data = Item.parser.parse_args()
        data = request.get_json()

        item = ItemModel(
            name,
            data['color'],
            data['description'],
            data['type_clothing'],
            data['style'],
            data['url_path'],
            1, # data['closet_id']
        )

        try:
            item.save_to_db()
        except Exception as e:
            return {"message": "An error occurred inserting the item.", "error": e}

        return item.json(), 201

    @jwt_required()
    def delete(self, _id):
        item = ItemModel.find_by_id(_id)
        if item:
            item.delete_from_db()

        return {'message': 'Item deleted'}

    @jwt_required()
    def put(self, name):
        # data = Item.parser.parse_args()
        data = request.get_json()

        item = ItemModel.find_by_name(name)

        if item is None:
            item = ItemModel(
                name,
                data['color'],
                data['description'],
                data['type_clothing'],
                data['style'],
                data['url_path'],
                1 # data['closet_id']
            )
        else:
            item.color = data['color'],
            item.description = data['description'],
            item.type_clothing = data['type_clothing'],
            item.style = data['style'],
            item.url_path = data['url_path'],
            item.closet_id = 1 # data['closet_id']

        item.save_to_db()
        return item.json()


class ItemList(Resource):
    @jwt_required()
    def get(self):
        print 'current id', current_identity
        return {
            'shirts': [item.json() for item in ItemModel.query.filter_by(type_clothing='shirt').all()],
            'pants': [item.json() for item in ItemModel.query.filter_by(type_clothing='pants').all()],
            'shoes': [item.json() for item in ItemModel.query.filter_by(type_clothing='shoes').all()],       
        }
