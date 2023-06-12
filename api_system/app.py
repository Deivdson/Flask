from controllers.user import app as user_controller        
from models.user import db
from flask import Flask
        
app = Flask(__name__, template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

app.register_blueprint(user_controller, url_prefix="/user/")

if __name__ == '__main__':
    db.init_app(app=app)
    with app.test_request_context():
        db.create_all()
    app.run(debug=True)
