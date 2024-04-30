from flask import Blueprint, session, request, url_for, redirect
from Model import model_resena as mr
import json

resena_blueprint = Blueprint('resena', __name__, url_prefix='/resena')

@resena_blueprint.route('/create', methods=['POST'])
def create_resena():
    try:
        comentario = request.form.get('comentario')
        calificacion = request.form.get('calificacion')
        new_resena = mr.create_resena(comentario, calificacion)
        if new_resena == -1:
            return json.dumps({'error': 'No se pudo crear la reseña'})
        return json.dumps(new_resena.to_dict())
    except:
        return json.dumps({'error': 'Faltan datos'})
    

@resena_blueprint.route('/read', methods=['GET', 'POST'])
def read_resenas_producto():
    try:
        idProducto = request.form.get('idProducto')
        resenas = mr.resenas_producto(idProducto)
        if resenas == -1:
            return json.dumps({'error': 'No hay reseñas para el producto'})
        return json.dumps([resena.to_dict() for resena in resenas])
    except:
        return json.dumps({'error': 'Faltan datos'})
    

@resena_blueprint.route('/update', methods=['POST'])
def update_resena():
    try:
        idReseña = request.form.get('idReseña')
        comentario = request.form.get('comentario')
        calificacion = request.form.get('calificacion')
        updated_resena = mr.update_resena(idReseña, comentario, calificacion)
        if updated_resena == -1:
            return json.dumps({'error': 'No se pudo actualizar la reseña'})
        return json.dumps(updated_resena.to_dict())
    except:
        return json.dumps({'error': 'Faltan datos'})
    

@resena_blueprint.route('/delete', methods=['POST'])
def delete_resena():
    try:
        idReseña = request.form.get('idReseña')
        deleted_resena = mr.delete_resena(idReseña)
        if deleted_resena == -1:
            return json.dumps({'error': 'No se pudo borrar la reseña'})
        return json.dumps(deleted_resena.to_dict())
    except:
        return json.dumps({'error': 'Faltan datos'})

