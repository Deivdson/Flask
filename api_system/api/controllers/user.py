from flask import Blueprint, request, Response
from ..utils.authenticate import jwt_required
from ..models.models import db, User
import json

app = Blueprint("users", __name__)

@app.route('/')
def index():
    users = User.query.all()
    result = [u.to_dict() for u in users]
    return Response(response=json.dumps(result), status=200, content_type="application/json")

@app.route('/view/<int:id>', methods=['GET'])
@jwt_required
def view(id, current_user):
    user = User.query.get(id)
    return Response(response=json.dumps(user.to_dict()), status=200, content_type="application/json")

@app.route('/edit/<int:id>', methods=['PUT', 'POST'])
@jwt_required
def edit(id, current_user):
    data = request.get_json()
    user = User.query.get(id)
    user.username = data.get('username')
    user.password = data.get('password')
    user.name = data.get('name')
    user.email = data.get('email')
    user.email = data.get('email')
    db.session.commit()
    return Response(response=json.dumps(user.to_dict()), status=200, content_type="application/json")

@app.route('/delete/<int:id>', methods=['GET', 'DELETE'])
@jwt_required
def delete(id, current_user):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return Response(response=json.dumps(user.to_dict()), status=200, content_type="application/json")