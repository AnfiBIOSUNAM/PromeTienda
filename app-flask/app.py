from flask import Flask, redirect, render_template, url_for, request, flash, session, jsonify, send_from_directory
from alchemyClasses import db
from flask_uploads import UploadSet, configure_uploads, IMAGES
from controller.ControllerUsuario import usuario_blueprint
from controller.ControllerProducto import producto_blueprint
from controller.ControllerCategoria import categoria_blueprint
from controller.ControllerTener import tener_blueprint
from controller.ControllerAlmacenar import almacenar_blueprint
from controller.ControllerCompra import compra_blueprint
from controller.ControllerContener import contener_blueprint
from Model import model_productos
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_cors import CORS, cross_origin
import json
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://lab:Developer123!@localhost:3306/Tienda'
app.config.from_mapping(
    SECRET_KEY='dev'
)

app.config['UPLOADS_DEFAULT_DEST'] = './ProductosImg'
app.config['UPLOADS_IMAGES_DEST'] = './ProductosImg/imagenes'
app.config['UPLOADED_IMAGES_DEST'] = './ProductosImg/imagenes'
app.config['UPLOADED_IMAGES_ALLOW'] = IMAGES
imagenes = UploadSet('imagenes', IMAGES)
configure_uploads(app, imagenes)

db.init_app(app)

app.register_blueprint(usuario_blueprint)
app.register_blueprint(producto_blueprint)
app.register_blueprint(categoria_blueprint)
app.register_blueprint(tener_blueprint)
app.register_blueprint(almacenar_blueprint)
app.register_blueprint(compra_blueprint)
app.register_blueprint(contener_blueprint)


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
    



@app.route('/imagenes/eliminar', methods=['POST'])
def eliminar_imagen():
    nombre_imagen = request.form.get('nombre_imagen')
    print(nombre_imagen)

    try:
        # Componemos la ruta completa de la imagen usando la configuración UPLOADED_IMAGES_DEST
        ruta_imagen = os.path.join(app.config['UPLOADS_IMAGES_DEST'],nombre_imagen)
        
        # Verificamos si la imagen existe
        if os.path.exists(ruta_imagen):
            # Eliminamos la imagen del sistema de archivos
            os.remove(ruta_imagen)
            return json.dumps({'mensaje': f'La imagen {nombre_imagen} ha sido eliminada correctamente'})
        else:
            return json.dumps({'error': 'La imagen no existe en el servidor'})
    except Exception as e:
        return json.dumps({'error': str(e)})

@app.route('/products', methods=['GET'])
def products():
    products = model_productos.read_products()
    return jsonify([product.to_dict() for product in products])

@app.route('/imagenes/<nombre_imagen>')
def servir_imagen(nombre_imagen):
    try:
        ruta_imagen = os.path.join(app.config['UPLOADED_IMAGES_DEST'], nombre_imagen)
        if os.path.exists(ruta_imagen):
            return send_from_directory(app.config['UPLOADED_IMAGES_DEST'], nombre_imagen)
        else:
            return jsonify({'error': 'Imagen no encontrada'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/correos/cuenta', methods=['POST'])
def enviar_correo_cuenta():
    from_email = "prometienda.fc@gmail.com"
    password = "uictyyyzilngdczu"
    name = request.form.get('nombre')
    to_email = request.form.get('correo')
    user_password = request.form.get('contraseña')
    message = "Hola, "+ name +".\n\nEste correo es para informar que la creación de tu cuenta en Prometienda ha sido exitosa.\n\nNo olvides que tu contraseña es: "+ user_password
   
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = "Creación de cuenta exitosa"

    # Add body to email
    msg.attach(MIMEText(message, 'plain'))

    # Create SMTP session for sending the mail
    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()  # Enable security
            server.login(from_email, password)  # Login with mail_id and password
            text = msg.as_string()
            server.sendmail(from_email, to_email, text)
        return json.dumps({'success': 'usuario_incorrecto'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/correos/compra', methods=['POST']) 
def enviar_correo_compra():   
    from_email = "prometienda.fc@gmail.com"
    password = "uictyyyzilngdczu"
    data = request.get_json()
    if all(key in data for key in ('correo', 'idCompra', 'products')):
        to_email = data['correo']
        idCompra = data['idCompra']
        products = data['products']
        nombre = data['nombre']      
        # Crear la cadena de productos con nombre y cantidad separados por saltos de línea
        productos_detalle = "\n".join([f"{product['idProducto']} - Cantidad: {product['cantidad']}" for product in products])
        message = f"Hola, {nombre}.\nEstos son los detalles de tu compra más reciente:\nID compra: {idCompra}\n\nProductos:\n{productos_detalle}"
        # Procesar la compra con los datos recibidos
        msg = MIMEMultipart()
        msg['From'] = from_email
        msg['To'] = to_email
        msg['Subject'] = "Compra exitosa"

        # Add body to email
        msg.attach(MIMEText(message, 'plain'))

        # Create SMTP session for sending the mail
        try:
            with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.starttls()  # Enable security
                server.login(from_email, password)  # Login with mail_id and password
                text = msg.as_string()
                server.sendmail(from_email, to_email, text)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        resultado = {
            'correo': to_email,
            'idCompra': idCompra,
            'productos': productos_detalle
        }
        
        print("Correo del usuario:", to_email)
        print("ID de Compra:", idCompra)
        print("Detalles de productos:\n", productos_detalle)
        
        return jsonify({'success': True, 'resultado': resultado}), 200
    else:
        return jsonify({'success': False, 'error': 'Datos incompletos'}), 400



if __name__ == '__main__':
    app.run()
