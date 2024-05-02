from flask import Flask, redirect, render_template, url_for, request, flash, session, jsonify
from alchemyClasses import db
from flask_uploads import UploadSet, configure_uploads, IMAGES
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

app.config['UPLOADS_DEFAULT_DEST'] = './ProductosImg'
app.config['UPLOADED_IMAGES_DEST'] = 'ProductosImg'
app.config['UPLOADED_IMAGES_ALLOW'] = IMAGES
imagenes = UploadSet('imagenes', IMAGES)
configure_uploads(app, imagenes)

db.init_app(app)

app.register_blueprint(usuario_blueprint)
app.register_blueprint(producto_blueprint)
app.register_blueprint(categoria_blueprint)


@app.route('/imagenes/guardar', methods=['POST'])
def guardar_imagen():
    archivos = request.files.getlist('imagen0')
    rutas_imagenes = []
    # Guarda cada archivo en la carpeta de imágenes
    for archivo in archivos:
        nombre_archivo = imagenes.save(archivo)
        rutas_imagenes.append(nombre_archivo)

    # Aquí podrías guardar las rutas de las imágenes en la base de datos

    return jsonify({'rutas_imagenes': rutas_imagenes})
    


if __name__ == '__main__':
    app.run()
