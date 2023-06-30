from flask import Blueprint, request, Response, jsonify
from ..utils.authenticate import jwt_required
from ..models.models import db, Lote
import json

app = Blueprint("lotes", __name__)


@app.route('/')
def index():
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
    data = request.get_json()
    valor = data.get('valor')
    titulo = data.get('titulo')
    tamanho = data.get('tamanho')
    rua = data.get('rua')
    CEP = data.get('CEP')
    numero = data.get('numero')
    bairro = data.get('bairro')
    cidade = data.get('cidade')
    estado = data.get('estado')
    complemento = data.get('complemento')
    id = data.get('user_id')
    
    lote = Lote(
        valor=valor,
        tamanho=tamanho,
        titulo=titulo,
        rua=rua,
        CEP=CEP,
        numero=numero,
        bairro=bairro,
        cidade=cidade,
        estado=estado,
        complemento=complemento,
        user_id=id
    )
    db.session.add(lote)
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Lote added successfully'})

@app.route('/edit/<int:id>', methods=['PUT'])
@jwt_required
def edit(id, current_user):
    data = request.get_json()
    lote = Lote.query.get(id)
    lote.valor = data.get('valor')
    lote.titulo = data.get('titulo')
    lote.tamanho = data.get('tamanho')
    lote.rua = data.get('rua')
    lote.CEP = data.get('CEP')
    lote.numero = data.get('numero')
    lote.bairro = data.get('bairro')
    lote.cidade = data.get('cidade')
    lote.estado = data.get('estado')
    lote.complemento = data.get('complemento')
    lote.id = data.get('user_id')
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Lote added successfully'})

@app.route('/delete/<int:id>', methods=['GET', 'DELETE'])
@jwt_required
def delete(id, current_user):
    lote = Lote.query.get(id)
    db.session.delete(lote)
    db.session.commit()
    return Response(response=json.dumps(lote.to_dict()), status=200, content_type="application/json")