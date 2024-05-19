from alchemyClasses.Producto import Producto
from alchemyClasses import db
from flask import jsonify
from alchemyClasses.Categoria import Categoria

# CRUD para productos

def create_product(idUsuario, nombreProducto, descripcion, foto, precio, contacto, cantidad):
    new_producto = Producto(idUsuario=idUsuario, nombreProducto=nombreProducto, descripcion=descripcion, foto=foto, precio=precio, contacto=contacto, cantidad=cantidad)
    try:
        db.session.add(new_producto)
        db.session.commit()
        return new_producto
    except Exception as e:
        print(e)
        return -1
    
def read_product(idProducto):
    producto = Producto.query.get(idProducto)
    if producto is None:
        print('El producto con id: '+str(idProducto)+' no existe')
        return -1
    return producto

def read_products():
    return Producto.query.all()

def read_products_vendor(idVendedor):
    try:
        productos = Producto.query.filter_by(idUsuario=idVendedor).all()
        print(productos)
        return productos
    except Exception as e:
        print("Ocurrió un error al intentar obtener los productos del vendedor: ", e)
        return -1


def update_product(idProducto, idUsuario, nombreProducto, descripcion, foto, precio, contacto, cantidad):
    producto = Producto.query.get(idProducto)
    if producto is None:
        print('El producto con id: '+str(idProducto)+' no existe')
        return -1
    elif producto.idUsuario != int(idUsuario):
        print('El producto con id: '+str(idProducto)+' no pertenece al usuario con id: '+str(idUsuario))
        return -2
    else:
       if idUsuario:
           producto.idUsuario = idUsuario
       if nombreProducto:
            producto.nombreProducto = nombreProducto
       if descripcion:
            producto.descripcion = descripcion
       if foto:
            producto.foto = foto
       if precio:
            producto.precio = precio
       if contacto:
            producto.contacto = contacto
       if cantidad:
            producto.cantidad = cantidad
    db.session.commit()
    return producto


def delete_product(idProducto):
    producto = Producto.query.get(idProducto)
    if producto is None:
        print('El producto con id: '+str(idProducto)+' no existe')
        return -1
    db.session.delete(producto)
    db.session.commit()
    return producto

def productos_por_categoria(categoria):
    try:
        productos = Producto.query.join(Categoria, Producto.idProducto == Categoria.idProducto).filter(Categoria.categoria == categoria).all()
        return productos
    except Exception as e:
        print("Ocurrió un error al intentar obtener los productos por categoría: ", e)
        return -1


def get_product_image(idProducto):
    producto = Producto.query.get(idProducto)
    if producto is None:
        print('El producto con id: '+str(idProducto)+' no existe')
        return -1
    nombre_imagen= producto.foto
    return nombre_imagen

def get_verification(idProducto, idUsuario):
    producto = Producto.query.get(idProducto)
    if producto is None:
        print('El producto con id: '+str(idProducto)+' no existe')
        return -1
    elif producto.idUsuario != int(idUsuario):
        print('El producto con id: '+str(idProducto)+' no pertenece al usuario con id: '+str(idUsuario))
        return -2
    else:
        return True