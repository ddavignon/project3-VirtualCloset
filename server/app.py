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

app = Flask(__name__)
import models
appClar = ClarifaiApp(os.getenv("clarifai_client_id"),os.getenv("clarifai_client_secret"))
tasks = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol', 
        'done': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web', 
        'done': False
    }
]


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
    
@app.route('/virtual/api/v1.0/closet', methods=['GET'])
def get_tasks():
     # here we want to get the value of user (i.e. ?user=some-value)
    user = request.args.get('user')
    #note if parameter is not filled request.args.get(someParameter) returns None
    style = request.args.get('style')
    temperature = request.args.get('temperature')
    print request.args.get('style')
    
    print user
    return jsonify({'user': user, 'style':style,'temperature':temperature})
    
@app.route('/todo/api/v1.0/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    print task_id
    task = [task for task in tasks if task['id'] == task_id]
    if len(task) == 0:
        abort(404)
    return jsonify({'task': task[0]})

@app.route('/todo/api/v1.0/tasks', methods=['POST'])
def create_task():
    if not request.json or not 'picture' in request.json:
        abort(400)
    print request.json['picture']
    return jsonify({'picture': request.json['picture']}), 201
    
@app.route('/virtual/api/v1.0/signUp',methods=["POST"])
def confirm():
    email=request.form["email"]
    password=request.form["password"]
    phoneNumber=request.form["phoneNumber"]
    #for testing purposes only send back info
    item={'email':email,'password':password,'phoneNumber':phoneNumber}
    return jsonify(item) 

@app.route('/virtual/api/v1.0/confirmation', methods=['POST'])
def confirmation():
    #user_id=request.form["email"]
    
    color = request.form["color"]
    
    description = request.form["description"]
    
    type_clothing= request.form["type_clothing"]
    style = request.form["style"]
    uri =request.files["image_data"]
    
    print request.form
    print request.files
    #testing purposes only send back to client what was just sent
    item ={'color':color,'description':description,'type':type_clothing,'uri':uri.filename}
    return jsonify(item)
    

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
  
