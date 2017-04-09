'''
############# Need refactor for databas ######################


@app.route('/virtual/api/v1.0/styles',methods=['GET'])
def checkDB():
    user_id=request.args.get('user_id')
    clothes=models.db.session.query(models.Clothes.style,models.Clothes.user_id).distinct().filter(models.Clothes.user_id==user_id).all()
    styles=[]
    for clothing in clothes:
        styles.append(clothing.style)
    return jsonify({'styles':styles})


'''
#Clarfai stuff
'''
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

''''''

#####################################################################################
# MIGRATIONS ABOVE
#####################################################################################