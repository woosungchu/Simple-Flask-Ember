from flask import current_app,Flask, send_from_directory
import os
#init
app = Flask(__name__, static_folder='static')

@app.route('/')
def init():
    return send_from_directory(app.static_folder,'index.html')

@app.route('/<path:filename>')
def send_file(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__' :
    app.run(debug=True)
