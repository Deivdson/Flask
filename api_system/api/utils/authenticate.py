from functools import wraps
import jwt
from flask import request, jsonify, current_app

from ..models.models import User

def jwt_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = None
        if 'authorization' in request.headers:        
            token = request.headers['authorization']

        if not token:        
            return jsonify({"error": "você não tem permissão para acessar essa rota."}), 403
        
        if not "Bearer" in token:        
            return jsonify({"error": "token inválido."}), 403
        
           
        token_pure = token.replace("Bearer ", "")    
        decoded = jwt.decode(token_pure, current_app.config['SECRET_KEY'],'HS256')    
        current_user = User.query.get(decoded['id'])    
        
        return f(current_user=current_user, *args, **kwargs)
    
    return wrapper