from flask import Blueprint, session, request, url_for, redirect
from Model import model_productos as mp
import json

producto_blueprint = Blueprint('producto', __name__, url_prefix='/producto')


## Read
## Return a json
@producto_blueprint.route('/read/<idProducto>', methods=['GET'])
def read_product(idProducto):
    product = mp.read_product(idProducto)
    if product == -1:
        return json.dumps({'error': 'No se encontró el producto'})
    return json.dumps(product.to_dict())

@producto_blueprint.route('/read', methods=['GET'])
def read_products():
    products = mp.read_products()
    if products == -1:
        return json.dumps({'error': 'No hay productos'})
    return json.dumps([product.to_dict() for product in products])



    
    
@producto_blueprint.route('/create', methods=['POST'])
def create_product():
    try:
        nombre = request.form.get('nombre')
        apPat = request.form.get('apPat')
        apMat = request.form.get('apMat')
        correo = request.form.get('correo')
        telefono = request.form.get('telefono')
        contraseña = request.form.get('contraseña')
        imagen = request.form.get('imagen')
        vendedor = request.form.get('tipoCuenta')
        
        new_product = mp.create_product(nombre, apPat, apMat, correo, telefono, contraseña, imagen, vendedor)
        if new_product == -1:
            return json.dumps({'error': 'No se pudo crear el producto'})
        return json.dumps(new_product.to_dict())
    except:
        return json.dumps({'error': 'Faltan datos'})
  
    
@producto_blueprint.route('/logout', methods=['GET'])
def logout():
    session.pop('product_id', None)
    return "Sesión cerrada"

## Update
## Receives an id
## Return a json
@producto_blueprint.route('/update/<product>', methods=['POST'])
def update_product(product):
    try:
        idProducto = product['idProducto']
        nombre = product['nombre']
        apPat = product['apPat']
        apMat = product['apMat']
        correo = product['correo']
        telefono = product['telefono']
        contraseña = product['contraseña']
        imagen = product['imagen']
        vendedor = product['vendedor']
        updated_product = mp.update_product(idProducto, nombre, apPat, apMat, correo, telefono, contraseña, imagen, vendedor)
        if updated_product == -1:
            return json.dumps({'error': 'No se pudo actualizar el producto'})
        return json.dumps(updated_product.to_dict())
    except:
        return json.dumps({'error': 'Faltan datos'})
    
    
## Delete
## Receives an id
## Return a json
@producto_blueprint.route('/delete/<idProducto>', methods=['GET'])
def delete_product(idProducto):
    #idProducto = request.args.get('idProducto')
    product = mp.delete_product(idProducto)
    if product == -1:
        return json.dumps({'error': 'No se pudo borrar el producto'})
    return json.dumps(product.to_dict())