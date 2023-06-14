from controllers.user import app as user_controller        
from controllers.lote import app as lote_controller        
from models.models import db
from flask import Flask
from flask_cors import CORS
        
app = Flask(__name__, template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
CORS(app)

app.register_blueprint(user_controller, url_prefix="/user/")
app.register_blueprint(lote_controller, url_prefix="/lote/")

if __name__ == '__main__':
    db.init_app(app=app)
    with app.test_request_context():
        db.create_all()
    app.run(debug=True)
