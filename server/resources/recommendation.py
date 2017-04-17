from flask_restful import Resource, reqparse
from flask_jwt import jwt_required, current_identity
from flask import request,render_template
from werkzeug.utils import secure_filename

import random
import json, forecastio, os, boto3, random, string


from models.item import ItemModel
from models.closet import ClosetModel

class recommendClothes(Resource):
    @jwt_required()
    def get(self):
        info =[closet.json() for closet in ClosetModel.query.filter_by(user_id=current_identity.id).all()]
        items = info[0]["items"]
        if items.length > 0:
            item =random.choice(random.choice(items))
            return render_template('recommendations.html',search=item["description"])
            
        return return render_template('recommendations.html',search='shirt')
       
    