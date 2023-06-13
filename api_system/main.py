from api.controllers.user import app as user_controller        
from api.controllers.lote import app as lote_controller        
from api.controllers.casa import app as casa_controller        
from api.models.models import db
from flask import Flask
from flask_cors import CORS
        
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

app.register_blueprint(user_controller, url_prefix="/user/")
app.register_blueprint(lote_controller, url_prefix="/lote/")
app.register_blueprint(casa_controller, url_prefix="/casa/")

if __name__ == '__main__':
    db.init_app(app=app)
    with app.test_request_context():
        db.create_all()
    app.run(debug=True)