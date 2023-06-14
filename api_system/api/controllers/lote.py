from flask import Blueprint, request, Response
from ..utils.authenticate import jwt_required
from ..models.models import db, Lote
import json

app = Blueprint("lotes", __name__)


@app.route('/')
@jwt_required
def index(current_user):
    lotes = Lote.query.all()
    result = [u.to_dict() for u in lotes]
    return Response(response=json.dumps(result), status=200, content_type="application/json")

@app.route('/view/<int:id>', methods=['GET'])
@jwt_required
def view(id,current_user):
    lote = Lote.query.get(id)
    #row = db.session.execute("select * from lotes where id = %s" % id).fetchone()
    return Response(response=json.dumps(lote.to_dict()), status=200, content_type="application/json")

@app.route('/add', methods=['POST'])
@jwt_required
def add(current_user):    
    lote = Lote(
        request.form['valor'],
        request.form['endereco'],
        request.form['cep'],
        request.form['tamanho'],
        request.form['user_id']
        )
    db.session.add(lote)
    db.session.commit()
    return Response(response=json.dumps({'status':'sucess', 'data':lote.to_dict()}), status=200, content_type="application/json")

@app.route('/edit/<int:id>', methods=['PUT', 'POST'])
@jwt_required
def edit(id, current_user):
    lote = Lote.query.get(id)
    lote.valor = request.form['valor']
    lote.endereco = request.form['endereco']
    lote.cep =      request.form['cep']
    lote.tamanho =       request.form['tamanho']
    lote.user_id =  request.form['user_id']
    db.session.commit()
    return Response(response=json.dumps(lote.to_dict()), status=200, content_type="application/json")

@app.route('/delete/<int:id>', methods=['GET', 'DELETE'])
@jwt_required
def delete(id, current_user):
    lote = Lote.query.get(id)
    db.session.delete(lote)
    db.session.commit()
    return Response(response=json.dumps(lote.to_dict()), status=200, content_type="application/json")