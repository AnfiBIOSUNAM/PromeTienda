from alchemyClasses.Resena import Reseña
from alchemyClasses import db
from flask import jsonify

#CRUD

def create_resena(comentario, calificacion):
    new_resena = Reseña(comentario=comentario, calificacion=calificacion)
    try:
        db.session.add(new_resena)
        db.session.commit()
        return new_resena
    except:
        return -1

def read_resena(idReseña):
    resena = Reseña.query.filter(Reseña.idReseña==idReseña).first()
    if resena is None:
        print('La reseña con id: '+str(idReseña)+' no existe')
        return -1
    return resena
    
def resenas_producto(idProducto):
    resenas = Reseña.query.filter(Reseña.idProducto==idProducto).all()
    if resenas is None:
        print('No hay reseñas para el producto con id: '+str(idProducto))
        return -1
    return resenas

def update_resena(idReseña, comentario, calificacion):
    resena = Reseña.query.filter_by(idReseña=idReseña).first()
    if resena is None:
        print('La reseña con id: '+str(idReseña)+' no existe')
        return -1
    resena.comentario = comentario
    resena.calificacion = calificacion
    db.session.commit()
    return resena

def delete_resena(idReseña):
    resena = Reseña.query.filter_by(idReseña=idReseña).first()
    if resena is None:
        print('La reseña con id: '+str(idReseña)+' no existe')
        return -1
    db.session.delete(resena)
    db.session.commit()
    return resena

