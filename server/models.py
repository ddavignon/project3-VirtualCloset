import app
import flask_sqlalchemy, app
import os
# app.app = app module's app variable
#TODO ADD Database grab info set to message array in init send messages list down and will be done with SE PROJECT!!!!!
#TODO REPLACE ALL ADD messges with DB adds :) add extra stuff more commands 

#app.app.config['SQLALCHEMY_DATABASE_URI'] = app.os.getenv('DATABASE_URL')
app.app.config['SQLALCHEMY_DATABASE_URI'] ='postgresql://brandan:blockwood@localhost/postgres'
db = flask_sqlalchemy.SQLAlchemy(app.app)

#db.create_all()
class Users(db.Model):
    email= db.Column(db.String(50),primary_key=True)
    password=db.Column(db.String(30))
    phone_number= db.Column(db.String(30))
    closet_name = db.Column(db.String(100))
    
    def __init__(self, email,password,phone_number,closet_name):
        self.email= email
        self.password=password
        self.phone_number=phone_number
        self.closet_name=closet_name
        

    
class Clothes(db.Model):
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    user_id= db.Column(db.String(50), db.ForeignKey('users.email'))
    color = db.Column(db.String(7))
    description = db.Column(db.String(1000))
    style = db.Column(db.String(30))
    tempLow = db.Column(db.Integer)
    tempHigh = db.Column(db.Integer)
    size = db.Column(db.String(10))
    quantity = db.Column(db.Integer)
    type_clothing= db.Column(db.String(10))
    name_file=db.Column(db.String(100))
    
    def __init__(self, user_id,color,descripition,style,tempLow,tempHigh,size,quantity,type_clothing):
        self.user_id=user_id
        self.color=color
        self.descripition=descripiton 
        self.style=style
        self.tempLow=tempLow
        self.tempHigh=tempHigh
        self.size=size
        self.quantity=quantity
        self.type_clothing=type_clothing
        
    
 
