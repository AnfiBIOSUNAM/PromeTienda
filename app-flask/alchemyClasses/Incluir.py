from sqlalchemy import Column, Integer, String, LargeBinary
from alchemyClasses import db

class Incluir(db.Model):
    __tablename__ = 'Reseña'
    idReseña = Column(Integer, nullable=False)
    idCompra = Column(Integer, nullable=False)
    
    def _init_(self, comentario, calificacion):
        self.comentario = comentario
        self.calificacion = calificacion
        
    def _str_(self):
        return f'Reseña: {self.comentario} (ID: {self.idReseña}), Calificación: {self.calificacion}'    
    
    def to_dict(self):
        return {
            'idReseña': self.idReseña,
            'comentario': self.comentario,
            'calificacion': self.calificacion
        }