from flask import Flask, jsonify
import os
from flask import abort
from flask import make_response
from flask import request

app = Flask(__name__)

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
    
@app.route('/virtual/api/v1.0/confirm',methods=["POST"])
def confirm():
    return "confirmed"

@app.route('/virtual/api/v1.0/upload', methods=['POST'])
def upload():
    #stuff from form can be grabbed by id of the tag
    stuff = request.form['something']
    file = request.files['Test']
    print file
    return "Success"
        
    
if __name__ == '__main__':
    app.run(debug=True,host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))
  
