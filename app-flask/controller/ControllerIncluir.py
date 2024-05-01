"""from flask import Blueprint, session, request, url_for, redirect
from Model import model_incluir as mi
import json

incluir_blueprint = Blueprint('incluir', __name__, url_prefix='/incluir')

@incluir_blueprint.route('/create', methods=['POST'])
def create_incluir():
    try:
        idReseña = request.form.get('idReseña')
        idCompra = request.form.get('idCompra')
        new_incluir = mi.create_incluir(idReseña, idCompra)
        if new_incluir == -1:
            return json.dumps({'error': 'No se pudo crear la relación'})
        return json.dumps(new_incluir.to_dict())
    except:
        return json.dumps({'error': 'Faltan datos'})
    

@incluir_blueprint.route('/compra', methods=['GET', 'POST'])
def find_by_compra():
    try:
        idCompra = request.form.get('idCompra')
        incluir = mi.find_by_compra(idCompra)
        if incluir == -1:
            return json.dumps({'error': 'No hay reseñas para la compra'})
        return json.dumps([incluir.to_dict() for incluir in incluir])
    except:
        return json.dumps({'error': 'Faltan datos'})"""
    


