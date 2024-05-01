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
        idUsuario = request.form.get('idUsuario')
        nombreProducto = request.form.get('nombreProducto')
        descripcion = request.form.get('descripcion')
        foto = request.form.get('foto')
        precio = request.form.get('precio')
        contacto = request.form.get('contacto')
        cantidad = request.form.get('cantidad')
       
        
        new_product = mp.create_product(idUsuario, nombreProducto, descripcion, foto, precio, contacto, cantidad)
        if new_product == -1:
            return json.dumps({'error': 'No se pudo crear el producto'})
        return json.dumps(new_product.to_dict())
    except:
        return json.dumps({'error': 'Faltan datos'})
  
    


## Update
## Receives an id
## Return a json
@producto_blueprint.route('/update', methods=['POST'])
def update_product():
    try:
        idProducto = request.form.get('idProducto')
        idUsuario = request.form.get('idUsuario')
        nombreProducto = request.form.get('nombreProducto')
        descripcion = request.form.get('descripcion')
        foto = request.form.get('foto')
        precio = request.form.get('precio')
        contacto = request.form.get('contacto')
        cantidad = request.form.get('cantidad')
        updated_product = mp.update_product(idProducto, idUsuario, nombreProducto, descripcion, foto, precio, contacto, cantidad)
        if updated_product == -1:
            return json.dumps({'error': 'No se pudo actualizar el producto'})
        elif updated_product == -2:
            return json.dumps({'error': 'No autorizado para actualizar producto'})
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