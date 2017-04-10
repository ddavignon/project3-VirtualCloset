from flask_restful import Resource, reqparse
from flask_jwt import jwt_required, current_identity
from flask import request
from werkzeug.utils import secure_filename

import json, forecastio, os, boto3, random, string

from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from email.MIMEImage import MIMEImage
import requests
import smtplib
from PIL import Image
from StringIO import StringIO
import cStringIO


from models.item import ItemModel
from models.closet import ClosetModel

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
    def get(self, name):
        item = ItemModel.find_by_id(name)
        if item:
            return item.json()
        return {'message': 'Item not found'}, 404

    @jwt_required()
    def post(self, name):
        # if ItemModel.find_by_name(name):
        #     return {'message': "An item with name '{}' already exists.".format(name)}

        # print Item.parser.parse_args()
        # data = Item.parser.parse_args()
        # data = request.get_json()

        closet = ClosetModel.find_by_uid(current_identity.id).json()

        uri =request.files["image_data"]
        description = request.form['description']
        type_clothing = request.form['type_clothing']
        style = request.form['style']

        user_id=str(closet['_id'])

        image_uri="https://s3-us-west-1.amazonaws.com/"+os.getenv("bucket_name")+"/"+user_id+"/"+uri.filename

        directory_name=os.getcwd()+"/tmp"
        filename = secure_filename(uri.filename)
        uri.save(os.path.join(directory_name, filename))
        data = open(directory_name+"/"+uri.filename, 'rb')
        boto3.resource('s3').Bucket(os.getenv("bucket_name")).put_object(Key=user_id+"/"+uri.filename, Body=data)
        os.remove(directory_name+"/"+uri.filename)

        item = ItemModel(
            description,
            type_clothing,
            style,
            image_uri,
            user_id # closet['_id'] # data['closet_id']
        )

        try:
            item.save_to_db()
        except Exception as e:
            return {"message": "An error occurred inserting the item.", "error": e}

        return item.json(), 201

    @jwt_required()
    def delete(self, name):
        item = ItemModel.find_by_id(name)
        if item:
            item.delete_from_db()

        return {'message': 'Item deleted'}

    # not configured yet
    '''
    @jwt_required()
    def put(self, name):
        # data = Item.parser.parse_args()
        data = request.get_json()

        item = ItemModel.find_by_id(name)

        closet = ClosetModel.find_by_uid(current_identity.id).json()

        if item is None:
            item = ItemModel(
                # name,
                # data['color'],
                data['description'],
                data['type_clothing'],
                data['style'],
                data['url_path'],
                closet['_id'] # data['closet_id']
            )
        else:
            # item.color = data['color'],
            item.description = data['description'],
            item.type_clothing = data['type_clothing'],
            item.style = data['style'],
            item.url_path = data['url_path'],
            item.closet_id = closet['_id'] # data['closet_id']

        item.save_to_db()
        return item.json()
    '''

class ItemList(Resource):
    @jwt_required()
    def get(self):
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
        }
        
class TextList(Resource):
     @jwt_required()
     def post(self):
        provider=""
        urls=request.get_json()
        info =[closet.json() for closet in ClosetModel.query.filter_by(user_id=current_identity.id).all()]
        if info:
            provider = carrier(info[0]["carrier"])
            phone = info [0]["phone_number"].replace("-","")
            for i in urls["urls"]:
                sendMessage(i,phone,provider)
            return "Message has been sent"
        return 401
        
def carrier(provider):
         provider = provider.lower()
         if "att" in provider:
             return "@mms.att.net"
         elif "tmobile" in provider:
             return "@tmomail.net"
         elif "sprint" in provider:
             return "@page.nextel.com"
         elif "verizon" in provider:
             return "@vtext.com"
             
def sendMessage(url,number,carrier):
            # Define these once; use them twice!
    strFrom = 'virtualcloset100@gmail.com'
    strTo = str(number)+carrier

    # Create the root message and fill in the from, to, and subject headers
    msgRoot = MIMEMultipart('related')
    msgRoot['From'] = strFrom
    msgRoot['To'] = strTo
    msgRoot.preamble = 'This is a multi-part message in MIME format.'

    # Encapsulate the plain and HTML versions of the message body in an
    # 'alternative' part, so message agents can decide which they want to display.
    msgAlternative = MIMEMultipart('alternative')
    msgRoot.attach(msgAlternative)


    # We reference the image in the IMG SRC attribute by the ID we give it below
    msgText = MIMEText('<img src="cid:image1">', 'html')
    msgAlternative.attach(msgText)
    response = requests.get(url)
    size = 600, 600 #Can go higher it only took up 45kb
    img = StringIO(response.content) 
    newImg=cStringIO.StringIO()
    #open with PILL now
    im = Image.open(img)
    #Resize Image
    im=im.resize(size,Image.ANTIALIAS)
    #Try to get best quality
    quality_val = 90
    im.save(newImg, "JPEG",quality=quality_val)
   
    # MIMEImage
    msgImage = MIMEImage(newImg.getvalue())
   
    

    # Define the image's ID as referenced above
    msgImage.add_header('Content-ID', '<image1>')
    msgRoot.attach(msgImage)
    
    #start emailing
    server = smtplib.SMTP( "smtp.gmail.com", 587 )
    
    # Send the email (this example assumes SMTP authentication is required)
    server.starttls();
    server.login( os.getenv('email'),os.getenv('password'))

    server.sendmail(strFrom, strTo, msgRoot.as_string())
    server.quit()
         