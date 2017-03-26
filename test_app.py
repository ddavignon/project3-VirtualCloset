from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import render_template, request, redirect, url_for, jsonify
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://dustin:potato@localhost/flaskmovie'

db = SQLAlchemy(app)

#####  Virtual Closet Test EndPoints #######
#db.create_all()
class Users(db.Model):
    email= db.Column(db.String(50),primary_key=True)
    password=db.Column(db.String(30))
    # phone_number= db.Column(db.String(30))
    closet_name = db.Column(db.String(100))
    
    def __init__(self, email,password,phone_number,closet_name):
        self.email= email
        self.password=password
        # self.phone_number=phone_number
        self.closet_name=closet_name
        

    
class Clothes(db.Model):
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    # user_id= db.Column(db.String(50), db.ForeignKey('users.email'))
    color = db.Column(db.String(7))
    description = db.Column(db.String(1000))
    style = db.Column(db.String(30))
    # tempLow = db.Column(db.Integer)
    # tempHigh = db.Column(db.Integer)
    # size = db.Column(db.String(10))
    # quantity = db.Column(db.Integer)
    type_clothing= db.Column(db.String(30))
    url_path=db.Column(db.String(1000))
    
    
    # def __init__(self, user_id,color,descripition,style,tempLow,tempHigh,size,quantity,type_clothing, url_path):
    def __init__(self, color,description,style,type_clothing, url_path):
        # self.user_id=user_id
        self.color=color
        self.description=description 
        self.style=style
        # self.tempLow=tempLow
        # self.tempHigh=tempHigh
        # self.size=size
        # self.quantity=quantity
        self.type_clothing=type_clothing
        self.url_path=url_path

'''
clothingItems = {
    "url_path": "https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg",
    "style": "business",
    "type": "accessories",
    "description": "super cool shirt",
    "color": "green",
    "name": "sweater",
}
'''

@app.route('/virtual/api/v1.0/closet', methods=['GET'])
def get_tasks():
    #  # here we want to get the value of user (i.e. ?user=some-value)
    # user = request.args.get('user')
    # #note if parameter is not filled request.args.get(someParameter) returns None
    # style = request.args.get('style')
    # temperature = request.args.get('temperature')
    # print request.args.get('style')
    
    # print user
    # data = Clothes.query.all()
    data_shirt = Clothes.query.filter_by(type_clothing='shirt').all()
    data_pants = Clothes.query.filter_by(type_clothing='pants').all()
    data_shoes = Clothes.query.filter_by(type_clothing='shoes').all()
    shirt_clothing_items = [{
        'id': x.id,
        'url_path': x.url_path,
        'style': x.style
    } for x in data_shirt]
    pants_clothing_items =[{
        'id': x.id,
        'url_path': x.url_path,
        'style': x.style
    } for x in data_pants]
    shoes_clothing_items =[{
        'id': x.id,
        'url_path': x.url_path,
        'style': x.style
    } for x in data_shoes]

    clothing_items = {
        "shirts": shirt_clothing_items,
        "pants": pants_clothing_items,
        "shoes": shoes_clothing_items
    }

    print clothing_items
    # return jsonify({'user': user, 'style':style,'temperature':temperature})
    return jsonify(clothing_items)

@app.route('/virtual/api/v1.0/confirmation', methods=['POST'])
def confirmation():
    #user_id=request.form["email"]
    info =request.form["info"]
    uri =request.files["image_data"]
    name=request.form["name"]
    description = request.form["description"]
    style = request.form["style"]
    color = request.form["color"]
    type_clothing= request.form["type_clothing"]
    # print request.form
    # print request.files
    # #testing purposes only send back to client what was just sent
    # item ={'info':info,'color':color,'description':description,'type_clothing':type_clothing,'image_data':uri.filename,'name':name,style:"style"}
    
    try: 
        clothing_item = Clothes(color, description, style, type_clothing, 'https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg')
        db.session.add(clothing_item)
        db.session.commit()

        resp = jsonify({
            'message': 'Clothing item added!'
        })
        resp.status_code = 200
    except err:
        resp = jsonify(err)
        resp.status_code = 405
    return resp

if __name__ == "__main__":
    app.run(debug=True,host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))

