from alchemyClasses.Usuario import Usuario
from alchemyClasses import db
from flask import jsonify

#CRUD

def create_user(nombre, apPat, apMat, correo, telefono, contraseña, imagen, vendedor):
    new_user = Usuario(nombre=nombre, apPat=apPat, apMat=apMat, correo=correo, telefono=telefono, contraseña=contraseña, imagen=imagen, vendedor=vendedor)
    try:
        db.session.add(new_user)
        db.session.commit()
        return new_user
    except:
        return -1
    
def find_user_by_email_and_password(correo, contraseña):
    user = Usuario.query.filter(Usuario.correo == correo).first()
    if user is None:
        print('El usuario con correo: ' + correo + ' no existe')
        return -1
    elif user.contraseña != contraseña:
        print('La contraseña para el usuario con correo: ' + correo + ' es incorrecta')
        return -2
    return user
    
def read_user(idUsuario):
    user = Usuario.query.filter(Usuario.idUsuario==idUsuario).first()
    if user is None:
        print('El usuario con id: '+str(idUsuario)+' no existe')
        return -1
    return user

def read_users():
    return Usuario.query.all()

def update_user(idUsuario, nombre, apPat, apMat, correo, telefono, contraseña, imagen, vendedor):
    user = Usuario.query.filter_by(idUsuario=idUsuario).first()
    if user is None:
        print('El usuario con id: '+str(idUsuario)+' no existe')
        return -1
    user.nombre = nombre
    user.apPat = apPat
    user.apMat = apMat
    user.correo = correo
    user.telefono = telefono
    user.contraseña = contraseña
    user.imagen = imagen
    user.vendedor = vendedor
    db.session.commit()
    return user

def delete_user(idUsuario):
    user = Usuario.query.filter_by(idUsuario=idUsuario).first()
    if user is None:
        print('El usuario con id: '+str(idUsuario)+' no existe')
        return -1
    db.session.delete(user)
    db.session.commit()
    return user
