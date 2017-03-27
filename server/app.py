from flask import Flask, jsonify
import os
from flask import abort
from flask import make_response
from flask import request
from clarifai import rest
from clarifai.rest import ClarifaiApp
from clarifai.rest import Image as ClImage
import tempfile
from werkzeug.utils import secure_filename
import json
import boto3
import rules
import forecastio
import smtplib




app = Flask(__name__)
import models
s3 = boto3.resource('s3')
dark_sky_key = os.getenv("DARK_SKY_KEY")
appClar = ClarifaiApp(os.getenv("clarifai_client_id"),os.getenv("clarifai_client_secret"))



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

#returns an an array of  possible styles and what type of clothes it could be
#attr
#name-apparelName
#value-confidence
def possibleStyles(appCont,name):
    model=appCont.models.get('general-v1.3')
    image = ClImage(file_obj=open(name, 'rb'))
    response=model.predict([image])
    response=response["outputs"][0]["data"]["concepts"]
    item =response
    items=[]
    items.append(item[0])
    items.append(item[2])
    items.append(item[3])
    return items
    
#returns an an array of  possible colors
#attr
#name-apparelName
#value-confidence
def getColor(appCont,name):
    model = appCont.models.get('color', model_type='color')
    image = ClImage(file_obj=open(name,'rb'))
    response=model.predict([image])
    response=response["outputs"][0]["data"]["colors"][0]["w3c"]["hex"]
    print json.dumps(response, indent=2)
    return response
    
@app.route('/')
def something():
    return "hello"
    
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)
    
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

    


@app.route('/virtual/api/v1.0/signUp',methods=["POST"])
def confirm():
    if request.json:
        mydata = request.json # will be
        userExist = models.Users.query.filter_by(email=mydata["email"]).all()
        if (len(userExist)==0):
            user = models.Users(mydata["email"],mydata["password"],mydata["phoneNumber"],mydata["closetName"])
            models.db.session.add(user)
            models.db.session.commit()
            return jsonify({"message":'Success'})

        else:
            return jsonify({"message":'user already exist'})
     

@app.route('/virtual/api/v1.0/closet',methods=['GET'])
def getClothes():
    user_id=request.args.get('user_id')
    if len(models.Users.query.filter_by(email=user_id).all()) !=1:
        return jsonify({"error": "no user by that id"})
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    forecast = forecastio.load_forecast(dark_sky_key, lat, lng)
    today=forecast.hourly()
    print today.icon
    tempLow=200
    tempHigh=-100
    for data in today.data:
        if(data.temperature<tempLow):
           tempLow=data.temperature
        if(data.temperature>tempHigh):
            tempHigh=data.temperature
    print tempLow
    print tempHigh
    shirt=[i.serialize for i in models.db.session.query(models.Clothes).filter(models.Clothes.user_id==user_id).filter(models.Clothes.tempLow>=tempLow).filter(models.Clothes.type_clothing=="shirt").all()]
    pants=[i.serialize for i in models.db.session.query(models.Clothes).filter(models.Clothes.user_id==user_id).filter(models.Clothes.tempLow>=tempLow).filter(models.Clothes.type_clothing=="pants").all()]
    shoes=[i.serialize for i in models.db.session.query(models.Clothes).filter(models.Clothes.user_id==user_id).filter(models.Clothes.tempLow>=tempLow).filter(models.Clothes.type_clothing=="shoes").all()]
    accessory=[i.serialize for i in models.db.session.query(models.Clothes).filter(models.Clothes.user_id==user_id).filter(models.Clothes.tempLow>=tempLow).filter(models.Clothes.type_clothing=="accessory").all()]
    return jsonify({'top':shirt ,'bottom':pants,'shoes':shoes,'accessory':accessory})
    
@app.route('/virtual/api/v1.0/styles',methods=['GET'])
def checkDB():
    user_id=request.args.get('user_id')
    clothes=models.db.session.query(models.Clothes.style,models.Clothes.user_id).distinct().filter(models.Clothes.user_id==user_id).all()
    styles=[]
    for clothing in clothes:
        styles.append(clothing.style)
    return jsonify({'styles':styles})


@app.route('/virtual/api/v1.0/confirmation', methods=['POST'])
def confirmation():
    #user email that they signed up with
    user_id=request.form["email"]
    #info =request.form["info"]
    #checks if the user exist
    if len(models.Users.query.filter_by(email=user_id).all()) !=1:
        return jsonify({"error": "no user by that id"})
    #stuff from request
    uri =request.files["image_data"]
    name=request.form["name"]
    description = request.form["description"]
    style = request.form["style"]
    color = request.form["color"]
    type_clothing= request.form["type_clothing"]
    #add file name it unique 
    #where its going to be stored in s3 storage
    image_uri="https://s3-us-west-1.amazonaws.com/"+os.getenv("bucket_name")+"/"+user_id+"/"+uri.filename
    print request.form
    print request.files
    #S3#####################################
    directory_name=os.getcwd()+"/tmp"
    filename = secure_filename(uri.filename)
    uri.save(os.path.join(directory_name, filename))
    data = open(directory_name+"/"+uri.filename, 'rb')
    s3.Bucket(os.getenv("bucket_name")).put_object(Key=user_id+"/"+uri.filename, Body=data)
    os.remove(directory_name+"/"+uri.filename) 
    clothing_item = models.Clothes(user_id,color,description,style,rules.getLowTemp(type_clothing),rules.getHighTemp(type_clothing),type_clothing,image_uri)
    models.db.session.add(clothing_item)
    models.db.session.commit()
    ######################################
    #testing purposes only send back to client what was just sent
    return "Success"
    

@app.route('/virtual/api/v1.0/upload', methods=['POST'])
def sendToClarfai():
    #stuff from form can be grabbed by id of the tag
    #stuff = request.form['something']
    file = request.files['uri']
    data ={"apparel":"apparel","styles":"styles","color":"color"}
    #get working directory 
    directory_name=os.getcwd()+"/tmp"
    print directory_name
    #make a filename note need to add extnesion probably only jpg or jpeg at this point less data
    filename = secure_filename(file.filename)
    #save fiel
    file.save(os.path.join(directory_name, filename))
    #send to Clarfai API
    data["apparel"]=possibleApparel(appClar,directory_name+"/"+file.filename)
    data["styles"]=possibleStyles(appClar,directory_name+"/"+file.filename)
    data["color"]=getColor(appClar,directory_name+"/"+file.filename)
    #remove file
    os.remove(directory_name+"/"+file.filename) 
    #does take a little time 
    
    #print file.mimetype_params
    return jsonify(data)
        
    
if __name__ == '__main__':
    app.run(debug=True,host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))
  
