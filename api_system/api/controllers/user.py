from flask import Blueprint, request, Response
from ..models.models import db, User
import json

app = Blueprint("users", __name__)

@app.route('/')
def index():
    users = User.query.all()
    result = [u.to_dict() for u in users]
    return Response(response=json.dumps(result), status=200, content_type="application/json")

@app.route('/view/<int:id>', methods=['GET'])
def view(id):
    user = User.query.get(id)
    #row = db.session.execute("select * from users where id = %s" % id).fetchone()
    return Response(response=json.dumps(user.to_dict()), status=200, content_type="application/json")

@app.route('/add', methods=['POST'])
def add():    
    user = User(
        request.form['username'],
        request.form['password'],
        request.form['name'],
        request.form['email']
        )
    db.session.add(user)
    db.session.commit()
    return Response(response=json.dumps({'status':'sucess', 'data':user.to_dict()}), status=200, content_type="application/json")

@app.route('/edit/<int:id>', methods=['PUT', 'POST'])
def edit(id):
    user = User.query.get(id)
    user.username = request.form['username']
    user.password = request.form['password']
    user.name = request.form['name']
    user.email = request.form['email']
    user.email = request.form['email']
    db.session.commit()
    return Response(response=json.dumps(user.to_dict()), status=200, content_type="application/json")

@app.route('/delete/<int:id>', methods=['GET', 'DELETE'])
def delete(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return Response(response=json.dumps(user.to_dict()), status=200, content_type="application/json")