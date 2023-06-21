from flask import Blueprint, request, Response
from ..utils.authenticate import jwt_required
from ..models.models import db, Casa
import json

app = Blueprint("casas", __name__)


@app.route('/')
@jwt_required
def index(current_user):
    casas = Casa.query.all()
    result = [u.to_dict() for u in casas]
    return Response(response=json.dumps(result), status=200, content_type="application/json")

@app.route('/view/<int:id>', methods=['GET'])
@jwt_required
def view(id, current_user):
    casa = Casa.query.get(id)
    return Response(response=json.dumps(casa.to_dict()), status=200, content_type="application/json")

@app.route('/add', methods=['POST'])
@jwt_required
def add(current_user):    
    data = request.get_json()
    casa = Casa(
        data.get('tamanho'),
        data.get('usuario'),
        data.get('lote')
        )
    print(data)
    db.session.add(casa)
    db.session.commit()
    return Response(response=json.dumps({'status':'sucess', 'data':casa.to_dict()}), status=200, content_type="application/json")

@app.route('/edit/<int:id>', methods=['PUT', 'POST'])
@jwt_required
def edit(id, current_user):
    data = request.get_json()
    casa = Casa.query.get(id)
    casa.tamanho = data.get('tamanho')
    casa.user_id = data.get('user_id')
    casa.lote_id = data.get('lote_id')
    db.session.commit()
    return Response(response=json.dumps(casa.to_dict()), status=200, content_type="application/json")

@app.route('/delete/<int:id>', methods=['GET', 'DELETE'])
@jwt_required
def delete(id, current_user):
    casa = Casa.query.get(id)
    db.session.delete(casa)
    db.session.commit()
    return Response(response=json.dumps(casa.to_dict()), status=200, content_type="application/json")