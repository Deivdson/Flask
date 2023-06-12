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
            return {"id":self.id, "endereço":self.endereco, "cep":self.cep, "m²":self.tamanho, "user_id":self.user_id}
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
            return {"id":self.id, "m²":self.tamanho, "user_id":self.user_id, "lote_id":self.user_id}
        else:
            return{col:getattr(self, col) for col in columns}