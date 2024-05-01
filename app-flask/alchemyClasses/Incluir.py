"""from sqlalchemy import Column, Integer, String, LargeBinary, ForeignKey
from alchemyClasses import db

class Incluir(db.Model):
    __tablename__ = 'Incluir'
    idReseña = Column(Integer, ForeignKey('Reseña.idReseña'), primary_key=True)
    idCompra = Column(Integer, ForeignKey('Compra.idCompra'), primary_key=True)
    resena = db.relationship('Reseña', backref='Incluir', single_parent=True, cascade="all, delete-orphan")
    compra = db.relationship('Compra', backref='Incluir', single_parent=True, cascade="all, delete-orphan")
    
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
        
"""