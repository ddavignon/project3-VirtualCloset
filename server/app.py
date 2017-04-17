import os, json, tempfile, smtplib
from clarifai import rest
from clarifai.rest import ClarifaiApp
from clarifai.rest import Image as ClImage

from werkzeug.utils import secure_filename

from flask_ask import Ask,statement,question,session,version

from flask import Flask, request, jsonify,render_template,send_file
from flask_restful import Api
from flask_jwt import JWT,jwt_required, current_identity


from security import authenticate, identity
from resources.user import UserRegister
from resources.item import Item, ItemList,TextList
from resources.closet import Closet, ClosetList
from resources.AvatarAI import avatar

from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from email.MIMEImage import MIMEImage
from PIL import Image
import requests
from StringIO import StringIO
import logging


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

appClar = ClarifaiApp(os.getenv("clarifai_client_id"),os.getenv("clarifai_client_secret"))
app.secret_key = 'SuperSecretPasskey'
api = Api(app)

ask = Ask(app,"/clothing_text_message")
log = logging.getLogger()

@app.before_first_request
def create_tables():
    db.create_all()

jwt = JWT(app, authenticate, identity,JWT_EXPIRATION_DELTA=86400)

api.add_resource(Closet, '/closet/<string:name>')
api.add_resource(Item, '/item/<string:name>')
api.add_resource(ClosetList, '/closets')
api.add_resource(ItemList, '/items')
api.add_resource(UserRegister, '/register')
api.add_resource(TextList,'/text')
api.add_resource(avatar,'/recommend')
#####################################################################################
# MIGRATIONS BELOW
#####################################################################################


###################################Clarifai methods#############################

#returns an an array of  possible apparel
#attr
#name-apparelName
#value-confidence
def possibleApparel(appCont,name):
    model=appCont.models.get('e0be3b9d6a454f0493ac3a30784001ff')
    image = ClImage(file_obj=open(name, 'rb'))
    response=model.predict([image])
    response=response["outputs"][0]["data"]["concepts"]
    item =response
    items=[]
    items.append(item[0])
    items.append(item[2])
    items.append(item[3])
    return items

@ask.launch
def start_skill():
    welcome_message= "Would you like a recommendation?"
    logging.getLogger('flask_ask').setLevel(logging.DEBUG)
    return question(welcome_message)

@ask.intent("YesIntent")
def yes_intent():
    log.info("Request ID: {}".format(request))
    message= "I found this in your closet."
    return statement(message)

@ask.intent("NoIntent")
def no_intent():
    message = "Have a good day then."
    return statement(message)

@app.route('/login')
def login():
    return render_template('index.html')

@app.route('/recommendation')
def recommend():
    return render_template('recommendations.html')
@app.route('/')
def default():
  return "Success"
  
@app.route('/avatar')
def webHead():
  return send_file('static/Avatar.gif', mimetype='image/gif')

  
@app.route('/virtual/api/v1.0/upload', methods=['POST'])
def sendToClarfai():
    #stuff from form can be grabbed by id of the tag
    #stuff = request.form['something']
    file = request.files['uri']
    data = {}
    #get working directory
    directory_name=os.getcwd()+"/tmp"
    print directory_name
    #make a filename note need to add extnesion probably only jpg or jpeg at this point less data
    filename = secure_filename(file.filename)
    #save fiel
    file.save(os.path.join(directory_name, filename))
    #send to Clarfai API
    data["apparel"]=possibleApparel(appClar,directory_name+"/"+file.filename)
    # data["styles"]=possibleStyles(appClar,directory_name+"/"+file.filename)
    # data["color"]=getColor(appClar,directory_name+"/"+file.filename)
    #remove file
    os.remove(directory_name+"/"+file.filename)
    #does take a little time
    #print file.mimetype_params
    return jsonify(data)


    
@app.route('/test', methods=['GET'])
def get_test():
    products = amazon.search(Keywords='kindle', SearchIndex='All')
    for i, product in enumerate(products):
        print "{0}. '{1}'".format(i, product.offer_url)+" "+product.large_image_url
    print products
    return "hello"


    

    
    

from db import db
db.init_app(app)
if __name__ == '__main__':
    app.run(debug=True,host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))  # important to mention debug=True




