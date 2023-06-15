from api.controllers.user import app as user_controller        
from api.controllers.lote import app as lote_controller        
from api.controllers.casa import app as casa_controller        
from api.controllers.auth import app as auth_controller        
from flask_migrate import Migrate
from api.models.models import User
from flask import jsonify
from api import app, db
from flask_cors import CORS
        
CORS(app)

app.register_blueprint(user_controller, url_prefix="/user/")
app.register_blueprint(lote_controller, url_prefix="/lote/")
app.register_blueprint(casa_controller, url_prefix="/casa/")
app.register_blueprint(auth_controller, url_prefix="/auth/")

#Migrate(app, db)

@app.shell_context_processor
def make_shell_context():
    return dict(
        app=app,
        db=db,
        User=User
    )

if __name__ == '__main__':    
    with app.test_request_context():
        db.create_all()
    app.run(debug=True)