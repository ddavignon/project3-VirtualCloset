# Flask-RESTApi-skeleton


#### Migration Endpoints

`@app.route('/virtual/api/v1.0/closet',methods=['GET'])`

is now at

`api.add_resource(ItemList, '/items')`


`@app.route('/virtual/api/v1.0/signUp',methods=["POST"])`

can now be found at

`api.add_resource(UserRegister, '/register')`



`@app.route('/virtual/api/v1.0/confirmation',methods=["POST"])`

can now be found at

`api.add_resource(item/<string:name>, '/register')`


weather api in ItemList
