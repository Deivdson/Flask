from flask import Blueprint, request, Response, jsonify
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
    data = request.get_json()
    valor = data.get('valor')
    tamanho = data.get('tamanho')
    endereco = data.get('endereco')
    cep = data.get('cep')
    lote = Lote(
        valor=valor,
        tamanho=tamanho,
        endereco=endereco,
        cep=cep
    )
    db.session.add(lote)
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Lote added successfully'})

@app.route('/edit/<int:id>', methods=['PUT', 'POST'])
def edit(id):
    lote = Lote.query.get(id)
    lote.valor = request.form['valor']
    lote.endereco = request.form['endereco']
    lote.cep =      request.form['cep']
    lote.tamanho =       request.form['tamanho']
    lote.user_id =  request.form['user_id']
    db.session.commit()
    return Response(response=json.dumps(lote.to_dict()), status=200, content_type="application/json")

@app.route('/delete/<int:id>', methods=['GET', 'DELETE'])
def delete(id):
    lote = Lote.query.get(id)
    db.session.delete(lote)
    db.session.commit()
    return Response(response=json.dumps(lote.to_dict()), status=200, content_type="application/json")