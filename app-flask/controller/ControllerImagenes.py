from flask import Blueprint, session, request, url_for, redirect, jsonify
from flask_uploads import UploadSet, configure_uploads, IMAGES
import json


imagenes_blueprint = Blueprint('imagenes', __name__, url_prefix='/imagenes')

@imagenes_blueprint.route('/guardar', methods=['POST'])
def guardar_imagen():
     # Verifica si hay archivos en la solicitud
    """if 'imagen0' not in request.files:
        return 'No se encontraron archivos', 400

    # Itera sobre los archivos enviados
    for index in range(10):  # Suponiendo que esperas como máximo 10 imágenes
        nombre_archivo = f'imagen{index}'
        if nombre_archivo in request.files:
            archivo = request.files[nombre_archivo]
            # Guarda el archivo en una carpeta específica
            archivo_guardado = os.path.join('uploads', archivo.filename)
            archivo.save(archivo_guardado)
            print(f'Guardado: {archivo_guardado}')

    return 'Archivos subidos correctamente'"""
    
    archivos = request.files.getlist('imagen0')
    rutas_imagenes = []
    # Guarda cada archivo en la carpeta de imágenes
    for archivo in archivos:
        nombre_archivo = imagenes.save(archivo)
        ruta_archivo = imagenes.url(nombre_archivo)
        rutas_imagenes.append(ruta_archivo)

    # Aquí podrías guardar las rutas de las imágenes en la base de datos

    return jsonify({'rutas_imagenes': rutas_imagenes})
    
