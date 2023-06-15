from flask import Blueprint, request, Response
from ..models.models import db, User, user_share_schema, users_share_schema
from flask import jsonify
import json, datetime, jwt

import api

app = Blueprint("auth", __name__)

@app.route('/register', methods=["POST"])
def register():
    if request.method == 'POST':
        username = request.json['username']
        nome = request.json['username']
        email = request.json['email']
        password = request.json['password']
        user = User(
            username,password,nome,email
        )
        db.session.add(user)
        db.session.commit()
       
        return Response(response=json.dumps({'status':'sucess', 'data':user.to_dict()}), status=200, content_type="application/json")        

@app.route('/login', methods=["POST"])
def login():
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first_or_404()

    if not user.verify_password(password):
        return jsonify({
            "error": "suas credênciais estão erradas!"
        }), 403
    payload = {
        "id": user.id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    }

    token = jwt.encode(payload, api.app.config['SECRET_KEY'])
    return jsonify({"token":token})

