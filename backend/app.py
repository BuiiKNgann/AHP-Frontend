from flask import Flask
from config import Config
from models import db
from routes.expert_routes import expert_bp
from routes.ahp_routes import ahp_bp

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

app.register_blueprint(expert_bp)
app.register_blueprint(ahp_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
