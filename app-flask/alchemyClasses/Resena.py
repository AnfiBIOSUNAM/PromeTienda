from sqlalchemy import Column, Integer, String, LargeBinary
from alchemyClasses import db

class Reseña(db.Model):
    __tablename__ = 'Reseña'
    idReseña = Column(Integer, primary_key=True)
    comentario = Column(String(255), nullable=False)
    calificacion = Column(Integer, nullable=False)
    
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