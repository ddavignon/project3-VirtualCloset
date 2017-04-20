from flask_restful import Resource, reqparse
from flask_jwt import jwt_required, current_identity
from flask import request,send_file
from werkzeug.utils import secure_filename

import json, forecastio, os, boto3, random, string


from models.item import ItemModel
from models.closet import ClosetModel

class avatar(Resource):
    @jwt_required()
    def get(self):
        command =request.args.get("command")
        if "recommend" in command:
            
            
            today = None
            # weatehr is assumed to be warm as of now if any errors
            dark_sky_key = os.getenv("DARK_SKY_KEY")
            get_style = 'warm'
            try:
                lat = request.args.get('lat')
                lng = request.args.get('lng')
                forecast = forecastio.load_forecast(dark_sky_key, lat, lng)
                today=forecast.hourly().data[0].apparentTemperature
                print today
                if today < 65:
                    get_style = 'cold'
            except Exception as e:
                print 'Could not fetch weather', e

            closet = ClosetModel.find_by_uid(current_identity.id).json()
            print get_style
            return {
            'weather':today,
            'shirts': [item.json() for item in ItemModel.query.filter_by(style=get_style).filter_by(type_clothing='shirt').filter_by(closet_id=closet['_id']).all()],
            'pants': [item.json() for item in ItemModel.query.filter_by(style=get_style).filter_by(type_clothing='pants').filter_by(closet_id=closet['_id']).all()],
            'shoes': [item.json() for item in ItemModel.query.filter_by(style=get_style).filter_by(type_clothing='shoes').filter_by(closet_id=closet['_id']).all()],
            'accessories': [item.json() for item in ItemModel.query.filter_by(style=get_style).filter_by(type_clothing='accessories').filter_by(closet_id=closet['_id']).all()],
            'outerwear': [item.json() for item in ItemModel.query.filter_by(style=get_style).filter_by(type_clothing='outerwear').filter_by(closet_id=closet['_id']).all()],
            'text': 'Here is what I found'
        }
        return 401
        
        
    @jwt_required()
    def post(self):
        return send_file('static/AvatarIdleFinal.gif.gif', mimetype='image/gif')

        
