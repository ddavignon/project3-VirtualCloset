import app
import flask_sqlalchemy, app
import os
# app.app = app module's app variable
#TODO ADD Database grab info set to message array in init send messages list down and will be done with SE PROJECT!!!!!
#TODO REPLACE ALL ADD messges with DB adds :) add extra stuff more commands 

app.app.config['SQLALCHEMY_DATABASE_URI'] = app.os.getenv('DATABASE_URL')
app.app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
#app.app.config['SQLALCHEMY_DATABASE_URI'] ='postgresql://brandan:blockwood@localhost/postgres'
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
    type_clothing= db.Column(db.String(10))
    url_path=db.Column(db.String(1000))
    
    
    def __init__(self, user_id,color,descripition,style,tempLow,tempHigh,type_clothing,url_path):
        self.user_id=user_id
        self.color=color
        self.descripition=descripition 
        self.style=style
        self.tempLow=tempLow
        self.tempHigh=tempHigh
        self.type_clothing=type_clothing
        self.url_path=url_path
        
    @property   
    def serialize(self):
        return {
            'usesr':self.user_id,
            'color':self.color,
            'style':self.style,
            'tempLow':self.tempLow,
            'tempHigh':self.tempHigh,
            'type_clothing':self.type_clothing,
            'url_path':self.url_path
        }
 
