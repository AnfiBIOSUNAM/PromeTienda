from flask import Blueprint, session, request, url_for, redirect
from Model import model_usuarios as mu
import json

usuario_blueprint = Blueprint('usuario', __name__, url_prefix='/usuario')

## Create
## Receives a json
## Return a json
@usuario_blueprint.route('/create/<user>', methods=['POST'])
def create_user(user):
    try:
        nombre = user['nombre']
        apPat = user['apPat']
        apMat = user['apMat']
        correo = user['correo']
        telefono = user['telefono']
        contraseña = user['contraseña']
        imagen = user['imagen']
        vendedor = user['vendedor']
        new_user = mu.create_user(nombre, apPat, apMat, correo, telefono, contraseña, imagen, vendedor)
        if new_user == -1:
            return json.dumps({'error': 'No se pudo crear el usuario'})
        return json.dumps(new_user.to_dict())
    except:
        return json.dumps({'error': 'Faltan datos'})

## Read
## Return a json
@usuario_blueprint.route('/read/<idUsuario>', methods=['GET'])
def read_user(idUsuario):
    user = mu.read_user(idUsuario)
    if user == -1:
        return json.dumps({'error': 'No se encontró el usuario'})
    return json.dumps(user.to_dict())

@usuario_blueprint.route('/read', methods=['GET'])
def read_users():
    users = mu.read_users()
    if users == -1:
        return json.dumps({'error': 'No hay usuarios'})
    return json.dumps([user.to_dict() for user in users])
@usuario_blueprint.route('/login', methods=['POST'])
def login():
    try:
        correo = request.form.get('correo')
        contraseña = request.form.get('contraseña')
        user = mu.find_user_by_email_and_password(correo, contraseña)

        if user == -1:
            return json.dumps({'error': 'usuario_incorrecto'})
        elif user == -2:
            return json.dumps({'error': 'contraseña_incorrecta'})

        session['user_id'] = user.idUsuario
        return json.dumps(user.to_dict())
    except Exception as e:
        print("Error:", e)
        return json.dumps({'error': 'Faltan datos'})
    
@usuario_blueprint.route('/logout', methods=['GET'])
def logout():
    session.pop('user_id', None)
    return "Sesión cerrada"

## Update
## Receives an id
## Return a json
@usuario_blueprint.route('/update/<user>', methods=['POST'])
def update_user(user):
    try:
        idUsuario = user['idUsuario']
        nombre = user['nombre']
        apPat = user['apPat']
        apMat = user['apMat']
        correo = user['correo']
        telefono = user['telefono']
        contraseña = user['contraseña']
        imagen = user['imagen']
        vendedor = user['vendedor']
        updated_user = mu.update_user(idUsuario, nombre, apPat, apMat, correo, telefono, contraseña, imagen, vendedor)
        if updated_user == -1:
            return json.dumps({'error': 'No se pudo actualizar el usuario'})
        return json.dumps(updated_user.to_dict())
    except:
        return json.dumps({'error': 'Faltan datos'})
    
    
## Delete
## Receives an id
## Return a json
@usuario_blueprint.route('/delete/<idUsuario>', methods=['GET'])
def delete_user(idUsuario):
    #idUsuario = request.args.get('idUsuario')
    user = mu.delete_user(idUsuario)
    if user == -1:
        return json.dumps({'error': 'No se pudo borrar el usuario'})
    return json.dumps(user.to_dict())
