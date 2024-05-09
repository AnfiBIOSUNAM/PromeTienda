from alchemyClasses.Almacenar import Almacenar
from alchemyClasses import db
from flask import jsonify

"""def agregar_al_carrito(idProducto, idCarrito):
    try:
        db.session.execute('INSERT INTO Almacenar (idCarrito, idProducto, cantidad) VALUES (' + str(idCarrito) + ', ' + str(idProducto) + ', 1)')
        db.session.commit()
        return 1
    except:
        return -1"""
    
def agregar_al_carrito(idProducto, idCarrito):
    new_producto = Almacenar(idCarrito, idProducto, 1)
    try:
        db.session.add(new_producto)
        db.session.commit()
        return new_producto
    except:
        return -1
    
def aumentar_cantidad_producto(idProducto, idCarrito):
    producto = Almacenar.query.filter(Almacenar.idProducto == idProducto, Almacenar.idCarrito == idCarrito).first()
    if producto is None:
        print('El producto con id: ' + str(idProducto) + ' no está en el carrito con id: ' + str(idCarrito))
        return -1
    producto.cantidad += 1
    try:
        db.session.commit()
        return producto
    except:
        return -1
    
def quitar_del_carrito(idProducto, idCarrito):
    producto = Almacenar.query.filter(Almacenar.idProducto == idProducto, Almacenar.idCarrito == idCarrito).first()
    if producto is None:
        print('El producto con id: ' + str(idProducto) + ' no está en el carrito con id: ' + str(idCarrito))
        return -1
    try:
        db.session.delete(producto)
        db.session.commit()
        return 1
    except:
        return -1
    
def obtener_productos_de_carrito(idCarrito):
    productos = Almacenar.query.filter(Almacenar.idCarrito == idCarrito).all()
    if productos is None:
        print('El carrito con id: ' + str(idCarrito) + ' no tiene productos')
        return -1
    return productos
    
"""def quitar_del_carrito(idProducto, idCarrito):
    try:
        db.session.execute('DELETE FROM Almacenar WHERE idCarrito = ' + str(idCarrito) + ' AND idProducto = ' + str(idProducto))
        db.session.commit()
        return 1
    except:
        return -1"""
