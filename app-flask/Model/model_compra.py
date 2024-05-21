from alchemyClasses.Compra import Compra
from alchemyClasses import db
from flask import jsonify


def create_compra(idUsuario, total, fecha):
    new_compra = Compra(idUsuario=idUsuario, total=total, fecha=fecha)
    try:
        db.session.add(new_compra)
        db.session.commit()
        return new_compra
    except Exception as e:
        print(e)
        return -1
