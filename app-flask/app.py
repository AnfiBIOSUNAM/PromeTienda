from flask import Flask, redirect, render_template, url_for, request, flash, session
from controller.catalogue import catalogue
from alchemyClasses import db
from controller.ControllerUsuario import usuario_blueprint
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://lab:Developer123!@localhost:3306/Tienda'
app.config.from_mapping(
    SECRET_KEY='dev'
)
db.init_app(app)

app.register_blueprint(catalogue)
app.register_blueprint(usuario_blueprint)



@app.route('/')
def hello_world():
    return redirect(url_for('login'))


@app.route('/login', methods=['GET'])
@cross_origin()
def login():
    if session.get('user_id') != None:
        return render_template('login.html', user=session['user_id'])
    if request.method == 'GET':
        return render_template('index.html')
    name = request.form.get('username')
    passwd = request.form.get('password')
    if name == 'ferfong' and passwd == 'Developer123!': #Ustedes van a tener que cambiar esto, por una validación con la DB.
        session['user_id'] = name #definición de cookie de sesión.
        return render_template('login.html', user=name)
    flash('Invalid username or password')
    return redirect(url_for('login'))
    
    
    
    


@app.route('/logout')
def logout():
    session['user_id'] = None
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run()
