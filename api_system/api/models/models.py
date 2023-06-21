from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from api import db, ma

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)

    def __init__(self, username, password, name, email):
        self.username = username
        self.password =  generate_password_hash(password) 
        self.name = name
        self.email = email

    def verify_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return "<User %r>" % self.username
    
    def to_dict(self, columns=[]):
        if not columns:
            return {"id":self.id, "username":self.username, "password":self.password, "nome":self.name, "email":self.email}
        else:
            return{col:getattr(self, col) for col in columns}

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'name', 'email')
user_share_schema = UserSchema()
users_share_schema = UserSchema(many=True)
        
class Lote(db.Model):
    __tablename__ = "lotes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    valor = db.Column(db.Integer)
    tamanho = db.Column(db.Integer)
    endereco = db.Column(db.Text)
    cep = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', foreign_keys=user_id)

    def __init__(self, endereco, cep, valor, tamanho, user_id):
        self.valor = valor
        self.endereco = endereco
        self.cep = cep
        self.tamanho = tamanho
        self.user_id = user_id
    
    def __repr__(self):
        return "<Lote %r>" % self.endereco
    
    def to_dict(self, columns=[]):
        if not columns:
            return {"id":self.id, "endereço":self.endereco, "cep":self.cep, "tamanho":self.tamanho, "user_id":self.user_id}
        else:
            return{col:getattr(self, col) for col in columns}
    
class Casa(db.Model):
    __tablename__ = "casas"
    
    id = db.Column(db.Integer, primary_key=True)
    tamanho = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    lote_id = db.Column(db.Integer, db.ForeignKey('lotes.id'))

    user = db.relationship('User', foreign_keys=user_id)
    lote = db.relationship('Lote', foreign_keys=lote_id)

    def __init__(self, tamanho, user_id, lote_id):        
        self.tamanho = tamanho
        self.user_id = user_id
        self.user_id = lote_id
    
    def __repr__(self):
        return "<Casa %r>" % self.lote
    
    def to_dict(self, columns=[]):
        if not columns:
            return {"id":self.id, "tamanho":self.tamanho, "user_id":self.user_id, "lote_id":self.user_id}
        else:
            return{col:getattr(self, col) for col in columns}