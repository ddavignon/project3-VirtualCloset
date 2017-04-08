from flask import Flask, render_template, send_file
import os

app = Flask(__name__)

#app.run(host='0.0.0.0')

@app.route('/')
def index():
    return render_template('hello.html')
    
@app.route('/avatar')
def avatar():
    return send_file('Avatar.gif', mimetype='image/gif')

if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8080)), debug=True)
    