import os, json, tempfile, smtplib
from clarifai import rest
from clarifai.rest import ClarifaiApp
from clarifai.rest import Image as ClImage

from werkzeug.utils import secure_filename


from flask import Flask, request, jsonify
from flask_restful import Api
from flask_jwt import JWT

from security import authenticate, identity
from resources.user import UserRegister
from resources.item import Item, ItemList
from resources.closet import Closet, ClosetList

from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from email.MIMEImage import MIMEImage
from PIL import Image
import requests
from StringIO import StringIO

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

appClar = ClarifaiApp(os.getenv("clarifai_client_id"),os.getenv("clarifai_client_secret"))
app.secret_key = 'SuperSecretPasskey'
api = Api(app)


@app.before_first_request
def create_tables():
    db.create_all()

jwt = JWT(app, authenticate, identity)

api.add_resource(Closet, '/closet/<string:name>')
api.add_resource(Item, '/item/<string:name>')
api.add_resource(ClosetList, '/closets')
api.add_resource(ItemList, '/items')
api.add_resource(UserRegister, '/register')

#####################################################################################
# MIGRATIONS BELOW
#####################################################################################

@app.route('/')
def default():
    return "Success"
    
@app.route('/test', methods=['GET'])
def get_test():
    products = amazon.search(Keywords='kindle', SearchIndex='All')
    for i, product in enumerate(products):
        print "{0}. '{1}'".format(i, product.offer_url)+" "+product.large_image_url
    print products
    return "hello"

@app.route('/sendText',methods=['GET'])
def sendText():
    # Use sms gateway provided by mobile carrier:
    # at&t:     number@mms.att.net
    # t-mobile: number@tmomail.net
    # verizon:  number@vtext.com
    # sprint:   number@page.nextel.com
    # Establish a secure session with gmail's outgoing SMTP server using your gmail account4
    number=request.args.get('number')
    server = smtplib.SMTP( "smtp.gmail.com", 587 )

    server.starttls()
    
    server.login( os.getenv('email'), os.getenv('password') )

    # Send text message through SMS gateway of destination number
    server.sendmail( 'virtualcloset', str(number)+'@mms.att.net', 'hello' )
    return "Success"
    
@app.route('/sendTextImage',methods=['GET'])
def sendTextImage():
    # Use sms gateway provided by mobile carrier:
    # at&t:     number@mms.att.net
    # t-mobile: number@tmomail.net
    # verizon:  number@vtext.com
    # sprint:   number@page.nextel.com
    # Establish a secure session with gmail's outgoing SMTP server using your gmail account4
    number=request.args.get('number')
    img = request.args.get('img')
       # Define these once; use them twice!
    strFrom = 'virtualcloset100@gmail.com'
    strTo = str(number)+'@mms.att.net'

    # Create the root message and fill in the from, to, and subject headers
    msgRoot = MIMEMultipart('related')
    msgRoot['Subject'] = 'test message'
    msgRoot['From'] = strFrom
    msgRoot['To'] = strTo
    msgRoot.preamble = 'This is a multi-part message in MIME format.'

    # Encapsulate the plain and HTML versions of the message body in an
    # 'alternative' part, so message agents can decide which they want to display.
    msgAlternative = MIMEMultipart('alternative')
    msgRoot.attach(msgAlternative)

    msgText = MIMEText('This is the alternative plain text message.')
    msgAlternative.attach(msgText)

    # We reference the image in the IMG SRC attribute by the ID we give it below
    msgText = MIMEText('<b>Some <i>HTML</i> text</b> and an image.<br><img src="cid:image1"><br>Nifty!', 'html')
    msgAlternative.attach(msgText)
    response = requests.get("https://s3-us-west-1.amazonaws.com/virtualcloset2030/tester%40yahoo.com/hello.jpg")
    img = StringIO(response.content)
    print img
    # This example assumes the image is in the current directory
    msgImage = MIMEImage(img.getvalue())
    

    # Define the image's ID as referenced above
    msgImage.add_header('Content-ID', '<image1>')
    msgRoot.attach(msgImage)
    
    #start emailing
    server = smtplib.SMTP( "smtp.gmail.com", 587 )
    
    # Send the email (this example assumes SMTP authentication is required)
    server.starttls();
    server.login( os.getenv('email'), os.getenv('password') )

    server.sendmail(strFrom, strTo, msgRoot.as_string())
    server.quit()
    return "Success"
    
    

from db import db
db.init_app(app)
if __name__ == '__main__':
    app.run(debug=True,host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))  # important to mention debug=True




