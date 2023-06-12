from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)

    def __init__(self, username, password, name, email):
        self.username = username
        self.password =  password 
        self.name = name
        self.email = email

    def __repr__(self):
        return "<User %r>" % self.username
    
    def to_dict(self, columns=[]):
        if not columns:
            return {"id":self.id, "username":self.username, "password":self.password, "nome":self.name, "email":self.email}
        else:
            return{col:getattr(self, col) for col in columns}
        
class Lote(db.Model):
    __tablename__ = "lotes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    endereco = db.Column(db.String, unique=True)
    cep = db.Column(db.String)
    m2 = db.Column(db.Integer)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    usuario = db.relationship('User', foreign_keys=user_id)
    
    def __init__(self, endereco, cep, m2, user_id):
        self.endereco = endereco
        self.cep = cep
        self.m2 = m2
        self.user_id = user_id

    def __repr__(self):
        return "<Lote %r>" % self.endereco
    
    def to_dict(self, columns=[]):
        if not columns:
            return {"id":self.id, "endereço":self.endereco, "cep":self.cep, "m²":self.m2, "user_id":self.user_id}
        else:
            return{col:getattr(self, col) for col in columns}