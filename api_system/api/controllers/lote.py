from flask import Blueprint, request, Response
from ..models.models import db, Lote
import json

app = Blueprint("lotes", __name__)


@app.route('/')
def index():
    lotes = Lote.query.all()
    result = [u.to_dict() for u in lotes]
    return Response(response=json.dumps(result), status=200, content_type="application/json")

@app.route('/view/<int:id>', methods=['GET'])
def view(id):
    lote = Lote.query.get(id)
    #row = db.session.execute("select * from lotes where id = %s" % id).fetchone()
    return Response(response=json.dumps(lote.to_dict()), status=200, content_type="application/json")

@app.route('/add', methods=['POST'])
def add():    
    lote = Lote(
        request.form['endereco'],
        request.form['cep'],
        request.form['m2'],
        request.form['user_id']
        )
    db.session.add(lote)
    db.session.commit()
    return Response(response=json.dumps({'status':'sucess', 'data':lote.to_dict()}), status=200, content_type="application/json")

@app.route('/edit/<int:id>', methods=['PUT', 'POST'])
def edit(id):
    lote = lote.query.get(id)
    lote.endereco = request.form['endereco']
    lote.cep =      request.form['cep']
    lote.m2 =       request.form['m2']
    lote.user_id =  request.form['user_id']
    db.session.commit()
    return Response(response=json.dumps(lote.to_dict()), status=200, content_type="application/json")

@app.route('/delete/<int:id>', methods=['GET', 'DELETE'])
def delete(id):
    lote = Lote.query.get(id)
    db.session.delete(lote)
    db.session.commit()
    return Response(response=json.dumps(lote.to_dict()), status=200, content_type="application/json")