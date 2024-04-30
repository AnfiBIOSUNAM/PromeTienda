from sqlalchemy import Column, Integer, String, LargeBinary
from alchemyClasses import db

class Incluir(db.Model):
    __tablename__ = 'Reseña'
    idReseña = Column(Integer, nullable=False)
    idCompra = Column(Integer, nullable=False)
    
    def _init_(self, idReseña, idCompra):
        self.idReseña = idReseña
        self.idCompra = idCompra
        
    def _str_(self):
        return f'Reseña: {self.idReseña} (ID: {self.idCompra})'
    
    def to_dict(self):
        return {
            'idReseña': self.idReseña,
            'idCompra': self.idCompra
        }