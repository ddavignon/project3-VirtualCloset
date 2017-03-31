# Flask-RESTApi-skeleton


#### Migration Endpoints

`@app.route('/virtual/api/v1.0/closet',methods=['GET'])`

is now at

`api.add_resource(ItemList, '/items')`
