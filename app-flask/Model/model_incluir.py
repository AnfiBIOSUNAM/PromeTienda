"""from alchemyClasses.Incluir import Incluir
from alchemyClasses import db
from flask import jsonify

#CRUD

def create_incluir(idReseña, idCompra):
    new_incluir = Incluir(idReseña=idReseña, idCompra=idCompra)
    try:
        db.session.add(new_incluir)
        db.session.commit()
        return new_incluir
    except:
        return -1

def find_by_resena(idReseña):
    incluir = Incluir.query.filter(Incluir.idReseña==idReseña).all()
    if incluir is None:
        print('No hay compras para la reseña con id: '+str(idReseña))
        return -1
    return incluir

def find_by_compra(idCompra):
    incluir = Incluir.query.filter(Incluir.idCompra==idCompra).all()
    if incluir is None:
        print('No hay compras para la compra con id: '+str(idCompra))
        return -1
    return incluir
    
def update_incluir(idReseña, idCompra):
    incluir = Incluir.query.filter_by(idReseña=idReseña, idCompra=idCompra).first()
    if incluir is None:
        print('La relación con idReseña: '+str(idReseña)+' e idCompra: '+str(idCompra)+' no existe')
        return -1
    db.session.commit()
    return incluir

def delete_incluir(idReseña):
    incluir = Incluir.query.filter_by(idReseña=idReseña).first()
    if incluir is None:
        print('La relación con idReseña: '+str(idReseña)+' no existe')
        return -1
    db.session.delete(incluir)
    db.session.commit()
    return incluir
"""