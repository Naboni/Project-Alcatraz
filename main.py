import os
from flask import Flask
from api.conf.config import SQLALCHEMY_DATABASE_URI
from api.conf.routes import generate_routes

from api.database.database import db
from api.db_initializer.db_initializer import (
    create_super_admin
)

app = Flask(__name__)

# Set debug true for catching the errors.
app.config['DEBUG'] = True

# Set database url.
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# Generate routes.
generate_routes(app)

# Database initialize with app.
db.init_app(app)

# Check if there is no database.
if not os.path.exists(SQLALCHEMY_DATABASE_URI):

    # New db app if no database.
    db.app = app

    # Create all database tables.
    db.create_all()

    # Create default super admin user in database.
    create_super_admin()


if __name__ == '__main__':
    app.run(debug=True)
