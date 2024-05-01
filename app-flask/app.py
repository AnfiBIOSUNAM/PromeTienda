from flask import Flask, redirect, render_template, url_for, request, flash, session
from alchemyClasses import db
from controller.ControllerUsuario import usuario_blueprint
from controller.ControllerProducto import producto_blueprint
from controller.ControllerCategoria import categoria_blueprint

from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://lab:Developer123!@localhost:3306/Tienda'
app.config.from_mapping(
    SECRET_KEY='dev'
)
db.init_app(app)

app.register_blueprint(usuario_blueprint)
app.register_blueprint(producto_blueprint)
app.register_blueprint(categoria_blueprint)



if __name__ == '__main__':
    app.run()
