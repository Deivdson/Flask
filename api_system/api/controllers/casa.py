from flask import Blueprint, request, Response
from ..models.models import db, Casa
import json

app = Blueprint("casas", __name__)


@app.route('/')
def index():
    casas = Casa.query.all()
    result = [u.to_dict() for u in casas]
    return Response(response=json.dumps(result), status=200, content_type="application/json")

@app.route('/view/<int:id>', methods=['GET'])
def view(id):
    casa = Casa.query.get(id)
    return Response(response=json.dumps(casa.to_dict()), status=200, content_type="application/json")

@app.route('/add', methods=['POST'])
def add():    
    casa = Casa(
        request.form['tamanho'],    
        request.form['user_id'],
        request.form['lote_id']
        )
    db.session.add(casa)
    db.session.commit()
    return Response(response=json.dumps({'status':'sucess', 'data':casa.to_dict()}), status=200, content_type="application/json")

@app.route('/edit/<int:id>', methods=['PUT', 'POST'])
def edit(id):
    casa = Casa.query.get(id)
    casa.tamanho = request.form['tamanho']
    casa.user_id = request.form['user_id']
    casa.lote_id = request.form['lote_id']
    db.session.commit()
    return Response(response=json.dumps(casa.to_dict()), status=200, content_type="application/json")

@app.route('/delete/<int:id>', methods=['GET', 'DELETE'])
def delete(id):
    casa = Casa.query.get(id)
    db.session.delete(casa)
    db.session.commit()
    return Response(response=json.dumps(casa.to_dict()), status=200, content_type="application/json")